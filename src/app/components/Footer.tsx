"use client";

import Image from "next/image";
import { useTranslation } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useTranslation();
  
  return (
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
            © {new Date().getFullYear()} {t("footer.allRightsReserved")}
          </p>
          <div className="flex gap-6 text-sm font-mono">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t("footer.privacyPolicy")}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t("footer.termsOfService")}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t("footer.contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}