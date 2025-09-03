import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  try {
    // Try to read the project file
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    let content = '';
    let data: Record<string, unknown> = {};
    
    // Try language-specific files first
    const possibleFiles = [
      `${slug}.en.md`,
      `${slug}.pl.md`,
      `${slug}.md`
    ];
    
    for (const filename of possibleFiles) {
      const filePath = path.join(projectsDir, filename);
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
        title: 'Project - Runity',
        description: 'Explore our innovative AI and automation projects.',
      };
    }
    
    const title = `${String(data.title || 'Project')} | Runity Projects`;
    const description = String(data.description || content.substring(0, 160).replace(/[#*\n]/g, '').trim() + '...');
    
    // Create dynamic OG image URL with project data
    const ogTitle = String(data.title || 'Project');
    const ogDescription = String(data.description || content.substring(0, 160).replace(/[#*\n]/g, '').trim());
    const imageUrl = data.image ? String(data.image) : `/api/og?type=project&title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`;
    
    // Build keywords from tech stack and other data
    const techStack = Array.isArray(data.techStack) ? data.techStack.map(String) : [];
    const keywords = [
      ...techStack,
      'AI project',
      'automation case study',
      String(data.client || ''),
      'software development',
      'machine learning implementation'
    ].filter(Boolean).join(', ');
    
    return {
      title,
      description,
      keywords,
      authors: [{ name: 'Runity Team' }],
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: String(data.date || new Date().toISOString()),
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: String(data.title || 'Project'),
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
        canonical: `https://runity.pl/projects/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating project metadata:', error);
    return {
      title: 'Project - Runity',
      description: 'Explore our innovative AI and automation projects.',
    };
  }
}