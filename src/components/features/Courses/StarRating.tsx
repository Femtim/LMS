function StarRating({ rating }: { rating: number }) {
  return <span className="text-amber-400 text-sm font-semibold">★ {rating.toFixed(1)}</span>;
}

export default StarRating;