export interface Article {
  slug: string;
  title: string;
  description: string;
  section: string;
  sectionDescription: string;
  order: number;
}

export const articles: Article[] = [
  {
    slug: 'what-is-ai-really',
    title: 'What is AI, really?',
    description: 'Define AI, dispel myths, and explain its role in modern business technology.',
    section: 'Understanding the Basics of AI',
    sectionDescription: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    order: 1
  },
  {
    slug: 'what-are-the-different-types-of-ai-systems',
    title: 'What are the different types of AI systems?',
    description: 'Introduce narrow AI, general AI, and examples like conversational AI for business.',
    section: 'Understanding the Basics of AI',
    sectionDescription: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    order: 2
  },
  {
    slug: 'whats-the-difference-between-ai-machine-learning-and-deep-learning',
    title: 'What\'s the difference between AI, machine learning, and deep learning?',
    description: 'Clarify these terms with analogies and practical business examples.',
    section: 'Understanding the Basics of AI',
    sectionDescription: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    order: 3
  },
  {
    slug: 'how-does-ai-learn-from-data',
    title: 'How does AI learn from data?',
    description: 'Explain training, datasets, and the concept of "learning" in AI for business applications.',
    section: 'Understanding the Basics of AI',
    sectionDescription: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    order: 4
  },
  {
    slug: 'what-is-prompt-engineering-and-why-is-it-important',
    title: 'What is prompt engineering, and why is it important?',
    description: 'Cover how prompts shape AI responses and their role in business chatbot effectiveness.',
    section: 'Understanding the Basics of AI',
    sectionDescription: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    order: 5
  },
  {
    slug: 'what-is-a-chatbot-and-how-does-it-work',
    title: 'What is a chatbot and how does it work?',
    description: 'Define chatbots, explain their basic functioning, and differentiate from human interactions.',
    section: 'Understanding Chatbots',
    sectionDescription: 'Goal: Understand what chatbots are and how they function in business contexts.',
    order: 6
  },
  {
    slug: 'how-do-chatbots-understand-human-language',
    title: 'How do chatbots understand human language?',
    description: 'Explain natural language processing, intent recognition, and context understanding.',
    section: 'Understanding Chatbots',
    sectionDescription: 'Goal: Understand what chatbots are and how they function in business contexts.',
    order: 7
  },
  {
    slug: 'why-do-some-chatbots-perform-better-than-others',
    title: 'Why do some chatbots perform better than others?',
    description: 'Cover training data quality, model selection, and implementation factors.',
    section: 'Understanding Chatbots',
    sectionDescription: 'Goal: Understand what chatbots are and how they function in business contexts.',
    order: 8
  },
  {
    slug: 'what-makes-a-chatbot-valuable-for-businesses',
    title: 'What makes a chatbot valuable for businesses?',
    description: 'Discuss ROI, efficiency gains, customer satisfaction, and competitive advantages.',
    section: 'Understanding Chatbots',
    sectionDescription: 'Goal: Understand what chatbots are and how they function in business contexts.',
    order: 9
  },
  {
    slug: 'can-chatbots-replace-human-roles-in-certain-tasks',
    title: 'Can chatbots replace human roles in certain tasks?',
    description: 'Address automation concerns, human-AI collaboration, and task-specific applications.',
    section: 'Understanding Chatbots',
    sectionDescription: 'Goal: Understand what chatbots are and how they function in business contexts.',
    order: 10
  },
  {
    slug: 'what-is-retrieval-augmented-generation-rag',
    title: 'What is Retrieval Augmented Generation (RAG)?',
    description: 'Explain RAG technology and its importance for business-specific AI solutions.',
    section: 'Advanced AI Concepts',
    sectionDescription: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    order: 11
  },
  {
    slug: 'why-doesnt-ai-just-know-everything',
    title: 'Why doesn\'t AI just know everything?',
    description: 'Explain AI limitations, training data constraints, and the need for specialized knowledge.',
    section: 'Advanced AI Concepts',
    sectionDescription: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    order: 12
  },
  {
    slug: 'how-does-a-rag-chatbot-use-my-specific-data',
    title: 'How does a RAG chatbot use my specific data?',
    description: 'Detail the process of integrating business-specific information into AI systems.',
    section: 'Advanced AI Concepts',
    sectionDescription: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    order: 13
  },
  {
    slug: 'what-is-a-vector-database-and-why-is-it-used-in-rag',
    title: 'What is a vector database and why is it used in RAG?',
    description: 'Explain vector databases, embeddings, and their role in RAG systems.',
    section: 'Advanced AI Concepts',
    sectionDescription: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    order: 14
  },
  {
    slug: 'what-are-embeddings-and-how-do-they-help-chatbots',
    title: 'What are embeddings and how do they help chatbots?',
    description: 'Cover semantic understanding, similarity matching, and context retrieval.',
    section: 'Advanced AI Concepts',
    sectionDescription: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    order: 15
  },
  {
    slug: 'how-do-you-start-building-a-custom-ai-chatbot',
    title: 'How do you start building a custom AI chatbot?',
    description: 'Outline the initial steps, requirements gathering, and planning process.',
    section: 'Building Custom Solutions',
    sectionDescription: 'Goal: Understand the process of creating custom AI solutions for your business.',
    order: 16
  },
  {
    slug: 'what-technologies-power-a-rag-chatbot',
    title: 'What technologies power a RAG chatbot?',
    description: 'Cover the technical stack, APIs, databases, and infrastructure requirements.',
    section: 'Building Custom Solutions',
    sectionDescription: 'Goal: Understand the process of creating custom AI solutions for your business.',
    order: 17
  },
  {
    slug: 'how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers',
    title: 'How do you ensure a chatbot gives accurate and relevant answers?',
    description: 'Discuss quality control, testing, and validation methods.',
    section: 'Building Custom Solutions',
    sectionDescription: 'Goal: Understand the process of creating custom AI solutions for your business.',
    order: 18
  },
  {
    slug: 'can-a-chatbot-integrate-with-my-existing-systems',
    title: 'Can a chatbot integrate with my existing systems?',
    description: 'Cover API integration, data synchronization, and workflow automation.',
    section: 'Building Custom Solutions',
    sectionDescription: 'Goal: Understand the process of creating custom AI solutions for your business.',
    order: 19
  },
  {
    slug: 'is-building-a-custom-chatbot-expensive-or-time-intensive',
    title: 'Is building a custom chatbot expensive or time-intensive?',
    description: 'Address cost considerations, timelines, and ROI expectations.',
    section: 'Building Custom Solutions',
    sectionDescription: 'Goal: Understand the process of creating custom AI solutions for your business.',
    order: 20
  },
  {
    slug: 'can-ai-chatbots-give-incorrect-or-made-up-answers',
    title: 'Can AI chatbots give incorrect or made-up answers?',
    description: 'Explain hallucination, fact-checking, and accuracy measures.',
    section: 'Quality and Safety',
    sectionDescription: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    order: 21
  },
  {
    slug: 'how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses',
    title: 'How do you prevent a chatbot from giving harmful or off-brand responses?',
    description: 'Cover content filtering, brand guidelines, and safety measures.',
    section: 'Quality and Safety',
    sectionDescription: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    order: 22
  },
  {
    slug: 'is-my-business-data-safe-when-using-a-chatbot',
    title: 'Is my business data safe when using a chatbot?',
    description: 'Address data security, privacy, and compliance concerns.',
    section: 'Quality and Safety',
    sectionDescription: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    order: 23
  },
  {
    slug: 'can-competitors-exploit-my-chatbots-knowledge-base',
    title: 'Can competitors exploit my chatbot\'s knowledge base?',
    description: 'Discuss data protection, access controls, and competitive security.',
    section: 'Quality and Safety',
    sectionDescription: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    order: 24
  },
  {
    slug: 'how-do-you-evaluate-a-chatbots-performance',
    title: 'How do you evaluate a chatbot\'s performance?',
    description: 'Cover metrics, testing methods, and continuous improvement.',
    section: 'Quality and Safety',
    sectionDescription: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    order: 25
  },
  {
    slug: 'what-industries-are-using-ai-chatbots-effectively',
    title: 'What industries are using AI chatbots effectively?',
    description: 'Showcase successful implementations across different business sectors.',
    section: 'Business Applications',
    sectionDescription: 'Goal: See real-world applications and understand industry-specific use cases.',
    order: 26
  },
  {
    slug: 'how-can-a-chatbot-increase-revenue-or-reduce-costs',
    title: 'How can a chatbot increase revenue or reduce costs?',
    description: 'Provide specific examples of ROI and business impact.',
    section: 'Business Applications',
    sectionDescription: 'Goal: See real-world applications and understand industry-specific use cases.',
    order: 27
  },
  {
    slug: 'can-chatbots-streamline-lead-generation-or-customer-onboarding',
    title: 'Can chatbots streamline lead generation or customer onboarding?',
    description: 'Cover automation opportunities and customer journey optimization.',
    section: 'Business Applications',
    sectionDescription: 'Goal: See real-world applications and understand industry-specific use cases.',
    order: 28
  },
  {
    slug: 'is-my-business-ready-for-an-ai-chatbot',
    title: 'Is my business ready for an AI chatbot?',
    description: 'Help readers assess their readiness and identify prerequisites.',
    section: 'Business Applications',
    sectionDescription: 'Goal: See real-world applications and understand industry-specific use cases.',
    order: 29
  },
  {
    slug: 'what-if-my-business-has-limited-content-or-data',
    title: 'What if my business has limited content or data?',
    description: 'Address common concerns about data requirements and content creation.',
    section: 'Business Applications',
    sectionDescription: 'Goal: See real-world applications and understand industry-specific use cases.',
    order: 30
  },
  {
    slug: 'what-should-i-consider-before-investing-in-a-custom-chatbot',
    title: 'What should I consider before investing in a custom chatbot?',
    description: 'Provide a comprehensive checklist for decision-making.',
    section: 'Working with Experts',
    sectionDescription: 'Goal: Learn how to work effectively with AI experts and make informed decisions.',
    order: 31
  },
  {
    slug: 'whats-involved-in-working-with-an-expert-to-build-a-chatbot',
    title: 'What\'s involved in working with an expert to build a chatbot?',
    description: 'Outline the collaboration process, timelines, and expectations.',
    section: 'Working with Experts',
    sectionDescription: 'Goal: Learn how to work effectively with AI experts and make informed decisions.',
    order: 32
  },
  {
    slug: 'how-do-i-get-my-own-custom-ai-chatbot',
    title: 'How do I get my own custom AI chatbot?',
    description: 'The three ways to get a custom chatbot — build it, have it built, or start on a platform — and how to choose.',
    section: 'Working with Experts',
    sectionDescription: 'Goal: Learn how to work effectively with AI experts and make informed decisions.',
    order: 33
  }
];

export const sections = [
  {
    title: 'Understanding the Basics of AI',
    description: 'Goal: Demystify AI and establish foundational knowledge to evaluate AI solutions confidently.',
    articles: articles.filter(article => article.section === 'Understanding the Basics of AI')
  },
  {
    title: 'Understanding Chatbots',
    description: 'Goal: Understand what chatbots are and how they function in business contexts.',
    articles: articles.filter(article => article.section === 'Understanding Chatbots')
  },
  {
    title: 'Advanced AI Concepts',
    description: 'Goal: Understand advanced AI technologies that power modern business chatbots.',
    articles: articles.filter(article => article.section === 'Advanced AI Concepts')
  },
  {
    title: 'Building Custom Solutions',
    description: 'Goal: Understand the process of creating custom AI solutions for your business.',
    articles: articles.filter(article => article.section === 'Building Custom Solutions')
  },
  {
    title: 'Quality and Safety',
    description: 'Goal: Understand how to evaluate and ensure quality in AI chatbot solutions.',
    articles: articles.filter(article => article.section === 'Quality and Safety')
  },
  {
    title: 'Business Applications',
    description: 'Goal: See real-world applications and understand industry-specific use cases.',
    articles: articles.filter(article => article.section === 'Business Applications')
  },
  {
    title: 'Working with Experts',
    description: 'Goal: Learn how to work effectively with AI experts and make informed decisions.',
    articles: articles.filter(article => article.section === 'Working with Experts')
  }
]; 