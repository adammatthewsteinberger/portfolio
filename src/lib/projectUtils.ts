import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectContent {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  heroTitle: string;
  heroSubtitle: string;
  technologies: string[];
  duration: string;
  status: string;
  challenge: string;
  solution: string;
  results: string;
  techStack: string;
  architecture: string;
  lessons: string;
  /** Executive-edition fields (optional). A study gets a /for-executives/work page only when both are present. */
  execProblem?: string;
  execOutcome?: string;
  content: string;
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
    const fullPath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      category: data.category,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      technologies: data.technologies || [],
      duration: data.duration,
      status: data.status,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      techStack: data.techStack,
      architecture: data.architecture,
      lessons: data.lessons,
      execProblem: data.execProblem,
      execOutcome: data.execOutcome,
      content
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading project slugs:', error);
    return [];
  }
}

export function getAllProjects(): ProjectContent[] {
  // getAllProjectSlugs() and getProjectBySlug() each already catch and log
  // their own filesystem/parse errors (returning [] / null respectively),
  // so there is no error path left for this function itself to guard.
  const slugs = getAllProjectSlugs();
  const projects: ProjectContent[] = [];

  for (const slug of slugs) {
    const project = getProjectBySlug(slug);
    if (project) {
      projects.push(project);
    }
  }

  return projects.sort((a, b) => a.title.localeCompare(b.title));
}
/**
 * Case studies that carry both executive-edition fields, in the order of
 * src/data/projects.ts. By construction an exec case-study page cannot exist
 * without its engineering counterpart — the source file is the same one.
 */
export function getExecProjects(): ProjectContent[] {
  return getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is ProjectContent => Boolean(project && project.execProblem && project.execOutcome));
}
