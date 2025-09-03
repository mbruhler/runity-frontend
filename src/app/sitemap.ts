import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://runity.pl';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
  
  // Dynamic blog posts
  const blogPosts: MetadataRoute.Sitemap = [];
  try {
    const blogDir = path.join(process.cwd(), 'public', 'blog');
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      const uniqueSlugs = new Set<string>();
      
      files.forEach(filename => {
        if (filename.endsWith('.md')) {
          // Extract slug (remove language suffix and .md extension)
          const slug = filename.replace(/\.(en|pl)\.md$/, '').replace('.md', '');
          uniqueSlugs.add(slug);
        }
      });
      
      uniqueSlugs.forEach(slug => {
        blogPosts.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error);
  }
  
  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = [];
  try {
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    if (fs.existsSync(projectsDir)) {
      const files = fs.readdirSync(projectsDir);
      const uniqueSlugs = new Set<string>();
      
      files.forEach(filename => {
        if (filename.endsWith('.md')) {
          // Extract slug (remove language suffix and .md extension)
          const slug = filename.replace(/\.(en|pl)\.md$/, '').replace('.md', '');
          uniqueSlugs.add(slug);
        }
      });
      
      uniqueSlugs.forEach(slug => {
        projectPages.push({
          url: `${baseUrl}/projects/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error reading projects for sitemap:', error);
  }
  
  return [...staticPages, ...blogPosts, ...projectPages];
}