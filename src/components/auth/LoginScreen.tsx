import React, { useState } from 'react';
import { AppScreen, UserRole, AuthUser } from '../../types';
import { ASSETS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const { t, language, toggleLanguage, direction } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('01198765432');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى إدخال رقم الهاتف أو الكود وكلمة المرور'
          : 'Please enter your phone number/code and password'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'admin') {
        const adminUser: AuthUser = {
          id: 'admin-01',
          name: 'أ. أحمد حسن',
          phone: identifier,
          role: 'admin',
          avatarUrl: ASSETS.teacherAvatar,
        };
        onLoginSuccess(adminUser);
      } else {
        const studentUser: AuthUser = {
          id: 'st-9021',
          name: 'أحمد طارق حسن',
          phone: identifier,
          code: '#ST-9021',
          role: 'student',
          grade: '3rd Sec',
          avatarUrl: ASSETS.studentAvatar,
        };
        onLoginSuccess(studentUser);
      }
    }, 600);
  };

  const handleQuickDemoStudent = () => {
    setSelectedRole('student');
    setIdentifier('01198765432');
    setPassword('student123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'st-9021',
        name: 'أحمد طارق حسن',
        phone: '01198765432',
        code: '#ST-9021',
        role: 'student',
        grade: '3rd Sec',
        avatarUrl: ASSETS.studentAvatar,
      });
    }, 400);
  };

  const handleQuickDemoTeacher = () => {
    setSelectedRole('admin');
    setIdentifier('01012345678');
    setPassword('teacher123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'admin-01',
        name: 'أ. أحمد حسن',
        phone: '01012345678',
        role: 'admin',
        avatarUrl: ASSETS.teacherAvatar,
      });
    }, 400);
  };

  return (
    <div
      className="min-h-full bg-surface text-on-surface flex flex-col justify-between antialiased"
      dir={direction}
    >
      {/* Top Header Bar with Language Toggle & Logo */}
      <header className="w-full px-margin-mobile pt-safe pt-4 pb-2 flex items-center justify-between border-b border-surface-container-low/80 bg-surface/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img
            src={ASSETS.logo}
            alt="Kinetic Academy Logo"
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-primary tracking-tight">
              Kinetic Academy
            </span>
            <span className="text-[10px] text-on-surface-variant leading-none">
              {t('appSubtitle')}
            </span>
          </div>
        </div>

        {/* Language switch button */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
          title="تبديل اللغة / Switch Language"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">
            translate
          </span>
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 flex flex-col justify-center px-margin-mobile py-6 max-w-sm mx-auto w-full">
        {/* Welcome Text */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
            <span className="material-symbols-outlined text-[32px]">
              {selectedRole === 'student' ? 'school' : 'admin_panel_settings'}
            </span>
          </div>
          <h1 className="text-xl font-headline-sm font-bold text-on-surface mb-1">
            {t('welcomeBack')}
          </h1>
          <p className="text-xs text-on-surface-variant">
            {t('welcomeBackSubtitle')}
          </p>
        </div>

        {/* Role Selector Tabs (Student vs Teacher) */}
        <div className="flex p-1 rounded-2xl bg-surface-container-low border border-surface-container mb-5">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('student');
              setIdentifier('01198765432');
              setPassword('student123');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'student'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>{t('loginAsStudentTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              setIdentifier('01012345678');
              setPassword('teacher123');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'admin'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              admin_panel_settings
            </span>
            <span>{t('loginAsTeacherTab')}</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-error text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Phone / Student Code Field */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {selectedRole === 'student'
                ? language === 'ar'
                  ? 'رقم هاتف الطالب أو الكود'
                  : 'Student Phone Number or Code'
                : language === 'ar'
                ? 'رقم هاتف المعلم / البريد'
                : 'Teacher Phone or Email'}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 left-auto right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                {selectedRole === 'student' ? 'smartphone' : 'badge'}
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  selectedRole === 'student'
                    ? '01198765432 / #ST-9021'
                    : '01012345678'
                }
                dir="ltr"
                className="w-full h-12 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-left"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-on-surface">
                {t('password')}
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-primary hover:underline font-bold"
              >
                {t('forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 left-auto right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full h-12 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-left"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-auto left-3 text-on-surface-variant hover:text-on-surface text-[20px] ltr:left-auto ltr:right-3 transition-colors"
                title={showPassword ? 'إخفاء' : 'إظهار'}
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-primary border-surface-container-high focus:ring-primary"
            />
            <span className="text-xs text-on-surface-variant">
              {t('rememberMe')}
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  login
                </span>
                <span>{t('loginBtn')}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick 1-Click Demo Logins for Easy Evaluation */}
        <div className="mt-6 pt-5 border-t border-surface-container-low flex flex-col gap-2">
          <span className="text-[11px] font-bold text-on-surface-variant text-center block mb-1">
            {language === 'ar' ? 'أزرار الدخول السريع للتجربة:' : 'Quick Demo Logins:'}
          </span>
          <button
            type="button"
            onClick={handleQuickDemoStudent}
            className="w-full py-2.5 px-3 rounded-xl bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 border border-secondary/20"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>{t('demoStudentLogin')}</span>
          </button>
          <button
            type="button"
            onClick={handleQuickDemoTeacher}
            className="w-full py-2.5 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 border border-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">
              admin_panel_settings
            </span>
            <span>{t('demoTeacherLogin')}</span>
          </button>
        </div>

        {/* Switch to Register Page */}
        <div className="mt-6 text-center text-xs text-on-surface-variant">
          <span>{t('dontHaveAccount')} </span>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="font-bold text-primary hover:underline"
          >
            {t('createAccountLink')}
          </button>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-sm w-full border border-surface-container-high shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px]">
                support_agent
              </span>
            </div>
            <h3 className="font-bold text-base text-on-surface mb-2">
              {t('forgotPasswordModalTitle')}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-5">
              {t('forgotPasswordModalDesc')}
            </p>
            <div className="p-3 rounded-2xl bg-surface-container-low text-xs font-mono text-primary font-bold mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-tertiary">
                chat
              </span>
              <span>+20 10 1234 5678</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert(
                    language === 'ar'
                      ? 'سيتم تحويلك إلى محادثة واتساب الدعم الفني: +201012345678'
                      : 'Connecting to WhatsApp Support: +201012345678'
                  );
                  setShowForgotModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-tertiary text-white text-xs font-bold hover:bg-tertiary/90 transition-all"
              >
                {t('contactWhatsAppSupport')}
              </button>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="py-2.5 px-4 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="py-4 text-center text-[11px] text-on-surface-variant/80 pb-safe">
        <span>Kinetic Academy © 2025 • High School English</span>
      </footer>
    </div>
  );
};
