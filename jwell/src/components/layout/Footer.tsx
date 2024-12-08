// src/components/layout/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">JWELL</h3>
            <p className="text-gray-400 text-sm">
              Crafting timeless pieces of elegance since 1990
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/products"
                className="block text-gray-400 hover:text-white"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block text-gray-400 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2">
              <Link
                href="/shipping"
                className="block text-gray-400 hover:text-white"
              >
                Shipping
              </Link>
              <Link
                href="/returns"
                className="block text-gray-400 hover:text-white"
              >
                Returns
              </Link>
              <Link
                href="/sizing"
                className="block text-gray-400 hover:text-white"
              >
                Sizing Guide
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} JWELL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
