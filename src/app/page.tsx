"use client";

import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ReferencesCarousel } from "./components/ReferencesCarousel";
import { TrustSection } from "./components/TrustSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Home() {
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