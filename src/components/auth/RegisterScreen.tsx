import React, { useState } from 'react';
import { AppScreen, AuthUser } from '../../types';
import { ASSETS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface RegisterScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onRegisterSuccess: (user: AuthUser) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onRegisterSuccess,
}) => {
  const { language, toggleLanguage, direction } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFillDemoData = () => {
    setFullName(language === 'ar' ? 'أحمد طارق حسن' : 'Ahmed Tarek Hassan');
    setPhone('01198765432');
    setPassword('student123');
    setConfirmPassword('student123');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى إدخال جميع البيانات (الاسم، رقم الهاتف، وكلمة المرور)'
          : 'Please fill in all fields (name, phone, and password)'
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        language === 'ar'
          ? 'كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام'
          : 'Password must be at least 6 characters'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        language === 'ar'
          ? 'كلمتا المرور غير متطابقتين، يرجى التأكد'
          : 'Passwords do not match, please check'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newUser: AuthUser = {
        id: `st-${randomId}`,
        name: fullName.trim(),
        phone: phone.trim(),
        role: 'student',
        code: `#ST-${randomId}`,
        avatarUrl: ASSETS.studentAvatar,
      };
      onRegisterSuccess(newUser);
    }, 600);
  };

  return (
    <div
      className="min-h-full bg-surface text-on-surface flex flex-col antialiased"
      dir={direction}
    >
      {/* Header Bar */}
      <header className="w-full px-margin-mobile pt-safe pt-4 pb-3 flex items-center justify-between border-b border-surface-container-low/80 bg-surface/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95"
            title="رجوع لتسجيل الدخول"
          >
            <span className="material-symbols-outlined text-[22px]">
              {direction === 'rtl' ? 'arrow_forward' : 'arrow_back'}
            </span>
          </button>
          <img
            src={ASSETS.logo}
            alt="Kinetic Academy Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            onClick={() => onNavigate('home')}
            referrerPolicy="no-referrer"
          />
          <span className="font-extrabold text-sm text-primary">
            Kinetic Academy
          </span>
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

      {/* Main Registration Form */}
      <main className="flex-1 px-margin-mobile py-8 max-w-md mx-auto w-full flex flex-col justify-center">
        {/* Title Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h1 className="text-2xl font-headline-sm font-bold text-on-surface">
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
            </h1>
            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="تعبئة تلقائية لبيانات سريعة للتجربة"
            >
              {language === 'ar' ? '⚡ تجربة سريعة' : '⚡ Auto-fill'}
            </button>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {language === 'ar'
              ? 'سجّل بياناتك الأساسية للبدء في حل الكويزات ومتابعة تقاريرك'
              : 'Enter your basic details to start quizzes and track your progress'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-error text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 1. الاسم (Full Name) */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {language === 'ar' ? 'الاسم' : 'Full Name'} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                person
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={language === 'ar' ? 'اكتب اسمك هنا' : 'Enter your full name'}
                className="w-full h-11 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          {/* 2. رقم الهاتف (Phone Number) */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                smartphone
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                dir="ltr"
                className="w-full h-11 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary transition-all text-left"
                required
              />
            </div>
          </div>

          {/* 3. كلمة المرور (Password) */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {language === 'ar' ? 'كلمة المرور' : 'Password'} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full h-11 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary transition-all text-left"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 left-3 right-auto text-on-surface-variant hover:text-on-surface ltr:left-auto ltr:right-3 cursor-pointer"
                title={showPassword ? 'إخفاء' : 'إظهار'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* 4. تأكيد كلمة المرور (Confirm Password) */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">
              {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-3 right-3 text-on-surface-variant text-[20px] pointer-events-none ltr:right-auto ltr:left-3">
                lock_clock
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full h-11 px-10 rounded-xl bg-surface-container-lowest border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary transition-all text-left"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 left-3 right-auto text-on-surface-variant hover:text-on-surface ltr:left-auto ltr:right-3 cursor-pointer"
                title={showConfirmPassword ? 'إخفاء' : 'إظهار'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 mt-3 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  how_to_reg
                </span>
                <span>{language === 'ar' ? 'إنشاء الحساب' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-8 text-center text-xs text-on-surface-variant pb-6">
          <span>{language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} </span>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-bold text-primary hover:underline cursor-pointer"
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Log In'}
          </button>
        </div>
      </main>
    </div>
  );
};
