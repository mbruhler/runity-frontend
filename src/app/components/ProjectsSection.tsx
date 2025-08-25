"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, TrendingUp } from "lucide-react";

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
      duration: 0.7,
      ease: "easeOut"
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

const projects = [
  {
    title: "AI Task Manager",
    description: "A productivity tool powered by LLMs, automating scheduling and task assignments.",
    icon: <CheckCircle className="w-6 h-6 text-amber-500" />,
    stats: "40% productivity increase"
  },
  {
    title: "E-commerce Chat Assistant",
    description: "Custom AI support bot reducing response times by 70%.",
    icon: <Users className="w-6 h-6 text-amber-500" />,
    stats: "70% faster responses"
  },
  {
    title: "Financial Data Analyzer",
    description: "An AI system that processes thousands of transactions daily to detect anomalies.",
    icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
    stats: "1000+ daily transactions"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-sans font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Recent Projects
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
            >
              <Card 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 h-full"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                      {project.icon}
                    </div>
                    <Badge variant="outline" className="text-xs font-mono">
                      Case Study
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-sans">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600 font-mono mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-md font-caveat font-semibold text-amber-600">{project.stats}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="font-mono group-hover:translate-x-1 transition-transform"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}