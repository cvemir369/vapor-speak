import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vapor Speak",
  description: "A freedom of speak platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/_next/static/media/8ee3a1ba4ed5baee-s.p.be19f591.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen bg-neutral-900 text-neutral-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <main className="flex flex-col gap-5 items-center sm:items-start">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
