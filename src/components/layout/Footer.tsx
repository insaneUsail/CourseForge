import React from 'react';
import Link from 'next/link';
import { Mail, Info, FileText, Shield, Headphones, Globe, Code, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18102B] text-[#F5F3FF] py-16 border-t border-[#3B344D]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-extrabold flex items-center gap-1.5 mb-6 text-white min-h-[44px]">
            CourseForge
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0E100] border border-[#834DFB] mt-1.5 animate-pulse"></span>
          </Link>
          <p className="text-[#A29CB0] max-w-sm text-lg leading-relaxed font-medium">
            Empowering educators and students with modern tools to build, manage, and engage in interactive learning experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-6 text-white text-lg tracking-wide">Platform</h4>
          <ul className="space-y-4">
            <li><Link href="#features" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><Info className="w-4 h-4 text-[#834DFB]" /> Features</Link></li>
            <li><Link href="#pricing" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><FileText className="w-4 h-4 text-[#834DFB]" /> Pricing</Link></li>
            <li><Link href="#how-it-works" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><Globe className="w-4 h-4 text-[#834DFB]" /> How it Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-lg tracking-wide">Resources</h4>
          <ul className="space-y-4">
            <li><Link href="#compare" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><FileText className="w-4 h-4 text-[#834DFB]" /> Why CourseForge</Link></li>
            <li><Link href="#faq" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><Shield className="w-4 h-4 text-[#834DFB]" /> FAQ</Link></li>
            <li><Link href="/contact" className="text-[#A29CB0] hover:text-white transition-colors min-h-[44px] flex items-center gap-2 font-medium"><Headphones className="w-4 h-4 text-[#834DFB]" /> Support</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#3B344D] flex flex-col md:flex-row items-center justify-between gap-4 text-[#A29CB0] text-sm">
        <p>&copy; {new Date().getFullYear()} CourseForge. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors"><Code className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></Link>
        </div>
      </div>
    </footer>
  );
};
