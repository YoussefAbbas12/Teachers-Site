import React from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

interface UnitDetailsScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const UnitDetailsScreen: React.FC<UnitDetailsScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col">
      <Header
        title="Unit Details"
        subtitle="Kinetic Academy"
        showBack={true}
        onBack={() => onNavigate('home')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pb-stack-2xl">
          {/* Unit Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md mt-stack-xs border border-surface-container-low">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                alt="Travel and Transportation"
                className="w-full h-full object-cover"
                src={ASSETS.unit1Img}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00174b]/95 via-[#00174b]/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-extrabold uppercase tracking-wide">
                    Unit 1
                  </span>
                  <span className="text-white/80 text-xs">Third Secondary • Core Syllabus</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                  Travel and Transportation
                </h1>
              </div>
            </div>

            {/* Overall Unit Mastery Progress */}
            <div className="p-stack-lg flex flex-col gap-stack-sm bg-surface-container-lowest">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-on-surface-variant font-medium">
                  Overall Unit Mastery
                </span>
                <span className="font-label-md text-primary font-extrabold text-base">65%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-700"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
                  20 of 35 items mastered
                </span>
                <span className="font-medium text-tertiary">On track 🎯</span>
              </div>
            </div>
          </div>

          {/* Section 1: WORDS */}
          <div className="rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm border border-surface-container-low flex flex-col gap-stack-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-bold text-base">
                    WORDS Section
                  </h2>
                  <span className="text-xs text-on-surface-variant">20 Questions • Vocab Mastery</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-xs">
                60% Done
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '60%' }}></div>
            </div>

            {/* Sub-topics */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span className="font-medium text-on-surface truncate">Transport Infrastructure</span>
                </div>
                <span className="text-tertiary font-bold shrink-0">8/8 Mastered</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-amber-500 text-[18px]">timelapse</span>
                  <span className="font-medium text-on-surface truncate">Travel Hazards & Synonyms</span>
                </div>
                <span className="text-on-surface-variant font-medium shrink-0">4/6 In Progress</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">circle</span>
                  <span className="font-medium text-on-surface truncate">Airport Terminology</span>
                </div>
                <span className="text-on-surface-variant font-medium shrink-0">0/6 Next</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('quiz')}
              className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-[0.99] mt-1"
              type="button"
            >
              <span>Start Words Quiz</span>
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            </button>
          </div>

          {/* Section 2: GRAMMAR */}
          <div className="rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm border border-surface-container-low flex flex-col gap-stack-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">spellcheck</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-bold text-base">
                    GRAMMAR Section
                  </h2>
                  <span className="text-xs text-on-surface-variant">15 Questions • Third Conditionals</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-secondary font-bold text-xs">
                53% Done
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '53%' }}></div>
            </div>

            {/* Sub-topics */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span className="font-medium text-on-surface truncate">Third Conditional Form</span>
                </div>
                <span className="text-tertiary font-bold shrink-0">5/5 Mastered</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-amber-500 text-[18px]">timelapse</span>
                  <span className="font-medium text-on-surface truncate">Inversion with "Had they..."</span>
                </div>
                <span className="text-on-surface-variant font-medium shrink-0">3/5 In Progress</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">circle</span>
                  <span className="font-medium text-on-surface truncate">Mixed Conditionals</span>
                </div>
                <span className="text-on-surface-variant font-medium shrink-0">0/5 Next</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('quiz')}
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-[0.99] mt-1"
              type="button"
            >
              <span>Start Grammar Quiz</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </button>
          </div>

          {/* Teacher Recommendation Card */}
          <div className="rounded-2xl bg-surface-container-low p-stack-md flex items-start gap-stack-md border border-surface-container">
            <img
              alt="Teacher"
              src={ASSETS.teacherAvatar}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0 mt-0.5"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0 text-xs">
              <span className="font-bold text-on-surface">نصيحة مستر أحمد حسن 💡</span>
              <p className="text-on-surface-variant mt-1 leading-relaxed">
                يا أحمد، تدريب 15 دقيقة على قاعدة "Third Conditionals" اليوم سيساعدك في الوصول لنسبة
                85% إتقان قبل الكويز الأسبوعي يوم الخميس!
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav currentScreen="unit-details" onNavigate={onNavigate} />
    </div>
  );
};
