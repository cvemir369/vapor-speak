"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-center md:items-center md:justify-between p-3 bg-neutral-800">
      <Link href="/" className="font-bold text-2xl hover:text-gray-500">
        Vapor Speak
      </Link>
      {/* Navigation - Hidden on mobile, visible on desktop */}
      <nav className="hidden md:flex gap-4">
        <Link
          href="/"
          className={pathname === "/" ? "font-bold" : " hover:text-gray-500"}
        >
          🏠 Home
        </Link>
        <Link
          href="/channels"
          className={
            pathname === "/channels" ? "font-bold" : " hover:text-gray-500"
          }
        >
          💬 Channels
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about" ? "font-bold" : " hover:text-gray-500"
          }
        >
          ℹ️ About
        </Link>
      </nav>
    </header>
  );
}
