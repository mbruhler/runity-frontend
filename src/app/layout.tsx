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
  metadataBase: new URL('https://runity.pl'),
  title: "Runity - AI Automation & Software Solutions",
  description: "Build AI-powered automation systems that scale your business. We design and implement intelligent automation and custom AI solutions that help companies save time, reduce costs, and grow faster.",
  keywords: "AI automation, custom software, LLM integration, business automation, AI consulting, machine learning solutions, no-code automation, workflow optimization, AI agents, chatbot development",
  authors: [{ name: "Runity" }],
  creator: "Runity",
  publisher: "Runity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Runity - AI Automation & Software Solutions",
    description: "Build AI-powered automation systems that scale your business. Custom AI solutions that save time, reduce costs, and accelerate growth.",
    type: "website",
    locale: "en_US",
    url: 'https:/pl',
    siteName: "Runity",
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Runity - AI Automation & Software Solutions',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Runity - AI Automation & Software Solutions",
    description: "Build AI-powered automation systems that scale your business. Custom AI solutions that save time and accelerate growth.",
    site: "@runity_pl",
    creator: "@runity_pl",
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://runity.pl',
    languages: {
      'en-US': 'https://runity.pl',
      'pl-PL': 'https://runity.pl',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Runity",
  "url": "https://runity.pl",
  "logo": "https://runity.pl/logo.png",
  "description": "Build AI-powered automation systems that scale your business. We design and implement intelligent automation and custom AI solutions.",
  "sameAs": [
    "https://twitter.com/runity_pl",
    "https://linkedin.com/company/runity",
    "https://github.com/runity"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "availableLanguage": ["English", "Polish"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "founder": {
    "@type": "Person",
    "name": "Runity Team"
  },
  "foundingDate": "2025",
  "areaServed": "Worldwide",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "52.237049",
      "longitude": "21.017532"
    },
    "geoRadius": "5000"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
