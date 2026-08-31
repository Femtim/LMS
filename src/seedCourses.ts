import supabase from "./utils/supabase";
import type { Course } from "./types";

export async function seedCourses(courses: Course[]) {
  // Remove duplicate courses based on their title
  const uniqueCourses = courses.filter(
    (course, index, self) =>
      index === self.findIndex((c) => c.title === course.title)
  );

  const coursesToInsert = uniqueCourses.map((course) => ({
    title: course.title,
    description: course.description || null,
    thumbnail_url: course.image,
    category: course.category,
    level: course.level,
    price: course.price,
    published: true,
  }));

  const { data, error } = await supabase
    .from("courses")
    .insert(coursesToInsert)
    .select();

  if (error) {
    console.error("Error inserting courses:", error.message);
    return;
  }

  console.log("Courses successfully added!", data);
}