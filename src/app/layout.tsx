import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import "./globals.css";
import "./win95-animations.css";
import "./win95-brutalist.css";
import { Toaster } from "@/components/ui/toaster";
import { SEO } from "@/components/seo/SEO";
import { StructuredData } from "@/components/seo/StructuredData";
import { Win95ThemeProvider } from "@/components/win95-theme-provider";
import { Scanlines } from "@/components/ui/win95-scanlines";
import { CRTEffect } from "@/components/ui/win95-crt-effect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M100X - Crypto Security News",
  description: "Minimalistic crypto security news website covering hacks, scams, and security incidents in the cryptocurrency space",
  keywords: ["crypto", "security", "hacks", "scams", "blockchain", "bitcoin", "ethereum"],
  authors: [{ name: "M100X" }],
  openGraph: {
    title: "M100X - Crypto Security News",
    description: "Minimalistic crypto security news website covering hacks, scams, and security incidents",
    url: "https://degennews.com",
    siteName: "M100X",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M100X - Crypto Security News",
    description: "Minimalistic crypto security news website covering hacks, scams, and security incidents",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEO />
        <StructuredData
          type="website"
          data={{}}
        />
        <link rel="icon" href="/memecoin100x_logo.jpg" type="image/jpeg" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preload key assets */}
        <link rel="preload" href="/memecoin100x_logo.jpg" as="image" type="image/jpeg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
        />
        
        {/* Performance hints */}
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Google site verification */}
        <meta name="google-site-verification" content="ttxpAsGrMkxtwhxC4fJo8BYq431m3wJMcXXtSgCJOJg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <Win95ThemeProvider>
          <div className="relative min-h-screen">
            {children}
            <Scanlines enabled={true} density="medium" opacity={0.15} animated={true} />
            <CRTEffect
              enabled={false}
              curvature="subtle"
              vignette={0.4}
              chromaticAberration={0.05}
              flickerIntensity="subtle"
            />
          </div>
          <Toaster />
        </Win95ThemeProvider>
      </body>
    </html>
  );
}
