import { useState } from "react";
import StarRating from "./StarRating";
import CategoryTag from "./CategoryTag";

type DatabaseCourse = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  thumbnail_url: string | null;
  price: number | string | null;
  published: boolean;
  created_at: string;
};

function CourseCard({
  course,
  onView,
}: {
  course: DatabaseCourse;
  onView: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const price = Number(course.price ?? 0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
        hovered ? "shadow-2xl -translate-y-1" : "shadow-md"
      }`}
    >
      <div className="relative aspect-video">
        <img
          src={course.thumbnail_url || "/placeholder-course.jpg"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col gap-1.5">
        {course.category && (
  <CategoryTag label={course.category} />
)}
        <h3 className="m-0 text-sm font-bold text-gray-900 leading-snug">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {course.description}
        </p>

        {/* Temporary rating until we add ratings to the database */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={0} />
          <span className="text-xs text-gray-500">(No ratings yet)</span>
        </div>
      </div>

      <div className="px-4 py-3 gap-2 border-t border-gray-100 flex justify-between items-center">
        <span className="text-lg font-extrabold text-gray-900">
          ${price.toFixed(2)}
        </span>

        <button
          onClick={() => onView(course.id)}
          className={`text-white border-none rounded-lg px-4 py-2 text-sm font-bold cursor-pointer transition-colors duration-200 ${
            hovered ? "bg-blue-800" : "bg-blue-600"
          }`}
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default CourseCard;