"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import ProductModal from "./ProductModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/products/loading";

// interface ProductViewProps {
//   initialProducts: Product[];
//   categories: string[];
// }


// {
//   initialProducts,
//   categories,
// }: ProductViewProps
export default function ProductView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {data : initialProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  const {data: categories = []} = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<string[]> => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return initialProducts;
    }
    return initialProducts.filter(
      (p) => p.category === selectedCategory
    );
  }, [selectedCategory, initialProducts]);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">Products</h1>
        <ProductFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <ProductGrid products={filteredProducts} onCardClick={handleCardClick} />

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}