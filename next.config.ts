import type { NextConfig } from 'next';

// Hosts for the "Ask my résumé" chat subdomain. chat.adam.matthewsteinberger.com is a
// second custom domain on the same Cloudflare Worker; the host-aware rules below keep
// exactly one canonical URL per page. See AGENTS.md → "Chat subdomain" for the curl
// checklist to re-run after any Next.js / @opennextjs/cloudflare upgrade.
const CHAT_HOST = 'chat.adam.matthewsteinberger.com';
const HIRE_HOST = 'hire.adam.matthewsteinberger.com';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // chat host: "/" serves the /chat page (URL unchanged).
        { source: '/', has: [{ type: 'host', value: CHAT_HOST }], destination: '/chat' },
      ],
    };
  },
  async redirects() {
    return [
      // --- chat subdomain (must stay first) ---
      // chat host: /chat is canonical at the root.
      {
        source: '/chat',
        has: [{ type: 'host', value: CHAT_HOST }],
        destination: `https://${CHAT_HOST}/`,
        permanent: true,
      },
      // chat host: every other page belongs to the hire host. The lookahead keeps
      // /api/*, /_next/* and file-extension assets serving on the chat host.
      {
        source: '/:path((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).+)',
        has: [{ type: 'host', value: CHAT_HOST }],
        destination: `https://${HIRE_HOST}/:path`,
        permanent: true,
      },
      // hire host: /chat lives on the chat host. Other hosts (localhost, deploy
      // previews) are untouched so /chat serves directly there.
      {
        source: '/chat',
        has: [{ type: 'host', value: HIRE_HOST }],
        destination: `https://${CHAT_HOST}/`,
        permanent: true,
      },
      {
        source: '/ai-greer.html',
        destination: '/services/ai-greer',
        permanent: true,
      },
      {
        source: '/ai-greer',
        destination: '/services/ai-greer',
        permanent: true,
      },
      {
        source: '/ai-simpsonville.html',
        destination: '/services/ai-simpsonville',
        permanent: true,
      },
      {
        source: '/ai-simpsonville',
        destination: '/services/ai-simpsonville',
        permanent: true,
      },
      {
        source: '/ai-greenville.html',
        destination: '/services/ai-greenville',
        permanent: true,
      },
      {
        source: '/ai-greenville',
        destination: '/services/ai-greenville',
        permanent: true,
      },
      {
        source: '/ai-spartanburg.html',
        destination: '/services/ai-spartanburg',
        permanent: true,
      },
      {
        source: '/ai-spartanburg',
        destination: '/services/ai-spartanburg',
        permanent: true,
      },
      {
        source: '/ai-financial-services.html',
        destination: '/services/ai-financial-services',
        permanent: true,
      },
      {
        source: '/ai-financial-services',
        destination: '/services/ai-financial-services',
        permanent: true,
      },
      {
        source: '/ai-healthcare.html',
        destination: '/services/ai-healthcare',
        permanent: true,
      },
      {
        source: '/ai-healthcare',
        destination: '/services/ai-healthcare',
        permanent: true,
      },
      {
        source: '/ai-real-estate.html',
        destination: '/services/ai-real-estate',
        permanent: true,
      },
      {
        source: '/ai-real-estate',
        destination: '/services/ai-real-estate',
        permanent: true,
      },
      {
        source: '/ai-restaurants.html',
        destination: '/services/ai-restaurants',
        permanent: true,
      },
      {
        source: '/ai-restaurants',
        destination: '/services/ai-restaurants',
        permanent: true,
      },
      {
        source: '/ai-law-firms.html',
        destination: '/services/ai-law-firms',
        permanent: true,
      },
      {
        source: '/ai-law-firms',
        destination: '/services/ai-law-firms',
        permanent: true,
      },
      {
        source: '/ai-manufacturing.html',
        destination: '/services/ai-manufacturing',
        permanent: true,
      },
      {
        source: '/ai-manufacturing',
        destination: '/services/ai-manufacturing',
        permanent: true,
      },
      {
        source: '/ai-marketing-agencies.html',
        destination: '/services/ai-marketing-agencies',
        permanent: true,
      },
      {
        source: '/ai-marketing-agencies',
        destination: '/services/ai-marketing-agencies',
        permanent: true,
      },
      {
        source: '/ai-sales-teams.html',
        destination: '/services/ai-sales-teams',
        permanent: true,
      },
      {
        source: '/ai-sales-teams',
        destination: '/services/ai-sales-teams',
        permanent: true,
      },
      {
        source: '/ai-nonprofits.html',
        destination: '/services/ai-nonprofits',
        permanent: true,
      },
      {
        source: '/ai-nonprofits',
        destination: '/services/ai-nonprofits',
        permanent: true,
      },
      {
        source: '/ai-startups.html',
        destination: '/services/ai-startups',
        permanent: true,
      },
      {
        source: '/ai-startups',
        destination: '/services/ai-startups',
        permanent: true,
      },
      {
        source: '/ai-enterprise.html',
        destination: '/services/ai-enterprise',
        permanent: true,
      },
      {
        source: '/ai-enterprise',
        destination: '/services/ai-enterprise',
        permanent: true,
      },
      {
        source: '/ai-boutiques.html',
        destination: '/services/ai-boutiques',
        permanent: true,
      },
      {
        source: '/ai-boutiques',
        destination: '/services/ai-boutiques',
        permanent: true,
      },
      {
        source: '/ai-privacy-tech.html',
        destination: '/services/ai-privacy-tech',
        permanent: true,
      },
      {
        source: '/ai-privacy-tech',
        destination: '/services/ai-privacy-tech',
        permanent: true,
      },
      {
        source: '/ai-helpdesk.html',
        destination: '/services/ai-helpdesk',
        permanent: true,
      },
      {
        source: '/ai-helpdesk',
        destination: '/services/ai-helpdesk',
        permanent: true,
      },
      {
        source: '/ai-copywriting.html',
        destination: '/services/ai-copywriting',
        permanent: true,
      },
      {
        source: '/ai-copywriting',
        destination: '/services/ai-copywriting',
        permanent: true,
      },
      {
        source: '/custom-chatbots.html',
        destination: '/services/custom-chatbots',
        permanent: true,
      },
      {
        source: '/custom-chatbots',
        destination: '/services/custom-chatbots',
        permanent: true,
      },
      {
        source: '/chatgpt-developer.html',
        destination: '/services/chatgpt-developer',
        permanent: true,
      },
      {
        source: '/chatgpt-developer',
        destination: '/services/chatgpt-developer',
        permanent: true,
      },
      {
        source: '/claude-ai.html',
        destination: '/services/claude-ai',
        permanent: true,
      },
      {
        source: '/claude-ai',
        destination: '/services/claude-ai',
        permanent: true,
      },
      {
        source: '/gemini-ai.html',
        destination: '/services/gemini-ai',
        permanent: true,
      },
      {
        source: '/gemini-ai',
        destination: '/services/gemini-ai',
        permanent: true,
      },
      {
        source: '/llm-development.html',
        destination: '/services/llm-development',
        permanent: true,
      },
      {
        source: '/llm-development',
        destination: '/services/llm-development',
        permanent: true,
      },
      {
        source: '/rag-development.html',
        destination: '/services/rag-development',
        permanent: true,
      },
      {
        source: '/rag-development',
        destination: '/services/rag-development',
        permanent: true,
      },
      {
        source: '/chat-engine-development.html',
        destination: '/services/chat-engine-development',
        permanent: true,
      },
      {
        source: '/chat-engine-development',
        destination: '/services/chat-engine-development',
        permanent: true,
      },
      {
        source: '/context-engineering.html',
        destination: '/services/context-engineering',
        permanent: true,
      },
      {
        source: '/context-engineering',
        destination: '/services/context-engineering',
        permanent: true,
      },
      {
        source: '/prompt-engineering.html',
        destination: '/services/prompt-engineering',
        permanent: true,
      },
      {
        source: '/prompt-engineering',
        destination: '/services/prompt-engineering',
        permanent: true,
      },
      {
        source: '/lora-fine-tuning.html',
        destination: '/services/lora-fine-tuning',
        permanent: true,
      },
      {
        source: '/lora-fine-tuning',
        destination: '/services/lora-fine-tuning',
        permanent: true,
      },
      {
        source: '/vllm-api-development.html',
        destination: '/services/vllm-api-development',
        permanent: true,
      },
      {
        source: '/vllm-api-development',
        destination: '/services/vllm-api-development',
        permanent: true,
      },
      {
        source: '/ai-agents.html',
        destination: '/services/ai-agents',
        permanent: true,
      },
      {
        source: '/ai-agents',
        destination: '/services/ai-agents',
        permanent: true,
      },
      {
        source: '/ai-automation.html',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/ai-automation',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/ai-business.html',
        destination: '/services/ai-business',
        permanent: true,
      },
      {
        source: '/ai-business',
        destination: '/services/ai-business',
        permanent: true,
      },
      {
        source: '/ai-consulting.html',
        destination: '/services/ai-consulting',
        permanent: true,
      },
      {
        source: '/ai-consulting',
        destination: '/services/ai-consulting',
        permanent: true,
      },
      {
        source: '/ai-consultant.html',
        destination: '/services/ai-consultant',
        permanent: true,
      },
      {
        source: '/ai-consultant',
        destination: '/services/ai-consultant',
        permanent: true,
      },
      {
        source: '/ai-expert.html',
        destination: '/services/ai-expert',
        permanent: true,
      },
      {
        source: '/ai-expert',
        destination: '/services/ai-expert',
        permanent: true,
      },
      {
        source: '/ai-implementation.html',
        destination: '/services/ai-implementation',
        permanent: true,
      },
      {
        source: '/ai-implementation',
        destination: '/services/ai-implementation',
        permanent: true,
      },
      {
        source: '/ai-integration.html',
        destination: '/services/ai-integration',
        permanent: true,
      },
      {
        source: '/ai-integration',
        destination: '/services/ai-integration',
        permanent: true,
      },
      {
        source: '/ai-marketing.html',
        destination: '/services/ai-marketing',
        permanent: true,
      },
      {
        source: '/ai-marketing',
        destination: '/services/ai-marketing',
        permanent: true,
      },
      {
        source: '/ai-solutions.html',
        destination: '/services/ai-solutions',
        permanent: true,
      },
      {
        source: '/ai-solutions',
        destination: '/services/ai-solutions',
        permanent: true,
      },
      {
        source: '/ai-strategy.html',
        destination: '/services/ai-strategy',
        permanent: true,
      },
      {
        source: '/ai-strategy',
        destination: '/services/ai-strategy',
        permanent: true,
      },
      {
        source: '/ai-training.html',
        destination: '/services/ai-training',
        permanent: true,
      },
      {
        source: '/ai-training',
        destination: '/services/ai-training',
        permanent: true,
      },
      {
        source: '/ai-services.html',
        destination: '/services/ai-services',
        permanent: true,
      },
      {
        source: '/ai-services',
        destination: '/services/ai-services',
        permanent: true,
      },
      {
        source: '/upstate-ai-developer.html',
        destination: '/services/upstate-ai-developer',
        permanent: true,
      },
      {
        source: '/upstate-ai-developer',
        destination: '/services/upstate-ai-developer',
        permanent: true,
      },
      {
        source: '/ai-developer-near-me.html',
        destination: '/services/ai-developer-near-me',
        permanent: true,
      },
      {
        source: '/ai-developer-near-me',
        destination: '/services/ai-developer-near-me',
        permanent: true,
      },
      {
        source: '/novice-to-navigator.html',
        destination: '/novice-to-navigator',
        permanent: true,
      },
      {
        source: '/sitemap.html',
        destination: '/sitemap',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/what-is-ai-really.html',
        destination: '/novice-to-navigator/what-is-ai-really',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-are-the-different-types-of-ai-systems.html',
        destination:
          '/novice-to-navigator/what-are-the-different-types-of-ai-systems',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning.html',
        destination:
          '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/how-does-ai-learn-from-data.html',
        destination: '/novice-to-navigator/how-does-ai-learn-from-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-prompt-engineering-and-why-is-it-important.html',
        destination:
          '/novice-to-navigator/what-is-prompt-engineering-and-why-is-it-important',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-a-chatbot-and-how-does-it-work.html',
        destination:
          '/novice-to-navigator/what-is-a-chatbot-and-how-does-it-work',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-chatbots-understand-human-language.html',
        destination:
          '/novice-to-navigator/how-do-chatbots-understand-human-language',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/why-do-some-chatbots-perform-better-than-others.html',
        destination:
          '/novice-to-navigator/why-do-some-chatbots-perform-better-than-others',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-makes-a-chatbot-valuable-for-businesses.html',
        destination:
          '/novice-to-navigator/what-makes-a-chatbot-valuable-for-businesses',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-chatbots-replace-human-roles-in-certain-tasks.html',
        destination:
          '/novice-to-navigator/can-chatbots-replace-human-roles-in-certain-tasks',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-retrieval-augmented-generation-rag.html',
        destination:
          '/novice-to-navigator/what-is-retrieval-augmented-generation-rag',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/why-doesnt-ai-just-know-everything.html',
        destination: '/novice-to-navigator/why-doesnt-ai-just-know-everything',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-does-a-rag-chatbot-use-my-specific-data.html',
        destination:
          '/novice-to-navigator/how-does-a-rag-chatbot-use-my-specific-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-a-vector-database-and-why-is-it-used-in-rag.html',
        destination:
          '/novice-to-navigator/what-is-a-vector-database-and-why-is-it-used-in-rag',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-are-embeddings-and-how-do-they-help-chatbots.html',
        destination:
          '/novice-to-navigator/what-are-embeddings-and-how-do-they-help-chatbots',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-start-building-a-custom-ai-chatbot.html',
        destination:
          '/novice-to-navigator/how-do-you-start-building-a-custom-ai-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-technologies-power-a-rag-chatbot.html',
        destination:
          '/novice-to-navigator/what-technologies-power-a-rag-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers.html',
        destination:
          '/novice-to-navigator/how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-a-chatbot-integrate-with-my-existing-systems.html',
        destination:
          '/novice-to-navigator/can-a-chatbot-integrate-with-my-existing-systems',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-building-a-custom-chatbot-expensive-or-time-intensive.html',
        destination:
          '/novice-to-navigator/is-building-a-custom-chatbot-expensive-or-time-intensive',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-ai-chatbots-give-incorrect-or-made-up-answers.html',
        destination:
          '/novice-to-navigator/can-ai-chatbots-give-incorrect-or-made-up-answers',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses.html',
        destination:
          '/novice-to-navigator/how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-my-business-data-safe-when-using-a-chatbot.html',
        destination:
          '/novice-to-navigator/is-my-business-data-safe-when-using-a-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-competitors-exploit-my-chatbots-knowledge-base.html',
        destination:
          '/novice-to-navigator/can-competitors-exploit-my-chatbots-knowledge-base',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-evaluate-a-chatbots-performance.html',
        destination:
          '/novice-to-navigator/how-do-you-evaluate-a-chatbots-performance',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-industries-are-using-ai-chatbots-effectively.html',
        destination:
          '/novice-to-navigator/what-industries-are-using-ai-chatbots-effectively',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-can-a-chatbot-increase-revenue-or-reduce-costs.html',
        destination:
          '/novice-to-navigator/how-can-a-chatbot-increase-revenue-or-reduce-costs',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-chatbots-streamline-lead-generation-or-customer-onboarding.html',
        destination:
          '/novice-to-navigator/can-chatbots-streamline-lead-generation-or-customer-onboarding',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-my-business-ready-for-an-ai-chatbot.html',
        destination:
          '/novice-to-navigator/is-my-business-ready-for-an-ai-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-if-my-business-has-limited-content-or-data.html',
        destination:
          '/novice-to-navigator/what-if-my-business-has-limited-content-or-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-should-i-consider-before-investing-in-a-custom-chatbot.html',
        destination:
          '/novice-to-navigator/what-should-i-consider-before-investing-in-a-custom-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/whats-involved-in-working-with-an-expert-to-build-a-chatbot.html',
        destination:
          '/novice-to-navigator/whats-involved-in-working-with-an-expert-to-build-a-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-i-get-my-own-custom-ai-chatbot.html',
        destination:
          '/novice-to-navigator/how-do-i-get-my-own-custom-ai-chatbot',
        permanent: true,
      },
      // --- 2026 site rebuild: old IA -> new IA ---
      { source: '/about', destination: '/story', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
      {
        source: '/projects/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      // Duplicate/near-duplicate "doorway" service pages collapsed to one canonical page each
      {
        source: '/services/ai-consultant',
        destination: '/services/ai-consulting',
        permanent: true,
      },
      {
        source: '/services/ai-expert',
        destination: '/services/ai-consulting',
        permanent: true,
      },
      {
        source: '/services/ai-solutions',
        destination: '/services/ai-services',
        permanent: true,
      },
      {
        source: '/services/ai-business',
        destination: '/services/ai-services',
        permanent: true,
      },
      // Retired post — availability now lives on /hire-me rather than a narrative blog post.
      {
        source: '/blog/why-im-leaving-a-job-i-liked',
        destination: '/hire-me',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
