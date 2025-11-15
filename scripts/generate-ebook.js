const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const archiver = require('archiver');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// Define the Novice to Navigator articles in order
const noviceToNavigatorArticles = [
  'what-is-ai-really',
  'what-are-the-different-types-of-ai-systems',
  'whats-the-difference-between-ai-machine-learning-and-deep-learning',
  'how-does-ai-learn-from-data',
  'what-is-prompt-engineering-and-why-is-it-important',
  'what-is-a-chatbot-and-how-does-it-work',
  'how-do-chatbots-understand-human-language',
  'why-do-some-chatbots-perform-better-than-others',
  'what-makes-a-chatbot-valuable-for-businesses',
  'can-chatbots-replace-human-roles-in-certain-tasks',
  'what-is-retrieval-augmented-generation-rag',
  'why-doesnt-ai-just-know-everything',
  'how-does-a-rag-chatbot-use-my-specific-data',
  'what-is-a-vector-database-and-why-is-it-used-in-rag',
  'what-are-embeddings-and-how-do-they-help-chatbots',
  'how-do-you-start-building-a-custom-ai-chatbot',
  'what-technologies-power-a-rag-chatbot',
  'how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers',
  'can-a-chatbot-integrate-with-my-existing-systems',
  'is-building-a-custom-chatbot-expensive-or-time-intensive',
  'can-ai-chatbots-give-incorrect-or-made-up-answers',
  'how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses',
  'is-my-business-data-safe-when-using-a-chatbot',
  'can-competitors-exploit-my-chatbots-knowledge-base',
  'how-do-you-evaluate-a-chatbots-performance',
  'what-industries-are-using-ai-chatbots-effectively',
  'how-can-a-chatbot-increase-revenue-or-reduce-costs',
  'can-chatbots-streamline-lead-generation-or-customer-onboarding',
  'is-my-business-ready-for-an-ai-chatbot',
  'what-if-my-business-has-limited-content-or-data',
  'what-should-i-consider-before-investing-in-a-custom-chatbot',
  'whats-involved-in-working-with-an-expert-to-build-a-chatbot',
  'how-do-i-get-my-own-custom-ai-chatbot'
];

// Section titles for the table of contents
const sectionTitles = [
  'Understanding the Basics of AI',
  'Understanding Chatbots',
  'Advanced AI Concepts',
  'Building Custom Solutions',
  'Quality and Safety',
  'Business Applications',
  'Working with Experts'
];

// Section groupings
const sectionGroupings = [
  // Section 1: Understanding the Basics of AI
  ['what-is-ai-really', 'what-are-the-different-types-of-ai-systems', 'whats-the-difference-between-ai-machine-learning-and-deep-learning', 'how-does-ai-learn-from-data', 'what-is-prompt-engineering-and-why-is-it-important'],
  // Section 2: Understanding Chatbots
  ['what-is-a-chatbot-and-how-does-it-work', 'how-do-chatbots-understand-human-language', 'why-do-some-chatbots-perform-better-than-others', 'what-makes-a-chatbot-valuable-for-businesses', 'can-chatbots-replace-human-roles-in-certain-tasks'],
  // Section 3: Advanced AI Concepts
  ['what-is-retrieval-augmented-generation-rag', 'why-doesnt-ai-just-know-everything', 'how-does-a-rag-chatbot-use-my-specific-data', 'what-is-a-vector-database-and-why-is-it-used-in-rag', 'what-are-embeddings-and-how-do-they-help-chatbots'],
  // Section 4: Building Custom Solutions
  ['how-do-you-start-building-a-custom-ai-chatbot', 'what-technologies-power-a-rag-chatbot', 'how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers', 'can-a-chatbot-integrate-with-my-existing-systems', 'is-building-a-custom-chatbot-expensive-or-time-intensive'],
  // Section 5: Quality and Safety
  ['can-ai-chatbots-give-incorrect-or-made-up-answers', 'how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses', 'is-my-business-data-safe-when-using-a-chatbot', 'can-competitors-exploit-my-chatbots-knowledge-base', 'how-do-you-evaluate-a-chatbots-performance'],
  // Section 6: Business Applications
  ['what-industries-are-using-ai-chatbots-effectively', 'how-can-a-chatbot-increase-revenue-or-reduce-costs', 'can-chatbots-streamline-lead-generation-or-customer-onboarding', 'is-my-business-ready-for-an-ai-chatbot', 'what-if-my-business-has-limited-content-or-data'],
  // Section 7: Working with Experts
  ['what-should-i-consider-before-investing-in-a-custom-chatbot', 'whats-involved-in-working-with-an-expert-to-build-a-chatbot', 'how-do-i-get-my-own-custom-ai-chatbot']
];

// Book metadata
const bookMetadata = {
  title: 'Novice to Navigator',
  subtitle: 'Your Guide to AI Chatbots for Business',
  fullTitle: 'Novice to Navigator: Your Guide to AI Chatbots for Business',
  author: 'Adam Matthew Steinberger',
  authorBio: 'Adam Matthew Steinberger is an AI development expert specializing in custom chatbot solutions and Retrieval-Augmented Generation (RAG) systems. With extensive experience helping businesses implement intelligent automation, Adam makes complex AI concepts accessible to business leaders and entrepreneurs.',
  description: 'A comprehensive guide to understanding and implementing AI chatbots for business success. From foundational concepts to advanced techniques, learn how to leverage AI to transform your customer experience, streamline operations, and drive growth.',
  publisher: 'Adam Matthew Steinberger',
  website: 'https://hire.adam.matthewsteinberger.com',
  email: 'adam@matthewsteinberger.com',
  language: 'en',
  isbn: '', // To be filled when ready for Amazon
  copyright: `© ${new Date().getFullYear()} Adam Matthew Steinberger LLC. All rights reserved.`,
  edition: 'First Edition'
};

function extractTitleFromMarkdown(fileContent) {
  const { data } = matter(fileContent);
  return data.title || 'No Title';
}

function removeEmojis(text) {
  // Remove emojis using comprehensive regex including circles, symbols, and all Unicode emoji ranges
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23FA}]|[\u{25AA}-\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{25FB}-\u{25FE}]|[\u{2934}-\u{2935}]|[\u{2B05}-\u{2B07}]|[\u{2B1B}-\u{2B1C}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]|[\u{1F7E0}-\u{1F7EB}]|[\u{FE0F}]|[\u{200D}]/gu, '').trim();
}

function cleanMarkdownContent(content) {
  // Remove ALL emojis from the entire content
  let cleaned = removeEmojis(content);

  // Replace em dashes (—) and en dashes (–) with regular dashes (-)
  cleaned = cleaned.replace(/[—–]/g, '-');

  // Convert markdown tables to bulleted lists for better book formatting
  cleaned = cleaned.replace(/(\|[^\n]+\|\n)+/g, (tableMatch) => {
    const lines = tableMatch.trim().split('\n');
    if (lines.length < 3) return tableMatch; // Not a valid table

    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const separator = lines[1];

    // Check if it's a valid table (has separator line)
    if (!separator.includes('---')) return tableMatch;

    let list = '\n';

    // Process data rows
    for (let i = 2; i < lines.length; i++) {
      const cells = lines[i].split('|').map(c => c.trim()).filter(c => c);
      if (cells.length === 0) continue;

      list += `\n**${headers[0]}:** ${cells[0]}\n\n`;

      for (let j = 1; j < headers.length; j++) {
        if (cells[j]) {
          list += `- **${headers[j]}:** ${cells[j]}\n`;
        }
      }

      list += '\n';
    }

    return list;
  });

  return cleaned;
}

function generateTableOfContents() {
  // Chapter page numbers
  const chapterPages = [1, 8, 15, 21, 28, 35, 42, 50, 56, 62, 68, 75, 81, 84, 90, 96, 102, 109, 114, 120, 125, 128, 133, 138, 142, 148, 154, 160, 166, 172, 178, 183, 189];

  let toc = `<h1>Table of Contents</h1>\n\n`;

  let chapterNumber = 1;

  sectionGroupings.forEach((section, sectionIndex) => {
    toc += `<div class="toc-section">\n`;
    toc += `<h2>Part ${sectionIndex + 1}: ${sectionTitles[sectionIndex]}</h2>\n`;
    toc += `<table class="toc-table">\n`;

    section.forEach((articleSlug) => {
      const articlePath = path.join(__dirname, '..', 'src', 'content', 'articles', `${articleSlug}.md`);
      if (fs.existsSync(articlePath)) {
        const fileContent = fs.readFileSync(articlePath, 'utf8');
        const title = removeEmojis(extractTitleFromMarkdown(fileContent));
        const pageNum = chapterPages[chapterNumber - 1];
        toc += `<tr><td class="toc-title"><a href="#${articleSlug}">Chapter ${chapterNumber}: ${title}</a></td><td class="toc-page">${pageNum}</td></tr>\n`;
        chapterNumber++;
      }
    });

    toc += `</table>\n`;
    toc += `</div>\n\n`;
  });

  return toc;
}

function generateEbookHTML() {
  const metadata = bookMetadata;
  const year = new Date().getFullYear();

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.fullTitle} - ${metadata.author}</title>
    <style>
        /* Professional Book Styling for Amazon KDP */
        @page {
            size: 6in 9in; /* Trade paperback size */
            margin: 0.75in 0.5in 0.75in 0.5in;
        }

        body {
            font-family: 'Crimson Text', 'Garamond', 'Georgia', serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            text-align: justify;
            margin: 0;
            padding: 0;
        }

        /* Typography */
        h1 {
            font-size: 24pt;
            font-weight: bold;
            color: #000;
            margin: 0 0 1em 0;
            page-break-after: avoid;
            line-height: 1.2;
            text-align: left;
        }

        h2 {
            font-size: 18pt;
            font-weight: bold;
            color: #1a1a1a;
            margin: 1.5em 0 0.75em 0;
            page-break-after: avoid;
            line-height: 1.3;
            text-align: left;
        }

        h3 {
            font-size: 14pt;
            font-weight: bold;
            color: #333;
            margin: 1.25em 0 0.5em 0;
            page-break-after: avoid;
            line-height: 1.3;
            text-align: left;
        }

        p {
            margin: 0 0 1em 0;
            text-indent: 0;
            orphans: 2;
            widows: 2;
        }

        p + p {
            text-indent: 1.5em;
        }

        blockquote {
            margin: 1.5em 2em;
            padding: 0.5em 1em;
            padding-left: 1.5em;
            border-left: 3px solid #666;
            font-style: italic;
            background-color: #f9f9f9;
        }

        ul, ol {
            margin: 1em 0;
            padding-left: 1.5em;
        }

        li {
            margin-bottom: 0.5em;
        }

        strong {
            font-weight: bold;
        }

        em {
            font-style: italic;
        }

        hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 2em 0;
            page-break-after: avoid;
        }

        code {
            font-family: 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 10pt;
        }

        pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
            margin: 1em 0;
        }

        pre code {
            background-color: transparent;
            padding: 0;
        }

        /* Front Matter Pages */
        .page {
            page-break-after: always;
            min-height: 8in;
        }

        .blank-page {
            page: blank;
        }

        .title-page {
            page: blank;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 8in;
        }

        .title-page h1 {
            font-size: 32pt;
            margin-bottom: 0.3em;
            text-align: center;
        }

        .title-page .subtitle {
            font-size: 18pt;
            font-style: italic;
            color: #444;
            margin-bottom: 2em;
        }

        .title-page .author {
            font-size: 16pt;
            font-weight: bold;
            margin-top: 1.5em;
            margin-bottom: 0.3em;
        }

        .title-page .publisher {
            font-size: 12pt;
            margin-top: 0.3em;
            color: #666;
        }

        .copyright-page {
            page: blank;
            font-size: 10pt;
            line-height: 1.4;
            padding-top: 6in;
            text-align: left;
        }

        .copyright-page p {
            margin-bottom: 0.75em;
            text-indent: 0;
        }

        .copyright-page .small {
            font-size: 9pt;
            color: #666;
        }

        .dedication {
            page: blank;
            text-align: center;
            padding-top: 3in;
            font-style: italic;
            font-size: 12pt;
        }

        /* Table of Contents */
        .toc {
            page-break-after: always;
        }

        .toc h1 {
            font-size: 18pt;
            text-align: center;
            margin-bottom: 1.5em;
        }

        .toc-section {
            margin-bottom: 1em;
        }

        .toc-section h2 {
            font-size: 12pt;
            margin: 0.75em 0 0.3em 0;
            color: #000;
        }

        .toc-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.5em;
        }

        .toc-table td {
            padding: 0.25em 0;
            font-size: 10pt;
            line-height: 1.3;
        }

        .toc-title {
            text-align: left;
            width: 85%;
        }

        .toc-page {
            text-align: right;
            width: 15%;
            font-weight: bold;
        }

        .toc a {
            color: #000;
            text-decoration: none;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        /* Chapter/Article Pages */
        .chapter {
            page-break-before: always;
            page-break-after: avoid;
        }

        .chapter-number {
            font-size: 12pt;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.5em;
            text-align: left;
        }

        .chapter h1 {
            margin-top: 0;
            border-bottom: 2px solid #000;
            padding-bottom: 0.5em;
        }

        .chapter p:first-of-type {
            margin-top: 1.5em;
        }

        /* Back Matter */
        .about-author {
            page-break-before: always;
            padding-top: 1in;
        }

        .about-author h1 {
            font-size: 18pt;
            text-align: center;
            margin-bottom: 1.5em;
        }

        .about-author p {
            text-indent: 0;
            margin-bottom: 1em;
        }

        .back-page {
            page: blank;
            text-align: center;
            padding-top: 3in;
        }

        .back-page h2 {
            font-size: 16pt;
            margin-bottom: 1em;
            text-align: center;
        }

        .back-page p {
            font-size: 11pt;
            margin-bottom: 0.75em;
            text-indent: 0;
        }

        .back-page .website {
            font-size: 13pt;
            font-weight: bold;
            margin-top: 2em;
        }
    </style>
</head>
<body>
    <div class="front-matter">
        <!-- Title Page -->
        <div class="page title-page">
            <h1>${metadata.title}</h1>
            <p class="subtitle">${metadata.subtitle}</p>
            <p class="author">by</p>
            <p class="author">${metadata.author}</p>
        </div>

        <!-- Copyright Page -->
        <div class="page copyright-page">
            <p><strong>${metadata.fullTitle}</strong></p>
            <p>${metadata.edition}</p>
            <p>${metadata.copyright}</p>
            ${metadata.isbn ? `<p>ISBN: ${metadata.isbn}</p>` : ''}
            <p class="small">
                Published by ${metadata.publisher}<br/>
                ${metadata.website}<br/>
                ${metadata.email}
            </p>
            <p class="small">
                No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means, electronic, mechanical, photocopying, recording, or otherwise, without prior written permission of the publisher. Fair use is permitted for personal study and educational purposes.
            </p>
            <p class="small">
                The information provided in this book is for educational purposes only. While the author has made every effort to ensure accuracy, the field of artificial intelligence evolves rapidly, and readers are encouraged to consult current resources and experts for the most up-to-date information.
            </p>
            <p class="small">
                Printed in ${year}
            </p>
        </div>

        <!-- Dedication Page -->
        <div class="page dedication">
            <p>Dedicated to all the business leaders and entrepreneurs<br/>who dare to embrace the future of AI<br/>and transform their businesses with intelligence and purpose.</p>
        </div>

        <!-- Table of Contents -->
        <div class="page toc">
            ${generateTableOfContents()}
        </div>
    </div>

    <div class="main-content">`;

  // Add each article as chapters
  let chapterNumber = 1;
  noviceToNavigatorArticles.forEach((articleSlug) => {
    const articlePath = path.join(__dirname, '..', 'src', 'content', 'articles', `${articleSlug}.md`);

    if (fs.existsSync(articlePath)) {
      const fileContent = fs.readFileSync(articlePath, 'utf8');
      const { content } = matter(fileContent);
      const title = removeEmojis(extractTitleFromMarkdown(fileContent));

      // Clean emojis from markdown content and convert to HTML
      const cleanedContent = cleanMarkdownContent(content);
      const articleHTML = marked(cleanedContent);

      html += `\n    <div class="chapter" id="${articleSlug}">
        <p class="chapter-number">Chapter ${chapterNumber}</p>
        <h1>${title}</h1>
        ${articleHTML}
    </div>`;

      chapterNumber++;
    } else {
      console.warn(`Warning: Article ${articleSlug}.md not found`);
    }
  });

  // Close main content and add back matter
  html += `
    </div><!-- End main-content -->

    <div class="back-matter">
        <div class="page about-author">
            <h1>About the Author</h1>
            <p>${metadata.authorBio}</p>
            <p><strong>Website:</strong> ${metadata.website}</p>
            <p><strong>Email:</strong> ${metadata.email}</p>
        </div>

        <!-- Back Cover Content -->
        <div class="page back-page">
            <h2>${metadata.title}</h2>
            <p>${metadata.description}</p>
            <p>Whether you're a business owner, entrepreneur, or technology decision-maker, this book provides the knowledge you need to confidently evaluate, implement, and benefit from AI chatbot solutions.</p>
            <p class="website">${metadata.website}</p>
        </div>
    </div><!-- End back-matter -->
</body>
</html>`;

  return html;
}

async function generatePDF() {
  try {
    console.log('Generating ebook HTML...');
    const html = generateEbookHTML();

    // Write HTML to temporary file
    const htmlPath = path.join(__dirname, 'temp-ebook.html');
    fs.writeFileSync(htmlPath, html);

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-software-rasterizer']
    });

    const page = await browser.newPage();

    console.log('Loading HTML...');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    console.log('Generating PDF without page numbers...');

    const gutterMargin = '0.5in';

    // Generate PDF without footer first
    const pdfBuffer = await page.pdf({
      width: '6in',
      height: '9in',
      margin: {
        top: '0.75in',
        right: '0.5in',
        bottom: '0.75in',
        left: gutterMargin
      },
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      tagged: true
    });

    await browser.close();

    // Clean up temporary HTML file
    fs.unlinkSync(htmlPath);

    console.log('Adding page numbers (main content only)...');

    // Load PDF and add page numbers with offset
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica, { subset: true });

    // Page 1 should be on physical page 9 (index 8)
    // Last page number should be on physical page 201 (index 200)
    const firstNumberedPage = 8; // Physical page 9 (0-indexed)
    const lastNumberedPage = 200; // Physical page 201 (0-indexed)
    const totalPages = pages.length;

    console.log(`Page numbering: Physical pages 1-${firstNumberedPage + 1} (unnumbered)`);
    console.log(`Page numbering: Physical pages ${firstNumberedPage + 1}-${lastNumberedPage + 1} (numbered as 1-${lastNumberedPage - firstNumberedPage + 1})`);
    console.log(`Page numbering: Physical pages ${lastNumberedPage + 2}-${totalPages} (unnumbered)`);

    // Add page numbers from physical page 9 (index 8) to physical page 194 (index 193)
    for (let i = firstNumberedPage; i <= lastNumberedPage; i++) {
      const page = pages[i];
      const { width } = page.getSize();
      const pageNumber = i - firstNumberedPage + 1;

      const text = pageNumber.toString();
      const textWidth = font.widthOfTextAtSize(text, 10);

      page.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: 36,
        size: 10,
        font: font,
        color: rgb(0.2, 0.2, 0.2)
      });
    }

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, '..', 'public', 'novice-to-navigator-ebook.pdf');
    fs.writeFileSync(pdfPath, modifiedPdfBytes);

    console.log(`✅ PDF generated successfully: ${pdfPath}`);
    console.log(`📄 PDF size: ${(modifiedPdfBytes.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📄 Total pages: ${totalPages} (${firstNumberedPage + 1} unnumbered front + ${lastNumberedPage - firstNumberedPage + 1} numbered + ${totalPages - lastNumberedPage - 1} unnumbered back)`);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

// EPUB generation functions
function generateEPUBCSS() {
  return `@charset "UTF-8";

/* Professional eBook Styling */
body {
    font-family: 'Crimson Text', 'Garamond', 'Georgia', serif;
    font-size: 1em;
    line-height: 1.5;
    color: #000;
    text-align: justify;
    margin: 1em;
    padding: 0;
}

/* Typography */
h1 {
    font-size: 1.8em;
    font-weight: bold;
    color: #000;
    margin: 1em 0 0.8em 0;
    page-break-after: avoid;
    line-height: 1.2;
    text-align: left;
}

h2 {
    font-size: 1.4em;
    font-weight: bold;
    color: #1a1a1a;
    margin: 1.3em 0 0.6em 0;
    page-break-after: avoid;
    line-height: 1.3;
    text-align: left;
}

h3 {
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
    margin: 1.1em 0 0.5em 0;
    page-break-after: avoid;
    line-height: 1.3;
    text-align: left;
}

p {
    margin: 0 0 1em 0;
    text-indent: 0;
}

p + p {
    text-indent: 1.5em;
}

blockquote {
    margin: 1.5em 1.5em;
    padding: 0.5em 1em;
    padding-left: 1.5em;
    border-left: 3px solid #666;
    font-style: italic;
    background-color: #f5f5f5;
}

ul, ol {
    margin: 1em 0;
    padding-left: 1.5em;
}

li {
    margin-bottom: 0.5em;
}

strong {
    font-weight: bold;
}

em {
    font-style: italic;
}

hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 2em 0;
}

code {
    font-family: 'Courier New', monospace;
    background-color: #f5f5f5;
    padding: 0.1em 0.3em;
    border-radius: 3px;
    font-size: 0.9em;
}

pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1em 0;
}

pre code {
    background-color: transparent;
    padding: 0;
}

/* Cover and Title Pages */
.cover {
    text-align: center;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.cover h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}

.cover .subtitle {
    font-size: 1.2em;
    font-style: italic;
    color: #444;
    margin-bottom: 1.5em;
}

.cover .author {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0.3em 0;
}

/* Copyright Page */
.copyright-page {
    page-break-after: always;
    font-size: 0.9em;
    line-height: 1.4;
    padding: 3em 1em 1em 1em;
    text-align: left;
}

.copyright-page p {
    margin-bottom: 0.75em;
    text-indent: 0;
}

.copyright-page .small {
    font-size: 0.85em;
    color: #666;
    margin-top: 1em;
}

/* Dedication Page */
.dedication {
    page-break-after: always;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    font-style: italic;
    font-size: 1.1em;
}

.dedication p {
    margin: 0;
    line-height: 1.8;
}

/* About Author (Back Matter) */
.about-author {
    page-break-after: always;
    page-break-before: always;
    padding: 2em 1em;
}

.about-author h1 {
    font-size: 1.6em;
    text-align: center;
    margin-bottom: 1.5em;
}

.about-author p {
    text-indent: 0;
    margin-bottom: 1em;
}

/* Back Cover */
.back-cover {
    page-break-before: always;
    text-align: center;
    padding: 3em 1em;
}

.back-cover h2 {
    font-size: 1.4em;
    margin-bottom: 1em;
    text-align: center;
}

.back-cover p {
    font-size: 1em;
    margin-bottom: 0.75em;
    text-indent: 0;
}

.back-cover .website {
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 2em;
}

/* Table of Contents - EPUB 3 Navigation Document */
nav[epub|type~="toc"] {
    page-break-after: always;
}

nav[epub|type~="toc"] h1 {
    font-size: 1.6em;
    text-align: center;
    margin-bottom: 1.5em;
}

nav[epub|type~="toc"] ol {
    list-style-type: none;
    padding-left: 0;
}

nav[epub|type~="toc"] > ol > li {
    margin-bottom: 1.5em;
}

nav[epub|type~="toc"] > ol > li > ol {
    margin-top: 0.5em;
    padding-left: 1.5em;
}

nav[epub|type~="toc"] > ol > li > ol > li {
    margin: 0.3em 0;
}

nav[epub|type~="toc"] .toc-section-title {
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
    display: block;
    margin-bottom: 0.5em;
}

nav[epub|type~="toc"] a {
    color: #000;
    text-decoration: none;
}

nav[epub|type~="toc"] a:hover {
    text-decoration: underline;
}

/* Chapter Pages */
.chapter {
    page-break-before: always;
}

.chapter-number {
    font-size: 0.9em;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5em;
    text-align: left;
}

.chapter h1 {
    margin-top: 0;
    border-bottom: 2px solid #000;
    padding-bottom: 0.5em;
}

.chapter p:first-of-type {
    margin-top: 1.5em;
}`;
}

function generateEPUBContainerXML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`;
}

function generateEPUBContentOPF() {
  const metadata = bookMetadata;
  const manifest = [];
  const spine = [];

  // Add CSS
  manifest.push('        <item id="css" href="style.css" media-type="text/css"/>');

  // Add front matter
  manifest.push('        <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('        <itemref idref="cover"/>');

  manifest.push('        <item id="copyright" href="copyright.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('        <itemref idref="copyright"/>');

  manifest.push('        <item id="dedication" href="dedication.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('        <itemref idref="dedication"/>');

  manifest.push('        <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml" properties="nav"/>');
  spine.push('        <itemref idref="toc"/>');

  // Add articles
  noviceToNavigatorArticles.forEach((articleSlug) => {
    manifest.push(`        <item id="${articleSlug}" href="${articleSlug}.xhtml" media-type="application/xhtml+xml"/>`);
    spine.push(`        <itemref idref="${articleSlug}"/>`);
  });

  // Add back matter
  manifest.push('        <item id="about-author" href="about-author.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('        <itemref idref="about-author"/>');

  manifest.push('        <item id="back-cover" href="back-cover.xhtml" media-type="application/xhtml+xml"/>');
  spine.push('        <itemref idref="back-cover"/>');

  return `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="uid">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
        <dc:identifier id="uid">urn:uuid:novice-to-navigator-${new Date().getTime()}</dc:identifier>
        <dc:title>${metadata.title}</dc:title>
        <dc:creator>${metadata.author}</dc:creator>
        <dc:language>${metadata.language}</dc:language>
        <dc:date>${new Date().toISOString()}</dc:date>
        <dc:description>${metadata.description}</dc:description>
        <dc:publisher>${metadata.publisher}</dc:publisher>
        <dc:rights>${metadata.copyright}</dc:rights>
        <meta property="dcterms:modified">${new Date().toISOString()}</meta>
    </metadata>
    <manifest>
${manifest.join('\n')}
    </manifest>
    <spine>
${spine.join('\n')}
    </spine>
    <guide>
        <reference type="cover" title="Cover" href="cover.xhtml"/>
        <reference type="toc" title="Table of Contents" href="toc.xhtml"/>
    </guide>
</package>`;
}

function generateEPUBTOCNCX() {
  const metadata = bookMetadata;
  const navPoints = [];
  let playOrder = 1;

  // Add front matter
  navPoints.push(`        <navPoint id="nav-cover" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>Cover</text></navLabel>');
  navPoints.push('            <content src="cover.xhtml"/>');
  navPoints.push('        </navPoint>');
  playOrder++;

  navPoints.push(`        <navPoint id="nav-copyright" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>Copyright</text></navLabel>');
  navPoints.push('            <content src="copyright.xhtml"/>');
  navPoints.push('        </navPoint>');
  playOrder++;

  navPoints.push(`        <navPoint id="nav-dedication" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>Dedication</text></navLabel>');
  navPoints.push('            <content src="dedication.xhtml"/>');
  navPoints.push('        </navPoint>');
  playOrder++;

  navPoints.push(`        <navPoint id="nav-toc" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>Table of Contents</text></navLabel>');
  navPoints.push('            <content src="toc.xhtml"/>');
  navPoints.push('        </navPoint>');
  playOrder++;

  // Add articles
  noviceToNavigatorArticles.forEach((articleSlug) => {
    const articlePath = path.join(__dirname, '..', 'src', 'content', 'articles', `${articleSlug}.md`);
    if (fs.existsSync(articlePath)) {
      const fileContent = fs.readFileSync(articlePath, 'utf8');
      const title = removeEmojis(extractTitleFromMarkdown(fileContent));

      navPoints.push(`        <navPoint id="nav-${articleSlug}" playOrder="${playOrder}">`);
      navPoints.push(`            <navLabel><text>${title}</text></navLabel>`);
      navPoints.push(`            <content src="${articleSlug}.xhtml"/>`);
      navPoints.push('        </navPoint>');
      playOrder++;
    }
  });

  // Add back matter
  navPoints.push(`        <navPoint id="nav-about-author" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>About the Author</text></navLabel>');
  navPoints.push('            <content src="about-author.xhtml"/>');
  navPoints.push('        </navPoint>');
  playOrder++;

  navPoints.push(`        <navPoint id="nav-back-cover" playOrder="${playOrder}">`);
  navPoints.push('            <navLabel><text>About This Book</text></navLabel>');
  navPoints.push('            <content src="back-cover.xhtml"/>');
  navPoints.push('        </navPoint>');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="en">
    <head>
        <meta name="dtb:uid" content="novice-to-navigator-ebook"/>
        <meta name="dtb:depth" content="1"/>
        <meta name="dtb:totalPageCount" content="0"/>
        <meta name="dtb:maxPageNumber" content="0"/>
    </head>
    <docTitle>
        <text>${metadata.title}</text>
    </docTitle>
    <docAuthor>
        <text>${metadata.author}</text>
    </docAuthor>
    <navMap>
${navPoints.join('\n')}
    </navMap>
</ncx>`;
}

function generateEPUBCoverXHTML() {
  const metadata = bookMetadata;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>${metadata.title}</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="cover">
        <h1>${metadata.title}</h1>
        <p class="subtitle">${metadata.subtitle}</p>
        <p class="author">by</p>
        <p class="author">${metadata.author}</p>
    </div>
</body>
</html>`;
}

function generateEPUBCopyrightXHTML() {
  const metadata = bookMetadata;
  const year = new Date().getFullYear();

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Copyright</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="copyright-page">
        <p><strong>${metadata.fullTitle}</strong></p>
        <p>${metadata.edition}</p>
        <p>${metadata.copyright}</p>
        ${metadata.isbn ? `<p>ISBN: ${metadata.isbn}</p>` : ''}
        <p class="small">
            Published by ${metadata.publisher}<br/>
            ${metadata.website}<br/>
            ${metadata.email}
        </p>
        <p class="small">
            No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means, electronic, mechanical, photocopying, recording, or otherwise, without prior written permission of the publisher. Fair use is permitted for personal study and educational purposes.
        </p>
        <p class="small">
            The information provided in this book is for educational purposes only. While the author has made every effort to ensure accuracy, the field of artificial intelligence evolves rapidly, and readers are encouraged to consult current resources and experts for the most up-to-date information.
        </p>
        <p class="small">
            Printed in ${year}
        </p>
    </div>
</body>
</html>`;
}

function generateEPUBDedicationXHTML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Dedication</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="dedication">
        <p>Dedicated to all the business leaders and entrepreneurs<br/>who dare to embrace the future of AI<br/>and transform their businesses with intelligence and purpose.</p>
    </div>
</body>
</html>`;
}

function generateEPUBAboutAuthorXHTML() {
  const metadata = bookMetadata;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>About the Author</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="about-author">
        <h1>About the Author</h1>
        <p>${metadata.authorBio}</p>
        <p><strong>Website:</strong> ${metadata.website}</p>
        <p><strong>Email:</strong> ${metadata.email}</p>
    </div>
</body>
</html>`;
}

function generateEPUBBackCoverXHTML() {
  const metadata = bookMetadata;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>About This Book</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="back-cover">
        <h2>${metadata.title}</h2>
        <p>${metadata.description}</p>
        <p>Whether you're a business owner, entrepreneur, or technology decision-maker, this book provides the knowledge you need to confidently evaluate, implement, and benefit from AI chatbot solutions.</p>
        <p class="website">${metadata.website}</p>
    </div>
</body>
</html>`;
}

function generateEPUBTOCXHTML() {
  // Build the nav structure with nested lists
  let navItems = '';

  // Add front matter items
  navItems += '                <li><a href="cover.xhtml">Cover</a></li>\n';
  navItems += '                <li><a href="copyright.xhtml">Copyright</a></li>\n';
  navItems += '                <li><a href="dedication.xhtml">Dedication</a></li>\n';

  let chapterNumber = 1;

  sectionGroupings.forEach((section, sectionIndex) => {
    navItems += '                <li>\n';
    navItems += `                    <span class="toc-section-title">Part ${sectionIndex + 1}: ${sectionTitles[sectionIndex]}</span>\n`;
    navItems += '                    <ol>\n';

    section.forEach((articleSlug) => {
      const articlePath = path.join(__dirname, '..', 'src', 'content', 'articles', `${articleSlug}.md`);
      if (fs.existsSync(articlePath)) {
        const fileContent = fs.readFileSync(articlePath, 'utf8');
        const title = removeEmojis(extractTitleFromMarkdown(fileContent));
        navItems += `                        <li><a href="${articleSlug}.xhtml">Chapter ${chapterNumber}: ${title}</a></li>\n`;
        chapterNumber++;
      }
    });

    navItems += '                    </ol>\n';
    navItems += '                </li>\n';
  });

  // Add back matter items
  navItems += '                <li><a href="about-author.xhtml">About the Author</a></li>\n';
  navItems += '                <li><a href="back-cover.xhtml">About This Book</a></li>\n';

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Table of Contents</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <nav epub:type="toc" id="toc">
        <h1>Table of Contents</h1>
        <ol>
${navItems}        </ol>
    </nav>
</body>
</html>`;
}

function generateEPUBArticleXHTML(articleSlug, chapterNumber) {
  const articlePath = path.join(__dirname, '..', 'src', 'content', 'articles', `${articleSlug}.md`);

  if (fs.existsSync(articlePath)) {
    const fileContent = fs.readFileSync(articlePath, 'utf8');
    const { content } = matter(fileContent);
    const title = removeEmojis(extractTitleFromMarkdown(fileContent));

    // Clean emojis from markdown content and convert to HTML
    const cleanedContent = cleanMarkdownContent(content);
    const articleHTML = marked(cleanedContent);

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <div class="chapter">
        <p class="chapter-number">Chapter ${chapterNumber}</p>
        <h1>${title}</h1>
${articleHTML}
    </div>
</body>
</html>`;
  } else {
    console.warn(`Warning: Article ${articleSlug}.md not found`);
    return null;
  }
}

async function generateEPUB() {
  try {
    console.log('Generating EPUB...');

    // Create temporary directory for EPUB contents
    const tempDir = path.join(__dirname, 'temp-epub');
    const oebpsDir = path.join(tempDir, 'OEBPS');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    if (!fs.existsSync(oebpsDir)) {
      fs.mkdirSync(oebpsDir, { recursive: true });
    }

    // Generate mimetype file (must be first and uncompressed)
    fs.writeFileSync(path.join(tempDir, 'mimetype'), 'application/epub+zip');

    // Generate META-INF/container.xml
    const metaInfDir = path.join(tempDir, 'META-INF');
    if (!fs.existsSync(metaInfDir)) {
      fs.mkdirSync(metaInfDir, { recursive: true });
    }
    fs.writeFileSync(path.join(metaInfDir, 'container.xml'), generateEPUBContainerXML());

    // Generate OEBPS/content.opf
    fs.writeFileSync(path.join(oebpsDir, 'content.opf'), generateEPUBContentOPF());

    // Generate OEBPS/toc.ncx
    fs.writeFileSync(path.join(oebpsDir, 'toc.ncx'), generateEPUBTOCNCX());

    // Generate OEBPS/style.css
    fs.writeFileSync(path.join(oebpsDir, 'style.css'), generateEPUBCSS());

    // Generate front matter
    fs.writeFileSync(path.join(oebpsDir, 'cover.xhtml'), generateEPUBCoverXHTML());
    fs.writeFileSync(path.join(oebpsDir, 'copyright.xhtml'), generateEPUBCopyrightXHTML());
    fs.writeFileSync(path.join(oebpsDir, 'dedication.xhtml'), generateEPUBDedicationXHTML());
    fs.writeFileSync(path.join(oebpsDir, 'toc.xhtml'), generateEPUBTOCXHTML());

    // Generate article XHTML files
    let chapterNumber = 1;
    noviceToNavigatorArticles.forEach((articleSlug) => {
      const articleXHTML = generateEPUBArticleXHTML(articleSlug, chapterNumber);
      if (articleXHTML) {
        fs.writeFileSync(path.join(oebpsDir, `${articleSlug}.xhtml`), articleXHTML);
        chapterNumber++;
      }
    });

    // Generate back matter
    fs.writeFileSync(path.join(oebpsDir, 'about-author.xhtml'), generateEPUBAboutAuthorXHTML());
    fs.writeFileSync(path.join(oebpsDir, 'back-cover.xhtml'), generateEPUBBackCoverXHTML());

    // Create EPUB file using archiver
    const epubPath = path.join(__dirname, '..', 'public', 'novice-to-navigator-ebook.epub');
    const output = fs.createWriteStream(epubPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
      store: false  // Use compression
    });

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        console.log(`✅ EPUB generated successfully: ${epubPath}`);
        console.log(`📄 EPUB size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);

        // Clean up temporary directory
        fs.rmSync(tempDir, { recursive: true, force: true });
        resolve();
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);

      // Add mimetype first (uncompressed, as per EPUB spec)
      archive.file(path.join(tempDir, 'mimetype'), { name: 'mimetype', store: true });

      // Add all other files
      archive.directory(metaInfDir, 'META-INF');
      archive.directory(oebpsDir, 'OEBPS');

      archive.finalize();
    });

  } catch (error) {
    console.error('❌ Error generating EPUB:', error);
    throw error;
  }
}

async function generateAllEbooks() {
  try {
    console.log('🚀 Starting generation of Novice to Navigator ebook formats...\n');

    // Generate PDF
    console.log('📖 Generating PDF...');
    await generatePDF();

    // Generate EPUB
    console.log('\n📱 Generating EPUB...');
    await generateEPUB();

    console.log('\n🎉 All ebooks generated successfully!');
    console.log('\nGenerated files:');
    console.log('  📄 public/novice-to-navigator-ebook.pdf');
    console.log('  📱 public/novice-to-navigator-ebook.epub');
    console.log('\nThese files are ready for Amazon KDP self-publishing!');

  } catch (error) {
    console.error('❌ Error generating ebooks:', error);
    process.exit(1);
  }
}

// Run the script
generateAllEbooks();
