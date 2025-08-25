"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

// Animation variants for counter
const counterVariant = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

// Animation variants for text elements
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Sequential flip counter component with clean minimal design
function Counter({ end, duration = 2500, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [digitStates, setDigitStates] = useState<string[]>([]);
  
  // Initialize digit states with zeros
  useEffect(() => {
    const targetLength = Math.max(2, end.toString().length); // Minimum 2 digits
    setDigitStates(new Array(targetLength).fill('0'));
  }, [end]);
  
  useEffect(() => {
    if (!hasStarted || digitStates.length === 0) return;

    // Calculate increment speed based on duration and target
    const totalSteps = end;
    const stepDuration = Math.max(duration / totalSteps, 20); // Minimum 20ms per step for visibility
    let currentValue = 0;
    
    const interval = setInterval(() => {
      currentValue++;
      
      if (currentValue <= end) {
        // Update digit states for right-to-left flipping
        const targetLength = digitStates.length;
        const valueStr = currentValue.toString().padStart(targetLength, '0');
        setDigitStates(valueStr.split(''));
      } else {
        clearInterval(interval);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [end, duration, hasStarted, digitStates.length]);

  return (
    <motion.div
      variants={counterVariant}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
      className="inline-flex items-center justify-center font-sans font-bold text-4xl lg:text-5xl"
    >
      <span className="text-amber-500">{prefix}</span>
      <div className="flex relative">
        {digitStates.map((digit, index) => {
          // Calculate flip delay for right-to-left effect
          const reverseIndex = digitStates.length - 1 - index;
          const flipDelay = reverseIndex * 15; // Right-most digit flips first
          
          return (
            <FlipDigit 
              key={index}
              currentDigit={digit}
              delay={flipDelay}
            />
          );
        })}
      </div>
      <span className="text-amber-500">{suffix}</span>
    </motion.div>
  );
}

// Clean minimal flip digit component without backgrounds
function FlipDigit({ currentDigit, delay = 0 }: { currentDigit: string; delay?: number }) {
  const [displayDigit, setDisplayDigit] = useState('0');
  const [previousDigit, setPreviousDigit] = useState('0');
  const [isFlipping, setIsFlipping] = useState(false);
  
  useEffect(() => {
    if (currentDigit !== displayDigit) {
      // Start flip animation with delay for right-to-left effect
      const delayTimeout = setTimeout(() => {
        setPreviousDigit(displayDigit);
        setIsFlipping(true);
        
        // Update digit mid-flip
        const flipTimeout = setTimeout(() => {
          setDisplayDigit(currentDigit);
        }, 150);
        
        // End flip animation
        const endTimeout = setTimeout(() => {
          setIsFlipping(false);
        }, 300);
        
        return () => {
          clearTimeout(flipTimeout);
          clearTimeout(endTimeout);
        };
      }, delay);
      
      return () => clearTimeout(delayTimeout);
    }
  }, [currentDigit, displayDigit, delay]);

  return (
    <div 
      className="relative mx-[0.1em]"
      style={{ 
        width: '0.4em',
        height: '1em',
        fontSize: 'inherit'
      }}
    >
      {/* Container with perspective for 3D effect */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: '120px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Current digit (bottom half appears during flip) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-amber-500"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <motion.span 
            className="font-bold leading-none select-none"
            style={{ 
              fontSize: '0.9em',
            }}
            animate={{
              filter: isFlipping ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : 'blur(0px)',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            {displayDigit}
          </motion.span>
        </motion.div>
        
        {/* Flipping digit (shows previous digit flipping away) */}
        {isFlipping && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-amber-500"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
            }}
            initial={{ rotateX: 0 }}
            animate={{ 
              rotateX: [0, -90],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 0.15,
              ease: [0.42, 0, 0.58, 1],
            }}
          >
            <span 
              className="font-bold leading-none select-none"
              style={{ 
                fontSize: '0.9em',
                filter: 'blur(1px)',
              }}
            >
              {previousDigit}
            </span>
          </motion.div>
        )}
        
        {/* New digit flipping in */}
        {isFlipping && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-amber-500"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
            }}
            initial={{ 
              rotateX: 90,
              opacity: 0,
            }}
            animate={{ 
              rotateX: [90, 0],
              opacity: [0, 0.8, 1],
            }}
            transition={{
              duration: 0.15,
              delay: 0.15,
              ease: [0.42, 0, 0.58, 1],
            }}
          >
            <span 
              className="font-bold leading-none select-none"
              style={{ 
                fontSize: '0.9em',
                filter: 'blur(1px)',
              }}
            >
              {currentDigit}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function TrustSection() {
  const { t } = useTranslation();
  
  const stats = [
    {
      value: 100,
      suffix: "%",
      label: t("trust.stats.clientSatisfaction.label") as string,
      description: t("trust.stats.clientSatisfaction.description") as string
    },
    {
      value: 50,
      suffix: "+",
      label: t("trust.stats.projectsDelivered.label") as string,
      description: t("trust.stats.projectsDelivered.description") as string
    },
    {
      value: 20,
      suffix: "+",
      label: t("trust.stats.enterpriseClients.label") as string,
      description: t("trust.stats.enterpriseClients.description") as string
    },
    {
      value: 75,
      suffix: "%",
      label: t("trust.stats.timeReduction.label") as string,
      description: t("trust.stats.timeReduction.description") as string
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Hero-style radial gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 0%,rgb(248, 248, 248) 40%,rgb(239, 201, 137) 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-100/20 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Main headline with compelling trust message */}
          <motion.h2 
            className="text-5xl lg:text-5xl font-sans font-bold text-gray-900 leading-tight mb-6"
            variants={fadeInUp}
          >
            {t("trust.title")}{" "}
            <span className="text-transparent font-caveat bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {t("trust.titleHighlight")}&nbsp;
            </span>
          </motion.h2>
          
          {/* Supporting text that builds confidence */}
          <motion.p 
            className="text-xl font-mono text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {t("trust.subtitle")}
          </motion.p>

          {/* Statistics grid with animated counters */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={counterVariant}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative">
                  {/* Counter with animated number */}
                  <div className="mb-2">
                    <Counter 
                      end={stat.value} 
                      suffix={stat.suffix}
                      duration={2500 + (index * 200)} // Stagger the animation timing
                    />
                  </div>
                  
                  {/* Stat label */}
                  <h3 className="text-lg font-sans font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {stat.label}
                  </h3>
                  
                  {/* Stat description */}
                  <p className="text-sm font-mono text-gray-500">
                    {stat.description}
                  </p>

                  {/* Subtle accent line */}
                  <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional trust reinforcement */}
          <motion.div 
            className="mt-16 p-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg max-w-2xl mx-auto"
            variants={fadeInUp}
            whileHover={{ 
              y: -4,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <p className="text-lg font-mono text-gray-700 leading-relaxed">
              <span className="text-amber-600 font-semibold">&ldquo;{t("trust.testimonialQuote")}</span> 
              {" "}{t("trust.testimonialText")}
            </p>
            <div className="text-lg font-mono text-gray-700 leading-relaxed ">
              {t("trust.testimonialSubtext")}&rdquo;
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}