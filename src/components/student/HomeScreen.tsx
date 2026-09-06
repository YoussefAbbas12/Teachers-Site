import React from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col">
      <Header
        title="Home"
        subtitle="Kinetic Academy"
        showBack={false}
        onNavigate={onNavigate}
        onOpenNotifications={() => alert('إشعار: لديك اختبار جديد في الوحدة الثانية')}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pb-stack-2xl">
          {/* Top Greeting & Academic Tag */}
          <div className="flex items-start justify-between gap-stack-md pt-stack-xs">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-stack-xs">
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
                  Hello, Ahmed
                </h1>
                <span className="text-[22px] animate-bounce">👋</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Ready to continue learning?
              </p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[14px] mr-1 text-primary">
                  school
                </span>
                3rd Secondary
              </span>
              <span
                className="font-label-sm text-[10px] text-on-surface-variant font-medium mt-0.5"
                dir="rtl"
              >
                الصف الثالث الثانوي
              </span>
            </div>
          </div>

          {/* Subscription Status Card */}
          <div
            onClick={() => onNavigate('payment-status')}
            className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary-fixed/30 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between gap-stack-md relative z-10">
              <div className="flex items-center gap-stack-md min-w-0">
                <div className="w-11 h-11 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                      Academic Pass
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-[10px] font-bold">
                      Active ✓
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Full curriculum valid until June 2025
                  </p>
                </div>
              </div>
              <button
                aria-label="Subscription details"
                className="w-touch-min h-touch-min flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Horizontal Carousel */}
          <div className="flex items-center gap-stack-sm overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile scrollbar-none">
            {/* Stat 1 */}
            <div className="flex items-center gap-stack-sm px-3.5 py-2.5 rounded-full bg-surface-container-lowest shadow-sm flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Words
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  140<span className="text-on-surface-variant font-normal">/180</span>
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-stack-sm px-3.5 py-2.5 rounded-full bg-surface-container-lowest shadow-sm flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[16px]">spellcheck</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Grammar
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold">88%</span>
              </div>
            </div>

            {/* Stat 3 (Streak) */}
            <div className="flex items-center gap-stack-sm px-3.5 py-2.5 rounded-full bg-surface-container-lowest shadow-sm flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Daily Streak
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold">5 Days</span>
              </div>
            </div>
          </div>

          {/* Units Section Header */}
          <div className="flex items-center justify-between pt-stack-xs">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-headline-md text-on-surface">My Units</h2>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm">
                Term 2
              </span>
            </div>
            <button
              onClick={() => onNavigate('unit-details')}
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors py-2 px-1 cursor-pointer"
              type="button"
            >
              View All (4)
            </button>
          </div>

          {/* Unit Cards Stack */}
          <div className="flex flex-col gap-stack-md">
            {/* Unit 1 Card */}
            <div
              onClick={() => onNavigate('unit-details')}
              className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm flex flex-col gap-stack-md transition-all active:scale-[0.99] cursor-pointer hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-stack-sm">
                <div className="flex items-start gap-stack-md min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                    <img
                      alt="Unit 1 Illustration"
                      className="w-full h-full object-cover"
                      src={ASSETS.unit1Img}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                        Unit 1
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Module A
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      Travel and Transportation
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      20 Words • 15 Grammar
                    </p>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-primary font-extrabold flex-shrink-0">
                  80%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '80%' }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    check_circle
                  </span>
                  <span>4 of 5 lessons completed</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('unit-details');
                  }}
                  className="h-11 px-5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 shadow-sm active:opacity-90 cursor-pointer"
                  type="button"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              </div>
            </div>

            {/* Unit 2 Card */}
            <div
              onClick={() => onNavigate('quiz')}
              className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm flex flex-col gap-stack-md transition-all active:scale-[0.99] cursor-pointer hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-stack-sm">
                <div className="flex items-start gap-stack-md min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                    <img
                      alt="Unit 2 Illustration"
                      className="w-full h-full object-cover"
                      src={ASSETS.unit2Img}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                        Unit 2
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Module A
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      Science and Technology
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      25 Words • 20 Grammar
                    </p>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-extrabold flex-shrink-0">
                  45%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '45%' }}
                ></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    timelapse
                  </span>
                  <span>In Progress • Vocab Quiz next</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('quiz');
                  }}
                  className="h-11 px-5 rounded-xl bg-primary-fixed text-on-primary-fixed-variant font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 shadow-sm hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                  type="button"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Unit 3 Card */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-stack-lg shadow-sm flex flex-col gap-stack-md transition-all active:scale-[0.99]">
              <div className="flex items-start justify-between gap-stack-sm">
                <div className="flex items-start gap-stack-md min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                    <img
                      alt="Unit 3 Illustration"
                      className="w-full h-full object-cover"
                      src={ASSETS.unit3Img}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                        Unit 3
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Module B
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      Arts and Culture
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      20 Words • 15 Grammar
                    </p>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium flex-shrink-0">
                  0%
                </span>
              </div>

              {/* Inactive Progress Bar */}
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-outline-variant rounded-full" style={{ width: '0%' }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                  <span>Unlocked • Ready to explore</span>
                </div>
                <button
                  onClick={() => onNavigate('unit-details')}
                  className="h-11 px-5 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 hover:bg-surface-container-highest transition-colors cursor-pointer"
                  type="button"
                >
                  <span>Start Unit</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </button>
              </div>
            </div>
          </div>

          {/* Encouragement Micro-card */}
          <div className="rounded-2xl bg-surface-container-low p-stack-md flex items-center gap-stack-md mt-stack-xs">
            <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-on-secondary-container flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">emoji_events</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Weekly Goal on Track
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Complete 1 more lesson to maintain your streak bonus!
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
};
