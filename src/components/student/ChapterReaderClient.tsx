'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ChevronRight, Target, Play } from 'lucide-react';

export function ChapterReaderClient({ chapter, classId }: { chapter: any, classId?: string }) {
  const router = useRouter();
  
  // Combine contents and quizzes based on logic: mid-chapter quizzes appear after specific contents or at the end.
  // For simplicity, assuming content blocks go first, then final quiz, unless quiz has specific stage mapping.
  // We'll interleave them conceptually or just list contents, then quizzes.
  // The brief: "Left sidebar: numbered content sections + quizzes"
  
  const items: { id: string; label: string; type: 'content' | 'quiz'; data: any }[] = [];
  
  chapter.contents.forEach((content: any, index: number) => {
    items.push({
      id: `content-${content.id}`,
      label: content.title || `Section ${index + 1}`,
      type: 'content',
      data: content
    });
  });

  chapter.quizzes.forEach((quiz: any, index: number) => {
    items.push({
      id: `quiz-${quiz.id}`,
      label: quiz.isEvaluation ? 'Final Quiz' : `Practice Quiz ${index + 1}`,
      type: 'quiz',
      data: quiz
    });
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleTakeQuiz = (quizId: string) => {
    if (classId) {
      router.push(`/student/quiz/${quizId}?classId=${classId}`);
    } else {
      router.push(`/student/quiz/${quizId}`); // might show error
    }
  };

  const sidebarItems = items.map((item, idx) => ({
    id: item.id,
    label: item.label,
    completed: idx < activeIndex // Just simple tracking
  }));

  return (
    <>
      <Sidebar 
        items={sidebarItems} 
        activeId={activeItem?.id} 
        onSelect={(id: string) => {
          const idx = items.findIndex(i => i.id === id);
          if (idx !== -1) setActiveIndex(idx);
        }}
        footer={classId ? <div className="text-xs text-[#18102B] p-4 font-black uppercase tracking-widest bg-[#C6FF3D] border-t-4 border-black">Class context active</div> : undefined}
      />
      
      <div className="flex-1 overflow-auto p-6 md:p-12 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="inline-block bg-[#C6FF3D] text-[#18102B] font-black uppercase tracking-widest text-xs px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
              Chapter Reader
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#18102B] uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', color: 'white', textShadow: '4px 4px 0 #18102B' }}>
              {chapter.title}
            </h1>
          </div>
          
          {activeItem?.type === 'content' && (
            <div className="p-8 md:p-12 mb-8 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35] rounded-bl-full opacity-20 pointer-events-none"></div>
              
              <h2 className="text-3xl font-black text-[#18102B] mb-8 uppercase tracking-tighter border-b-4 border-black pb-4 relative z-10">
                {activeItem.data.title || activeItem.label}
              </h2>
              
              <div 
                className="prose prose-lg prose-slate max-w-none text-[#18102B] font-medium leading-relaxed relative z-10"
                dangerouslySetInnerHTML={{ __html: activeItem.data.text }}
              />
            </div>
          )}

          {activeItem?.type === 'quiz' && (
            <div className="p-8 md:p-12 mb-8 bg-[#834DFB] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl text-center relative overflow-hidden">
              <div className="absolute -left-12 -bottom-12">
                <Target className="w-48 h-48 text-[#18102B] opacity-20" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #18102B' }}>
                  {activeItem.label}
                </h2>
                
                <p className="text-white font-bold text-lg mb-8 max-w-xl mx-auto border-2 border-black bg-[#18102B] p-4 rounded-xl shadow-[4px_4px_0px_rgba(198,255,61,1)]">
                  Test your knowledge on the previous sections. Prepare yourself before starting!
                </p>
                
                <Button 
                  onClick={() => handleTakeQuiz(activeItem.data.id)}
                  className="bg-[#C6FF3D] text-[#18102B] text-xl px-12 py-6 font-black uppercase tracking-widest gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-white border-2 border-black"
                >
                  <Play className="w-6 h-6 fill-current" /> Start Quiz
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-12 pb-12">
            {activeIndex < items.length - 1 && (
              <Button 
                onClick={handleNext}
                className="bg-[#18102B] text-white gap-2 font-black uppercase tracking-widest px-8 py-6 text-lg group hover:bg-[#FF6B35]"
              >
                Next Section 
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
