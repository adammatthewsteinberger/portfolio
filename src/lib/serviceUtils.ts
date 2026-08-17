import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ServiceContent {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  heroTitle: string;
  heroSubtitle: string;
  whyChoose: string;
  choice1Title: string;
  choice1Icon: string;
  choice1Description: string;
  choice2Title: string;
  choice2Icon: string;
  choice2Description: string;
  choice3Title: string;
  choice3Icon: string;
  choice3Description: string;
  featuresOffered: string;
  feature1Icon: string;
  feature1Title: string;
  feature1Description: string;
  feature2Icon: string;
  feature2Title: string;
  feature2Description: string;
  feature3Icon: string;
  feature3Title: string;
  feature3Description: string;
  feature4Icon: string;
  feature4Title: string;
  feature4Description: string;
  feature5Icon: string;
  feature5Title: string;
  feature5Description: string;
  feature6Icon: string;
  feature6Title: string;
  feature6Description: string;
  feature7Icon: string;
  feature7Title: string;
  feature7Description: string;
  feature8Icon: string;
  feature8Title: string;
  feature8Description: string;
  feature9Icon: string;
  feature9Title: string;
  feature9Description: string;
  feature10Icon: string;
  feature10Title: string;
  feature10Description: string;
  contentTitle: string;
  content: string;
}

export function getServiceBySlug(slug: string): ServiceContent | null {
  try {
    const servicesDirectory = path.join(process.cwd(), 'src/content/services');
    const fullPath = path.join(servicesDirectory, `${slug}.md`);
    
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
      whyChoose: data.whyChoose,
      choice1Title: data.choice1Title,
      choice1Icon: data.choice1Icon,
      choice1Description: data.choice1Description,
      choice2Title: data.choice2Title,
      choice2Icon: data.choice2Icon,
      choice2Description: data.choice2Description,
      choice3Title: data.choice3Title,
      choice3Icon: data.choice3Icon,
      choice3Description: data.choice3Description,
      featuresOffered: data.featuresOffered,
      feature1Icon: data.feature1Icon,
      feature1Title: data.feature1Title,
      feature1Description: data.feature1Description,
      feature2Icon: data.feature2Icon,
      feature2Title: data.feature2Title,
      feature2Description: data.feature2Description,
      feature3Icon: data.feature3Icon, 
      feature3Title: data.feature3Title,
      feature3Description: data.feature3Description,
      feature4Icon: data.feature4Icon,
      feature4Title: data.feature4Title,
      feature4Description: data.feature4Description,
      feature5Icon: data.feature5Icon,
      feature5Title: data.feature5Title,
      feature5Description: data.feature5Description,
      feature6Icon: data.feature6Icon,
      feature6Title: data.feature6Title,
      feature6Description: data.feature6Description,
      feature7Icon: data.feature7Icon,
      feature7Title: data.feature7Title,
      feature7Description: data.feature7Description,
      feature8Icon: data.feature8Icon,
      feature8Title: data.feature8Title,
      feature8Description: data.feature8Description,
      feature9Icon: data.feature9Icon,
      feature9Title: data.feature9Title,
      feature9Description: data.feature9Description,
      feature10Icon: data.feature10Icon,
      feature10Title: data.feature10Title,
      feature10Description: data.feature10Description,
      contentTitle: data.contentTitle,
      content
    };
  } catch (error) {
    console.error(`Error reading service ${slug}:`, error);
    return null;
  }
}

export function getAllServiceSlugs(): string[] {
  try {
    const servicesDirectory = path.join(process.cwd(), 'src/content/services');
    
    if (!fs.existsSync(servicesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(servicesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading service slugs:', error);
    return [];
  }
}

export function getAllServices(): ServiceContent[] {
  // getAllServiceSlugs() and getServiceBySlug() each already catch and log
  // their own filesystem/parse errors (returning [] / null respectively),
  // so there is no error path left for this function itself to guard.
  const slugs = getAllServiceSlugs();
  const services: ServiceContent[] = [];

  for (const slug of slugs) {
    const service = getServiceBySlug(slug);
    if (service) {
      services.push(service);
    }
  }

  return services.sort((a, b) => a.title.localeCompare(b.title));
}

// Lightweight function to get only metadata (for generateMetadata)
export function getServiceMetadata(slug: string): Pick<ServiceContent, 'title' | 'subtitle' | 'description' | 'category'> | null {
  try {
    const servicesDirectory = path.join(process.cwd(), 'src/content/services');
    const fullPath = path.join(servicesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      category: data.category,
    };
  } catch (error) {
    console.error(`Error reading service metadata ${slug}:`, error);
    return null;
  }
} 