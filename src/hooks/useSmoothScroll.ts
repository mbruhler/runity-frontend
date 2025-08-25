'use client';

export function useSmoothScroll() {
  const scrollToSection = (href: string) => {
    // Handle hash links
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      
      setTimeout(() => {
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
          
          // Scroll to section
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          
          // Force Framer Motion to recalculate viewport
          setTimeout(() => {
            // Trigger animations
            window.dispatchEvent(new Event('scroll'));
          }, 500);
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  };

  return { scrollToSection };
}