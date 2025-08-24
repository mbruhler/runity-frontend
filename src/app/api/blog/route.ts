import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const blogDir = join(process.cwd(), 'public', 'blog');
    const files = await readdir(blogDir);
    
    // Filter only .md files
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    return NextResponse.json(markdownFiles);
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return NextResponse.json([]);
  }
}