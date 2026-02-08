import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Universitas Pasifik - Website resmi Universitas Pasifik",
    template: "%s | Universitas Pasifik"
  },
  description: "Universitas Pasifik adalah universitas riset publik dan universitas terbaik di Indonesia yang berdedikasi untuk mencerdaskan kehidupan bangsa.",
  keywords: ["Universitas Pasifik", "UNIPAS", "Kampus unipas", "Pendidikan Indonesia", "Universitas Terbaik", "Pendaftaran UNIPAS"],
  authors: [{ name: "Universitas Pasifik" }],
  creator: "Universitas Pasifik",
  publisher: "Universitas Pasifik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.univpasifik.ac.id"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logounipasreal.jpeg",
    apple: "/logounipasreal.jpeg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Universitas Pasifik",
    description: "Kampus Unggul - Website resmi Universitas Pasifik",
    url: "https://www.univpasifik.ac.id",
    siteName: "Universitas Pasifik",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logounipasreal.jpeg",
        width: 1200,
        height: 630,
        alt: "Universitas Pasifik Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universitas Pasifik",
    description: "Kampus unggul - Website resmi Universitas Pasifik",
    images: ["/logounipasreal.jpeg"],
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
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
