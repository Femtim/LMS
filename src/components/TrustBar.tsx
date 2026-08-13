import React from 'react';

const partners = ['TECHCORP', 'EDULABS', 'LEARNIFY', 'PROSKILLS', 'STUDYGEN'];

const TrustBar: React.FC = () => {
  return (
    <section className="bg-white border-t border-b border-slate-200 py-5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {partners.map((name) => (
            <span
              key={name}
              className="font-display text-xs font-bold text-slate-300 tracking-widest hover:text-slate-400 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;