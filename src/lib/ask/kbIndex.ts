import MiniSearch from 'minisearch';
import kb from '@/generated/kb.json';

export interface KBChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  text: string;
}

const chunks = kb as KBChunk[];

let index: MiniSearch<KBChunk> | null = null;

function getIndex(): MiniSearch<KBChunk> {
  if (!index) {
    index = new MiniSearch<KBChunk>({
      idField: 'id',
      fields: ['title', 'section', 'text'],
      storeFields: ['url', 'title', 'section', 'text'],
      searchOptions: { boost: { title: 2, section: 1.5 }, fuzzy: 0.2, prefix: true },
    });
    index.addAll(chunks);
  }
  return index;
}

export function retrieveContext(query: string, topK = 5): KBChunk[] {
  const results = getIndex().search(query);
  return results.slice(0, topK).map((result) => ({
    id: String(result.id),
    url: result.url as string,
    title: result.title as string,
    section: result.section as string,
    text: result.text as string,
  }));
}
