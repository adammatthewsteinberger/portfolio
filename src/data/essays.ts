/**
 * The /essays section: one source for its path, content directory, and the
 * copy that describes it. The page metadata, the chat bot's knowledge base
 * (essaysChunk() in kb-sources.ts) and public/llms.txt all read it, so they
 * cannot drift. The essays are personal writing, kept apart from the
 * engineering blog and deliberately not one of the six tracks.
 */
export const ESSAYS_PATH = '/essays';
export const ESSAYS_DIR = 'src/content/essays';
export const ESSAYS_FEED_PATH = '/essays/feed.xml';

export const essaysSection = {
  title: 'Essays',
  description:
    'Essays on faith, autism and neurodiversity, science, and technology, written from where those interests overlap.',
  intro:
    'Essays on faith, neurodiversity, science, and technology, written from the place where those interests overlap. They sit apart from the engineering work on the rest of this site; that writing lives on the blog.',
  /** What the chat bot may say about them: what they are, and what they are not. */
  botNote:
    'They are personal writing, separate from the engineering blog, and are not technical documentation or professional claims.',
} as const;
