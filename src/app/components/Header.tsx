"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger initial animation
    setIsVisible(true);

    // Handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", active: true },
    { name: "Projects", href: "/#projects" },
    { name: "Services", href: "/#services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
              : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
          }`}
        />
        
        <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/"
              className="relative group"
            >
              <div className="relative transition-transform duration-300 hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Runity Logo"
                  width={810}
                  height={340}
                  priority
                  className="h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-r from-amber-400 to-orange-500" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 group ${
                    item.active
                      ? "text-amber-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  style={{
                    animation: isVisible ? `fadeInDown 0.5s ease-out ${index * 0.1 + 0.3}s both` : "",
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  
                  {/* Active/Hover underline animation */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 ${
                      item.active
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div 
              className="hidden md:block"
              style={{
                animation: isVisible ? "fadeInDown 0.5s ease-out 0.8s both" : "",
              }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 text-sm font-mono font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 border-0 hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 p-6 transition-all duration-500 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-mono transition-all duration-300 ${
                    item.active
                      ? "text-amber-400 bg-amber-400/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  style={{
                    animation: isMobileMenuOpen
                      ? `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      : "",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile CTA Button */}
            <div 
              className="mt-6"
              style={{
                animation: isMobileMenuOpen
                  ? "fadeInUp 0.5s ease-out 0.5s both"
                  : "",
              }}
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 text-base font-mono font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}