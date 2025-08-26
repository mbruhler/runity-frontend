"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

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

      // Determine active section based on scroll position
      const sections = ["home", "services", "process", "projects", "blog", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // If at the very top, set home as active
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle hash links on the same page
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Force all child elements with Framer Motion to be visible
        const animatedElements = targetElement.querySelectorAll('[style*="opacity"]');
        animatedElements.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
        
        const headerHeight = 80;
        const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
        const scrollPosition = elementTop - headerHeight;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // Force Framer Motion to recalculate viewport
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 500);
      }
    } else if (href.startsWith('/#')) {
      // If we're on a different page, let the default behavior happen
      // The browser will navigate and then jump to the section
      return;
    }
  };

  const { t, language } = useTranslation();
  const { scrollToSection } = useSmoothScroll();

  // Re-trigger animation when language changes
  useEffect(() => {
    setIsLanguageChanging(true);
    
    // Quick fade out
    const fadeOutTimer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
      
      // Quick fade in after content updates
      const fadeInTimer = setTimeout(() => {
        setIsLanguageChanging(false);
      }, 50);
      
      return () => clearTimeout(fadeInTimer);
    }, 100);
    
    return () => clearTimeout(fadeOutTimer);
  }, [language]);

  const navItems = [
    { name: t("navigation.home") as string, href: "/", sectionId: "home" },
    { name: t("navigation.services") as string, href: "/#services", sectionId: "services" },
    { name: t("navigation.process") as string, href: "/#process", sectionId: "process" },
    { name: t("navigation.projects") as string, href: "/projects", sectionId: "projects" },
    { name: t("navigation.blog") as string, href: "/blog", sectionId: "blog" },
    { name: t("navigation.contact") as string, href: "/#contact", sectionId: "contact" },
  ];

  // Determine if a nav item is active
  const isNavItemActive = (item: typeof navItems[0]) => {
    // Only run on client side
    if (typeof window === 'undefined') return false;
    
    const currentPath = window.location.pathname;
    
    // If we're on the home page, check the active section
    if (currentPath === '/') {
      return activeSection === item.sectionId;
    }
    
    // Special handling for blog
    if (currentPath.startsWith('/blog') && item.sectionId === 'blog') {
      return true;
    }
    
    // Special handling for projects
    if (currentPath.startsWith('/projects') && item.sectionId === 'projects') {
      return true;
    }
    
    // If we're on a different page, check if it matches the href
    return currentPath === item.href;
  };

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
              ? "bg-black/80 backdrop-blur-md"
              : "bg-black/80"
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
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <Link
                  key={`${animationKey}-${item.sectionId}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-mono transition-all duration-300 group ${
                    isNavItemActive(item)
                      ? "text-amber-400"
                      : "text-gray-300 hover:text-white"
                  } ${isLanguageChanging ? 'transition-opacity duration-100' : ''}`}
                  style={{
                    animation: isVisible && !isLanguageChanging
                      ? `fadeInDown 0.5s ease-out ${index * 0.1 + 0.3}s both` 
                      : "",
                    opacity: isLanguageChanging ? 0 : 1,
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  
                  {/* Active/Hover underline animation */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 ${
                      isNavItemActive(item)
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Language Switcher & CTA Button - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div
                style={{
                  animation: isVisible ? "fadeInDown 0.5s ease-out 0.7s both" : "",
                }}
              >
                <LanguageSwitcher />
              </div>
              
              <div 
                style={{
                  animation: isVisible ? "fadeInDown 0.5s ease-out 0.8s both" : "",
                }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 text-sm font-mono font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 border-0 hover:scale-105"
                  onClick={() => scrollToSection('/#contact')}
                >
                  {t("buttons.getStarted")}
                </Button>
              </div>
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
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
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
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={`${animationKey}-${item.sectionId}-${language}`}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-base font-mono transition-all duration-300 ${
                    isNavItemActive(item)
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
            
            {/* Mobile Language Switcher & CTA Button */}
            <div className="mt-6 space-y-4">
              <div
                style={{
                  animation: isMobileMenuOpen
                    ? "fadeInUp 0.5s ease-out 0.4s both"
                    : "",
                }}
              >
                <LanguageSwitcher />
              </div>
              
              <div 
                style={{
                  animation: isMobileMenuOpen
                    ? "fadeInUp 0.5s ease-out 0.5s both"
                    : "",
                }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 text-base font-mono font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 border-0"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection('/#contact');
                  }}
                >
                  {t("buttons.getStarted")}
                </Button>
              </div>
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
        
        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
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