import React, { useState } from 'react';
import { AppScreen, ReviewQuestionItem } from '../../types';
import { INITIAL_REVIEW_QUESTIONS } from '../../data/mockData';
import { Header } from '../common/Header';

interface ReviewAnswersScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

type FilterTab = 'all' | 'incorrect' | 'correct' | 'saved';

export const ReviewAnswersScreen: React.FC<ReviewAnswersScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [questions, setQuestions] = useState<ReviewQuestionItem[]>(INITIAL_REVIEW_QUESTIONS);

  const toggleBookmark = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (activeTab === 'incorrect') return !q.isCorrect;
    if (activeTab === 'correct') return q.isCorrect;
    if (activeTab === 'saved') return q.isBookmarked;
    return true;
  });

  const incorrectCount = questions.filter((q) => !q.isCorrect).length;
  const correctCount = questions.filter((q) => q.isCorrect).length;
  const savedCount = questions.filter((q) => q.isBookmarked).length;

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col">
      <Header
        title="Review Answers"
        subtitle="Unit 1: Words Quiz"
        showBack={true}
        onBack={() => onNavigate('unit-details')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-md pt-stack-sm">
          {/* Top Score Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
            <div>
              <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                Unit 1: Words Quiz
              </span>
              <h2 className="text-base font-bold text-on-surface">Target Review</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-primary">90%</span>
              <span className="text-xs text-on-surface-variant font-medium">(18/20)</span>
            </div>
          </div>

          {/* Filter Segmented Control */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-surface-container-low rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              All (20)
            </button>
            <button
              onClick={() => setActiveTab('incorrect')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'incorrect'
                  ? 'bg-surface-container-lowest text-error shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Missed ({incorrectCount})
            </button>
            <button
              onClick={() => setActiveTab('correct')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'correct'
                  ? 'bg-surface-container-lowest text-tertiary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'saved'
                  ? 'bg-surface-container-lowest text-amber-600 shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Saved ({savedCount})
            </button>
          </div>

          {/* Insight Alert */}
          <div className="p-3 rounded-xl bg-primary-fixed/20 border border-primary-fixed text-xs text-on-primary-fixed flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
              psychology
            </span>
            <p className="leading-relaxed">
              <strong>Target Review:</strong> Reviewing mistakes boosts long-term vocabulary retention by
              up to 40%. Pay special attention to synonyms and conditionals.
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-3 pt-1">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-low flex flex-col gap-3"
              >
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        q.isCorrect
                          ? 'bg-tertiary-fixed text-tertiary'
                          : 'bg-error-container text-error'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {q.isCorrect ? 'check' : 'close'}
                      </span>
                      <span>{q.isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </span>
                    <span className="text-xs text-on-surface-variant">Question {q.questionNumber}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {q.pronunciationWord && (
                      <button
                        onClick={() => handleSpeak(q.pronunciationWord!)}
                        aria-label="Pronounce"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors active:scale-95"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    )}
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      aria-label="Bookmark"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
                        q.isBookmarked
                          ? 'text-amber-500'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: q.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                </div>

                {/* Prompt */}
                <h3 className="text-sm font-bold text-on-surface leading-snug">{q.prompt}</h3>

                {/* Answers Breakdown */}
                <div className="space-y-1.5 text-xs">
                  {!q.isCorrect && (
                    <div className="p-2.5 rounded-xl bg-error-container/20 border border-error-container text-error flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
                        close
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase">Your Answer:</span>
                        <span className="font-semibold">{q.studentAnswer}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-tertiary-container/15 border border-tertiary-container text-tertiary flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
                      check
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase">Correct Answer:</span>
                      <span className="font-semibold">{q.correctAnswer}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Educational Breakdown */}
                <div className="p-3 rounded-xl bg-surface-container-low text-xs space-y-1.5 border border-surface-container">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>{q.explanationTitle}</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">{q.explanationText}</p>
                  {q.exampleSentence && (
                    <div className="text-[11px] text-on-surface italic bg-surface-container-lowest p-2 rounded">
                      💡 {q.exampleSentence}
                    </div>
                  )}
                  {q.grammarFormula && (
                    <div className="mt-2 p-2 rounded-lg bg-surface-container-lowest border border-surface-container-high space-y-1">
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <span className="bg-primary-fixed/40 p-1 rounded text-primary text-center">
                          {q.grammarFormula.condition}
                        </span>
                        <span className="bg-secondary-fixed/40 p-1 rounded text-secondary text-center">
                          {q.grammarFormula.result}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface italic pt-1">
                        {q.grammarFormula.example}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container-low py-3 px-margin-mobile pb-safe">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('quiz')}
            className="flex-1 h-12 rounded-xl bg-primary-container text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-[0.99]"
            type="button"
          >
            <span>Retry 2 Missed Questions</span>
            <span className="material-symbols-outlined text-[18px]">replay</span>
          </button>

          <button
            onClick={() => onNavigate('unit-details')}
            className="h-12 px-4 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center gap-1 hover:bg-surface-container-highest transition-colors cursor-pointer"
            type="button"
          >
            <span>Done</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
