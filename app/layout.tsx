import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veluvia Finds - Curated Luxury Finds",
  description:
    "Discover handpicked luxury home decor, kitchenware, jewelry, and accessories. Elevate your lifestyle with Veluvia Finds.",
  generator: "v0.dev",
  openGraph: {
    title: "Veluvia Finds - Curated Luxury Finds",
    description:
      "Discover handpicked luxury home decor, kitchenware, jewelry, and accessories. Elevate your lifestyle with Veluvia Finds.",
    url: "https://veluviafinds.com/",
    siteName: "Veluvia Finds",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veluvia Finds - Curated Luxury Finds",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta
          name="description"
          content="Discover handpicked luxury home decor, kitchenware, jewelry, and accessories. Elevate your lifestyle with Veluvia Finds."
        />
        <meta
          property="og:title"
          content="Veluvia Finds - Curated Luxury Finds"
        />
        <meta
          property="og:description"
          content="Discover handpicked luxury home decor, kitchenware, jewelry, and accessories. Elevate your lifestyle with Veluvia Finds."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://veluviafinds.com/" />
        <meta property="og:site_name" content="Veluvia Finds" />
        <meta property="og:image" content="/og-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Veluvia Finds",
              url: "https://veluviafinds.com/",
              logo: "/favicon.ico",
              sameAs: [
                "https://instagram.com/youraccount",
                "https://tiktok.com/@youraccount",
              ],
            }),
          }}
        />
      </head>
      <body className="font-inter bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
