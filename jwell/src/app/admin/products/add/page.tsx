// src/app/admin/products/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/router";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  //
  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/signin"); // Redirect to sign in if not authenticated
      }
    };
    checkAuth();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock),
            image_url: formData.image_url,
          },
        ])
        .select();

      if (supabaseError) throw supabaseError;

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image_url: "",
      });
      alert("Product added successfully!");
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image
          </label>
          <CldUploadWidget
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} // Add this
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onUpload={(result: any) => {
              if (result.info && result.info.secure_url) {
                console.log("Upload result:", result.info); // Add this for debugging
                setFormData((prev) => ({
                  ...prev,
                  image_url: result.info.secure_url,
                }));
              }
            }}
            options={{
              maxFiles: 1,
              sources: ["local", "url"],
              folder: "products", // Add this
              clientAllowedFormats: ["jpg", "png", "jpeg", "gif"], // Add this
              maxFileSize: 10000000, // Add this (10MB)
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
          {formData.image_url && (
            <div className="mt-2">
              <img
                src={formData.image_url}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border rounded-md p-2 h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a category</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelets">Bracelets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, stock: e.target.value }))
              }
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
