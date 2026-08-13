import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COURSES, CATEGORIES, LEVELS } from "../../../types";
import type { Category, Level } from "../../../types";
import CourseCard from "./CourseCard";
import PaginationBtn from "../../ui/paginationBtn";
import FilterChip from "../../ui/FilterChip";
import Footer from "../../ui/Footer";



function ListingPage() {
  const navigate = useNavigate();

  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All Categories");
  const [activeLevel, setActiveLevel]       = useState<Level>("All");
  const [currentPage, setCurrentPage]       = useState(1);
  const COURSES_PER_PAGE = 8;

  const filtered = COURSES.filter((c) => {
    const matchCat    = activeCategory === "All Categories" || c.category === activeCategory;
    const matchLvl    = activeLevel === "All" || c.level === activeLevel;
    const matchSearch = search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLvl && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / COURSES_PER_PAGE));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = filtered.slice((safePage - 1) * COURSES_PER_PAGE, safePage * COURSES_PER_PAGE);

  return (
    <>
      <div className="flex flex-col bg-gray-50">

        {/* MAIN */}
        <main className="flex-1 max-w-6xl mx-auto px-5 py-10 w-full">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1.5 mt-0">Explore Courses</h1>
          <p className="text-gray-500 text-base mb-7 mt-0">
            Master new skills with our expert-led online curriculum.
          </p>

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 mb-6 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="11" cy="11" r="7" stroke="#9ca3af" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search for courses, skills, or software..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="flex-1 border-none outline-none text-sm py-3.5 text-gray-900 bg-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Categories:</span>
            {CATEGORIES.map((cat) => (
              <FilterChip key={cat} label={cat} active={activeCategory === cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} />
            ))}
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Level:</span>
            {LEVELS.map((lvl) => (
              <FilterChip key={lvl} label={lvl} active={activeLevel === lvl}
                onClick={() => { setActiveLevel(lvl); setCurrentPage(1); }} />
            ))}
          </div>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="grid gap-5 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
              {paginated.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onView={(id) => navigate(`/courses/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 text-sm">
              No courses match your filters.
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1.5">
            <PaginationBtn
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </PaginationBtn>
            {[1, 2].map((p) => (
              <PaginationBtn key={p} active={safePage === p} onClick={() => setCurrentPage(p)}>
                {p}
              </PaginationBtn>
            ))}
            {/* <PaginationBtn disabled>…</PaginationBtn> */}
            {/* <PaginationBtn active={safePage === totalPages} onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationBtn> */}
            <PaginationBtn
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </PaginationBtn>
          </div>

        </main>
      </div>

      <Footer />
    </>
  );
}

// ── App router ────────────────────────────────────────────────────────────────

export default function EduStreamPro() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Sora', sans-serif; }
        input::placeholder { color: #9ca3af; }
        input { font-family: 'Sora', sans-serif; }
      `}</style>

      
      <ListingPage />
    </>
  );
}