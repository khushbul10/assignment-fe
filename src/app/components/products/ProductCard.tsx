import { Product } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative w-full h-48 bg-white p-4"> {/* Keep image bg white for clarity */}
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white truncate mb-2" title={product.title}>
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-4">{product.category}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}