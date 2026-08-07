'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitAttempt } from '@/lib/actions/attempt-actions';
import { Button } from '@/components/ui/Button';
import { Timer } from '@/components/ui/Timer';
import { ScorePill } from '@/components/ui/ScorePill';

export function QuizTakingClient({ quiz, classId }: { quiz: any, classId: string }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [startTime] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelectOption = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const answersRecord: Record<string, number> = {};
    answers.forEach((ans, idx) => {
      answersRecord[quiz.questions[idx].id] = ans;
    });
    
    try {
      const response = await submitAttempt({
        quizId: quiz.id,
        classId,
        answers: answersRecord,
        startedAt: new Date(startTime).toISOString()
      });
      setResult(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-[#F5F3FF] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="bg-white p-4 md:p-6 md:p-12 rounded-[32px] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] max-w-2xl w-full text-center relative z-10 animate-fade-in">
          <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-[#C6FF3D] rounded-bl-full opacity-50 mix-blend-screen pointer-events-none"></div>
          <h2 className="text-lg md:text-2xl md:text-4xl md:text-5xl font-black text-[#18102B] mb-4 md:mb-8 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', color: 'white', textShadow: '4px 4px 0 #18102B' }}>
            Quiz Completed!
          </h2>
          <div className="flex justify-center mb-4 md:mb-8 transform hover:scale-110 transition-transform">
            <ScorePill score={result.score} total={result.totalQuestions} />
          </div>
          <div className="bg-[#F5F3FF] border-2 border-black rounded-xl p-4 inline-block mb-6 md:mb-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <p className="text-[#18102B] font-black uppercase tracking-widest text-sm">
              Time taken: <span className="text-[#FF6B35]">{result.timeTakenSeconds} seconds</span>
            </p>
          </div>
          <div>
            <Button 
              onClick={() => router.push(`/student/history`)}
              className="w-full bg-[#18102B] text-white font-black uppercase tracking-widest py-3 md:py-6 text-lg hover:bg-[#FF6B35]"
            >
              View Attempt History
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="bg-[#18102B] border-b-4 border-black px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0px_4px_0px_rgba(0,0,0,1)]">
        <div className="text-white font-black uppercase tracking-widest text-sm bg-[#FF6B35] border-2 border-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        {quiz.timerSeconds && (
          <div className="bg-[#C6FF3D] border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] px-4 py-1">
            <Timer totalSeconds={quiz.timerSeconds} onTimeUp={handleSubmit} />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-3 md:py-6 md:py-12 max-w-4xl flex-1 flex flex-col justify-center relative z-10 animate-fade-in">
        <div className="bg-white p-4 md:p-8 md:p-12 rounded-[32px] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]">
          <h3 className="text-lg md:text-2xl md:text-3xl font-black text-[#18102B] mb-10 leading-tight">
            {question.questionText}
          </h3>
          
          <div className="space-y-4 mb-6 md:mb-12">
            {(question.options as string[]).map((option: string, idx: number) => {
              const isSelected = answers[currentQuestionIndex] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`
                    p-4 md:p-6 rounded-xl border-4 cursor-pointer transition-transform min-h-[60px] flex items-center group
                    ${isSelected 
                      ? 'border-black bg-[#C6FF3D] shadow-[6px_6px_0px_rgba(0,0,0,1)] -translate-y-1' 
                      : 'border-black bg-white hover:bg-[#F5F3FF] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mr-4 font-black ${isSelected ? 'bg-[#18102B] text-white' : 'bg-white text-[#18102B]'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-xl font-bold ${isSelected ? 'text-[#18102B]' : 'text-[#18102B]'}`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-6 border-t-4 border-black/10 border-dashed">
            <Button 
              onClick={handleNext} 
              disabled={answers[currentQuestionIndex] === -1 || isSubmitting}
              className={`font-black uppercase tracking-widest px-4 md:px-8 py-3 md:py-6 text-lg ${
                isLastQuestion 
                  ? 'bg-[#FF6B35] text-white hover:bg-[#18102B]' 
                  : 'bg-[#18102B] text-white hover:bg-[#834DFB]'
              }`}
            >
              {isSubmitting ? 'SUBMITTING...' : isLastQuestion ? 'SUBMIT QUIZ' : 'NEXT QUESTION'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
