// src/components/product/ProductPage.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/database.types";
import ProductCard from "@/components/product/ProductCard";
import { X } from "lucide-react";

interface ProductPageProps {
  products: Product[];
}

export default function ProductPage({ products }: ProductPageProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    collections: [] as string[],
    availability: false,
  });

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by availability
    if (selectedFilters.availability && product.stock <= 0) {
      return false;
    }
    // Filter by category
    if (
      selectedFilters.categories.length > 0 &&
      !selectedFilters.categories.includes(product.category)
    ) {
      return false;
    }
    // Filter by collection
    if (
      selectedFilters.collections.length > 0 &&
      !selectedFilters.collections.includes(product.collection)
    ) {
      return false;
    }
    return true;
  });

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      collections: [],
      availability: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-sm text-gray-500">
          {filteredProducts.length} products
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-20">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Availability */}
            <div className="border-t py-4">
              <h3 className="font-medium mb-2">Availability</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFilters.availability}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      availability: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">In Stock</span>
              </label>
            </div>

            {/* Categories */}
            <div className="border-t py-4">
              <h3 className="font-medium mb-2">Categories</h3>
              {["Rings", "Necklaces", "Earrings", "Bracelets"].map(
                (category) => (
                  <label key={category} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(category)}
                      onChange={(e) => {
                        const updatedCategories = e.target.checked
                          ? [...selectedFilters.categories, category]
                          : selectedFilters.categories.filter(
                              (c) => c !== category
                            );
                        setSelectedFilters({
                          ...selectedFilters,
                          categories: updatedCategories,
                        });
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">{category}</span>
                  </label>
                )
              )}
            </div>

            {/* Collections */}
            <div className="border-t py-4">
              <h3 className="font-medium mb-2">Collections</h3>
              {["Vintage", "Modern", "Classic", "Royal"].map((collection) => (
                <label key={collection} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={selectedFilters.collections.includes(collection)}
                    onChange={(e) => {
                      const updatedCollections = e.target.checked
                        ? [...selectedFilters.collections, collection]
                        : selectedFilters.collections.filter(
                            (c) => c !== collection
                          );
                      setSelectedFilters({
                        ...selectedFilters,
                        collections: updatedCollections,
                      });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">{collection}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found matching your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
