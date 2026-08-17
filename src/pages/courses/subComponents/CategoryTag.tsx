function CategoryTag({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Development: "text-blue-700",
    Design:      "text-purple-600",
    Business:    "text-cyan-700",
    Marketing:   "text-amber-700",
  };
  return (
    <span className={`text-xs font-bold tracking-widest uppercase ${colorMap[label] ?? "text-gray-700"}`}>
      {label}
    </span>
  );
}

export default CategoryTag;