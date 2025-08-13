import "./globals.css";
import type { Metadata } from "next";
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
      <body className="antialiased min-h-screen bg-neutral-900 text-neutral-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center mx-auto">
          <main className="flex flex-col gap-5 items-center sm:items-start w-full px-4">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
