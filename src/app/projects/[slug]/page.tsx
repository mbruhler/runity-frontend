'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Code2, 
  Lightbulb, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Expand
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getProject, type Project } from '@/lib/projects';
import { Header } from '../../components/Header';
import { Footer } from '@/app/components/Footer';
import { CTASection } from '@/app/components/CTASection';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      if (typeof params.slug === 'string') {
        const fetchedProject = await getProject(params.slug, language);
        if (!fetchedProject) {
          setNotFound(true);
        } else {
          setProject(fetchedProject);
        }
      }
      setLoading(false);
    }
    fetchProject();
  }, [params.slug, language]);

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

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-4xl font-sans font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("projectPage.notFound.title") || "Project Not Found"}
            </motion.h1>
            <motion.p 
              className="text-lg font-mono text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("projectPage.notFound.subtitle") || "The project you're looking for doesn't exist or has been moved."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-mono rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("projectPage.notFound.button") || "Back to Projects"}
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-amber-500 to-orange-600 pt-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors font-mono"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('projects.backToProjects') || 'Back to Projects'}
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-sans font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl font-mono text-white/90 max-w-3xl"
          >
            {project.description}
          </motion.p>
        </div>
      </div>

      {/* Project Info Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-6 text-sm font-mono">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{t('projects.client') || 'Client'}:</span>
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{t('projects.duration') || 'Duration'}:</span>
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{t('projects.completed') || 'Completed'}:</span>
              <span>{formatDate(project.date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            {Object.keys(project.stats).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                {Object.entries(project.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
                  >
                    <div className="text-3xl font-sans font-bold text-amber-600 mb-2">
                      {value}
                    </div>
                    <div className="text-sm font-mono text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Challenges Section */}
            {project.challenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-sans font-bold text-gray-900">
                    {t('projects.challenges') || 'Challenges'}
                  </h2>
                </div>
                <div className="bg-orange-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                        <span className="font-mono text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            )}

            {/* Solutions Section */}
            {project.solutions.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-sans font-bold text-gray-900">
                    {t('projects.solutions') || 'Solutions'}
                  </h2>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span className="font-mono text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            )}

            {/* Results Section */}
            {project.results.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-sans font-bold text-gray-900">
                    {t('projects.results') || 'Results'}
                  </h2>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="font-mono text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-sans font-bold mt-12 mb-6 text-gray-900">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-sans font-semibold mt-8 mb-4 text-gray-900">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-sans font-semibold mt-6 mb-3 text-gray-900">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 font-mono text-gray-700 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-6 space-y-2 list-disc list-inside font-mono text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 space-y-2 list-decimal list-inside font-mono text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-sans font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-amber-600">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="mb-6 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto font-mono">
                      {children}
                    </pre>
                  ),
                }}
              >
                {project.content}
              </ReactMarkdown>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-24 space-y-6"
            >
             

              {/* Tech Stack */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-sans font-semibold text-gray-900">
                    {t('projects.techStack') || 'Tech Stack'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-sans font-semibold mb-4">{t('projects.projectHighlights') || 'Project Highlights'}</h3>
                <div className="space-y-3 text-sm font-mono">
                  <div>
                    <span className="opacity-80">{t('projects.client') || 'Client'}:</span>
                    <div className="font-semibold">{project.client}</div>
                  </div>
                  <div>
                    <span className="opacity-80">{t('projects.duration') || 'Duration'}:</span>
                    <div className="font-semibold">{project.duration}</div>
                  </div>
                  <div>
                    <span className="opacity-80">{t('projects.technologies') || 'Technologies'}:</span>
                    <div className="font-semibold">{project.techStack.length} technologies</div>
                  </div>
                </div>
              </div>
               {/* Project Image */}
               {project.image && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div 
                    className="relative h-64 cursor-pointer group"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <CTASection variant="projects" />

      {/* Footer */}
      <Footer />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-white text-2xl">&times;</span>
            </button>
          </motion.div>
        </div>
      )}
    </article>
  );
}