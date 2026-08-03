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
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Left Sidebar */}
      <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"/></svg>
            Course Structure
          </h3>
        </div>

        {/* Items List */}
        <div className="flex-1 p-4 space-y-2">
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
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-3 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : isQuiz
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {isQuiz ? 'Q' : i + 1}
                </span>
                <span className="truncate">
                  {isQuiz ? `Quiz · ${item.stage === 'FINAL' ? 'Final' : 'Mid'}` : (item.title || 'Untitled Section')}
                </span>
              </button>
            );
          })}
          {items.length === 0 && (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-400 text-xl">📝</span>
              </div>
              <p className="text-sm text-slate-500">Your course is empty. Add a content section to begin.</p>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Button variant="secondary" size="sm" onClick={handleAddContent} className="w-full text-xs bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700">
            + Content
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowQuizForm(true)} className="w-full text-xs bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700">
            + Quiz
          </Button>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Bar */}
        <div className="px-8 py-5 border-b border-slate-100 bg-white flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <input
                defaultValue={chapter.title}
                onBlur={(e) => handleUpdateChapterTitle(e.target.value)}
                className="font-bold text-lg bg-transparent border-none px-0 py-0 focus:outline-none focus:ring-0 text-slate-800 w-72 placeholder:text-slate-300"
                placeholder="Chapter Title"
                title="Edit Chapter Title"
              />
            </div>
            <button
              onClick={handleTogglePublic}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                chapter.isPublic
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {chapter.isPublic ? 'Public' : 'Draft (Private)'}
            </button>
          </div>
          <Button
            onClick={handleMarkCompleted}
            disabled={chapter.status === 'COMPLETED'}
            className={chapter.status === 'COMPLETED' ? 'bg-emerald-500 hover:bg-emerald-500 text-white' : ''}
          >
            {chapter.status === 'COMPLETED' ? '✓ Completed' : 'Mark as Completed'}
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
          {/* Quiz Creation Modal */}
          {showQuizForm && (
            <Card className="p-8 bg-white border border-slate-200 mb-8 max-w-xl mx-auto shadow-xl rounded-2xl">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">✨</span> Create New Quiz
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Quiz Type</label>
                  <select
                    value={quizStage}
                    onChange={(e) => setQuizStage(e.target.value as 'MID_CHAPTER' | 'FINAL')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="MID_CHAPTER">Mid-Chapter Knowledge Check</option>
                    <option value="FINAL">Final Chapter Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1.5">Timer (seconds)</label>
                  <Input type="number" value={quizTimer} onChange={(e) => setQuizTimer(Number(e.target.value))} className="bg-slate-50" />
                </div>
                {quizStage === 'FINAL' && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer">
                      <input type="checkbox" checked={quizIsEval} onChange={(e) => setQuizIsEval(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                      Strict Evaluation Mode
                    </label>
                    {quizIsEval && (
                      <div className="mt-4 pl-7">
                        <label className="text-sm font-semibold text-slate-700 block mb-1.5">Max Attempts Allowed</label>
                        <Input type="number" value={quizMaxAttempts ?? ''} onChange={(e) => setQuizMaxAttempts(e.target.value ? Number(e.target.value) : null)} className="bg-white" placeholder="Leave empty for unlimited" />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Button onClick={handleCreateQuiz} className="flex-1 bg-indigo-600 hover:bg-indigo-700">Create Quiz</Button>
                  <Button variant="secondary" onClick={() => setShowQuizForm(false)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </Card>
          )}

          {/* No item selected */}
          {!selectedItem && !showQuizForm && (
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <span className="text-4xl text-indigo-200">✍️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Select an item to edit</h3>
              <p className="text-slate-500 text-base leading-relaxed">
                Choose a content section or quiz from the sidebar on the left, or create a new one to start building your chapter.
              </p>
            </div>
          )}

          {/* Content Editor */}
          {selectedItem?.type === 'content' && (
            <Card className="p-8 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col h-[calc(100vh-160px)]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-indigo-500 block mb-2">Section Title</label>
                  <Input
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="Enter a descriptive title for this section..."
                    className="font-bold text-2xl border-none px-0 py-0 h-auto focus-visible:ring-0 placeholder:text-slate-200 shadow-none"
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteContent(selectedItem.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  Delete Section
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto mb-6 bg-slate-50 rounded-xl border border-slate-100">
                <RichTextEditor
                  value={contentDraft}
                  onChange={setContentDraft}
                  className="h-full border-0 shadow-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
                <Button 
                  onClick={() => handleSaveContent(selectedItem.id)} 
                  disabled={saving}
                  className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          )}

          {/* Quiz Editor */}
          {selectedItem?.type === 'quiz' && selectedQuiz && (
            <div className="space-y-6 max-w-3xl mx-auto pb-12">
              {/* Quiz Info */}
              <Card className="p-8 bg-white border border-slate-200 shadow-sm rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {selectedQuiz.stage === 'FINAL' ? '🏆 Final Assessment' : '📋 Knowledge Check'}
                    </h2>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                        ⏱️ {Math.floor(selectedQuiz.timerSeconds / 60)}m {selectedQuiz.timerSeconds % 60}s
                      </span>
                      {selectedQuiz.isEvaluation && (
                        <span className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full text-rose-600">
                          🎯 Max {selectedQuiz.maxAttempts ?? '∞'} attempts
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full text-indigo-600">
                        📝 {(selectedQuiz.questions || []).length} questions
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteQuiz(selectedQuiz.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    Delete Quiz
                  </Button>
                </div>
              </Card>

              {/* Existing Questions */}
              {(selectedQuiz.questions || []).map((q: any, qi: number) => (
                <Card key={q.id} className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="font-semibold text-lg text-slate-800 leading-snug pr-8">
                      <span className="text-indigo-600 mr-3 font-bold">Q{qi + 1}.</span>
                      {q.questionText}
                    </h3>
                    <button
                      onClick={() => handleDeleteQuestion(q.id, selectedQuiz.id)}
                      className="text-sm text-slate-400 hover:text-red-500 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(q.options as string[] || []).map((opt: string, oi: number) => (
                      <div
                        key={oi}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          oi === q.correctOptionIndex
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            oi === q.correctOptionIndex ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {oi === q.correctOptionIndex ? '✓' : String.fromCharCode(65 + oi)}
                          </div>
                          {opt}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Add Question Form */}
              {showQuestionForm ? (
                <Card className="p-8 bg-white border-2 border-dashed border-indigo-200 rounded-2xl">
                  <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                    <span className="text-indigo-500">+</span> New Question
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">Question Prompt</label>
                      <Input
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="e.g. What is the main difference between..."
                        className="bg-slate-50 border-slate-200 text-base py-3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-3">Answer Options (Select the correct one)</label>
                      <div className="space-y-3">
                        {options.map((opt, oi) => (
                          <div key={oi} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${correctOption === oi ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}>
                            <input
                              type="radio"
                              name="correctOption"
                              checked={correctOption === oi}
                              onChange={() => setCorrectOption(oi)}
                              className="w-5 h-5 text-emerald-600 focus:ring-emerald-600 border-slate-300 ml-2"
                            />
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[oi] = e.target.value;
                                setOptions(newOptions);
                              }}
                              placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                              className={`flex-1 ${correctOption === oi ? 'bg-white border-emerald-300 shadow-sm' : 'bg-white border-slate-200'}`}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setOptions([...options, ''])}
                        className="text-sm text-indigo-600 font-semibold mt-4 hover:text-indigo-700 flex items-center gap-1"
                      >
                        + Add another option
                      </button>
                    </div>
                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                      <Button onClick={() => handleAddQuestion(selectedQuiz.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">Save Question</Button>
                      <Button variant="secondary" onClick={() => setShowQuestionForm(false)}>Cancel</Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all text-sm font-bold flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <span className="text-xl">+</span>
                  </div>
                  Add a New Question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
