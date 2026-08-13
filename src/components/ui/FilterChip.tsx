function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-150 whitespace-nowrap ${
        active ? "bg-blue-600 text-white border-none" : "bg-white text-gray-700 border border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

export default FilterChip;