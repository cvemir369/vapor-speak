"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface MobileMenuProps {
  children?: React.ReactNode | ((closeMenu: () => void) => React.ReactNode);
  onClose?: () => void;
}

export default function MobileMenu({ children, onClose }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const closeMenu = () => {
    setIsOpen(false);
    onClose?.(); // Call the optional onClose callback
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-2 left-4 z-50 bg-neutral-800 text-white p-2 rounded-full hover:bg-neutral-600 transition-colors cursor-pointer"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`
          md:hidden fixed top-0 left-0 h-full w-80 bg-neutral-900 text-white p-4 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mt-16">
          {/* Navigation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-neutral-300">
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation("/")}
                className={`block w-full text-left p-2 rounded-full transition-colors cursor-pointer ${
                  pathname === "/"
                    ? "bg-neutral-300 text-neutral-900 font-bold"
                    : "bg-neutral-800 hover:bg-neutral-600"
                }`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => handleNavigation("/channels")}
                className={`block w-full text-left p-2 rounded-full transition-colors cursor-pointer ${
                  pathname === "/channels"
                    ? "bg-neutral-300 text-neutral-900 font-bold"
                    : "bg-neutral-800 hover:bg-neutral-600"
                }`}
              >
                💬 Channels
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className={`block w-full text-left p-2 rounded-full transition-colors cursor-pointer ${
                  pathname === "/about"
                    ? "bg-neutral-300 text-neutral-900 font-bold"
                    : "bg-neutral-800 hover:bg-neutral-600"
                }`}
              >
                ℹ️ About
              </button>
            </div>
          </div>

          {/* Additional Content (for channels page) */}
          {children && (
            <>
              <hr className="my-4 border-neutral-700" />
              {typeof children === "function" ? children(closeMenu) : children}
            </>
          )}
        </div>
      </div>
    </>
  );
}
