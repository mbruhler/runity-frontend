"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ReferencesCarousel } from "./components/ReferencesCarousel";
import { TrustSection } from "./components/TrustSection";
import { ServicesSection } from "./components/ServicesSection";
import { HowWeWorkSection } from "./components/HowWeWorkSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { useUmami } from "@/contexts/UmamiContext";

export default function Home() {
  const { track } = useUmami();

  useEffect(() => {
    // Track homepage view
    track('Homepage View', {
      sections_count: 8,
      page_type: 'homepage'
    });
  }, [track]);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Header */}
      <Header />
      
      {/* Hero Section with Parallax Background */}
      <HeroSection />

      {/* References Section - Full Width Carousel */}
      <ReferencesCarousel />

      {/* Services Section */}
      <ServicesSection />

      {/* How We Work Timeline */}
      <HowWeWorkSection />
      {/* Trust Building Section */}
      <TrustSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Form Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}