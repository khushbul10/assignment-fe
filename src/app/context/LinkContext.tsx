"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context's state
interface LinkContextType {
  links: Map<number, number[]>; // Key: leadId, Value: array of productIds
  addLink: (leadId: number, productId: number) => void;
  removeLink: (leadId: number, productId: number) => void;
  getLinksForLead: (leadId: number) => number[];
}

// Create the context
const LinkContext = createContext<LinkContextType | undefined>(undefined);

// Create the provider component
export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Map<number, number[]>>(new Map());

  const addLink = (leadId: number, productId: number) => {
    setLinks((prevLinks) => {
      const newLinks = new Map(prevLinks);
      const currentLinks = newLinks.get(leadId) || [];
      
      // Add link only if it doesn't already exist
      if (!currentLinks.includes(productId)) {
        newLinks.set(leadId, [...currentLinks, productId]);
      }
      return newLinks;
    });
  };

  const removeLink = (leadId: number, productId: number) => {
    setLinks((prevLinks) => {
      const newLinks = new Map(prevLinks);
      const currentLinks = newLinks.get(leadId) || [];
      
      // Filter out the product to remove
      newLinks.set(leadId, currentLinks.filter((id) => id !== productId));
      return newLinks;
    });
  };

  const getLinksForLead = (leadId: number) => {
    return links.get(leadId) || [];
  };

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, getLinksForLead }}>
      {children}
    </LinkContext.Provider>
  );
}

// Create a custom hook for easy access
export function useLinks() {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}