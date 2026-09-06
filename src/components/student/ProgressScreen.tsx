import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

interface ProgressScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ onNavigate }) => {
  const [timeframe, setTimeframe] = useState<'term' | 'month' | 'all'>('term');

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col">
      <Header
        title="Progress"
        subtitle="Kinetic Academy"
        showBack={false}
        onNavigate={onNavigate}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Header Title & Academic Tag */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Academic Year 2024-2025
              </span>
              <h1 className="font-headline-lg-mobile text-2xl font-bold text-on-surface">
                Progress & Analytics
              </h1>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-bold text-xs">
              3rd Secondary
            </span>
          </div>

          {/* Timeframe Filter Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-xl">
            <button
              onClick={() => setTimeframe('term')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                timeframe === 'term'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              This Term
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                timeframe === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('all')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                timeframe === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              All Time
            </button>
          </div>

          {/* Big Circular Progress Card */}
          <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container-low flex flex-col items-center gap-4 text-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-surface-container-high"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 * (1 - 0.85)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-primary-container transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-on-surface tracking-tight">85%</span>
                <span className="text-[11px] font-bold text-tertiary">On Track 🎯</span>
              </div>
            </div>
            <div>
              <h2 className="text-base font-bold text-on-surface">Curriculum Mastery</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                You're ahead of 88% of 3rd Secondary students this term!
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Questions Solved</span>
              <span className="text-xl font-bold text-on-surface">
                320<span className="text-xs text-on-surface-variant font-normal">/380</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary mb-1">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Avg. Score</span>
              <span className="text-xl font-bold text-on-surface">88%</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary mb-1">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Units Completed</span>
              <span className="text-xl font-bold text-on-surface">2 of 4</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-1">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Current Streak</span>
              <span className="text-xl font-bold text-on-surface">5 Days 🔥</span>
            </div>
          </div>

          {/* Core Skills Mastery Breakdown */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-low flex flex-col gap-3">
            <h2 className="text-sm font-bold text-on-surface">Core Skills Mastery</h2>

            {/* Skill 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">WORDS (Vocabulary & Idioms)</span>
                <span className="font-bold text-primary">90%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-[11px] text-on-surface-variant">
                140/155 Qs correct • Avg pace 11s
              </span>
            </div>

            {/* Skill 2 */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">GRAMMAR (Conditionals & Past Unreal)</span>
                <span className="font-bold text-secondary">80%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="text-[11px] text-on-surface-variant">
                105/130 Qs correct • Focus: Third Conditional
              </span>
            </div>
          </div>

          {/* Unit Breakdown */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-low flex flex-col gap-3">
            <h2 className="text-sm font-bold text-on-surface">Term 2 Units Breakdown</h2>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-container-low">
                <span className="font-bold text-on-surface">Unit 1: Travel & Transport</span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-bold text-[11px]">
                  100% Mastered ✓
                </span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-container-low">
                <span className="font-bold text-on-surface">Unit 2: Science & Technology</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[11px]">
                  85% In Progress
                </span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-container-low">
                <span className="font-bold text-on-surface">Unit 3: Arts and Culture</span>
                <span className="text-on-surface-variant font-medium">60% Unlocked</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-container-low">
                <span className="font-bold text-on-surface">Unit 4: Global Challenges</span>
                <span className="text-on-surface-variant font-medium">20% Up Next</span>
              </div>
            </div>
          </div>

          {/* Final Exam Readiness Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-container p-5 text-white flex flex-col gap-3 shadow-md">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                Predicted Outcome
              </span>
              <h3 className="text-lg font-bold">Grade A Target • Strong Pass Expected</h3>
              <p className="text-xs text-white/90 mt-1">
                Maintain your current pace to score 95%+ in the English Thanawya Amma Final Exam!
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigate('quiz')}
                className="flex-1 h-10 rounded-xl bg-white text-primary font-bold text-xs flex items-center justify-center gap-1 active:scale-95 shadow-sm"
                type="button"
              >
                Practice Weak Areas
              </button>
              <button
                onClick={() => alert('تم تجهيز التقرير الأكاديمي بصيغة PDF وجاري التنزيل...')}
                className="px-4 h-10 rounded-xl bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-white/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav currentScreen="progress" onNavigate={onNavigate} />
    </div>
  );
};
