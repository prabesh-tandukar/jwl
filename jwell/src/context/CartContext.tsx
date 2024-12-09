// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Product } from "@/types/database.types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemsCount: number;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  // Load cart from database on auth state change
  useEffect(() => {
    const loadCart = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setIsLoading(true);
          const { data: cartItems, error } = await supabase
            .from("cart_items")
            .select(
              `
              quantity,
              products (*)
            `
            )
            .order("created_at", { ascending: true });

          if (error) throw error;

          if (cartItems) {
            const formattedItems = cartItems.map((item) => ({
              ...item.products,
              quantity: item.quantity,
            }));
            setItems(formattedItems);
          }
        } else {
          // Load from localStorage if not logged in
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadCart();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Save to localStorage when not logged in
  useEffect(() => {
    const saveToLocal = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        localStorage.setItem("cart", JSON.stringify(items));
      }
    };
    saveToLocal();
  }, [items, supabase]);

  const addItem = async (product: Product) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Add to database
        const { error } = await supabase.from("cart_items").upsert(
          {
            user_id: session.user.id,
            product_id: product.id,
            quantity: 1,
          },
          {
            onConflict: "user_id, product_id",
            ignoreDuplicates: false,
          }
        );

        if (error) throw error;
      }

      // Update local state
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...currentItems, { ...product, quantity: 1 }];
      });

      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
    }
  };

  // Similar updates for removeItem, updateQuantity, and clearCart...

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = async (productId: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .match({ user_id: session.user.id, product_id: productId });

        if (error) throw error;
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity < 1) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity })
          .match({ user_id: session.user.id, product_id: productId });

        if (error) throw error;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .match({ user_id: session.user.id });

        if (error) throw error;
      }

      setItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemsCount,
        total,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
