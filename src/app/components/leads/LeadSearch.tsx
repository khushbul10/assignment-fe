import { Search } from "lucide-react";

interface LeadSearchProps {
  onSearch: (term: string) => void;
}

export default function LeadSearch({ onSearch }: LeadSearchProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        placeholder="Search by name or company..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  );
}