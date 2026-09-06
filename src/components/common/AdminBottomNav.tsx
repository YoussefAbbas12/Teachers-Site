import React from 'react';
import { AppScreen } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface AdminBottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  pendingReceiptsCount?: number;
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
  currentScreen,
  onNavigate,
  pendingReceiptsCount = 14,
}) => {
  const { language, direction } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container-low"
      dir={direction}
    >
      <div className="flex justify-around items-center h-16 px-stack-xs max-w-md mx-auto">
        <button
          onClick={() => onNavigate('admin-dashboard')}
          className={`flex flex-col items-center justify-center w-touch-min h-touch-min transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'admin-dashboard'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-label-sm font-label-sm mt-stack-xs">
            {language === 'ar' ? 'الرئيسية' : 'Dashboard'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('admin-students')}
          className={`flex flex-col items-center justify-center w-touch-min h-touch-min transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'admin-students'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">school</span>
          <span className="text-label-sm font-label-sm mt-stack-xs">
            {language === 'ar' ? 'الطلاب' : 'Students'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('admin-receipts')}
          className={`relative flex flex-col items-center justify-center w-touch-min h-touch-min transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'admin-receipts'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">receipt_long</span>
          {pendingReceiptsCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
          )}
          <span className="text-label-sm font-label-sm mt-stack-xs">
            {language === 'ar' ? 'الإيصالات' : 'Receipts'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('admin-content')}
          className={`flex flex-col items-center justify-center w-touch-min h-touch-min transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'admin-content'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">auto_stories</span>
          <span className="text-label-sm font-label-sm mt-stack-xs">
            {language === 'ar' ? 'المحتوى' : 'Content'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('admin-settings')}
          className={`flex flex-col items-center justify-center w-touch-min h-touch-min transition-colors cursor-pointer active:scale-95 ${
            currentScreen === 'admin-settings'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-label-sm font-label-sm mt-stack-xs">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </span>
        </button>
      </div>
    </nav>
  );
};
