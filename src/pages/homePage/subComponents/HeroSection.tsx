import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="animate-[fadeUp_0.7s_ease_forwards]">
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-4">
              THE FUTURE OF LEARNING
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 mb-5">
              Master New Skills<br />
              with{' '}
              <span className="text-blue-600">EduStream<br />Pro</span>
            </h1>
            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-md">
              Experience the future of education with our AI-powered platform. Join over 10,000 students learning from top industry experts today.
            </p>

            <a
              href="#courses"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold font-display px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Browse Courses
            </a>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-7">
              <div className="flex">
                {['bg-indigo-500', 'bg-pink-500', 'bg-amber-500'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-white ${color} ${i > 0 ? '-ml-2' : ''}`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                Joined by <strong className="text-slate-700">10k+</strong> active students
              </p>
            </div>
          </div>

          {/* Right image placeholder */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 h-80 md:h-96 flex items-center justify-center">
            <div className="w-11/12 h-11/12 rounded-xl bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center relative">
              <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
                <rect x="20" y="20" width="160" height="100" rx="10" fill="#334155" />
                <rect x="30" y="30" width="140" height="82" rx="6" fill="#0F172A" />
                <rect x="35" y="35" width="130" height="72" rx="4" fill="#1E293B" />
                <rect x="42" y="42" width="60" height="6" rx="3" fill="#2563EB" opacity="0.8"/>
                <rect x="42" y="54" width="40" height="4" rx="2" fill="#475569"/>
                <rect x="42" y="64" width="50" height="4" rx="2" fill="#475569"/>
                <rect x="42" y="74" width="35" height="4" rx="2" fill="#475569"/>
                <rect x="110" y="42" width="50" height="55" rx="6" fill="#2563EB" opacity="0.15"/>
                <rect x="117" y="50" width="36" height="4" rx="2" fill="#2563EB" opacity="0.6"/>
                <rect x="117" y="60" width="28" height="4" rx="2" fill="#475569"/>
                <rect x="117" y="70" width="32" height="4" rx="2" fill="#475569"/>
                <path d="M10 122 L190 122 L180 132 L20 132 Z" fill="#334155" />
              </svg>
              {/* Coffee cup */}
              <div className="absolute right-6 bottom-6 w-10 h-12 bg-amber-600 rounded-t-sm rounded-b-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FEF3C7" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;