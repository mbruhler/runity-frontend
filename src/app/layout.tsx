import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Roboto_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ClientLayout } from "@/components/ClientLayout";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Runity - AI Automation & Software Solutions",
  description: "Build AI-powered automation systems that scale your business. We design and implement intelligent automation and custom AI solutions that help companies save time, reduce costs, and grow faster.",
  keywords: "AI automation, custom software, LLM integration, business automation, AI consulting, machine learning solutions",
  authors: [{ name: "Runity" }],
  openGraph: {
    title: "Runity - AI Automation & Software Solutions",
    description: "Build AI-powered automation systems that scale your business",
    type: "website",
    locale: "en_US",
    siteName: "Runity",
  },
  twitter: {
    card: "summary_large_image",
    title: "Runity - AI Automation & Software Solutions",
    description: "Build AI-powered automation systems that scale your business",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${caveat.variable} antialiased`}
      >
        <Script
          defer
          src="https://umami.brolercoaster.com/script.js"
          data-website-id="3197ae1e-eae1-4ba7-b425-4a592671ac7f"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
