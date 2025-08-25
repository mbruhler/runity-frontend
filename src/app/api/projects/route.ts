import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const projectsDir = join(process.cwd(), 'public', 'projects');
    const files = await readdir(projectsDir);
    
    // Filter only .md files
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    return NextResponse.json(markdownFiles);
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return NextResponse.json([]);
  }
}