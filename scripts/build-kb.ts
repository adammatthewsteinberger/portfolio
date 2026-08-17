import fs from 'fs';
import path from 'path';
import { getAllProjects, getProjectBySlug } from '../src/lib/projectUtils';
import { getAllBlogPosts } from '../src/lib/blogUtils';
import { kbSources, type KBSource } from '../src/data/kb-sources';

export interface KBChunk {
  id: string;
  url: string;
  title: string;
  section: string;
  text: string;
}

const MAX_CHUNK_CHARS = 900;

function chunkText(text: string): string[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if (current && (current.length + paragraph.length + 2) > MAX_CHUNK_CHARS) {
      chunks.push(current);
      current = paragraph;
    } else {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }
  if (current) chunks.push(current);

  return chunks.length > 0 ? chunks : [text];
}

function chunkSource(source: KBSource): KBChunk[] {
  return chunkText(source.text).map((text, index) => ({
    id: `${source.id}-${index}`,
    url: source.url,
    title: source.title,
    section: source.section,
    text,
  }));
}

function buildProjectChunks(): KBChunk[] {
  const chunks: KBChunk[] = [];
  for (const summary of getAllProjects()) {
    const project = getProjectBySlug(summary.slug);
    if (!project) continue;

    const overview = [
      `${project.title} — ${project.subtitle}`,
      `Category: ${project.category}. Duration: ${project.duration}. Status: ${project.status}.`,
      `Technologies: ${project.technologies.join(', ')}.`,
      `Challenge: ${project.challenge}`,
      `Solution: ${project.solution}`,
      `Results: ${project.results}`,
    ].join('\n\n');

    const source: KBSource = {
      id: `project-${project.slug}`,
      url: `/work/${project.slug}`,
      title: project.title,
      section: 'Case study',
      text: overview,
    };
    chunks.push(...chunkSource(source));
  }
  return chunks;
}

function buildBlogChunks(): KBChunk[] {
  const chunks: KBChunk[] = [];
  const posts = getAllBlogPosts()
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 12);

  for (const post of posts) {
    const source: KBSource = {
      id: `blog-${post.slug}`,
      url: `/blog/${post.slug}`,
      title: post.title,
      section: 'Blog post',
      text: `${post.title}\n\n${post.description}\n\n${post.content}`,
    };
    chunks.push(...chunkSource(source));
  }
  return chunks;
}

function main(): void {
  const staticChunks = kbSources.flatMap(chunkSource);
  const projectChunks = buildProjectChunks();
  const blogChunks = buildBlogChunks();

  const allChunks = [...staticChunks, ...projectChunks, ...blogChunks];

  const outDir = path.join(process.cwd(), 'src/generated');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'kb.json'),
    JSON.stringify(allChunks, null, 2),
  );

  console.log(`Wrote ${allChunks.length} chunks to src/generated/kb.json`);
  console.log(`  static: ${staticChunks.length}, projects: ${projectChunks.length}, blog: ${blogChunks.length}`);
}

main();
