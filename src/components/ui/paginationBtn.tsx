function PaginationBtn({
  children, active, disabled, onClick,
}: {
  children: React.ReactNode; active?: boolean; disabled?: boolean; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 rounded-lg text-sm font-semibold flex items-center justify-center transition-all duration-150 border ${
        active   ? "bg-blue-600 text-white border-blue-600"
        : disabled ? "bg-white text-gray-400 border-gray-300 cursor-default"
        :            "bg-white text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

export default PaginationBtn;