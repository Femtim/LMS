import {useState} from "react";
import BadgeTag from "./BadgeTag";
import CategoryTag from "./CategoryTag";
import StarRating from "./StarRating";
// import type { Course } from "../exploreCourses";
import type { Course } from "../../../types";


function CourseCard({ course, onView }: { course: Course; onView: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
        hovered ? "shadow-2xl -translate-y-1" : "shadow-md"
      }`}
    >
      <div className="relative aspect-video">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        {course.badge && <BadgeTag text={course.badge} />}
      </div>
      <div className="p-4 flex-1 flex flex-col gap-1.5">
        <CategoryTag label={course.category} />
        <h3 className="m-0 text-sm font-bold text-gray-900 leading-snug">{course.title}</h3>
        <div className="flex items-center gap-1.5">
          <StarRating rating={course.rating} />
          <span className="text-xs text-gray-500">({course.reviews} ratings)</span>
        </div>
      </div>
      <div className="px-4 py-3 gap-2 border-t border-gray-100 flex justify-between items-center">
        <span className="text-lg font-extrabold text-gray-900">${course.price.toFixed(2)}</span>
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