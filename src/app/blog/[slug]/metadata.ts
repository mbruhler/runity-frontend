import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  try {
    // Try to read the blog post file
    const blogDir = path.join(process.cwd(), 'public', 'blog');
    let content = '';
    let data: Record<string, unknown> = {};
    
    // Try language-specific files first
    const possibleFiles = [
      `${slug}.en.md`,
      `${slug}.pl.md`,
      `${slug}.md`
    ];
    
    for (const filename of possibleFiles) {
      const filePath = path.join(blogDir, filename);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        data = parsed.data;
        content = parsed.content;
        break;
      }
    }
    
    if (!data.title) {
      return {
        title: 'Blog Post - Runity',
        description: 'Read our latest insights on AI automation and software solutions.',
      };
    }
    
    const title = `${String(data.title || 'Blog Post')} | Runity Blog`;
    const description = String(data.excerpt || content.substring(0, 160).replace(/[#*\n]/g, '').trim() + '...');
    
    // Create dynamic OG image URL with blog post data
    const ogTitle = String(data.title || 'Blog Post');
    const ogDescription = String(data.excerpt || content.substring(0, 160).replace(/[#*\n]/g, '').trim());
    const imageUrl = data.image ? String(data.image) : `/api/og?type=blog&title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`;
    
    return {
      title,
      description,
      authors: [{ name: String(data.author || 'Runity Team') }],
      keywords: String(data.keywords || 'AI automation, software development, LLM, machine learning, business automation'),
      other: {
        'og:logo': 'https://runity.pl/logo.png',
      },
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: String(data.date || new Date().toISOString()),
        authors: [String(data.author || 'Runity Team')],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: String(data.title || 'Blog Post'),
          }
        ],
        locale: 'en_US',
        siteName: 'Runity',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
        creator: '@runity_pl',
        site: '@runity_pl',
      },
      alternates: {
        canonical: `https://runity.pl/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    return {
      title: 'Blog Post - Runity',
      description: 'Read our latest insights on AI automation and software solutions.',
    };
  }
}