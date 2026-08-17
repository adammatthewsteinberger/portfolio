'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';

interface Factor {
  id: string;
  label: string;
  question: string;
}

interface Pillar {
  name: string;
  factors: Factor[];
}

const pillars: Pillar[] = [
  {
    name: 'Organizational',
    factors: [
      { id: 'org-leadership', label: 'Leadership Commitment', question: 'Does leadership actively support this project, not just tolerate it?' },
      { id: 'org-use-case', label: 'Clear Use Case', question: 'Can you state, in one sentence, the specific problem the chatbot solves?' },
      { id: 'org-budget', label: 'Budgeting', question: 'Is there a realistic budget set aside for build, launch, and ongoing maintenance?' },
      { id: 'org-skills', label: 'Internal Skills', question: 'Does someone internally understand the system well enough to maintain it long-term?' },
      { id: 'org-buyin', label: 'User Buy-In', question: 'Have the people who will actually use this been consulted, not just told?' },
    ],
  },
  {
    name: 'Technical',
    factors: [
      { id: 'tech-infra', label: 'Infrastructure', question: 'Do you have (or a plan for) the hosting and infrastructure this needs?' },
      { id: 'tech-integration', label: 'System Integration', question: 'Do you know which existing systems this needs to connect to, and how?' },
      { id: 'tech-data-quality', label: 'Data Quality', question: 'Is the knowledge base content this will draw from accurate and current?' },
      { id: 'tech-scalability', label: 'Scalability', question: 'Have you thought about what happens if usage is 10x what you expect?' },
    ],
  },
  {
    name: 'Security & Compliance',
    factors: [
      { id: 'sec-privacy', label: 'Privacy & Security', question: 'Do you have a plan for data minimization, encryption, and access control?' },
      { id: 'sec-data-control', label: 'Data Control', question: 'Do you know exactly where the data this system touches will live?' },
      { id: 'sec-legal', label: 'Legal Compliance', question: 'Have you checked this against the regulations that apply to your industry?' },
      { id: 'sec-standards', label: 'Industry-Specific Standards', question: 'Are there sector-specific standards (HIPAA, PCI, SOC 2) this needs to meet?' },
    ],
  },
  {
    name: 'Operational',
    factors: [
      { id: 'ops-ux', label: 'UX Design', question: 'Has someone thought through the actual conversation flow a user will experience?' },
      { id: 'ops-monitoring', label: 'Monitoring & Maintenance', question: 'Is there a plan for who watches this after launch, and how often it gets updated?' },
    ],
  },
];

type Answer = 'no' | 'partial' | 'yes' | null;

const SCORE: Record<Exclude<Answer, null>, number> = { no: 0, partial: 0.5, yes: 1 };

export function ReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResults, setShowResults] = useState(false);

  const allFactors = useMemo(() => pillars.flatMap((p) => p.factors), []);
  const answeredCount = allFactors.filter((f) => answers[f.id]).length;
  const complete = answeredCount === allFactors.length;

  const pillarScores = pillars.map((pillar) => {
    const total = pillar.factors.length;
    const scored = pillar.factors.reduce((sum, f) => {
      const a = answers[f.id];
      return sum + (a ? SCORE[a] : 0);
    }, 0);
    return { name: pillar.name, pct: Math.round((scored / total) * 100) };
  });

  const overallPct = Math.round(
    pillarScores.reduce((sum, p) => sum + p.pct, 0) / pillarScores.length
  );

  const weakest = [...pillarScores].sort((a, b) => a.pct - b.pct)[0];

  const setAnswer = (id: string, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submit = () => {
    setShowResults(true);
    track('readiness_quiz_completed', { overall: overallPct, weakest: weakest.name });
  };

  const reset = () => {
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Your Readiness Score: {overallPct}%
        </h3>
        <p className="text-[var(--color-text-muted)] mb-6">
          Your weakest area is <strong className="text-[var(--color-text-primary)]">{weakest.name}</strong> at {weakest.pct}%. That&apos;s where a chatbot deployment is most likely to fail — not the technology.
        </p>
        <div className="space-y-3 mb-8 text-left">
          {pillarScores.map((p) => (
            <div key={p.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--color-text-primary)] font-medium">{p.name}</span>
                <span className="text-[var(--color-text-muted)]">{p.pct}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-dark-card-alt)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-accent-blue)] rounded-full"
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Talk Through Your Score
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-dark-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] font-bold rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {pillars.map((pillar) => (
        <div key={pillar.name}>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">{pillar.name}</h3>
          <div className="space-y-4">
            {pillar.factors.map((factor) => (
              <div
                key={factor.id}
                className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-4"
              >
                <p className="text-[var(--color-text-primary)] font-medium mb-3">{factor.question}</p>
                <div className="flex gap-2">
                  {(['no', 'partial', 'yes'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAnswer(factor.id, value)}
                      aria-pressed={answers[factor.id] === value}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
                        answers[factor.id] === value
                          ? 'bg-[var(--color-accent-blue)] text-white'
                          : 'bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {answeredCount} of {allFactors.length} answered
        </p>
        <button
          type="button"
          disabled={!complete}
          onClick={submit}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] disabled:opacity-40 disabled:cursor-not-allowed font-bold rounded-lg transition-colors"
          style={{ color: '#ffffff' }}
        >
          See My Score
        </button>
      </div>
    </div>
  );
}
