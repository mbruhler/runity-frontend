"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Clock, Users } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { getLatestProjects, type Project } from "@/lib/projects";

// Animation Variants
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60 
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export function ProjectsSection() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const latestProjects = await getLatestProjects(3);
      setProjects(latestProjects);
      setLoading(false);
    }
    fetchProjects();
  }, []);
  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Get the first stat value for display
  const getMainStat = (stats: Project['stats']) => {
    const statEntries = Object.entries(stats);
    if (statEntries.length > 0) {
      return {
        value: statEntries[0][1],
        key: statEntries[0][0].charAt(0).toUpperCase() + statEntries[0][0].slice(1)
      };
    }
    return null;
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-sans font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.05 }}
        >
          {t("projects.title")}
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={fadeInUp}
              custom={index}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 h-full cursor-pointer flex flex-col"
                >
                  <CardHeader className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                        <Code2 className="w-6 h-6 text-amber-500" />
                      </div>
                      <Badge variant="outline" className="text-xs font-mono">
                        {project.techStack[0]}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl  max-w-[300px] font-sans line-clamp-2 mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-mono line-clamp-3">
                      {project.description.length > 120 ? project.description.slice(0, 120) + '...' : project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="truncate max-w-[180px]">{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        {getMainStat(project.stats) && (
                          <span className="text-md font-caveat font-bold text-amber-600">
                            {getMainStat(project.stats)?.key}
                            : {getMainStat(project.stats)?.value}
                          </span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="font-mono group-hover:translate-x-1 transition-transform ml-auto"
                        >
                          {t("projects.learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Projects Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.05 }}
        >
          <Link href="/projects">
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-mono"
            >
              {t("projects.viewAll")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}