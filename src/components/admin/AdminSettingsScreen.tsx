import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';
import { AdminHeader } from '../common/AdminHeader';
import { AdminBottomNav } from '../common/AdminBottomNav';
import { useLanguage } from '../../context/LanguageContext';

interface AdminSettingsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  pendingReceiptsCount: number;
  onSwitchToStudent: () => void;
}

export const AdminSettingsScreen: React.FC<AdminSettingsScreenProps> = ({
  onNavigate,
  pendingReceiptsCount,
  onSwitchToStudent,
}) => {
  const { language, setLanguage, t, direction } = useLanguage();
  const [instapayAddress, setInstapayAddress] = useState('ahmed.teacher@instapay');
  const [vodafoneNumber, setVodafoneNumber] = useState('010 1234 5678');
  const [termPrice, setTermPrice] = useState('250');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir={direction}>
      <AdminHeader
        title={t('adminSettings')}
        onNavigate={onNavigate}
        unreadNotificationsCount={pendingReceiptsCount}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <form onSubmit={handleSave} className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Teacher Profile Card */}
          <div className="p-4 rounded-3xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={ASSETS.teacherAvatar}
                alt="Teacher Profile"
                className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/20 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-base text-on-surface">أ. أحمد حسن</h2>
                <span className="text-xs text-primary font-bold truncate">
                  كبير معلمي اللغة الإنجليزية • ثانوية عامة
                </span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">
                  المنسق الأكاديمي لمنصة Kinetic Academy
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="p-2 rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 text-xs font-bold transition-colors shrink-0"
              title="تسجيل الخروج / تبديل الحساب"
            >
              <span className="material-symbols-outlined text-[20px] block">logout</span>
              <span className="text-[10px] block">{t('logout')}</span>
            </button>
          </div>

          {/* 🌐 LANGUAGE SWITCHER SECTION (خيار تبديل اللغة: العربية / English) */}
          <div className="p-4 rounded-3xl bg-surface-container-lowest border border-primary/20 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">translate</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-on-surface">
                    {t('languageSectionTitle')}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    {t('languageSectionDesc')}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                {language.toUpperCase()}
              </span>
            </div>

            {/* Bilingual Option Selector Cards */}
            <div className="grid grid-cols-2 gap-2.5 mt-1">
              {/* Arabic Option Card */}
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`p-3 rounded-2xl border text-right flex flex-col gap-1 transition-all active:scale-95 cursor-pointer ${
                  language === 'ar'
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-surface-container-high hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">العربية</span>
                  <span className="text-base">🇪🇬</span>
                </div>
                <span
                  className={`text-[11px] ${
                    language === 'ar' ? 'text-white/80' : 'text-on-surface-variant'
                  }`}
                >
                  الواجهة باللغة العربية (RTL)
                </span>
                {language === 'ar' && (
                  <span className="text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-md self-start mt-1">
                    ✓ اللغة الحالية
                  </span>
                )}
              </button>

              {/* English Option Card */}
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all active:scale-95 cursor-pointer ${
                  language === 'en'
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-surface-container-high hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">English</span>
                  <span className="text-base">🇬🇧</span>
                </div>
                <span
                  className={`text-[11px] ${
                    language === 'en' ? 'text-white/80' : 'text-on-surface-variant'
                  }`}
                >
                  English Interface (LTR)
                </span>
                {language === 'en' && (
                  <span className="text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-md self-start mt-1">
                    ✓ Current Lang
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Role Switcher Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[24px]">school</span>
              <div>
                <span className="font-bold block">{language === 'ar' ? 'معاينة واجهة الطالب' : 'Student View Preview'}</span>
                <span className="text-white/80 text-[11px]">
                  {language === 'ar' ? 'تجربة الكويزات وشاشات الشرح' : 'Experience quizzes & lessons'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onSwitchToStudent}
              className="px-3 py-1.5 rounded-xl bg-white text-primary font-bold text-xs active:scale-95 shadow-sm cursor-pointer"
            >
              {language === 'ar' ? 'التحويل لطالب 👨‍🎓' : 'Switch to Student 👨‍🎓'}
            </button>
          </div>

          {/* Payment & Subscription Settings */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-3">
            <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">payments</span>
              <span>{t('paymentSettings')}</span>
            </h3>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                {t('instaPayAddress')}:
              </label>
              <input
                type="text"
                value={instapayAddress}
                onChange={(e) => setInstapayAddress(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                {t('vodafoneCashNumber')}:
              </label>
              <input
                type="text"
                value={vodafoneNumber}
                onChange={(e) => setVodafoneNumber(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                {t('termPriceEgp')}:
              </label>
              <input
                type="number"
                value={termPrice}
                onChange={(e) => setTermPrice(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {savedSuccess && (
              <div className="p-2.5 rounded-xl bg-tertiary-fixed/40 text-tertiary font-bold text-xs text-center animate-fadeIn">
                {t('settingsSavedSuccess')}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary-container active:scale-95 transition-all mt-1 cursor-pointer"
            >
              {t('saveSettings')}
            </button>
          </div>

          {/* Assistant Permissions */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-on-surface">{t('assistantsTeam')}:</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-bold">المساعد مروان خيري</span>
                  <span className="text-[10px] text-on-surface-variant">(فحص إيصالات)</span>
                </div>
                <span className="text-tertiary font-bold text-[11px]">{t('active')}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-bold">المساعدة سارة إبراهيم</span>
                  <span className="text-[10px] text-on-surface-variant">(دعم واتساب)</span>
                </div>
                <span className="text-tertiary font-bold text-[11px]">{t('active')}</span>
              </div>
            </div>
          </div>

          {/* Backup & System */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-on-surface block">{t('backupDatabase')}</span>
              <span className="text-[10px] text-on-surface-variant">
                {language === 'ar' ? 'تم إجراء آخر نسخ احتياطي آلي اليوم 04:00 ص' : 'Last automated backup today 04:00 AM'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => alert(language === 'ar' ? 'تم تنزيل النسخة الاحتياطية لقاعدة بيانات الطلاب والكويزات' : 'Student and quiz database backup downloaded successfully')}
              className="px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-[11px] hover:bg-surface-container-highest cursor-pointer"
            >
              {t('downloadBackup')}
            </button>
          </div>
        </form>
      </main>

      <AdminBottomNav
        currentScreen="admin-settings"
        onNavigate={onNavigate}
        pendingReceiptsCount={pendingReceiptsCount}
      />
    </div>
  );
};
