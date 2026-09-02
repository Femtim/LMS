import supabase from "../utils/supabase";
import type { Course } from "../types";

export type DatabaseCourse = {
  id: string; // uuid
  title: string;
  category: Course["category"] | null;
  level: Course["level"] | null;
  description: string | null;
  thumbnail_url: string | null;
  price: number | string | null;
  published: boolean;
  created_at: string;
};

export function toCourse(course: DatabaseCourse): Course {
  return {
    id: course.id, // keep as string — this is a uuid, not a number
    title: course.title,
    category: course.category ?? "Development",
    level: course.level ?? "Beginner",
    rating: 0,
    reviews: "0",
    price: Number(course.price ?? 0),
    image: course.thumbnail_url ?? "/placeholder-course.jpg",
    description: course.description ?? undefined,
  };
}

export async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.filter(
    (course, index, courses) =>
      index === courses.findIndex((candidate) => candidate.title === course.title),
  );
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching course:", error.message);
    throw error;
  }

  if (!data) {
    return null;
  }

  return toCourse(data as DatabaseCourse);
}