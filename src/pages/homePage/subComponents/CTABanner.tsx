import React from 'react';

const CTABanner: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl px-10 py-16 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-14 -left-14 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 relative">
            Ready to accelerate your career?
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed max-w-sm mx-auto mb-8 relative">
            Join thousands of students and start your learning journey today. Get unlimited access to all courses for only $19.99/month.
          </p>
          <a
            href="#signup"
            className="relative inline-block bg-white text-blue-600 font-bold font-display px-9 py-3.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;