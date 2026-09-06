import React from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNavigate?: (screen: AppScreen) => void;
  badge?: string;
  rightAction?: React.ReactNode;
  onOpenNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Lesson Detail',
  subtitle,
  showBack = false,
  onBack,
  onNavigate,
  badge,
  rightAction,
  onOpenNotifications,
}) => {
  const { language, toggleLanguage, direction } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-low" dir={direction}>
      <div className="h-16 px-margin-mobile flex items-center justify-between gap-stack-sm max-w-md mx-auto">
        <div className="flex items-center gap-stack-sm min-w-0">
          {showBack ? (
            <button
              aria-label="Go back"
              className="w-touch-min h-touch-min flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors -ml-2 shrink-0 active:scale-95"
              onClick={onBack}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {direction === 'rtl' ? 'arrow_forward' : 'arrow_back'}
              </span>
            </button>
          ) : null}

          <img
            alt="Kinetic Academy Mobile Logo"
            className="h-8 w-auto object-contain shrink-0 cursor-pointer"
            src={ASSETS.logo}
            onClick={() => onNavigate?.('home')}
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col min-w-0">
            {subtitle ? (
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                {subtitle}
              </span>
            ) : null}
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
                {title}
              </h1>
              {badge ? (
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                  {badge}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-stack-xs shrink-0">
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-full bg-surface-container border border-surface-container-high text-[11px] font-bold text-primary hover:bg-surface-container-high active:scale-95 transition-all"
                title="Switch Language / تبديل اللغة"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button
                aria-label="Notifications"
                className="relative w-touch-min h-touch-min flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95"
                type="button"
                onClick={onOpenNotifications}
              >
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
              </button>
              <button
                className="w-touch-min h-touch-min flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-95"
                onClick={() => onNavigate?.('progress')}
                title="الملف الشخصي / تقرير الإنجاز"
                type="button"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  src={ASSETS.studentAvatar}
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors active:scale-95"
                onClick={() => onNavigate?.('login')}
                title="تسجيل الدخول / تبديل الحساب"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
