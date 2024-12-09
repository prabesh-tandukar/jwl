// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Menu, X, ShoppingBag, User as UserIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { itemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    // Get initial auth state
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Don't render anything while loading to prevent hydration mismatch
  if (isLoading) {
    return (
      <nav className="fixed w-full z-50 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif">
              JWELL
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-4 text-blue-900"
          : "bg-white/80 backdrop-blur-md py-6 text-blue-900"
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
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-blue-900 transition-colors" />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <UserIcon className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
                </Link>
                <button onClick={handleSignOut} className="flex items-center">
                  <LogOut className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="text-sm hover:text-gray-600 transition-colors"
              >
                Sign In
              </Link>
            )}
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
                <Link href="/cart">
                  <ShoppingBag className="w-5 h-5" />
                </Link>
                {user ? (
                  <>
                    <Link href="/profile">
                      <UserIcon className="w-5 h-5" />
                    </Link>
                    <button onClick={handleSignOut}>
                      <LogOut className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <Link href="/signin" className="text-sm">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
