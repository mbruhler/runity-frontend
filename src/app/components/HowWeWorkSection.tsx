"use client";

import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  Users, 
  FileText, 
  Wrench, 
  Trophy,
  CheckCircle
} from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Icon mapping for steps with colors (soft pastel palette)
const stepIcons = [
  { icon: MessageCircle, gradient: "from-teal-300 to-cyan-400" },        // Soft teal
  { icon: Search, gradient: "from-sky-300 to-blue-400" },                // Soft sky blue
  { icon: Users, gradient: "from-violet-300 to-purple-400" },            // Soft lavender
  { icon: FileText, gradient: "from-pink-300 to-rose-400" },             // Soft pink
  { icon: Wrench, gradient: "from-amber-300 to-orange-400" },            // Soft amber
  { icon: Trophy, gradient: "from-yellow-300 to-amber-400" }             // Soft gold
];

// Animation Variants
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function HowWeWorkSection() {
  const { t, tArray } = useTranslation();
  const { scrollToSection } = useSmoothScroll();

  // Get steps from translations
  const steps = [1, 2, 3, 4, 5, 6].map((num, index) => ({
    number: `0${num}`,
    title: t(`process.steps.${num}.title`) as string,
    description: t(`process.steps.${num}.description`) as string,
    highlights: tArray(`process.steps.${num}.highlights`),
    icon: stepIcons[index].icon,
    gradient: stepIcons[index].gradient
  }));

  return (
    <section id="process" className="py-20  bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-gray-900 mb-4">
            {t("process.title")}
          </h2>
          <p className="text-lg font-mono text-gray-600 max-w-3xl mx-auto">
            {t("process.subtitle")}
          </p>
        </motion.div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block relative w-full px-8">
          {/* Horizontal Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600" />
          
          {/* Steps Grid */}
          <motion.div 
            className="grid grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.number}
                  className="relative"
                  variants={fadeInUp}
                >
                  {/* Icon Circle */}
                  <div
                    className="relative z-10 flex items-center justify-center w-32 h-32 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20" />
                    <div className={`relative bg-gradient-to-br ${step.gradient} rounded-full p-6 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    {/* Step Number */}
                    <span className="absolute -bottom-2 -right-2 text-2xl font-sans font-bold text-amber-600 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-sans font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <Card className="font-mono text-xs text-gray-600 mb-3 p-4">
                      {step.description}
                    </Card>
                    
                    {/* Highlights - Only show first 2 */}
                    <div className="flex flex-col gap-1 items-center">
                      {step.highlights.slice(0, 2).map((highlight, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs text-amber-700"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span className="font-mono">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical Compact */}
        <motion.div 
          className="lg:hidden space-y-6 max-w-2xl mx-auto px-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.number}
                className="relative flex gap-4"
                variants={fadeInUp}
              >
                {/* Icon and Line */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="relative z-10 flex items-center justify-center w-16 h-16 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20" />
                    <div className={`relative bg-gradient-to-br ${step.gradient} rounded-full p-3 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-amber-400 to-amber-300 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-sans font-bold text-amber-500/20">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-sans font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-mono text-sm text-gray-600 mb-3">
                      {step.description}
                    </p>
                    {/* Highlights */}
                    <div className="flex flex-col gap-2">
                      {step.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-mono"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-mono text-gray-600 mb-6">
            {t("process.ctaText")}
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-sans font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('/#contact')}
          >
            {t("process.ctaButton")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}