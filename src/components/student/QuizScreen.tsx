import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { INITIAL_QUIZ_QUESTIONS } from '../../data/mockData';
import { Header } from '../common/Header';

interface QuizScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [assembledChips, setAssembledChips] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<string[]>(
    INITIAL_QUIZ_QUESTIONS[1].wordOrderBuilder?.chips || []
  );
  const [hintShown, setHintShown] = useState(false);

  const currentQ = INITIAL_QUIZ_QUESTIONS[questionIndex] || INITIAL_QUIZ_QUESTIONS[0];

  const handleSelectOption = (key: string) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(key);
    setShowExplanation(true);
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

  const handleAddChip = (chip: string) => {
    setAssembledChips([...assembledChips, chip]);
    const index = availableChips.indexOf(chip);
    if (index > -1) {
      const updated = [...availableChips];
      updated.splice(index, 1);
      setAvailableChips(updated);
    }
  };

  const handleRemoveChip = (chip: string) => {
    const index = assembledChips.indexOf(chip);
    if (index > -1) {
      const updated = [...assembledChips];
      updated.splice(index, 1);
      setAssembledChips(updated);
      setAvailableChips([...availableChips, chip]);
    }
  };

  const handleNext = () => {
    if (questionIndex < INITIAL_QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setHintShown(false);
    } else {
      onNavigate('quiz-result');
    }
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col">
      <Header
        title="Lesson Detail"
        subtitle="Unit 1: Quiz"
        showBack={true}
        onBack={() => onNavigate('unit-details')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-sm">
          {/* Unit Header & Streak */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                {currentQ.unit}
              </span>
              <span className="text-xs text-on-surface-variant">{currentQ.topic}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span>3 in a row!</span>
            </div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>
                Question {currentQ.questionNumber} of {currentQ.totalQuestions}
              </span>
              <span>{Math.round((currentQ.questionNumber / currentQ.totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-primary-container rounded-full transition-all duration-300"
                style={{
                  width: `${(currentQ.questionNumber / currentQ.totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Box */}
          <div className="rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm border border-surface-container-low flex flex-col gap-stack-md relative">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  {currentQ.subPrompt || 'Choose definition'}
                </span>
                <h2 className="text-lg font-bold text-on-surface leading-snug">
                  {currentQ.prompt}
                </h2>
              </div>
              <button
                onClick={() => handleSpeak(currentQ.highlightedWord || currentQ.prompt)}
                aria-label="Listen to pronunciation"
                className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 hover:bg-primary-fixed-dim transition-colors active:scale-95"
                type="button"
                title="نطق الكلمة بالصوت"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
            </div>

            {currentQ.phonetic && (
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="font-mono bg-surface-container px-2 py-0.5 rounded">
                  {currentQ.phonetic}
                </span>
                <span>•</span>
                <span>{currentQ.partOfSpeech}</span>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="flex flex-col gap-2.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.key;
                const isCorrect = opt.isCorrect;
                const answered = selectedOption !== null;

                let cardStyle =
                  'bg-surface-container-low border-surface-container-high hover:border-primary/40 text-on-surface';

                if (answered) {
                  if (isSelected && isCorrect) {
                    cardStyle = 'bg-tertiary-container/15 border-tertiary text-tertiary font-bold';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-error-container/40 border-error text-error font-bold';
                  } else if (isCorrect) {
                    cardStyle = 'bg-tertiary-container/15 border-tertiary text-tertiary font-bold';
                  } else {
                    cardStyle = 'bg-surface-container-low/50 border-transparent opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={answered}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer active:scale-[0.99] ${cardStyle}`}
                    type="button"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          answered && isCorrect
                            ? 'bg-tertiary text-white'
                            : answered && isSelected && !isCorrect
                            ? 'bg-error text-white'
                            : 'bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-sm leading-snug">{opt.text}</span>
                    </div>

                    {answered && isCorrect && (
                      <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
                        check_circle
                      </span>
                    )}
                    {answered && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0">
                        cancel
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Card (shows after selecting) */}
          {showExplanation && (
            <div className="rounded-2xl bg-surface-container-low p-stack-md border border-surface-container flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span>{currentQ.explanationRule}</span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">{currentQ.explanationDetails}</p>
              {currentQ.exampleSentence && (
                <div className="text-xs text-on-surface-variant bg-surface-container-lowest p-2 rounded-lg italic">
                  💡 "{currentQ.exampleSentence}"
                </div>
              )}
            </div>
          )}

          {/* Word Order Builder (Interactive tile builder for Question 2) */}
          {currentQ.wordOrderBuilder && (
            <div className="rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm border border-surface-container-low flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">
                  {currentQ.wordOrderBuilder.instruction}
                </span>
                <button
                  onClick={() => {
                    setAvailableChips(currentQ.wordOrderBuilder?.chips || []);
                    setAssembledChips([]);
                  }}
                  className="text-[11px] text-primary font-bold hover:underline"
                  type="button"
                >
                  إعادة ترتيب
                </button>
              </div>

              {/* Assembled Slot Area */}
              <div className="min-h-[50px] p-2 rounded-xl bg-surface-container-low border border-dashed border-primary/40 flex flex-wrap items-center gap-1.5">
                {assembledChips.length === 0 ? (
                  <span className="text-xs text-on-surface-variant/70 italic px-2">
                    Tap words below to place them here in correct order...
                  </span>
                ) : (
                  assembledChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveChip(chip)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center gap-1 active:scale-95 shadow-sm"
                      type="button"
                    >
                      <span>{chip}</span>
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  ))
                )}
              </div>

              {/* Available Chips Bank */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {availableChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddChip(chip)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium border border-outline-variant/30 active:scale-95 transition-all"
                    type="button"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hint Card if requested */}
          {hintShown && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
              <span className="material-symbols-outlined text-amber-600 text-[18px]">help</span>
              <p>
                تلميح: الكلمة تشير إلى حضارات وآثار تعود لآلاف السنين في التاريخ البعيد مثل أهرامات الجيزة.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container-low py-3 px-margin-mobile pb-safe">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setHintShown(true)}
            disabled={hintShown}
            className="h-12 px-4 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-bold flex items-center gap-1 hover:bg-surface-container-high transition-colors disabled:opacity-50"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">emoji_objects</span>
            <span>{hintShown ? 'Used hint' : 'Need a hint? (1 left)'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex-1 h-12 rounded-xl bg-primary-container disabled:bg-surface-container-high text-on-primary disabled:text-on-surface-variant font-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            type="button"
          >
            <span>
              {questionIndex < INITIAL_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
