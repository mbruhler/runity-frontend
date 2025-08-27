import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  author: string;
  content: string;
  language?: string;
}

export async function getBlogPosts(language: string = 'en'): Promise<BlogPost[]> {
  try {
    // Get list of blog files from the public/blog directory
    const response = await fetch('/api/blog');
    const files: string[] = await response.json();
    
    // Filter files by language or fallback to language-neutral files
    const languageFiles = files.filter(filename => {
      if (filename.includes(`.${language}.md`)) return true;
      // Include files without language suffix as fallback
      if (!filename.includes('.en.md') && !filename.includes('.pl.md') && filename.endsWith('.md')) return true;
      return false;
    });
    
    const posts = await Promise.all(
      languageFiles.map(async (filename) => {
        // Extract slug (remove language suffix and .md extension)
        const slug = filename.replace(`.${language}.md`, '').replace('.md', '');
        const fileResponse = await fetch(`/blog/${filename}`);
        const markdown = await fileResponse.text();
        
        const { data, content } = matter(markdown);
        
        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || '',
          readTime: data.readTime || '5 min read',
          category: data.category || 'General',
          excerpt: data.excerpt || '',
          author: data.author || 'Runity Team',
          content,
          language: filename.includes(`.${language}.md`) ? language : undefined
        } as BlogPost;
      })
    );
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string, language: string = 'en'): Promise<BlogPost | null> {
  try {
    // Try to fetch language-specific file first, then fallback to neutral file
    const filenames = [`${slug}.${language}.md`, `${slug}.md`];
    
    for (const filename of filenames) {
      try {
        const response = await fetch(`/blog/${filename}`);
        if (!response.ok) {
          continue; // Try next filename
        }
        
        // Check if the response is actually a markdown file
        const contentType = response.headers.get('content-type');
        const text = await response.text();
        
        // If the response is HTML (like a 404 page), continue to next filename
        if (contentType?.includes('text/html') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          console.error(`Blog post ${filename} returned HTML instead of markdown`);
          continue;
        }
        
        // Check if the text looks like a valid markdown file with frontmatter
        if (!text.trim().startsWith('---')) {
          console.error(`Blog post ${filename} doesn't appear to be a valid markdown file with frontmatter`);
          continue;
        }
        
        const { data, content } = matter(text);
        
        // Validate that we have at least a title
        if (!data.title) {
          console.error(`Blog post ${filename} is missing required title`);
          continue;
        }
        
        return {
          slug,
          title: data.title,
          date: data.date || '',
          readTime: data.readTime || '5 min read',
          category: data.category || 'General',
          excerpt: data.excerpt || '',
          author: data.author || 'Runity Team',
          content,
          language: filename.includes(`.${language}.md`) ? language : undefined
        } as BlogPost;
      } catch (error) {
        console.error(`Error fetching ${filename}:`, error);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}