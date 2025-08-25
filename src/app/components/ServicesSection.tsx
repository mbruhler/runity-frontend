"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Cpu, Shield, Smartphone, Terminal, Globe } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

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
      ease: "easeOut" as const
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
      ease: "easeOut" as const
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

export function ServicesSection() {
  const { t, tArray } = useTranslation();
  
  const services = [
    {
      title: t("services.items.aiStrategyConsulting.title") as string,
      description: t("services.items.aiStrategyConsulting.description") as string,
      features: tArray("services.items.aiStrategyConsulting.features"),
      icon: <Zap className="w-8 h-8 text-amber-500" />
    },
    {
      title: t("services.items.automationDevelopment.title") as string,
      description: t("services.items.automationDevelopment.description") as string,
      features: tArray("services.items.automationDevelopment.features"),
      icon: <Cpu className="w-8 h-8 text-amber-500" />
    },
    {
      title: t("services.items.llmImplementation.title") as string,
      description: t("services.items.llmImplementation.description") as string,
      features: tArray("services.items.llmImplementation.features"),
      icon: <Shield className="w-8 h-8 text-amber-500" />
    },
    {
      title: t("services.items.aiPoweredMobileApps.title") as string,
      description: t("services.items.aiPoweredMobileApps.description") as string,
      features: tArray("services.items.aiPoweredMobileApps.features"),
      icon: <Smartphone className="w-8 h-8 text-amber-500" />
    },
    {
      title: t("services.items.nativeSystemModernization.title") as string,
      description: t("services.items.nativeSystemModernization.description") as string,
      features: tArray("services.items.nativeSystemModernization.features"),
      icon: <Terminal className="w-8 h-8 text-amber-500" />
    },
    {
      title: t("services.items.customWebSolutions.title") as string,
      description: t("services.items.customWebSolutions.description") as string,
      features: tArray("services.items.customWebSolutions.features"),
      icon: <Globe className="w-8 h-8 text-amber-500" />
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
          {t("services.title")}
        </motion.h2>
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={index % 3 === 0 ? fadeInLeft : index % 3 === 2 ? fadeInRight : fadeInUp}
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