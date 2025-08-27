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
  language?: string;
}

export async function getProjects(language: string = 'en'): Promise<Project[]> {
  try {
    // Get list of project files from the public/projects directory
    const response = await fetch('/api/projects');
    const files: string[] = await response.json();
    
    // Filter files by language or fallback to language-neutral files
    const languageFiles = files.filter(filename => {
      if (filename.includes(`.${language}.md`)) return true;
      // Include files without language suffix as fallback
      if (!filename.includes('.en.md') && !filename.includes('.pl.md') && filename.endsWith('.md')) return true;
      return false;
    });
    
    const projects = await Promise.all(
      languageFiles.map(async (filename) => {
        // Extract slug (remove language suffix and .md extension)
        const slug = filename.replace(`.${language}.md`, '').replace('.md', '');
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
          content,
          language: filename.includes(`.${language}.md`) ? language : undefined
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

export async function getProject(slug: string, language: string = 'en'): Promise<Project | null> {
  try {
    // Try to fetch language-specific file first, then fallback to neutral file
    const filenames = [`${slug}.${language}.md`, `${slug}.md`];
    
    for (const filename of filenames) {
      try {
        const response = await fetch(`/projects/${filename}`);
        if (!response.ok) {
          continue; // Try next filename
        }
        
        // Check if the response is actually a markdown file
        const contentType = response.headers.get('content-type');
        const text = await response.text();
        
        // If the response is HTML (like a 404 page), continue to next filename
        if (contentType?.includes('text/html') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          console.error(`Project ${filename} returned HTML instead of markdown`);
          continue;
        }
        
        // Check if the text looks like a valid markdown file with frontmatter
        if (!text.trim().startsWith('---')) {
          console.error(`Project ${filename} doesn't appear to be a valid markdown file with frontmatter`);
          continue;
        }
        
        const { data, content } = matter(text);
        
        // Validate that we have at least a title
        if (!data.title) {
          console.error(`Project ${filename} is missing required title`);
          continue;
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
          content,
          language: filename.includes(`.${language}.md`) ? language : undefined
        } as Project;
      } catch (error) {
        console.error(`Error fetching ${filename}:`, error);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getLatestProjects(count: number = 3, language: string = 'en'): Promise<Project[]> {
  const projects = await getProjects(language);
  return projects.slice(0, count);
}