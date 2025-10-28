"use client";

import { useState, useEffect } from "react";
import { Lead } from "@/types";
import { Plus } from "lucide-react";
import { useLinks } from "@/app/context/LinkContext";
import { useQuery } from "@tanstack/react-query";

interface ProductLinkerProps {
  productId: number;
}

export default function ProductLinker({ productId }: ProductLinkerProps) {
  // const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<string>("");
  const { addLink, links } = useLinks();

  // Fetch leads for the dropdown
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => setLeads(data))
  //     .catch((err) => console.error("Failed to fetch leads", err))
  //     .finally(() => setIsLoading(false));
  // }, []);
  const getLoads = async (): Promise<Lead[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch leads");
    return res.json();
  }
  const { data: leads = [], isLoading, isError } = useQuery({
    queryKey: ['leads'],
    queryFn: getLoads
  });

  const handleLink = () => {
    const leadId = parseInt(selectedLead, 10);
    if (!leadId) return;
    
    addLink(leadId, productId);
    setSelectedLead(""); // Reset dropdown
  };

  // Find leads who are *already* linked to this product
  const linkedLeadIds = Array.from(links.entries())
    .filter(([_, productIds]) => productIds.includes(productId))
    .map(([leadId, _]) => leadId);

  return (
    <div className="mt-6 p-4 border-t border-dashed dark:border-gray-700">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Link to Lead
      </h4>
      <div className="grid grid-cols-5 gap-2 max-full">
        <select
          value={selectedLead}
          onChange={(e) => setSelectedLead(e.target.value)}
          disabled={isLoading}
          className="col-span-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">
            {isLoading ? "Loading leads..." : "Select a lead..."}
          </option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.name} ({lead.company.name})
            </option>
          ))}
        </select>
        <button
          onClick={handleLink}
          disabled={!selectedLead}
          className="flex justify-around shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          <Plus size={20} />
        </button>
      </div>
      
      {/* Display already linked leads */}
      {linkedLeadIds.length > 0 && (
         <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Already linked to:</h5>
             <ul className="list-disc list-inside mt-2">
                {leads.filter(l => linkedLeadIds.includes(l.id)).map(l => (
                    <li key={l.id} className="text-sm text-gray-700 dark:text-gray-300">{l.name}</li>
                ))}
             </ul>
         </div>
      )}
    </div>
  );
}