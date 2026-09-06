import React from 'react';
import { AppScreen } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const { language, direction } = useLanguage();

  const isHome = currentScreen === 'home';
  const isUnits = currentScreen === 'unit-details' || currentScreen === 'quiz' || currentScreen === 'quiz-result' || currentScreen === 'review-answers';
  const isProgress = currentScreen === 'progress';
  const isProfile = currentScreen === 'activate-pass' || currentScreen === 'payment-status';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container-low"
      dir={direction}
    >
      <div className="flex justify-around items-center h-16 px-stack-xs max-w-md mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] h-full transition-all gap-0.5 cursor-pointer active:scale-95 ${
            isHome ? 'text-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-label-sm text-label-sm">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('unit-details')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] h-full transition-all gap-0.5 cursor-pointer active:scale-95 ${
            isUnits ? 'text-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu_book</span>
          <span className="font-label-sm text-label-sm">
            {language === 'ar' ? 'الوحدات' : 'Units'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('progress')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] h-full transition-all gap-0.5 cursor-pointer active:scale-95 ${
            isProgress ? 'text-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">insights</span>
          <span className="font-label-sm text-label-sm">
            {language === 'ar' ? 'التقرير' : 'Progress'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('activate-pass')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] h-full transition-all gap-0.5 cursor-pointer active:scale-95 ${
            isProfile ? 'text-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">account_circle</span>
          <span className="font-label-sm text-label-sm">
            {language === 'ar' ? 'الاشتراك' : 'Pass'}
          </span>
        </button>
      </div>
    </nav>
  );
};
