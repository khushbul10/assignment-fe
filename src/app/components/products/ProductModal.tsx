import { Product } from "@/types";
import Modal from "../ui/Modal";
import Image from "next/image";
import ProductLinker from "./ProductLinker"; // 1. Import

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal isOpen={!!product} onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 shrink-0 bg-white p-4 rounded-lg">
          <div className="relative w-full h-64">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{product.title}</h2>
          <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>
          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* 2. Add the linker component */}
      <ProductLinker productId={product.id} />
    </Modal>
  );
}