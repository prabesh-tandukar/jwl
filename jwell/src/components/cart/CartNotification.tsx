// src/components/cart/CartNotification.tsx
"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartNotification() {
  const [show, setShow] = useState(false);
  const [lastItemAdded, setLastItemAdded] = useState<string | null>(null);
  const { items } = useCart();

  useEffect(() => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      setLastItemAdded(lastItem.name);
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [items]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm w-full z-50">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-2 rounded-full">
          <ShoppingBag className="w-5 h-5 text-blue-900" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Added to cart</p>
          <p className="text-sm text-gray-500">{lastItemAdded}</p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <Link
        href="/cart"
        className="mt-3 block w-full text-center text-sm text-blue-900 hover:text-blue-800"
      >
        View Cart ({items.length} items)
      </Link>
    </div>
  );
}
