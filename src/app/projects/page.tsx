'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Users, Code2, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getProjects, type Project } from '@/lib/projects';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-56 pb-32 bg-gradient-to-br from-gray-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-gray-900 mb-6">
              {t('projects.title') || 'Our Projects'}
            </h1>
            <p className="text-xl font-mono text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('projects.subtitle') || 'Explore our portfolio of successful AI automation implementations'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div className="relative h-64 md:h-full bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-mono">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-sans font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </h2>
                      
                      <p className="font-mono text-gray-600 mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6 text-sm font-mono text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(project.date)}</span>
                        </div>
                      </div>

                      {Object.keys(project.stats).length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {Object.entries(project.stats).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl font-sans font-bold text-amber-600">
                                {value}
                              </div>
                              <div className="text-xs font-mono text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center font-mono text-amber-600 font-semibold group">
                        <span>{t('projects.viewDetails') || 'View Case Study'}</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection variant="projects" />

      {/* Footer */}
      <Footer />
    </div>
  );
}