"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, BookOpen, Send, CheckCircle, Zap, Shield, Cpu } from "lucide-react";
import { HeroBackground } from "./components/hero-background";
import { AnimatedGrid } from "./components/animated-grid";
import { Header } from "./components/Header";
import { ServicesSection } from "./components/ServicesSection";
import { ReferencesCarousel } from "./components/ReferencesCarousel";
import { getBlogPosts, BlogPost } from "@/lib/blog";

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

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts.slice(0, 3)); // Get only the first 3 posts for home page
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Header */}
      <Header />
      
      {/* Hero Section with Parallax Background */}
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

            {/* Right Side - Visual Element (can be replaced with actual graphics) */}
            <div className="hidden lg:flex items-center justify-center relative animate-fade-in-up" 
                 style={{ animationDelay: '1.8s', animationFillMode: 'both' }}>
              <div className="relative">
                {/* Glowing orb effect */}
                <div className="absolute inset-0 blur-3xl opacity-30 animate-glow">
                  <div className="w-96 h-96 bg-gradient-to-br from-amber-400 via-orange-500 to-cyan-500 rounded-full" />
                </div>
                {/* Tech visualization placeholder */}
                <div className="relative z-10 w-96 h-96 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center animate-float">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <Cpu className="w-24 h-24 text-amber-400 mx-auto" />
                      <div className="absolute inset-0 w-24 h-24 mx-auto animate-ping">
                        <Cpu className="w-24 h-24 text-amber-400/30" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-48 bg-gradient-to-r from-amber-400/20 to-amber-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="h-2 w-36 bg-gradient-to-r from-cyan-400/20 to-cyan-400/40 rounded-full animate-pulse mx-auto" style={{ animationDelay: '0.4s' }} />
                      <div className="h-2 w-40 bg-gradient-to-r from-amber-400/20 to-amber-400/40 rounded-full animate-pulse mx-auto" style={{ animationDelay: '0.6s' }} />
                    </div>
                    <div className="text-amber-400/60 text-sm font-mono">
                      <span className="animate-pulse">AI Processing...</span>
                    </div>
                  </div>
                </div>
                {/* Additional floating elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
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

      {/* References Section - Full Width Carousel */}
      <ReferencesCarousel />

      {/* Services Section */}
      <ServicesSection />

      {/* Projects Section */}
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
            {[
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
            ].map((project, index) => (
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

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-sans font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Insights & Resources
          </motion.h2>
          {blogLoading ? (
            <div className="text-center py-12">
              <div className="text-lg font-mono text-gray-600">Loading latest posts...</div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-sans font-semibold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 font-mono">Check back soon for new content!</p>
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card 
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs font-mono">
                            {post.category}
                          </Badge>
                          <span className="text-sm font-mono text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-sans group-hover:text-amber-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 font-mono mt-2">
                          <BookOpen className="w-4 h-4" />
                          {post.readTime}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link href="/blog">
              <Button variant="outline" size="lg" className="font-mono">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-sans font-bold text-gray-900 mb-4">
                Let's build something together
              </h2>
              <p className="text-lg font-mono text-gray-600">
                Tell us about your project, and we'll get back within 24 hours.
              </p>
            </motion.div>

            {submitSuccess && (
              <motion.div 
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-green-800 font-mono font-medium">
                  Thank you for your message! We'll be in touch soon.
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-mono">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-sm font-caveat text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-mono">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm font-caveat text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-mono">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={5}
                      className={formErrors.message ? "border-red-500" : ""}
                    />
                    {formErrors.message && (
                      <p className="text-sm font-caveat text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-mono font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/logo.png"
              alt="Runity Logo"
              width={810}
              height={300}
              className="h-30 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
            <p className="text-gray-400 font-mono text-center">
              © 2024 Runity. Building intelligent automation for tomorrow's businesses.
            </p>
            <div className="flex gap-6 text-sm font-mono">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}