import matter from 'gray-matter';

export interface ProjectStats {
  revenue?: string;
  performance?: string;
  users?: string;
  uptime?: string;
  downloads?: string;
  rating?: string;
  transactions?: string;
  userRetention?: string;
  accuracy?: string;
  timeReduction?: string;
  hospitals?: string;
  diagnoses?: string;
  sensors?: string;
  dataPoints?: string;
  energySavings?: string;
  responseTime?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  client: string;
  duration: string;
  date: string;
  techStack: string[];
  image: string;
  stats: ProjectStats;
  challenges: string[];
  solutions: string[];
  results: string[];
  content: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    // Get list of project files from the public/projects directory
    const response = await fetch('/api/projects');
    const files: string[] = await response.json();
    
    const projects = await Promise.all(
      files.map(async (filename) => {
        const slug = filename.replace('.md', '');
        const fileResponse = await fetch(`/projects/${filename}`);
        const markdown = await fileResponse.text();
        
        const { data, content } = matter(markdown);
        
        return {
          slug,
          title: data.title || 'Untitled Project',
          description: data.description || '',
          client: data.client || '',
          duration: data.duration || '',
          date: data.date || '',
          techStack: data.techStack || [],
          image: data.image || '/api/placeholder/800/400',
          stats: data.stats || {},
          challenges: data.challenges || [],
          solutions: data.solutions || [],
          results: data.results || [],
          content
        } as Project;
      })
    );
    
    // Sort projects by date (newest first)
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(`/projects/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    // Check if the response is actually a markdown file
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    
    // If the response is HTML (like a 404 page), return null
    if (contentType?.includes('text/html') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error(`Project ${slug} returned HTML instead of markdown`);
      return null;
    }
    
    // Check if the text looks like a valid markdown file with frontmatter
    if (!text.trim().startsWith('---')) {
      console.error(`Project ${slug} doesn't appear to be a valid markdown file with frontmatter`);
      return null;
    }
    
    const { data, content } = matter(text);
    
    // Validate that we have at least a title
    if (!data.title) {
      console.error(`Project ${slug} is missing required title`);
      return null;
    }
    
    return {
      slug,
      title: data.title,
      description: data.description || '',
      client: data.client || '',
      duration: data.duration || '',
      date: data.date || '',
      techStack: data.techStack || [],
      image: data.image || '/api/placeholder/800/400',
      stats: data.stats || {},
      challenges: data.challenges || [],
      solutions: data.solutions || [],
      results: data.results || [],
      content
    } as Project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getLatestProjects(count: number = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, count);
}