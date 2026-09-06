import React from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface AdminHeaderProps {
  title: string;
  onNavigate: (screen: AppScreen) => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  onNavigate,
  unreadNotificationsCount = 5,
  onOpenNotifications,
}) => {
  const { language, toggleLanguage, direction } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-surface-container-low" dir={direction}>
      <div className="h-16 px-margin-mobile flex items-center justify-between gap-stack-sm max-w-md mx-auto">
        <div className="flex items-center gap-stack-sm min-w-0">
          <img
            alt="Kinetic Academy Logo"
            className="h-8 w-auto object-contain shrink-0 cursor-pointer"
            src={ASSETS.logo}
            onClick={() => onNavigate('admin-dashboard')}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-stack-xs">
              <span className="text-label-md font-label-md text-primary font-bold truncate">
                Kinetic Academy
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold leading-tight uppercase">
                ADMIN
              </span>
            </div>
            <h1 className="text-headline-sm font-headline-sm text-on-surface truncate leading-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-stack-xs shrink-0">
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
            className="relative w-touch-min h-touch-min flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
            type="button"
            onClick={onOpenNotifications}
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-on-error font-label-sm text-[10px] flex items-center justify-center font-bold">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
          <button
            className="w-touch-min h-touch-min flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            onClick={() => onNavigate('admin-settings')}
            title="حساب المعلم والإعدادات"
            type="button"
          >
            <img
              alt="Mr. Ahmed Hassan Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={ASSETS.teacherAvatar}
              referrerPolicy="no-referrer"
            />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors active:scale-95"
            onClick={() => onNavigate('login')}
            title="تسجيل الخروج / تبديل الحساب"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
