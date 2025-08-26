"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  Search, 
  Users, 
  FileText, 
  Wrench, 
  Trophy,
  Info,
  ChevronDown
} from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { 
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Icon mapping for steps with enhanced gradients
const stepIcons = [
  { 
    icon: MessageCircle, 
    gradient: "from-teal-400 to-cyan-500",
    glow: "shadow-teal-500/50",
    activeGlow: "shadow-teal-400/70"
  },
  { 
    icon: Search, 
    gradient: "from-sky-400 to-blue-500",
    glow: "shadow-sky-500/50",
    activeGlow: "shadow-sky-400/70"
  },
  { 
    icon: Users, 
    gradient: "from-violet-400 to-purple-500",
    glow: "shadow-violet-500/50",
    activeGlow: "shadow-violet-400/70"
  },
  { 
    icon: FileText, 
    gradient: "from-pink-400 to-rose-500",
    glow: "shadow-pink-500/50",
    activeGlow: "shadow-pink-400/70"
  },
  { 
    icon: Wrench, 
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/50",
    activeGlow: "shadow-amber-400/70"
  },
  { 
    icon: Trophy, 
    gradient: "from-yellow-400 to-amber-500",
    glow: "shadow-yellow-500/50",
    activeGlow: "shadow-yellow-400/70"
  }
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
  const [expandedMobileStep, setExpandedMobileStep] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  

  // Get steps from translations with enhanced properties
  const steps = [1, 2, 3, 4, 5, 6].map((num, index) => ({
    number: `0${num}`,
    title: t(`process.steps.${num}.title`) as string,
    description: t(`process.steps.${num}.description`) as string,
    highlights: tArray(`process.steps.${num}.highlights`),
    icon: stepIcons[index].icon,
    gradient: stepIcons[index].gradient,
    glow: stepIcons[index].glow,
    activeGlow: stepIcons[index].activeGlow
  }));
  
  // Track active step based on scroll
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    
    const handleScroll = () => {
      const nodes = timeline.querySelectorAll('.timeline-node');
      if (!nodes) return;
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
          setCompletedSteps(prev => new Set([...prev, ...Array.from({length: index + 1}, (_, i) => i)]));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative"
    >
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="w-full relative z-10">
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
        <div ref={timelineRef} className="hidden lg:block relative w-full px-8">
          {/* SVG Timeline with curved path */}
          <svg 
            className="absolute top-0 left-0 w-full h-40" 
            preserveAspectRatio="none"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(251 191 36)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(245 158 11)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(217 119 6)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="timeline-progress" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(20 184 166)" />
                <stop offset="50%" stopColor="rgb(6 182 212)" />
                <stop offset="100%" stopColor="rgb(59 130 246)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background track - goes through node centers */}
            <path
              d="M 100 128 L 267 128 L 433 128 L 600 128 L 767 128 L 933 128"
              fill="none"
              stroke="url(#timeline-gradient)"
              strokeWidth="6"
              opacity="0.2"
            />
            
            
            {/* Static progress line */}
            <path
              d="M 100 128 L 267 128 L 433 128 L 600 128 L 767 128 L 933 128"
              fill="none"
              stroke="url(#timeline-progress)"
              strokeWidth="6"
              filter="url(#glow)"
              opacity="0.8"
            />
            
          </svg>
          
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
                  className="relative timeline-node"
                  variants={fadeInUp}
                >
                  <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div className="cursor-pointer group">
                        {/* Enhanced Icon Circle */}
                        <div
                          className="relative z-10 flex items-center justify-center w-32 h-32 mx-auto mb-6"
                        >
                          
                          {/* Glass morphism card */}
                          <div className={`
                            absolute inset-0 rounded-full 
                            bg-white/10 backdrop-blur-md 
                            border border-white/20
                            ${completedSteps.has(index) ? 'opacity-100' : 'opacity-0'}
                            transition-opacity duration-500
                          `} />
                          
                          {/* Main icon container */}
                          <div className={`
                            relative bg-gradient-to-br ${step.gradient} 
                            rounded-full p-6 
                            shadow-2xl ${activeStep === index ? step.activeGlow : step.glow}
                            transition-all duration-300
                            ${completedSteps.has(index) ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-transparent' : ''}
                          `}>
                            <Icon className="w-12 h-12 text-white" />
                            
                          </div>
                          
                          {/* Step Number with glow */}
                          <span 
                            className={`
                              absolute -bottom-2 -right-2 
                              text-2xl font-sans font-bold 
                              bg-white rounded-full 
                              w-10 h-10 flex items-center justify-center 
                              shadow-lg
                              ${activeStep === index ? 'text-transparent bg-clip-text bg-gradient-to-br ' + step.gradient : 'text-gray-600'}
                              transition-all duration-300
                            `}
                          >
                            {index + 1}
                          </span>
                        </div>

                        {/* Enhanced Content */}
                        <div className="text-center">
                          <h3 
                            className={`
                              text-lg font-sans font-bold mb-2 
                              transition-all duration-300
                              ${activeStep === index 
                                ? 'text-transparent bg-clip-text bg-gradient-to-br ' + step.gradient
                                : completedSteps.has(index)
                                  ? 'text-gray-700'
                                  : 'text-gray-900 group-hover:text-amber-600'
                              }
                            `}
                          >
                            {step.title}
                          </h3>
                          
                          
                          {/* Visual indicator for more info */}
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className="inline-flex items-center gap-1 text-xs text-gray-400 group-hover:text-amber-500 transition-colors"
                                >
                                  <Info className="w-3 h-3" />
                                  <span className="font-mono">{t("process.hoverForDetails")}</span>
                                </div>
                              </TooltipTrigger>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    
                    {/* Enhanced Hover Content with glassmorphism */}
                    <HoverCardContent 
                      className="w-80 bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl" 
                      align="center" 
                      side="bottom"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-sans font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm font-mono text-gray-600">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* All Highlights in hover */}
                        {step.highlights.length > 0 && (
                          <div className="border-t pt-3">
                            <p className="text-xs font-semibold text-gray-700 mb-2">{t("process.keyPoints")}</p>
                            <div className="flex flex-col gap-2">
                              {step.highlights.map((highlight, idx) => (
                                <div
                                  key={idx}
                                  className="inline-flex items-start gap-2 text-xs"
                                >
                                 
                                  <span className="font-mono text-gray-600">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical with connected line */}
        <div className="lg:hidden relative max-w-2xl mx-auto px-4">
          {/* Vertical SVG Timeline */}
          <svg 
            className="absolute left-12 top-0 w-20 h-full" 
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <linearGradient id="vertical-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(251 191 36)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(245 158 11)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(217 119 6)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="vertical-progress" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(20 184 166)" />
                <stop offset="50%" stopColor="rgb(6 182 212)" />
                <stop offset="100%" stopColor="rgb(59 130 246)" />
              </linearGradient>
            </defs>
            
            {/* Background track */}
            <line
              x1="32"
              y1="40"
              x2="32"
              y2="calc(100% - 40px)"
              stroke="url(#vertical-gradient)"
              strokeWidth="4"
              opacity="0.2"
            />
            
            
            {/* Static progress line */}
            <line
              x1="32"
              y1="40"
              x2="32"
              y2="calc(100% - 40px)"
              stroke="url(#vertical-progress)"
              strokeWidth="4"
              opacity="0.8"
              filter="drop-shadow(0 0 6px rgba(20, 184, 166, 0.6))"
            />
            
          </svg>
          
          <motion.div 
            className="relative space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = expandedMobileStep === index;
            
            return (
              <motion.div
                key={step.number}
                className="relative flex gap-4 timeline-node"
                variants={fadeInUp}
              >
                {/* Enhanced Icon with animations */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="relative z-20 flex items-center justify-center w-16 h-16 flex-shrink-0"
                  >
                    
                    <div className={`
                      relative bg-gradient-to-br ${step.gradient} 
                      rounded-full p-3 
                      shadow-xl ${activeStep === index ? step.activeGlow : step.glow}
                      ${completedSteps.has(index) ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-transparent' : ''}
                      transition-all duration-300
                    `}>
                      <Icon className="w-6 h-6 text-white" />
                      
                    </div>
                  </div>
                </div>

                {/* Enhanced Content with glassmorphism */}
                <div className="flex-1 pb-6">
                  <motion.div 
                    className={`
                      relative p-4 rounded-xl cursor-pointer 
                      transition-all duration-300
                      ${activeStep === index 
                        ? 'bg-white/90 shadow-xl scale-[1.02]' 
                        : 'bg-white/70 shadow-md hover:shadow-lg hover:bg-white/80'
                      }
                      backdrop-blur-sm border border-white/20
                    `}
                    onClick={() => setExpandedMobileStep(isExpanded ? null : index)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className={`
                            text-3xl font-sans font-bold
                            ${activeStep === index 
                              ? 'text-transparent bg-clip-text bg-gradient-to-br ' + step.gradient
                              : 'text-amber-500/20'
                            }
                          `}
                          animate={{
                            scale: activeStep === index ? [1, 1.1, 1] : 1
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: activeStep === index ? Infinity : 0
                          }}
                        >
                          {step.number}
                        </motion.span>
                        <h3 className={`
                          text-lg font-sans font-bold
                          ${activeStep === index 
                            ? 'text-transparent bg-clip-text bg-gradient-to-br ' + step.gradient
                            : 'text-gray-900'
                          }
                          transition-colors duration-300
                        `}>
                          {step.title}
                        </h3>
                      </div>
                      {/* Expand/Collapse Indicator */}
                      <div
                        className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <ChevronDown className="w-5 h-5 text-amber-500" />
                      </div>
                    </div>
                    
                    {/* Expandable Content */}
                    <div
                      className={`
                        transition-all duration-300 ease-in-out
                        ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                      `}
                      style={{ overflow: "hidden" }}
                    >
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
                            <span className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Info indicator at bottom */}
                    <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-amber-100">
                      <Info className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-mono text-amber-600">
                        {isExpanded ? t("process.tapToCollapse") : t("process.tapForDetails")}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
          </motion.div>
        </div>

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