import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import JoinMePage, { metadata } from '../page';
import { academiaItems, getStartedSteps, governmentClaims, helpWanted } from '@/data/audiences';
import { quickstart } from '@/data/quickstart';

describe('/join-me', () => {
  it('leads with the invitation to developers and jumps to the three sections in priority order', () => {
    render(<JoinMePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Join Me');
    expect(screen.getByText(/looking for developers to help build/i)).toBeInTheDocument();
    expect(screen.getByText(/Greenville-remote or US-remote volunteers are welcome/i)).toBeInTheDocument();
    const jump = screen.getByRole('navigation', { name: 'Sections on this page' });
    expect(within(jump).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      '#developers',
      '#governments',
      '#academia',
    ]);
    expect(screen.getAllByRole('link', { name: /adam@matthewsteinberger\.com/i })[0]).toHaveAttribute(
      'href',
      'mailto:adam@matthewsteinberger.com',
    );
  });

  it('renders the three sections in order, each labelled by its heading', () => {
    render(<JoinMePage />);
    const sections = ['developers', 'governments', 'academia'].map((id) => document.getElementById(id)!);
    for (const section of sections) {
      expect(section).not.toBeNull();
      expect(section.getAttribute('aria-labelledby')).toBe(`${section.id}-heading`);
    }
    expect(sections[0].compareDocumentPosition(sections[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(sections[1].compareDocumentPosition(sections[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual(['Help build vibey', 'Governments and military', 'Universities and academia']);
  });

  it('gives developers a concrete path: every step, its commands, and the quickstart', () => {
    render(<JoinMePage />);
    const developers = document.getElementById('developers')!;
    for (const step of getStartedSteps) {
      expect(within(developers).getByText(step.title)).toBeInTheDocument();
      for (const cmd of step.commands) expect(developers.textContent).toContain(cmd);
      for (const link of step.links) {
        expect(within(developers).getAllByRole('link', { name: link.label })[0]).toHaveAttribute('href', link.href);
      }
    }
    for (const step of quickstart) expect(within(developers).getByText(step.cmd)).toBeInTheDocument();
    for (const item of helpWanted) expect(within(developers).getByText(item.title)).toBeInTheDocument();
    // Inline code in the step copy renders as <code>.
    expect(within(developers).getByText('VIBEY_TEST_DATABASE_URL').tagName).toBe('CODE');
  });

  it('states what vibey offers governments, with sources, official channels, and no claimed customers', () => {
    render(<JoinMePage />);
    const gov = document.getElementById('governments')!;
    for (const claim of governmentClaims) {
      expect(within(gov).getByText(claim.title)).toBeInTheDocument();
      expect(within(gov).getAllByRole('link', { name: `${claim.source.label} →` })[0]).toHaveAttribute('href', claim.source.href);
    }
    expect(gov.textContent).toMatch(/claims no government or military customer, contract, clearance, accreditation,\s+or endorsement/);
    expect(gov.textContent).toMatch(/official channels/i);
  });

  it('gives academia the paper, the book, the citation file, and no claimed affiliation', () => {
    render(<JoinMePage />);
    const academia = document.getElementById('academia')!;
    expect(within(academia).getByRole('link', { name: 'The paper (PDF)' })).toHaveAttribute('href', 'https://the-vibey-project.github.io/vibey/main/paper.pdf');
    expect(within(academia).getByRole('link', { name: 'The paper (HTML)' })).toHaveAttribute('href', 'https://the-vibey-project.github.io/vibey/main/paper/');
    expect(within(academia).getByRole('link', { name: 'The book (PDF)' })).toHaveAttribute('href', 'https://the-vibey-project.github.io/vibey/main/book.pdf');
    for (const item of academiaItems) expect(within(academia).getByText(item.title)).toBeInTheDocument();
    expect(academia.textContent).toMatch(/claims no institutional affiliation or endorsement/);
  });

  it('opens every external link safely in a new tab', () => {
    render(<JoinMePage />);
    for (const a of Array.from(document.querySelectorAll('a[target="_blank"]'))) {
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });

  it('never states a package count, never asks to be hired, and is self-canonical', () => {
    render(<JoinMePage />);
    expect(document.body.textContent).not.toMatch(/\b(seven|eight|nine)\s+packages/i);
    expect(document.body.textContent).not.toMatch(/hire me|résumé|available (from|now|for)/i);
    expect(document.querySelector('a[href="/hire-me"]')).toBeNull();
    expect(metadata.alternates?.canonical).toBe('/join-me');
    expect(metadata.title).toBe('Join Me — Help Build vibey');
  });
});
