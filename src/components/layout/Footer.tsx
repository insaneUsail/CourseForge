import React from 'react';
import clsx from 'clsx';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <a href="/" className="text-2xl font-bold flex items-center gap-1 mb-4 min-h-[44px]">
            CourseForge
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1"></span>
          </a>
          <p className="text-[var(--color-text-muted-light)] max-w-sm">
            Empowering educators and students with modern tools to build, manage, and engage in interactive learning experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Platform</h4>
          <ul className="space-y-2">
            <li><a href="/features" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Features</a></li>
            <li><a href="/pricing" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Pricing</a></li>
            <li><a href="/explore" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Explore Classes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/terms" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Terms of Service</a></li>
            <li><a href="/privacy" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Privacy Policy</a></li>
            <li><a href="/contact" className="text-[var(--color-text-muted-light)] hover:text-white transition-colors min-h-[44px] flex items-center">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center md:text-left text-[var(--color-text-muted-light)] text-sm">
        <p>&copy; {new Date().getFullYear()} CourseForge. All rights reserved.</p>
      </div>
    </footer>
  );
};
