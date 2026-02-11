import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.univpasifik.ac.id"),

  title: {
    default: "Universitas Pasifik (UNIPAS) - Website Resmi",
    template: "%s | Universitas Pasifik",
  },

  description:
    "Universitas Pasifik (UNIPAS) adalah perguruan tinggi yang menyediakan program Sarjana dan Pascasarjana dengan fokus pada pendidikan berkualitas, riset, dan inovasi untuk mencerdaskan kehidupan bangsa.",

  keywords: [
    "Universitas Pasifik",
    "UNIPAS",
    "Pendaftaran Universitas Pasifik",
    "Biaya Kuliah UNIPAS",
    "Fakultas Universitas Pasifik",
    "Jurusan UNIPAS",
    "Kampus di Indonesia",
  ],

  authors: [{ name: "Universitas Pasifik" }],
  creator: "Universitas Pasifik",
  publisher: "Universitas Pasifik",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "https://www.univpasifik.ac.id",
  },

  icons: {
    icon: "/logounipasreal.jpeg",
    apple: "/logounipasreal.jpeg",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "Universitas Pasifik (UNIPAS) - Website Resmi",
    description:
      "Kampus unggul dengan program Sarjana dan Pascasarjana yang berfokus pada riset dan inovasi.",
    url: "https://www.univpasifik.ac.id",
    siteName: "Universitas Pasifik",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://www.univpasifik.ac.id/logounipasreal.jpeg",
        width: 1200,
        height: 630,
        alt: "Universitas Pasifik - Kampus Unggul",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Universitas Pasifik (UNIPAS)",
    description:
      "Website resmi Universitas Pasifik dengan informasi pendaftaran, fakultas, dan program studi.",
    images: ["https://www.univpasifik.ac.id/logounipasreal.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
    yandex: "YANDEX_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "Universitas Pasifik",
              alternateName: "UNIPAS",
              url: "https://www.univpasifik.ac.id",
              logo: "https://www.univpasifik.ac.id/logounipasreal.jpeg",
              sameAs: [
                "https://www.instagram.com/universitas_pasifik",
                "https://www.facebook.com/Universitas Pasifik Morotai",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jln.Sudirman, Kompleks Lemonade, Daruba Morotai Selatan",
                addressLocality: "Pulau Morotai",
                addressRegion: "Maluku Utara",
                postalCode: "97771",
                addressCountry: "ID"
  },
            }),
          }}
        />

        <AuthProvider>
          {children}
          <Toaster />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
