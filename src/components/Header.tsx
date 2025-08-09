"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="font-bold text-2xl hover:text-gray-500">
        Love Hate Love
      </Link>
      <nav>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-semibold underline"
              : " hover:text-gray-500"
          }
        >
          Home
        </Link>{" "}
        |{" "}
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "font-semibold underline"
              : " hover:text-gray-500"
          }
        >
          About
        </Link>
      </nav>
    </header>
  );
}
