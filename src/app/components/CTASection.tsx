"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface CTASectionProps {
  variant?: "projects" | "blog" | "default";
}

export function CTASection({ variant = "default" }: CTASectionProps) {
  const { t } = useTranslation();

  const getContent = () => {
    switch (variant) {
      case "projects":
        return {
          title: t("cta.projects.title"),
          subtitle: t("cta.projects.subtitle"),
          primaryButton: {
            text: t("cta.projects.primaryButton"),
            href: "/contact"
          },
          secondaryButton: {
            text: t("cta.projects.secondaryButton"),
            href: "/#services"
          }
        };
      case "blog":
        return {
          title: t("cta.blog.title"),
          subtitle: t("cta.blog.subtitle"),
          primaryButton: {
            text: t("cta.blog.primaryButton"),
            href: "/contact"
          },
          secondaryButton: {
            text: t("cta.blog.secondaryButton"),
            href: "/#projects"
          }
        };
      default:
        return {
          title: t("cta.default.title"),
          subtitle: t("cta.default.subtitle"),
          primaryButton: {
            text: t("cta.default.primaryButton"),
            href: "/contact"
          },
          secondaryButton: {
            text: t("cta.default.secondaryButton"),
            href: "/#services"
          }
        };
    }
  };

  const content = getContent();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-sans font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg font-mono text-gray-600 mb-8">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={content.primaryButton.href}>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-mono font-semibold px-8 py-3 rounded-lg transition-colors">
                {content.primaryButton.text}
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href={content.secondaryButton.href}>
              <button className="border border-amber-500 text-amber-600 hover:bg-amber-50 font-mono font-semibold px-8 py-3 rounded-lg transition-colors">
                {content.secondaryButton.text}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}