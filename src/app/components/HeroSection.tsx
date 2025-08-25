"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Cpu, Users, Zap } from "lucide-react";
import { HeroBackground } from "./hero-background";
import { AnimatedGrid } from "./animated-grid";

export function HeroSection() {
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
            filter: 'brightness(0.3) contrast(1.2)',
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
            filter: 'hue-rotate(180deg)',
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
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center h-screen py-8">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-left">
            {/* Headlines with dramatic typography */}
            <div className="space-y-4">
              <div className="inline-flex mt-10 items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm animate-fade-in-up" 
                   style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-sm font-mono font-medium text-amber-400 uppercase tracking-wider">Next-Gen AI Automation</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold leading-[1.05] tracking-tight">
                <span className="block text-white drop-shadow-2xl animate-fade-in-up" 
                      style={{ textShadow: '0 20px 40px rgba(0,0,0,0.7)', animationDelay: '0.6s', animationFillMode: 'both' }}>
                  Build AI Systems
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 drop-shadow-2xl animate-fade-in-up font-caveat" 
                      style={{ filter: 'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.5))', animationDelay: '0.8s', animationFillMode: 'both' }}>
                  That Transform
                </span>
                <span className="block text-white drop-shadow-2xl animate-fade-in-up" 
                      style={{ textShadow: '0 20px 40px rgba(0,0,0,0.7)', animationDelay: '1s', animationFillMode: 'both' }}>
                  Your Business
                </span>
              </h1>
              
              <p className="text-xl font-mono text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" 
                 style={{ animationDelay: '1.2s', animationFillMode: 'both', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                We architect intelligent automation solutions that eliminate repetitive tasks, 
                accelerate growth, and unlock your team's full potential.
              </p>
            </div>

            {/* CTA Buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" 
                 style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-7 text-lg font-mono font-semibold shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group border-0 hover:scale-105"
              >
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-amber-400/40 text-amber-400 hover:bg-amber-400/10 hover:text-white backdrop-blur-sm px-10 py-7 text-lg font-mono font-semibold transition-all duration-300 hover:border-amber-400/60 hover:scale-105"
              >
                View Case Studies
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8 animate-fade-in-up" 
                 style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">Advanced AI Models</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-gray-300">Expert Team</span>
              </div>
            </div>
          </div>

          {/* Right Side - AI Process Flow Visualization */}
          <div className="hidden lg:flex items-center justify-center relative animate-fade-in-up" 
               style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>
            <div className="relative w-[500px] h-[500px]">
              {/* Main container with glass effect */}
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden">
                {/* Node Network Background */}
                <div className="absolute inset-0 p-12">
                  {/* Central AI Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <Cpu className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full animate-ping" />
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-amber-400 font-semibold">AI Core</span>
                      </div>
                    </div>
                  </div>

                  {/* Process Nodes with Labels */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-cyan-400/30" style={{ animationDelay: '0.5s' }}>
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-cyan-400 font-semibold">Data Input</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-green-400/30" style={{ animationDelay: '1s' }}>
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-green-400 font-semibold">Output</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-400/30" style={{ animationDelay: '1.5s' }}>
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-purple-400 font-semibold">Processing</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-pink-400/30" style={{ animationDelay: '2s' }}>
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-pink-400 font-semibold">Analytics</span>
                      </div>
                    </div>
                  </div>

                  {/* Data Beams - Animated SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none">
                    {/* Vertical beams */}
                    <line x1="250" y1="100" x2="250" y2="250" stroke="url(#beam1)" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="stroke-dasharray" values="0,200;20,200;0,200" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </line>
                    <line x1="250" y1="250" x2="250" y2="400" stroke="url(#beam2)" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="stroke-dasharray" values="0,200;20,200;0,200" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    
                    {/* Horizontal beams */}
                    <line x1="100" y1="250" x2="250" y2="250" stroke="url(#beam3)" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="stroke-dasharray" values="0,200;20,200;0,200" dur="3s" repeatCount="indefinite" begin="1s" />
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="250" y1="250" x2="400" y2="250" stroke="url(#beam4)" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="stroke-dasharray" values="0,200;20,200;0,200" dur="2.8s" repeatCount="indefinite" begin="1.5s" />
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" begin="1.5s" />
                    </line>

                    {/* Circular data packets */}
                    <circle r="4" fill="rgba(34, 211, 238, 0.8)">
                      <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath href="#path1"/>
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="rgba(34, 197, 94, 0.8)">
                      <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
                        <mpath href="#path2"/>
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="rgba(168, 85, 247, 0.8)">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                        <mpath href="#path3"/>
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="rgba(236, 72, 153, 0.8)">
                      <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.5s">
                        <mpath href="#path4"/>
                      </animateMotion>
                    </circle>

                    {/* Motion paths */}
                    <defs>
                      <path id="path1" d="M 250 100 L 250 250" />
                      <path id="path2" d="M 250 250 L 250 400" />
                      <path id="path3" d="M 100 250 L 250 250" />
                      <path id="path4" d="M 250 250 L 400 250" />

                      <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34 211 238 / 0.8)" />
                        <stop offset="50%" stopColor="rgb(251 146 60 / 1)" />
                        <stop offset="100%" stopColor="rgb(34 211 238 / 0.8)" />
                      </linearGradient>
                      <linearGradient id="beam2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(251 146 60 / 0.8)" />
                        <stop offset="50%" stopColor="rgb(34 197 94 / 1)" />
                        <stop offset="100%" stopColor="rgb(34 197 94 / 0.8)" />
                      </linearGradient>
                      <linearGradient id="beam3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(168 85 247 / 0.8)" />
                        <stop offset="50%" stopColor="rgb(251 146 60 / 1)" />
                        <stop offset="100%" stopColor="rgb(251 146 60 / 0.8)" />
                      </linearGradient>
                      <linearGradient id="beam4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(251 146 60 / 0.8)" />
                        <stop offset="50%" stopColor="rgb(236 72 153 / 1)" />
                        <stop offset="100%" stopColor="rgb(236 72 153 / 0.8)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Enhanced ambient glow effects */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-amber-400/25 to-orange-500/25 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-20 w-18 h-18 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 right-20 w-18 h-18 bg-gradient-to-br from-pink-400/15 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
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