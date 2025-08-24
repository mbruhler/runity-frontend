"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Cpu, Users } from "lucide-react";

export function HeroContentParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Content parallax transformations
  const contentY = useTransform(smoothProgress, [0, 1], [0, -300]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -250]);
  const buttonsY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const badgesY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const visualY = useTransform(smoothProgress, [0, 1], [0, -400]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0]);
  
  // Floating elements parallax
  const float1Y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const float2Y = useTransform(smoothProgress, [0, 1], [0, -180]);
  const float3Y = useTransform(smoothProgress, [0, 1], [0, -220]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8"
      style={{ y: contentY, scale, opacity }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center h-screen py-8">
        {/* Left Side - Text Content with Parallax */}
        <motion.div className="space-y-6 text-left" style={{ y: textY }}>
          {/* Headlines with dramatic typography */}
          <div className="space-y-3 mt-10">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm animate-fade-in-up" 
              style={{ animationDelay: '0.4s', animationFillMode: 'both', y: float1Y }}
            >
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-sm font-mono font-medium text-amber-400 uppercase tracking-wider">Next-Gen AI Automation</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold leading-[1.05] tracking-tight">
              <motion.span 
                className="block text-white drop-shadow-2xl animate-fade-in-up" 
                style={{ 
                  textShadow: '0 20px 40px rgba(0,0,0,0.7)', 
                  animationDelay: '0.6s', 
                  animationFillMode: 'both',
                  y: float1Y
                }}
              >
                Build AI Systems
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 drop-shadow-2xl animate-fade-in-up font-caveat" 
                style={{ 
                  filter: 'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.5))', 
                  animationDelay: '0.8s', 
                  animationFillMode: 'both',
                  y: float2Y
                }}
              >
                That Transform
              </motion.span>
              <motion.span 
                className="block text-white drop-shadow-2xl animate-fade-in-up" 
                style={{ 
                  textShadow: '0 20px 40px rgba(0,0,0,0.7)', 
                  animationDelay: '1s', 
                  animationFillMode: 'both',
                  y: float3Y
                }}
              >
                Your Business
              </motion.span>
            </h1>
            
            <p className="text-xl font-mono text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" 
               style={{ animationDelay: '1.2s', animationFillMode: 'both', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              We architect intelligent automation solutions that eliminate repetitive tasks, 
              accelerate growth, and unlock your team's full potential.
            </p>
          </div>

          {/* CTA Buttons with enhanced styling and parallax */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" 
            style={{ animationDelay: '1.4s', animationFillMode: 'both', y: buttonsY }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700  text-white px-10 py-7 text-lg font-mono font-semibold shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group border-0 hover:scale-105"
            >
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-amber-400/40 text-amber-400 hover:text-white hover:bg-amber-400/10 backdrop-blur-sm px-10 py-7 text-lg font-mono font-semibold transition-all duration-300 hover:border-amber-400/60 hover:scale-105 group"
            >
              <span className="transition-colors duration-300">View Case Studies</span>
            </Button>
          </motion.div>

          {/* Trust Indicators with parallax */}
          <motion.div 
            className="flex flex-wrap gap-6 pt-8 animate-fade-in-up" 
            style={{ animationDelay: '1.6s', animationFillMode: 'both', y: badgesY }}
          >
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono text-gray-300">Enterprise Ready</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono text-gray-300">Advanced AI Models</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono text-gray-300">Expert Team</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Visual Element with enhanced parallax */}
        <motion.div 
          className="hidden lg:flex items-center justify-center relative animate-fade-in-up" 
          style={{ animationDelay: '1.8s', animationFillMode: 'both', y: visualY }}
        >
          <div className="relative">
            {/* Glowing orb effect with parallax */}
            <motion.div 
              className="absolute inset-0 blur-3xl opacity-30 animate-glow"
              style={{ y: float2Y }}
            >
              <div className="w-96 h-96 bg-gradient-to-br from-amber-400 via-orange-500 to-cyan-500 rounded-full" />
            </motion.div>
            
            {/* Tech visualization with parallax layers */}
            <motion.div 
              className="relative z-10 w-96 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center animate-float"
              whileHover={{ rotateY: 10, rotateX: -5 }}
              style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
            >
              <div className="text-center space-y-6">
                <div className="relative">
                  <Cpu className="w-24 h-24 text-amber-400 mx-auto" />
                  <div className="absolute inset-0 w-24 h-24 mx-auto animate-ping">
                    <Cpu className="w-24 h-24 text-amber-400/30" />
                  </div>
                </div>
                <div className="space-y-3">
                  <motion.div 
                    className="h-2 w-48 bg-gradient-to-r from-amber-400/20 to-amber-400/40 rounded-full animate-pulse" 
                    style={{ animationDelay: '0.2s', y: float1Y }} 
                  />
                  <motion.div 
                    className="h-2 w-36 bg-gradient-to-r from-cyan-400/20 to-cyan-400/40 rounded-full animate-pulse mx-auto" 
                    style={{ animationDelay: '0.4s', y: float2Y }} 
                  />
                  <motion.div 
                    className="h-2 w-40 bg-gradient-to-r from-amber-400/20 to-amber-400/40 rounded-full animate-pulse mx-auto" 
                    style={{ animationDelay: '0.6s', y: float3Y }} 
                  />
                </div>
                <div className="text-amber-400/60 text-sm font-mono">
                  <span className="animate-pulse">AI Processing...</span>
                </div>
              </div>
            </motion.div>
            
            {/* Additional floating elements with parallax */}
            <motion.div 
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-xl animate-float" 
              style={{ animationDelay: '1s', y: float1Y }} 
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-xl animate-float" 
              style={{ animationDelay: '2s', y: float3Y }} 
            />
          </div>
        </motion.div>
      </div>
      
      {/* Animated Scroll Indicator with parallax */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ y: badgesY }}
      >
        <div className="relative">
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-400 to-transparent rounded-full mt-2 animate-bounce" />
          </div>
          <div className="absolute -inset-2 border-2 border-amber-400/20 rounded-full animate-ping" />
        </div>
      </motion.div>
    </motion.div>
  );
}