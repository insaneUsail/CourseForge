'use client';

import { useState } from 'react';
import { updateChapter, markChapterCompleted } from '@/lib/actions/chapter-actions';
import { addContent, updateContent, deleteContent } from '@/lib/actions/content-actions';
import { createQuiz, addQuestion, deleteQuestion, deleteQuiz } from '@/lib/actions/quiz-actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

export default function ChapterEditorClient({ chapter: initialChapter }: { chapter: any }) {
  const [chapter, setChapter] = useState(initialChapter);
  const [selectedItem, setSelectedItem] = useState<{ id: string; type: 'content' | 'quiz' } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Content editing state
  const [contentDraft, setContentDraft] = useState('');
  const [contentTitle, setContentTitle] = useState('');

  // Quiz creation state
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [quizStage, setQuizStage] = useState<'MID_CHAPTER' | 'FINAL'>('MID_CHAPTER');
  const [quizTimer, setQuizTimer] = useState(300);
  const [quizIsEval, setQuizIsEval] = useState(false);
  const [quizMaxAttempts, setQuizMaxAttempts] = useState<number | null>(null);

  // Question creation state
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);

  const [saving, setSaving] = useState(false);

  // Compute items dynamically so the sidebar title reflects the current draft title
  const items = [
    ...(chapter.contents || []).map((c: any) => ({
      ...c,
      title: selectedItem?.id === c.id && selectedItem?.type === 'content' ? contentTitle : c.title,
      type: 'content' as const,
    })),
    ...(chapter.quizzes || []).map((q: any) => ({ ...q, type: 'quiz' as const }))
  ].sort((a: any, b: any) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Chapter actions ---
  const handleUpdateChapterTitle = async (title: string) => {
    const formData = new FormData();
    formData.append('chapterId', chapter.id);
    formData.append('title', title);
    formData.append('isPublic', String(chapter.isPublic));
    const result = await updateChapter({} as any, formData);
    if (result.success) {
      setChapter({ ...chapter, title });
      showToast('Chapter title updated');
    }
  };

  const handleTogglePublic = async () => {
    const isPublic = !chapter.isPublic;
    const formData = new FormData();
    formData.append('chapterId', chapter.id);
    formData.append('title', chapter.title);
    formData.append('isPublic', String(isPublic));
    const result = await updateChapter({} as any, formData);
    if (result.success) {
      setChapter({ ...chapter, isPublic });
      showToast(`Chapter is now ${isPublic ? 'Public' : 'Private'}`);
    }
  };

  const handleMarkCompleted = async () => {
    const result = await markChapterCompleted(chapter.id);
    if (result.success) {
      setChapter({ ...chapter, status: 'COMPLETED' });
      showToast('Chapter marked as completed!');
    }
  };

  // --- Content actions ---
  const handleAddContent = async () => {
    const formData = new FormData();
    formData.append('chapterId', chapter.id);
    formData.append('text', '<p>Start writing here...</p>');
    formData.append('orderIndex', String(items.length));
    const result = await addContent({} as any, formData);
    if (result.success && (result as any).data) {
      const newContent = (result as any).data;
      setChapter({ ...chapter, contents: [...(chapter.contents || []), newContent] });
      setSelectedItem({ id: newContent.id, type: 'content' });
      setContentDraft(newContent.text);
      setContentTitle('');
      showToast('Content section added');
    }
  };

  const handleSaveContent = async (contentId: string) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('contentId', contentId);
    formData.append('title', contentTitle);
    formData.append('text', contentDraft);
    const result = await updateContent({} as any, formData);
    if (result.success) {
      setChapter({
        ...chapter,
        contents: chapter.contents.map((c: any) =>
          c.id === contentId ? { ...c, text: contentDraft, title: contentTitle } : c
        )
      });
      showToast('Content saved');
    } else {
      showToast((result as any).error || 'Failed to save', 'error');
    }
    setSaving(false);
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!confirm('Delete this content section?')) return;
    const result = await deleteContent(contentId);
    if (result.success) {
      setChapter({
        ...chapter,
        contents: chapter.contents.filter((c: any) => c.id !== contentId)
      });
      setSelectedItem(null);
      showToast('Content deleted');
    }
  };

  // --- Quiz actions ---
  const handleCreateQuiz = async () => {
    const formData = new FormData();
    formData.append('chapterId', chapter.id);
    formData.append('stage', quizStage);
    formData.append('isEvaluation', String(quizIsEval));
    formData.append('timerSeconds', String(quizTimer));
    if (quizMaxAttempts) formData.append('maxAttempts', String(quizMaxAttempts));

    const result = await createQuiz({} as any, formData);
    if (result.success && result.data) {
      const newQuiz = {
        id: result.data.quizId,
        stage: quizStage,
        isEvaluation: quizIsEval,
        timerSeconds: quizTimer,
        maxAttempts: quizMaxAttempts,
        questions: [],
        orderIndex: items.length,
      };
      setChapter({ ...chapter, quizzes: [...(chapter.quizzes || []), newQuiz] });
      setSelectedItem({ id: newQuiz.id as string, type: 'quiz' });
      setShowQuizForm(false);
      showToast('Quiz created');
    } else {
      showToast((result as any).error || 'Failed to create quiz', 'error');
    }
  };

  const handleAddQuestion = async (quizId: string) => {
    const filledOptions = options.filter((o) => o.trim().length > 0);
    if (filledOptions.length < 2) {
      showToast('At least 2 options required', 'error');
      return;
    }
    if (!questionText.trim()) {
      showToast('Question text required', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('quizId', quizId);
    formData.append('questionText', questionText);
    formData.append('options', JSON.stringify(filledOptions));
    formData.append('correctOptionIndex', String(correctOption));

    const result = await addQuestion({} as any, formData);
    if (result.success) {
      const updatedQuizzes = chapter.quizzes.map((q: any) => {
        if (q.id === quizId) {
          return {
            ...q,
            questions: [
              ...(q.questions || []),
              { id: Date.now().toString(), questionText, options: filledOptions, correctOptionIndex: correctOption }
            ]
          };
        }
        return q;
      });
      setChapter({ ...chapter, quizzes: updatedQuizzes });
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);
      setShowQuestionForm(false);
      showToast('Question added');
    } else {
      showToast((result as any).error || 'Failed to add question', 'error');
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm('Delete this quiz and all its questions?')) return;
    const result = await deleteQuiz(quizId);
    if (result.success) {
      setChapter({
        ...chapter,
        quizzes: chapter.quizzes.filter((q: any) => q.id !== quizId)
      });
      setSelectedItem(null);
      showToast('Quiz deleted');
    }
  };

  const handleDeleteQuestion = async (questionId: string, quizId: string) => {
    const result = await deleteQuestion(questionId);
    if (result.success) {
      setChapter({
        ...chapter,
        quizzes: chapter.quizzes.map((q: any) =>
          q.id === quizId
            ? { ...q, questions: (q.questions || []).filter((qu: any) => qu.id !== questionId) }
            : q
        )
      });
      showToast('Question deleted');
    }
  };

  // Get selected quiz for rendering
  const selectedQuiz = selectedItem?.type === 'quiz'
    ? chapter.quizzes?.find((q: any) => q.id === selectedItem.id)
    : null;

  return (
    <div className="flex flex-1 overflow-hidden relative bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18102B15_1px,transparent_1px),linear-gradient(to_bottom,#18102B15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black text-white text-sm font-black uppercase tracking-widest transition-all animate-fade-in ${toast.type === 'success' ? 'bg-[#C6FF3D] text-[#18102B]' : 'bg-[#FF6B35]'}`}>
          {toast.message}
        </div>
      )}

      {/* Left Sidebar */}
      <div className="w-80 bg-[#F5F3FF] border-r-4 border-black flex flex-col overflow-y-auto relative z-10 shadow-[4px_0px_0px_rgba(0,0,0,1)]">
        {/* Sidebar Header */}
        <div className="p-6 border-b-4 border-black bg-[#18102B]">
          <h3 className="font-black text-white text-lg flex items-center gap-3 uppercase tracking-widest">
            <svg className="w-6 h-6 text-[#C6FF3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"/></svg>
            Course Structure
          </h3>
        </div>

        {/* Items List */}
        <div className="flex-1 p-4 space-y-3 bg-[#F5F3FF]">
          {items.map((item: any, i: number) => {
            const isSelected = selectedItem?.id === item.id;
            const isQuiz = item.type === 'quiz';
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem({ id: item.id, type: item.type });
                  if (item.type === 'content') {
                    setContentDraft(item.text);
                    setContentTitle(item.title || '');
                  }
                  setShowQuestionForm(false);
                }}
                className={`w-full text-left px-4 py-4 rounded-xl text-sm font-black transition-all duration-150 flex items-center gap-3 border-2 border-black uppercase ${
                  isSelected
                    ? 'bg-[#C6FF3D] text-[#18102B] shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-x-1'
                    : 'bg-white text-[#18102B] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#18102B] hover:text-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-xs font-black border-2 border-black ${
                  isSelected
                    ? 'bg-[#18102B] text-[#C6FF3D]'
                    : isQuiz
                      ? 'bg-[#FF6B35] text-white'
                      : 'bg-[#F0E100] text-[#18102B]'
                }`}>
                  {isQuiz ? 'Q' : i + 1}
                </span>
                <span className="truncate tracking-wide">
                  {isQuiz ? `Quiz · ${item.stage === 'FINAL' ? 'Final' : 'Mid'}` : (item.title || 'Untitled Section')}
                </span>
              </button>
            );
          })}
          {items.length === 0 && (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-sm text-[#18102B] font-black uppercase tracking-widest">Your course is empty. Add a content section to begin.</p>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="p-4 border-t-4 border-black bg-white grid grid-cols-2 gap-3 z-10">
          <Button variant="secondary" size="sm" onClick={handleAddContent} className="w-full font-black uppercase tracking-widest text-xs bg-[#C6FF3D] hover:bg-white border-2 border-black text-[#18102B] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] py-4">
            + Content
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowQuizForm(true)} className="w-full font-black uppercase tracking-widest text-xs bg-[#F0E100] hover:bg-white border-2 border-black text-[#18102B] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] py-4">
            + Quiz
          </Button>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-1 flex flex-col bg-transparent z-10">
        {/* Top Bar */}
        <div className="px-8 py-5 border-b-4 border-black bg-white flex justify-between items-center shadow-[0_4px_0px_rgba(0,0,0,1)] z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-4 border-black focus-within:ring-4 focus-within:ring-[#C6FF3D] transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <svg className="w-5 h-5 text-[#18102B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <input
                defaultValue={chapter.title}
                onBlur={(e) => handleUpdateChapterTitle(e.target.value)}
                className="font-black text-xl uppercase tracking-tighter bg-transparent border-none px-0 py-0 focus:outline-none focus:ring-0 text-[#18102B] w-72 placeholder:text-gray-400"
                placeholder="Chapter Title"
                title="Edit Chapter Title"
              />
            </div>
            <button
              onClick={handleTogglePublic}
              className={`px-4 py-2 rounded border-2 border-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] ${
                chapter.isPublic
                  ? 'bg-[#834DFB] text-white'
                  : 'bg-white text-[#18102B]'
              }`}
            >
              {chapter.isPublic ? 'PUBLIC' : 'DRAFT (PRIVATE)'}
            </button>
          </div>
          <Button
            onClick={handleMarkCompleted}
            disabled={chapter.status === 'COMPLETED'}
            className={`font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
              chapter.status === 'COMPLETED' 
                ? 'bg-[#18102B] text-white opacity-100 hover:bg-[#18102B]' 
                : 'bg-[#C6FF3D] text-[#18102B] hover:bg-white'
            }`}
          >
            {chapter.status === 'COMPLETED' ? '✓ COMPLETED' : 'MARK AS COMPLETED'}
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Quiz Creation Modal */}
          {showQuizForm && (
            <div className="p-8 bg-[#834DFB] border-4 border-black mb-8 max-w-2xl mx-auto shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-[32px] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 text-[#18102B] opacity-20 text-9xl">?</div>
              <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3 relative z-10" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #18102B' }}>
                <span className="text-[#F0E100]">✨</span> Create New Quiz
              </h2>
              <div className="space-y-6 relative z-10">
                <div className="bg-white p-6 border-4 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <label className="text-xs font-black text-[#18102B] uppercase tracking-widest block mb-2">Quiz Type</label>
                  <select
                    value={quizStage}
                    onChange={(e) => setQuizStage(e.target.value as 'MID_CHAPTER' | 'FINAL')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-black bg-white text-[#18102B] font-bold focus:border-[#834DFB] focus:ring-2 focus:ring-[#834DFB] outline-none"
                  >
                    <option value="MID_CHAPTER">Mid-Chapter Knowledge Check</option>
                    <option value="FINAL">Final Chapter Assessment</option>
                  </select>
                </div>
                
                <div className="bg-white p-6 border-4 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <label className="text-xs font-black text-[#18102B] uppercase tracking-widest block mb-2">Timer (seconds)</label>
                  <Input type="number" value={quizTimer} onChange={(e) => setQuizTimer(Number(e.target.value))} className="border-2 border-black font-bold" />
                </div>
                
                {quizStage === 'FINAL' && (
                  <div className="bg-[#C6FF3D] p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    <label className="flex items-center gap-3 text-sm font-black text-[#18102B] uppercase tracking-widest cursor-pointer">
                      <input type="checkbox" checked={quizIsEval} onChange={(e) => setQuizIsEval(e.target.checked)} className="w-5 h-5 rounded border-2 border-black text-[#18102B] focus:ring-[#18102B]" />
                      Strict Evaluation Mode
                    </label>
                    {quizIsEval && (
                      <div className="mt-6 pl-8">
                        <label className="text-xs font-black text-[#18102B] uppercase tracking-widest block mb-2">Max Attempts Allowed</label>
                        <Input type="number" value={quizMaxAttempts ?? ''} onChange={(e) => setQuizMaxAttempts(e.target.value ? Number(e.target.value) : null)} className="border-2 border-black font-bold bg-white" placeholder="Leave empty for unlimited" />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-4 pt-6">
                  <Button onClick={handleCreateQuiz} className="flex-1 bg-[#C6FF3D] text-[#18102B] border-2 border-black font-black uppercase tracking-widest py-6 text-lg hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5">Create Quiz</Button>
                  <Button variant="secondary" onClick={() => setShowQuizForm(false)} className="flex-1 bg-white text-[#18102B] border-2 border-black font-black uppercase tracking-widest py-6 text-lg hover:bg-gray-100 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5">Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {/* No item selected */}
          {!selectedItem && !showQuizForm && (
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center animate-fade-in">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black mb-8 transform transition-transform hover:scale-110">
                <span className="text-6xl text-[#18102B]">✍️</span>
              </div>
              <h3 className="text-3xl font-black text-[#18102B] mb-4 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', color: 'white', textShadow: '2px 2px 0 #18102B' }}>Select an item to edit</h3>
              <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl">
                <p className="text-[#18102B] font-bold text-lg leading-relaxed">
                  Choose a content section or quiz from the sidebar on the left, or create a new one to start building your chapter.
                </p>
              </div>
            </div>
          )}

          {/* Content Editor */}
          {selectedItem?.type === 'content' && (
            <div className="p-8 bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-[32px] flex flex-col h-[calc(100vh-160px)] animate-fade-in">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex-1 bg-[#F5F3FF] p-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] focus-within:ring-4 focus-within:ring-[#C6FF3D] transition-all">
                  <label className="text-xs font-black uppercase tracking-widest text-[#18102B] block mb-2">Section Title</label>
                  <Input
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="Enter a descriptive title for this section..."
                    className="font-black text-2xl uppercase tracking-tighter border-none px-0 py-0 h-auto focus-visible:ring-0 placeholder:text-gray-400 shadow-none bg-transparent"
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteContent(selectedItem.id)}
                  className="font-black uppercase tracking-widest bg-white text-[#FF6B35] border-4 border-[#FF6B35] shadow-[4px_4px_0px_rgba(255,107,53,1)] hover:bg-[#FF6B35] hover:text-white hover:shadow-[6px_6px_0px_rgba(255,107,53,1)] hover:-translate-y-0.5 py-4 px-6 h-auto"
                >
                  Delete Section
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto mb-8 bg-white rounded-2xl border-4 border-black shadow-inner relative z-10">
                <RichTextEditor
                  value={contentDraft}
                  onChange={setContentDraft}
                  className="h-full border-0 shadow-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t-4 border-black/10 mt-auto">
                <Button 
                  onClick={() => handleSaveContent(selectedItem.id)} 
                  disabled={saving}
                  className="font-black uppercase tracking-widest bg-[#18102B] text-white py-4 px-8 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#834DFB] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 text-lg"
                >
                  {saving ? 'SAVING CHANGES...' : 'SAVE CHANGES'}
                </Button>
              </div>
            </div>
          )}

          {/* Quiz Editor */}
          {selectedItem?.type === 'quiz' && selectedQuiz && (
            <div className="space-y-8 max-w-3xl mx-auto pb-12 animate-fade-in">
              {/* Quiz Info */}
              <div className="p-8 bg-[#F0E100] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-full bg-[#18102B]"></div>
                <div className="flex justify-between items-start mb-2 pl-4">
                  <div>
                    <h2 className="text-3xl font-black text-[#18102B] uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black', color: 'white', textShadow: '2px 2px 0 #18102B' }}>
                      {selectedQuiz.stage === 'FINAL' ? '🏆 Final Assessment' : '📋 Knowledge Check'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-black uppercase tracking-widest">
                      <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#18102B]">
                        ⏱️ {Math.floor(selectedQuiz.timerSeconds / 60)}m {selectedQuiz.timerSeconds % 60}s
                      </span>
                      {selectedQuiz.isEvaluation && (
                        <span className="flex items-center gap-2 bg-[#FF6B35] px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white">
                          🎯 Max {selectedQuiz.maxAttempts ?? '∞'} attempts
                        </span>
                      )}
                      <span className="flex items-center gap-2 bg-[#834DFB] px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white">
                        📝 {(selectedQuiz.questions || []).length} questions
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteQuiz(selectedQuiz.id)}
                    className="font-black uppercase tracking-widest bg-white text-[#FF6B35] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#FF6B35] hover:text-white"
                  >
                    Delete Quiz
                  </Button>
                </div>
              </div>

              {/* Existing Questions */}
              {(selectedQuiz.questions || []).map((q: any, qi: number) => (
                <div key={q.id} className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl transform transition-transform hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-start mb-6 border-b-4 border-black/10 pb-4">
                    <h3 className="font-black text-xl text-[#18102B] leading-tight pr-8">
                      <span className="text-[#834DFB] mr-4 text-3xl font-black block mb-2" style={{ WebkitTextStroke: '1px black', color: 'white', textShadow: '2px 2px 0 #18102B' }}>Q{qi + 1}.</span>
                      {q.questionText}
                    </h3>
                    <button
                      onClick={() => handleDeleteQuestion(q.id, selectedQuiz.id)}
                      className="text-sm text-[#18102B] hover:text-[#FF6B35] font-black uppercase tracking-widest transition-colors bg-[#F5F3FF] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(q.options as string[] || []).map((opt: string, oi: number) => (
                      <div
                        key={oi}
                        className={`px-4 py-4 rounded-xl text-lg font-bold transition-all border-4 ${
                          oi === q.correctOptionIndex
                            ? 'bg-[#C6FF3D] text-[#18102B] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                            : 'bg-white text-[#18102B] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black border-2 border-black ${
                            oi === q.correctOptionIndex ? 'bg-[#18102B] text-[#C6FF3D]' : 'bg-gray-100 text-[#18102B]'
                          }`}>
                            {oi === q.correctOptionIndex ? '✓' : String.fromCharCode(65 + oi)}
                          </div>
                          {opt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add Question Form */}
              {showQuestionForm ? (
                <div className="p-8 bg-[#F5F3FF] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6FF3D] rounded-bl-full opacity-50 mix-blend-multiply pointer-events-none"></div>
                  <h3 className="font-black text-[#18102B] text-2xl mb-8 uppercase tracking-widest flex items-center gap-3">
                    <span className="bg-[#18102B] text-white w-8 h-8 flex items-center justify-center rounded-full text-xl">+</span> New Question
                  </h3>
                  <div className="space-y-6 relative z-10">
                    <div className="bg-white p-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <label className="text-sm font-black text-[#18102B] uppercase tracking-widest block mb-4">Question Prompt</label>
                      <Input
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="e.g. What is the main difference between..."
                        className="font-bold text-lg border-2 border-black py-4 px-4 bg-[#F5F3FF]"
                      />
                    </div>
                    <div className="bg-white p-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <label className="text-sm font-black text-[#18102B] uppercase tracking-widest block mb-6">Answer Options (Select the correct one)</label>
                      <div className="space-y-4">
                        {options.map((opt, oi) => (
                          <div key={oi} className={`flex items-center gap-4 p-4 rounded-xl transition-all border-4 ${correctOption === oi ? 'bg-[#C6FF3D] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}>
                            <input
                              type="radio"
                              name="correctOption"
                              checked={correctOption === oi}
                              onChange={() => setCorrectOption(oi)}
                              className="w-6 h-6 text-[#18102B] focus:ring-[#18102B] border-2 border-black ml-2"
                            />
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[oi] = e.target.value;
                                setOptions(newOptions);
                              }}
                              placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                              className={`flex-1 font-bold border-2 border-black px-4 py-3 ${correctOption === oi ? 'bg-white' : 'bg-gray-50'}`}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setOptions([...options, ''])}
                        className="font-black uppercase tracking-widest text-[#18102B] mt-6 bg-[#C6FF3D] border-2 border-black px-4 py-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                      >
                        + Add another option
                      </button>
                    </div>
                    <div className="flex gap-4 pt-6 border-t-4 border-black/10">
                      <Button onClick={() => handleAddQuestion(selectedQuiz.id)} className="font-black uppercase tracking-widest bg-[#18102B] text-white border-2 border-black px-8 py-6 text-lg hover:bg-[#834DFB] shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-1">Save Question</Button>
                      <Button variant="secondary" onClick={() => setShowQuestionForm(false)} className="font-black uppercase tracking-widest bg-white text-[#18102B] border-2 border-black px-8 py-6 text-lg hover:bg-gray-100 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex-1">Cancel</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="w-full py-12 border-4 border-dashed border-black bg-[#F5F3FF] rounded-[32px] text-[#18102B] hover:bg-[#C6FF3D] hover:border-solid hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all flex flex-col items-center justify-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-black group-hover:bg-[#18102B] group-hover:text-[#C6FF3D] flex items-center justify-center transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    <span className="text-4xl font-black">+</span>
                  </div>
                  <span className="font-black uppercase tracking-widest text-lg">Add a New Question</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
