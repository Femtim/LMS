import React, { useState } from 'react';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'AI Study Assistant',
    description: 'Get 24/7 instant help with your coursework, summaries, and code reviews from our advanced AI model.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Verified Certificates',
    description: 'Earn industry-recognized digital certificates that you can share directly to LinkedIn and your portfolio.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Expert Mentors',
    description: 'Learn directly from professionals working at Google, Meta, and Netflix through live Q&A sessions.',
  },
];

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon, title, description
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-7 transition-all duration-200 ${hovered ? '-translate-y-1 shadow-lg' : 'shadow-sm'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display font-bold text-base text-slate-900 mb-2.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
};

const WhyChoose: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2.5">
            Why Choose EduStream Pro?
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Our platform is designed to provide the ultimate learning experience with next-gen tools and industry connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;