export default function SortSelect({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-1.5"
    >
      <option value="newest">Newest</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name">Name</option>
    </select>
  );
}
