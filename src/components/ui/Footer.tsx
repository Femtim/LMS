import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 font-display font-bold text-base text-white mb-3">
              <span className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L2 8l10 5 10-5-10-5zM2 13l10 5 10-5M2 18l10 5 10-5"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              EduStream Pro
            </a>
            <p className="text-xs leading-relaxed max-w-50 mb-5">
              Empowering learners worldwide with accessible, AI-enhanced education and industry-leading courses.
            </p>
            <div className="flex gap-2">
              {[
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
                <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>,
                <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
              ].map((iconPath, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-600 hover:border-blue-600 hover:text-blue-500 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={i === 0 ? 'currentColor' : 'none'} stroke={i === 0 ? 'none' : 'currentColor'} strokeWidth="2">
                    {iconPath}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white text-xs font-semibold font-display tracking-widest uppercase mb-4">Platform</h4>
            {['Courses', 'Instructors', 'Learning Paths', 'Certifications'].map(link => (
              <a key={link} href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2.5">{link}</a>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-xs font-semibold font-display tracking-widest uppercase mb-4">Support</h4>
            {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="block text-sm text-slate-400 hover:text-white transition-colors mb-2.5">{link}</a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-xs font-semibold font-display tracking-widest uppercase mb-4">Newsletter</h4>
            <p className="text-xs leading-relaxed mb-4">
              Get the latest course updates and tips delivered to your inbox.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors mb-2"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold font-display py-2.5 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">© 2024 EduStream Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;