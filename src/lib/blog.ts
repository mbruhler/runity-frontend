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
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get list of blog files from the public/blog directory
    const response = await fetch('/api/blog');
    const files: string[] = await response.json();
    
    const posts = await Promise.all(
      files.map(async (filename) => {
        const slug = filename.replace('.md', '');
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
          content
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

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/blog/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    // Check if the response is actually a markdown file
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    
    // If the response is HTML (like a 404 page), return null
    if (contentType?.includes('text/html') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error(`Blog post ${slug} returned HTML instead of markdown`);
      return null;
    }
    
    // Check if the text looks like a valid markdown file with frontmatter
    if (!text.trim().startsWith('---')) {
      console.error(`Blog post ${slug} doesn't appear to be a valid markdown file with frontmatter`);
      return null;
    }
    
    const { data, content } = matter(text);
    
    // Validate that we have at least a title
    if (!data.title) {
      console.error(`Blog post ${slug} is missing required title`);
      return null;
    }
    
    return {
      slug,
      title: data.title,
      date: data.date || '',
      readTime: data.readTime || '5 min read',
      category: data.category || 'General',
      excerpt: data.excerpt || '',
      author: data.author || 'Runity Team',
      content
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}