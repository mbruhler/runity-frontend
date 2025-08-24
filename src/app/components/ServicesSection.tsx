"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Cpu, Shield } from "lucide-react";

// Animation Variants for Services
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

const fadeInLeft = {
  initial: { 
    opacity: 0, 
    x: -60 
  },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  initial: { 
    opacity: 0, 
    x: 60 
  },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
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

export function ServicesSection() {
  const services = [
    {
      title: "AI Strategy Consulting",
      description: "Define and implement AI strategies tailored to your business goals and industry requirements.",
      features: ["Custom AI roadmap", "Technology assessment", "ROI analysis"],
      icon: <Zap className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Automation Development",
      description: "Build intelligent automation solutions that streamline operations and enhance productivity.",
      features: ["Process automation", "Custom integrations", "Workflow optimization"],
      icon: <Cpu className="w-8 h-8 text-amber-500" />
    },
    {
      title: "LLM Implementation",
      description: "Deploy and fine-tune large language models for your specific use cases and requirements.",
      features: ["Model selection", "Fine-tuning", "Production deployment"],
      icon: <Shield className="w-8 h-8 text-amber-500" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-sans font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Services
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={index === 0 ? fadeInLeft : index === 2 ? fadeInRight : fadeInUp}
            >
              <Card 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 h-full"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-sans text-center">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 font-mono mt-2 text-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="font-mono">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}