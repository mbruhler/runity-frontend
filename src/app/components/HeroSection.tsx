"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Cpu, Users, Zap } from "lucide-react";
import { HeroBackground } from "./hero-background";
import { AnimatedGrid } from "./animated-grid";
import { useTranslation } from "@/contexts/LanguageContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Link from "next/link";

export function HeroSection() {
  const { t } = useTranslation();
  const { scrollToSection } = useSmoothScroll();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Futuristic City Background Image - Multiple layers for depth */}
      <div className="absolute inset-0 z-0">
        {/* Primary city background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.4) contrast(1.2)',
          }}
        />
        {/* Secondary overlay for depth */}
        <div 
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
            filter: 'hue-rotate(120deg)',
          }}
        />
      </div>

      {/* Dramatic Gradient Overlays */}
      <div className="absolute inset-0 z-[1]">
        {/* Bottom to top gradient for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.4) 100%)`,
          }}
        />
        {/* Warm golden glow from bottom */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at bottom, rgba(251,146,60,0.15) 0%, transparent 50%)`,
          }}
        />
        {/* Cool blue atmospheric glow from top */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, rgba(34,211,238,0.1) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Animated Particles */}
      <HeroBackground />

      {/* Animated Grid Background */}
      <AnimatedGrid />

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto grid lg:grid-cols-2 gap-8 items-center h-screen py-8">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-left">
            {/* Headlines with dramatic typography */}
            <div className="space-y-4">
              <div className="inline-flex mt-10 items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm animate-fade-in-up" 
                   style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-sm font-mono font-medium text-amber-400 uppercase tracking-wider">{t("hero.badge")}</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold leading-[1.05] tracking-tight">
                <span className="block text-white drop-shadow-2xl animate-fade-in-up" 
                      style={{ textShadow: '0 20px 40px rgba(0,0,0,0.7)', animationDelay: '0.6s', animationFillMode: 'both' }}>
                  {t("hero.headline.part1")}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 drop-shadow-2xl animate-fade-in-up font-caveat" 
                      style={{ filter: 'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.5))', animationDelay: '0.8s', animationFillMode: 'both' }}>
                  {t("hero.headline.part2")}
                </span>
                <span className="block text-white drop-shadow-2xl animate-fade-in-up" 
                      style={{ textShadow: '0 20px 40px rgba(0,0,0,0.7)', animationDelay: '1s', animationFillMode: 'both' }}>
                  {t("hero.headline.part3")}
                </span>
              </h1>
              
              <p className="text-xl font-mono text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" 
                 style={{ animationDelay: '1.2s', animationFillMode: 'both', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {t("hero.description")}
              </p>
            </div>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" 
                 style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-7 text-lg font-mono font-semibold shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group border-0 hover:scale-105"
                onClick={() => scrollToSection('/#contact')}
              >
                {t("buttons.startYourAIJourney")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/projects">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-amber-400/40 text-amber-400 hover:bg-amber-400/10 hover:text-white backdrop-blur-sm px-10 py-7 text-lg font-mono font-semibold transition-all duration-300 hover:border-amber-400/60 hover:scale-105"
                >
                  {t("buttons.viewCaseStudies")}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8 animate-fade-in-up" 
                 style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">{t("hero.trustIndicators.enterpriseReady")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">{t("hero.trustIndicators.advancedAIModels")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">{t("hero.trustIndicators.expertTeam")}</span>
              </div>
            </div>
          </div>

            <div className="w-full h-full flex justify-center items-center animate-fade-in-up" 
                 style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>
              <DotLottieReact
      src="https://lottie.host/20d5df68-0864-4a0b-b7ab-cf34e80b44f2/HYbdjw8lOD.lottie"
      loop
                autoplay
              />          
            </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="relative">
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-400 to-transparent rounded-full mt-2 animate-bounce" />
          </div>
          <div className="absolute -inset-2 border-2 border-amber-400/20 rounded-full animate-ping" />
        </div>
      </div>
    </section>
  );
}