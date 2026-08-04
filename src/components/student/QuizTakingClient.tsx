'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitAttempt } from '@/lib/actions/attempt-actions';
import { Card } from '@/components/ui/Card';
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
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center page-enter">
        <Card className="p-8">
          <h2 className="text-3xl font-bold text-text-light mb-6">Quiz Completed</h2>
          <div className="flex justify-center mb-6">
            <ScorePill score={result.score} total={result.totalQuestions} />
          </div>
          <p className="text-text-default mb-8">Time taken: {result.timeTakenSeconds} seconds</p>
          <Button onClick={() => router.push(`/student/history`)}>
            View Attempt History
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="bg-bg-dark2 border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="text-text-light font-medium">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        {quiz.timerSeconds && (
          <Timer totalSeconds={quiz.timerSeconds} onTimeUp={handleSubmit} />
        )}
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl flex-1 flex flex-col justify-center page-enter">
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-text-light mb-8">{question.questionText}</h3>
          
          <div className="space-y-4 mb-8">
            {(question.options as string[]).map((option: string, idx: number) => {
              const isSelected = answers[currentQuestionIndex] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all min-h-[44px] flex items-center
                    ${isSelected 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border bg-surface hover:bg-surface-alt hover:border-text-default'
                    }
                  `}
                >
                  <span className={`text-lg ${isSelected ? 'text-text-light font-medium' : 'text-text-default'}`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={answers[currentQuestionIndex] === -1 || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
