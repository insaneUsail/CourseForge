'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

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
        footer={classId ? <div className="text-xs text-text-default p-4">Class context active</div> : undefined}
      />
      
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-text-light mb-8">{chapter.title}</h1>
          
          {activeItem?.type === 'content' && (
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{activeItem.data.title || activeItem.label}</h2>
              <div 
                className="prose prose-slate max-w-none text-slate-800"
                dangerouslySetInnerHTML={{ __html: activeItem.data.text }}
              />
            </Card>
          )}

          {activeItem?.type === 'quiz' && (
            <Card className="p-8 mb-8 bg-surface-alt">
              <h2 className="text-xl font-bold text-text-light mb-4">{activeItem.label}</h2>
              <p className="text-text-default mb-6">
                Test your knowledge on the previous sections.
              </p>
              <Button onClick={() => handleTakeQuiz(activeItem.data.id)}>
                Start Quiz
              </Button>
            </Card>
          )}

          <div className="flex justify-end mt-8">
            {activeIndex < items.length - 1 && (
              <Button onClick={handleNext}>
                Next Section &rarr;
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
