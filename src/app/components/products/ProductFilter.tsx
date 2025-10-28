interface ProductFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function ProductFilter({
  categories,
  selected,
  onSelect,
}: ProductFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category} className="capitalize">
          {category}
        </option>
      ))}
    </select>
  );
}