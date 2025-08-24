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
    
    const markdown = await response.text();
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
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}