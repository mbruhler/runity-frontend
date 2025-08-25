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
    
    const markdown = await response.text();
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
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getLatestProjects(count: number = 3): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, count);
}