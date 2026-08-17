function BadgeTag({ text }: { text: "BEST SELLER" | "NEW" }) {
  return (
    <span
      className={`absolute top-3 left-3 text-white text-xs font-bold tracking-wide px-2 py-1 rounded ${
        text === "BEST SELLER" ? "bg-blue-700" : "bg-emerald-600"
      }`}
    >
      {text}
    </span>
  );
}

export default BadgeTag;