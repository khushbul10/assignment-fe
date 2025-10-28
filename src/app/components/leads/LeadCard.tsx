import { Lead } from "@/types";
import { Edit, Trash2, Link } from "lucide-react";
import { useLinks } from "@/app/context/LinkContext"; // 1. Import context hook

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onViewLinks: (leadId: number) => void; // 2. Add prop
}

export default function LeadCard({ lead, onEdit, onDelete, onViewLinks }: LeadCardProps) {
  const { getLinksForLead } = useLinks(); // 3. Use hook
  const linkCount = getLinksForLead(lead.id).length; // 4. Get count

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 dark:text-gray-300">{lead.company.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 dark:text-gray-300">{lead.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 dark:text-gray-300">{lead.address.city}</div>
      </td>
      
      {/* 5. Add new cell for link count */}
      <td className="px-6 py-4 whitespace-nowrap">
         <button 
           onClick={() => onViewLinks(lead.id)}
           className={`flex items-center gap-1 text-sm font-medium ${
             linkCount > 0 
               ? "text-blue-600 dark:text-blue-400 hover:underline" 
               : "text-gray-400 dark:text-gray-500 cursor-default"
           }`}
           disabled={linkCount === 0}
         >
            <Link size={14} />
            {linkCount}
         </button>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
        <button
          onClick={() => onEdit(lead)}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}