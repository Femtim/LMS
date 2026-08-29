interface ProgressBarProps {
  value: number;
  color: string;
  label?: string;
}

export function ProgressBar({ value, color, label = "Progress" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden"
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  );
}