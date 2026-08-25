// types.ts — shared types, course data & enrollment store

export type Category = "All Categories" | "Design" | "Development" | "Business" | "Marketing";
export type Level    = "All" | "Beginner" | "Intermediate" | "Advanced";

export interface Instructor {
  name: string; title: string; bio: string; avatar: string; students: string; reviews: string;
}
export interface Lesson   { title: string; duration: string; free?: boolean; }
export interface Module   { title: string; lessons?: Lesson[]; }
export interface Review   { name: string; rating: number; text: string; avatar: string; }

export interface Course {
  id: number;
  title: string;
  category: Exclude<Category, "All Categories">;
  level: Exclude<Level, "All">;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  badge?: "BEST SELLER" | "NEW";
  image: string;
  heroImage?: string;
  description?: string;
  students?: string;
  duration?: string;
  instructor?: Instructor;
  modules?: Module[];
  studentReviews?: Review[];
  includes?: string[];
}

export interface EnrolledCourse {
  courseId: number;
  enrolledAt: string;
  progress: number;        // 0–100
  completed: boolean;
  certificateReady: boolean;
}

export const CATEGORIES: Category[] = ["All Categories", "Design", "Development", "Business"];
export const LEVELS: Level[]         = ["All", "Beginner", "Intermediate", "Advanced"];

// ── In-memory enrollment store ─────────────────────────────────────────────────
// Replace with localStorage / API calls in production

const _enrolled: EnrolledCourse[] = [];

export function getEnrolledCourses(): EnrolledCourse[] {
  return [..._enrolled];
}

export function enrollCourse(courseId: number): void {
  if (!_enrolled.find((e) => e.courseId === courseId)) {
    _enrolled.push({
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false,
      certificateReady: false,
    });
  }
}

export function isEnrolled(courseId: number): boolean {
  return !!_enrolled.find((e) => e.courseId === courseId);
}

export function updateProgress(courseId: number, progress: number): void {
  const entry = _enrolled.find((e) => e.courseId === courseId);
  if (entry) {
    entry.progress = Math.min(100, Math.max(0, progress));
    entry.completed = entry.progress >= 100;
    entry.certificateReady = entry.progress >= 100;
  }
}