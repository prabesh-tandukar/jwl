// src/components/product/ActiveFilters.tsx
interface ActiveFiltersProps {
  filters: {
    categories: string[];
    collections: string[];
    availability: boolean;
  };
  onRemove: (type: string, value: string) => void;
}

export default function ActiveFilters({
  filters,
  onRemove,
}: ActiveFiltersProps) {
  const activeFilters = [
    ...filters.categories.map((cat) => ({ type: "categories", value: cat })),
    ...filters.collections.map((col) => ({ type: "collections", value: col })),
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(({ type, value }) => (
        <span
          key={`${type}-${value}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
        >
          {value}
          <button
            onClick={() => onRemove(type, value)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
