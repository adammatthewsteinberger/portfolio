import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { retrieveContext } from '@/lib/ask/kbIndex';
import { checkRateLimit, checkDailySpendCap, recordOutputTokens, clientKeyFromHeaders } from '@/lib/ask/rateLimit';
import { OUT_OF_COFFEE, failureMessage } from '@/lib/ask/messages';

export const runtime = 'nodejs';

const MAX_TURNS = 6;
const MODEL = 'claude-sonnet-5';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_TURNS * 2),
  honeypot: z.string().optional(),
});

function isEnabled(): boolean {
  return process.env.ASK_BOT_ENABLED === 'true' && Boolean(process.env.ANTHROPIC_API_KEY);
}

function buildSystemPrompt(context: ReturnType<typeof retrieveContext>): string {
  const contextBlock = context
    .map((chunk) => `[Source: ${chunk.title} — ${chunk.section} (${chunk.url})]\n${chunk.text}`)
    .join('\n\n---\n\n');

  return `You are a focused assistant answering questions about Adam Matthew Steinberger — a Staff Software Architect & AI Automation Engineer — for visitors to his hire-me site. You speak about Adam in the third person.

Answer ONLY using the context below, retrieved from his site. Do not use outside knowledge about Adam. Never invent, guess, or extrapolate employment facts — dates, titles, companies, availability, compensation, or achievements — that are not explicitly present in the context.

If the context doesn't answer the question, say so plainly and suggest the visitor check the /hire-me page or use the contact form — do not guess.

If the question is unrelated to Adam's work, background, skills, or hiring him (e.g. general trivia, other people, unrelated coding help), politely decline and redirect back to a question about Adam.

Keep answers under 120 words, in plain prose. When a fact comes from a specific page, mention the page path in parentheses so the visitor can read more, e.g. "(see /work/self-hosted-rag-chatbot)".

Context:

${contextBlock}`;
}

export async function GET() {
  return Response.json({ enabled: isEnabled() });
}

export async function POST(request: Request) {
  if (!isEnabled()) {
    return Response.json(
      { error: 'resting', message: "Ask my résumé is resting right now — try the contact form instead." },
      { status: 503 },
    );
  }

  let body: z.infer<typeof requestSchema>;
  try {
    const json = await request.json();
    body = requestSchema.parse(json);
  } catch {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Silently serve the
  // resting response rather than a 4xx, so it gives bots no signal to react to.
  if (body.honeypot) {
    return Response.json(
      { error: 'resting', message: "Ask my résumé is resting right now — try the contact form instead." },
      { status: 503 },
    );
  }

  const clientKey = clientKeyFromHeaders(request.headers);
  const rateCheck = checkRateLimit(clientKey);
  if (!rateCheck.allowed) {
    return Response.json(
      { error: 'rate_limited', message: 'Too many questions — take a short break and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds ?? 60) } },
    );
  }

  if (!checkDailySpendCap()) {
    return Response.json(
      { error: 'resting', message: OUT_OF_COFFEE },
      { status: 503 },
    );
  }

  const lastUserMessage = [...body.messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const context = retrieveContext(lastUserMessage.content, 5);
  const system = buildSystemPrompt(context);

  const client = new Anthropic();

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        const anthropicStream = client.messages.stream({
          model: MODEL,
          max_tokens: 400,
          thinking: { type: 'disabled' },
          system,
          messages: body.messages.map((m) => ({ role: m.role, content: m.content })),
        });

        anthropicStream.on('text', (delta) => {
          send({ type: 'delta', text: delta });
        });

        const finalMessage = await anthropicStream.finalMessage();
        recordOutputTokens(finalMessage.usage.output_tokens);

        send({
          type: 'done',
          citations: context.map((chunk) => ({ url: chunk.url, title: chunk.title })),
        });
      } catch (error) {
        console.error('Ask bot error:', error);
        send({ type: 'error', message: failureMessage(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
