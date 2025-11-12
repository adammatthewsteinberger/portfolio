export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryDescription: string;
  order: number;
  heroTitle?: string;
  heroSubtitle?: string;
  technologies?: string[];
  duration?: string;
  status?: 'completed' | 'ongoing' | 'archived';
  featured?: boolean;
}

export const projects: Project[] = [
  // AI Solutions Projects
  {
    slug: 'enterprise-ai-payroll-processor',
    title: 'AI Payroll Processor (GPT-5)',
    description: 'Complete redesign of automated payroll processing system using Azure microservices and RAG architecture',
    category: 'AI Solutions',
    categoryDescription: 'Enterprise AI implementations and automation systems',
    order: 1,
    heroTitle: 'AI Payroll Processor (GPT-5)',
    heroSubtitle: 'Azure-Based Microservices with RAG Pipeline',
    technologies: ['GPT-5', 'Azure Service Bus', 'RAG', 'Microsoft Graph API', 'Python', 'Microservices'],
    duration: '45 days',
    status: 'completed',
    featured: true,
  },
  {
    slug: 'self-hosted-rag-chatbot',
    title: 'Self-Hosted RAG Chatbot (Mistral-7B)',
    description: 'Privacy-first RAG system using self-hosted Mistral-7B with FAISS vector search for non-profit client',
    category: 'AI Solutions',
    categoryDescription: 'Enterprise AI implementations and automation systems',
    order: 2,
    heroTitle: 'Self-Hosted RAG Chatbot (Mistral-7B)',
    heroSubtitle: 'Privacy-First AI with Local Infrastructure',
    technologies: ['Mistral-7B', 'FAISS', 'vLLM', 'Docker', 'Grafana', 'Prometheus'],
    duration: '30 days',
    status: 'completed',
    featured: true,
  },
  {
    slug: 'cloud-rag-chatbot-gemini',
    title: 'Cloud RAG Chatbot (Gemini)',
    description: 'Cloud-based RAG system with Gemini LLM, web search integration, and responsive interface for sales agency',
    category: 'AI Solutions',
    categoryDescription: 'Enterprise AI implementations and automation systems',
    order: 3,
    heroTitle: 'Cloud RAG Chatbot (Gemini)',
    heroSubtitle: 'Sales-Optimized AI with Web Search Integration',
    technologies: ['Gemini', 'RAG', 'Web Search API', 'React', 'JSON Storage'],
    duration: '30 days',
    status: 'completed',
    featured: true,
  },
  {
    slug: 'godfocus-push-notifications',
    title: 'GodFocus Push Notifications',
    description: 'Production-ready Web Push notification system with TDD, delivering 85% test coverage in 5 billable hours using AI-assisted development',
    category: 'AI Solutions',
    categoryDescription: 'Enterprise AI implementations and automation systems',
    order: 4,
    heroTitle: 'GodFocus Push Notifications',
    heroSubtitle: 'Enterprise-Grade Push System with TDD & AI-Assisted Development',
    technologies: ['TypeScript', 'Deno', 'Supabase', 'Web Push API', 'Service Workers', 'Playwright', 'Vitest'],
    duration: '5 hours',
    status: 'completed',
    featured: true,
  },
  // Enterprise Development Projects
  {
    slug: 'lima-one-microservices-suite',
    title: 'Enterprise Microservices Suite',
    description: 'NestJS microservices architecture with PostgreSQL for mortgage broker platform at Lima One Capital',
    category: 'Enterprise Development',
    categoryDescription: 'Large-scale enterprise software development and architecture',
    order: 5,
    heroTitle: 'Enterprise Microservices Suite',
    heroSubtitle: 'NestJS & PostgreSQL Architecture for Financial Services',
    technologies: ['NestJS', 'PostgreSQL', 'gRPC', 'REST APIs', '.NET', 'ReactJS'],
    duration: '2 years',
    status: 'completed',
    featured: false,
  },
  {
    slug: 'enterprise-etl-integrations',
    title: 'Enterprise ETL & API Integrations',
    description: 'Multiple ETL pipelines connecting HubSpot, SharePoint, Snowflake, and Salesforce for automated data flow',
    category: 'Enterprise Development',
    categoryDescription: 'Large-scale enterprise software development and architecture',
    order: 6,
    heroTitle: 'Enterprise ETL & API Integrations',
    heroSubtitle: 'Automated Data Flow Across Enterprise Systems',
    technologies: ['ETL', 'HubSpot API', 'SharePoint', 'Snowflake', 'Salesforce', 'Python'],
    duration: '18 months',
    status: 'completed',
    featured: false,
  },
  // System Modernization
  {
    slug: 'snow-portal-job-scheduler',
    title: 'Snow Portal Job Scheduling System',
    description: 'Custom job scheduling system for Snowflake as an Alteryx alternative with automated workflows',
    category: 'System Modernization',
    categoryDescription: 'Legacy system migrations and modern architecture implementations',
    order: 7,
    heroTitle: 'Snow Portal Job Scheduling System',
    heroSubtitle: 'Snowflake Automation & Workflow Management',
    technologies: ['Snowflake', 'Job Scheduling', 'Automation', 'Python', 'APIs'],
    duration: '6 months',
    status: 'completed',
    featured: false,
  },
  {
    slug: 'chosen-people-answers-architecture',
    title: 'Chosen People Answers Code Review & Architecture',
    description: 'Comprehensive codebase analysis and Onion Architecture refactor plan for AI-built digital missions platform',
    category: 'System Modernization',
    categoryDescription: 'Legacy system migrations and modern architecture implementations',
    order: 8,
    heroTitle: 'Chosen People Answers Code Review & Architecture',
    heroSubtitle: 'Expert Analysis & Refactor Roadmap for Digital Missions Platform',
    technologies: ['React', 'Deno', 'TypeScript', 'Supabase', 'Vite', 'Code Review', 'Architecture Design'],
    duration: '10 hours',
    status: 'completed',
    featured: false,
  },
];

export const projectCategories = [
  'AI Solutions',
  'Enterprise Development',
  'System Modernization',
];