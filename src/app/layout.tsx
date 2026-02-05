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
  title: "Universitas Pasifik - Kampus Hijau, Kampus Unggul",
  description: "Universitas Pasifik adalah universitas riset publik dan universitas terbaik di Indonesia yang berdedikasi untuk mencerdaskan kehidupan bangsa.",
  keywords: ["Universitas Pasifik", "UNIPAS", "Kampus unipas", "Pendidikan Indonesia", "Universitas Terbaik", "Pendaftaran UNIPAS"],
  authors: [{ name: "Universitas Pasifik" }],
  icons: {
    icon: "/logounipasreal.jpeg",
  },
  openGraph: {
    title: "Universitas Pasifik",
    description: "Kampus Hijau, Kampus Unggul - Universitas Terbaik di Indonesia",
    url: "https://www.unipas.ac.id",
    siteName: "Universitas Pasifik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universitas Pasifik",
    description: "Kampus Hijau, Kampus Unggul - Universitas Terbaik di Indonesia",
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
