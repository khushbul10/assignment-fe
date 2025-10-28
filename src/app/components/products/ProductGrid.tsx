import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onCardClick: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onCardClick,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onCardClick(product)}
        />
      ))}
    </div>
  );
}