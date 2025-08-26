"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "@/contexts/LanguageContext";

const companies = [
  { id: 1, name: "TechCorp Solutions" },
  { id: 2, name: "InnovateAI Labs" },
  { id: 3, name: "DataFlow Systems" },
  { id: 4, name: "AutomateNow Inc" },
  { id: 5, name: "NextGen Analytics" },
  { id: 6, name: "SmartOps Digital" },
  { id: 7, name: "AI Dynamics" },
  { id: 8, name: "FutureScale Ventures" },
  { id: 9, name: "CloudTech Innovations" },
  { id: 10, name: "Digital Transform Co" }
];

// Duplicate companies array for seamless infinite scroll
const duplicatedCompanies = [...companies, ...companies];

export function ReferencesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Parallax transformations for background
  const bgY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.1, 0.3]);
  
  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gray-50 w-full">
      {/* Parallax background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-transparent to-cyan-50"
          style={{ opacity: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/20 to-transparent"
          style={{ opacity: bgOpacity }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title with parallax */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.05 }}
        >
          <h2 className="text-3xl font-sans font-bold text-gray-900 mb-4">
            {t("references.title")}
          </h2>
        </motion.div>
      </div>

      {/* Full-width infinite scrolling carousel with depth */}
      <div className="w-full overflow-hidden relative z-10">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [-50 * companies.length * 8, 0 ] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80,
              ease: "linear"
            }
          }}
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {duplicatedCompanies.map((company, index) => (
            <motion.div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-lg h-20 flex items-center justify-center px-8 hover:shadow-lg transition-shadow duration-300 group transform-gpu"
              style={{ minWidth: "280px" }}
              whileHover={{ 
                y: -2,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <span className="text-lg font-mono font-semibold text-gray-600 group-hover:text-amber-600 transition-colors duration-300 whitespace-nowrap">
                {company.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}