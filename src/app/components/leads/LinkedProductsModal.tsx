"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Image from "next/image";
import { useLinks } from "@/app/context/LinkContext";

interface LinkedProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: number | null;
}

export default function LinkedProductsModal({ isOpen, onClose, leadId }: LinkedProductsModalProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getLinksForLead, removeLink } = useLinks();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setAllProducts(data))
        .catch((err) => console.error("Failed to fetch products", err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  if (!isOpen || leadId === null) return null;

  const productIds = getLinksForLead(leadId);
  const linkedProducts = allProducts.filter((p) => productIds.includes(p.id));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Linked Products
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : linkedProducts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No products linked to this lead yet.</p>
      ) : (
        <ul className="space-y-4">
          {linkedProducts.map((product) => (
            <li key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-white rounded-md p-1">
                   <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{product.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <button 
                onClick={() => removeLink(leadId, product.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                title="Remove link"
              >
                Unlink
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}