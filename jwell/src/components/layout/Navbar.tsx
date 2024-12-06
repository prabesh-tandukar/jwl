// src/components/layout/Navbar.tsx
import Link from "next/link";
import { useSupabase } from "@/lib/supabase";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              EcommerceApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-700">
              Products
            </Link>
            <Link href="/cart" className="text-gray-700">
              Cart
            </Link>
            <Link href="/signin" className="text-gray-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
