// function StarRating({ rating }: { rating: number }) {
//   return <span className="text-amber-400 text-sm font-semibold">★ {rating.toFixed(1)}</span>;
// }

// export default StarRating;

function StarRating({ rating }: { rating?: number | null }) {
  const safeRating = rating ?? 0;

  return (
    <span>{safeRating.toFixed(1)}</span>
  );
}

export default StarRating;