import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../../services/courseService";
import type { Course } from "../../../types";
import CourseDetailPage from "./courseDetails";

export default function CourseDetailWrapper() {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      getCourseById(id).then(setCourse).catch(() => setCourse(null));
    }
  }, [id]);

  if (!course && id) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500 text-sm">Course not found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return <CourseDetailPage course={course} onBack={() => navigate(-1)} />;
}