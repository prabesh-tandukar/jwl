// src/components/product/SortSelect.tsx
export default function SortSelect({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="ml-2 border-gray-300 rounded-md"
    >
      <option value="newest">Newest</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name">Name</option>
    </select>
  );
}
