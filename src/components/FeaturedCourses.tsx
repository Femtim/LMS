import React, { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  hours: string;
  students: string;
  badge?: string;
  badgeColor: string;
  bgColor: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Data Science Bootcamp',
    description: 'Master Python, SQL, and Machine Learning with real-world projects.',
    price: '$89.99',
    hours: '45 Hours',
    students: '1.2k Students',
    badge: 'BEST SELLER',
    badgeColor: 'bg-amber-500',
    bgColor: 'bg-slate-900',
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    description: 'Learn the fundamentals of Figma and user-centered design principles.',
    price: '$74.99',
    hours: '22 Hours',
    students: '850 Students',
    badge: 'DESIGN',
    badgeColor: 'bg-pink-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 3,
    title: 'Full-Stack Development',
    description: 'Build and deploy modern web applications using React and Node.js.',
    price: '$99.99',
    hours: '60 Hours',
    students: '2.1k Students',
    badge: 'NEW',
    badgeColor: 'bg-emerald-500',
    bgColor: 'bg-slate-900',
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 ${hovered ? '-translate-y-1 shadow-xl' : 'shadow-sm'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className={`${course.bgColor} h-40 relative flex items-center justify-center`}>
        <CourseIllustration courseId={course.id} />
        {course.badge && (
          <span className={`absolute top-3 left-3 ${course.badgeColor} text-white text-[10px] font-bold font-display px-2 py-0.5 rounded tracking-wider`}>
            {course.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-bold text-sm text-slate-900 leading-snug flex-1">
            {course.title}
          </h3>
          <span className="font-display font-bold text-sm text-blue-600 whitespace-nowrap">
            {course.price}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{course.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {course.hours}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {course.students}
          </span>
        </div>
      </div>
    </div>
  );
};

const CourseIllustration: React.FC<{ courseId: number }> = ({ courseId }) => {
  if (courseId === 1) return (
    <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
      <rect x="5" y="5" width="90" height="60" rx="6" fill="#1E293B"/>
      <rect x="12" y="12" width="76" height="46" rx="4" fill="#0F172A"/>
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={12 + i * 10} y={42 - i * 4} width="8" height={4 + i * 4} rx="1" fill="#2563EB" opacity={0.5 + i * 0.07}/>
      ))}
      <polyline points="12,38 25,30 38,34 51,22 64,26 76,18" stroke="#3B82F6" strokeWidth="2" fill="none"/>
    </svg>
  );
  if (courseId === 2) return (
    <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
      <rect x="8" y="8" width="84" height="54" rx="8" fill="#FEE2E2"/>
      <rect x="20" y="16" width="28" height="38" rx="4" fill="#fff"/>
      <rect x="24" y="20" width="20" height="3" rx="1.5" fill="#EC4899"/>
      <rect x="24" y="26" width="15" height="2" rx="1" fill="#CBD5E1"/>
      <rect x="24" y="31" width="18" height="2" rx="1" fill="#CBD5E1"/>
      <rect x="52" y="16" width="28" height="18" rx="4" fill="#fff"/>
      <circle cx="58" cy="22" r="4" fill="#EC4899" opacity="0.3"/>
      <rect x="64" y="20" width="10" height="2" rx="1" fill="#CBD5E1"/>
      <rect x="52" y="38" width="28" height="16" rx="4" fill="#fff"/>
      <rect x="56" y="43" width="20" height="2" rx="1" fill="#CBD5E1"/>
    </svg>
  );
  return (
    <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
      <rect x="5" y="5" width="90" height="60" rx="6" fill="#1A2E1A"/>
      {['#10B981','#3B82F6','#EC4899','#F59E0B'].map((color, i) => (
        <circle key={i} cx={18 + i * 18} cy={15} r="6" fill={color} opacity="0.8"/>
      ))}
      <rect x="12" y="28" width="30" height="4" rx="2" fill="#10B981" opacity="0.8"/>
      <rect x="12" y="36" width="40" height="3" rx="1.5" fill="#475569"/>
      <rect x="55" y="28" width="32" height="3" rx="1.5" fill="#2563EB" opacity="0.7"/>
      <rect x="55" y="35" width="24" height="3" rx="1.5" fill="#475569"/>
    </svg>
  );
};

const FeaturedCourses: React.FC = () => {
  return (
    <section id="courses" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-9 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1.5">Featured Courses</h2>
            <p className="text-sm text-slate-500">Hand-picked best sellers for your career growth.</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View All
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;