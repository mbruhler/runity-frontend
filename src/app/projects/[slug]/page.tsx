import { Metadata } from 'next';
import { generateProjectMetadata } from './metadata';
import ProjectClient from './page-client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generateProjectMetadata(slug);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}