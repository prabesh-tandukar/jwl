// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif">
            JWELL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/rings"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Rings
            </Link>
            <Link
              href="/necklaces"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Necklaces
            </Link>
            <Link
              href="/earrings"
              className="text-sm hover:text-gray-600 transition-colors"
            >
              Earrings
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="text-sm">
                Collections
              </Link>
              <Link href="/rings" className="text-sm">
                Rings
              </Link>
              <Link href="/necklaces" className="text-sm">
                Necklaces
              </Link>
              <Link href="/earrings" className="text-sm">
                Earrings
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Search className="w-5 h-5" />
                <User className="w-5 h-5" />
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
