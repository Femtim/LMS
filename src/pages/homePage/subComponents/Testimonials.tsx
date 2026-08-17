import React from 'react';

const testimonials = [
  {
    text: 'The AI assistant is a game changer. I was stuck on a React hook for hours, and it explained the concept perfectly in seconds. Best investment in my career!',
    name: 'Sara Johnson',
    role: 'Junior Frontend Developer',
    avatarColor: 'bg-indigo-500',
    rating: 5,
  },
  {
    text: 'As a career switcher, the structured paths and mentor support helped me transition from marketing to data science in just 6 months.',
    name: 'Michael Reed',
    role: 'Data Analyst at TechFlow',
    avatarColor: 'bg-violet-500',
    rating: 5,
  },
  {
    text: 'The UI design masterclass was incredibly detailed. I particularly loved the section on building design systems. Very practical approach!',
    name: 'Elena Gomez',
    role: 'Freelance UX Designer',
    avatarColor: 'bg-pink-500',
    rating: 5,
  },
];

const TestimonialCard: React.FC<{
  text: string;
  name: string;
  role: string;
  avatarColor: string;
  rating: number;
}> = ({ text, name, role, avatarColor, rating }) => (
  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
    <p className="text-sm text-slate-500 leading-7 italic mb-5">"{text}"</p>
    <div className="flex items-center gap-2.5">
      <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-bold font-display shrink-0`}>
        {name[0]}
      </div>
      <div>
        <p className="font-display font-semibold text-xs text-slate-900">{name}</p>
        <p className="text-xs text-slate-400">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
            What Our Students Say
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;