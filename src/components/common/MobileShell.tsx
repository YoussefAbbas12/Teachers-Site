import React, { useState } from 'react';
import { AppScreen, UserRole } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface MobileShellProps {
  children: React.ReactNode;
  currentScreen: AppScreen;
  userRole: UserRole;
  onNavigate: (screen: AppScreen) => void;
  onToggleRole: () => void;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  children,
  currentScreen,
  userRole,
  onNavigate,
  onToggleRole,
}) => {
  const [deviceFrame, setDeviceFrame] = useState(false); // default responsive full, toggleable
  const { language, toggleLanguage, direction, t } = useLanguage();

  const authScreens: { id: AppScreen; label: string; icon: string }[] = [
    { id: 'login', label: language === 'ar' ? 'تسجيل الدخول (Login)' : 'Log In Screen', icon: 'login' },
    { id: 'register', label: language === 'ar' ? 'إنشاء حساب (Sign Up)' : 'Sign Up Screen', icon: 'how_to_reg' },
  ];

  const studentScreens: { id: AppScreen; label: string; icon: string }[] = [
    { id: 'home', label: language === 'ar' ? 'الرئيسية (Home)' : 'Home Screen', icon: 'home' },
    { id: 'unit-details', label: language === 'ar' ? 'تفاصيل الوحدة (Unit Details)' : 'Unit Details', icon: 'flight_takeoff' },
    { id: 'quiz', label: language === 'ar' ? 'الاختبار التفاعلي (Quiz Lesson)' : 'Interactive Quiz', icon: 'quiz' },
    { id: 'quiz-result', label: language === 'ar' ? 'شاشة التهنئة (Quiz Result)' : 'Quiz Result', icon: 'celebration' },
    { id: 'review-answers', label: language === 'ar' ? 'مراجعة الإجابات (Review Answers)' : 'Review Answers', icon: 'rate_review' },
    { id: 'progress', label: language === 'ar' ? 'التقرير والتحليلات (Progress)' : 'Progress Analytics', icon: 'insights' },
    { id: 'activate-pass', label: language === 'ar' ? 'تفعيل الاشتراك (Activate Pass)' : 'Activate Pass', icon: 'credit_card' },
    { id: 'payment-status', label: language === 'ar' ? 'طلب قيد المراجعة (Payment Status)' : 'Payment Status', icon: 'hourglass_top' },
  ];

  const adminScreens: { id: AppScreen; label: string; icon: string }[] = [
    { id: 'admin-dashboard', label: language === 'ar' ? 'لوحة التحكم (Dashboard)' : 'Teacher Dashboard', icon: 'dashboard' },
    { id: 'admin-students', label: language === 'ar' ? 'قائمة الطلاب (Students List)' : 'Students List', icon: 'school' },
    { id: 'admin-receipts', label: language === 'ar' ? 'مراجعة الإيصالات (Receipt Approvals)' : 'Receipt Approvals', icon: 'receipt_long' },
    { id: 'admin-content', label: language === 'ar' ? 'بنك الأسئلة والمحتوى (Content & Quizzes)' : 'Content & Quizzes', icon: 'auto_stories' },
    { id: 'admin-settings', label: language === 'ar' ? 'إعدادات المنصة (Settings)' : 'Platform Settings', icon: 'settings' },
  ];

  const activeScreensList = userRole === 'student' ? studentScreens : adminScreens;

  return (
    <div className="min-h-screen bg-[#0f172a] text-on-surface flex flex-col items-center justify-start py-0 md:py-6 selection:bg-primary selection:text-white">
      {/* Top Floating Control Bar on Desktop/Tablet */}
      <div className="w-full max-w-lg mx-auto mb-2 px-3 flex items-center justify-between gap-2 z-50 text-xs text-white/90">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Role Switcher Pill */}
          <button
            onClick={onToggleRole}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/10 shadow-sm cursor-pointer"
            type="button"
            title="انقر للتبديل بين وضع الطالب ولوحة المعلم"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400">
              {userRole === 'student' ? 'school' : 'admin_panel_settings'}
            </span>
            <span className="font-bold">
              {userRole === 'student' ? (language === 'ar' ? 'طالب' : 'Student') : (language === 'ar' ? 'معلم' : 'Teacher')}
            </span>
            <span className="text-[10px] text-white/60 bg-black/30 px-1 rounded">
              {language === 'ar' ? 'تبديل' : 'Switch'}
            </span>
          </button>

          {/* Quick Page Jump Selector */}
          <div className="relative group">
            <select
              value={currentScreen}
              onChange={(e) => onNavigate(e.target.value as AppScreen)}
              className="appearance-none bg-white/10 text-white font-medium pl-3 pr-7 py-1.5 rounded-full border border-white/10 text-xs focus:outline-none cursor-pointer"
            >
              <optgroup label={language === 'ar' ? 'صفحات الحساب والتسجيل' : 'Auth Pages'}>
                {authScreens.map((s) => (
                  <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                    {s.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label={userRole === 'student' ? (language === 'ar' ? 'صفحات الطالب' : 'Student Pages') : (language === 'ar' ? 'صفحات المعلم' : 'Teacher Pages')}>
                {activeScreensList.map((s) => (
                  <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                    {s.label}
                  </option>
                ))}
              </optgroup>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-white/70 text-[14px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Right Tools: Direct Login Button, Language Toggle & Device Frame Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Direct Login Screen Button */}
          <button
            onClick={() => onNavigate('login')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              currentScreen === 'login' || currentScreen === 'register'
                ? 'bg-amber-400 text-gray-950 border-amber-400 font-extrabold shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
            title="صفحة تسجيل الدخول / Login Page"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">login</span>
            <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
          </button>

          {/* Quick Language Switcher in Shell */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors bg-white/10 text-white border border-white/10 hover:bg-white/20 active:scale-95 cursor-pointer"
            title="تبديل لغة الواجهة / Switch Language"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px] text-primary-fixed">translate</span>
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Device Frame Toggle for Desktop Testing */}
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-colors border cursor-pointer ${
              deviceFrame
                ? 'bg-primary text-white border-primary'
                : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/20'
            }`}
            title="تبديل إطار الهاتف للهاتف الذكي"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            <span>{deviceFrame ? (language === 'ar' ? 'إطار' : 'Frame') : (language === 'ar' ? 'كامل' : 'Full')}</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Frame */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrame
            ? 'max-w-[420px] rounded-[44px] ring-12 ring-[#1e293b] shadow-2xl overflow-hidden bg-surface relative min-h-[880px] my-2'
            : 'max-w-md bg-surface min-h-screen relative shadow-2xl'
        }`}
      >
        {/* Mock Phone Notch & Speaker (only when frame active) */}
        {deviceFrame && (
          <div className="sticky top-0 z-50 w-full h-8 bg-black flex items-center justify-between px-6 text-[11px] font-semibold text-white select-none">
            <span>9:41</span>
            <div className="w-20 h-4 bg-[#1e293b] rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center gap-1.5 text-white/90">
              <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Active Page View */}
        <div className="min-h-full flex flex-col bg-surface">{children}</div>
      </div>
    </div>
  );
};
