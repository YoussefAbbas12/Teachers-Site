import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { AdminHeader } from '../common/AdminHeader';
import { AdminBottomNav } from '../common/AdminBottomNav';

interface AdminDashboardScreenProps {
  onNavigate: (screen: AppScreen) => void;
  pendingReceiptsCount: number;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onNavigate,
  pendingReceiptsCount,
}) => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      <AdminHeader
        title="لوحة التحكم"
        onNavigate={onNavigate}
        unreadNotificationsCount={pendingReceiptsCount}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Welcome greeting */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold text-on-surface">مرحباً، أ. أحمد حسن</h1>
                <span className="text-xl">👋</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                دفعة الثانوية العامة 2024 - 2025 • الفصل الدراسي الثاني
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
              مباشر • LIVE
            </span>
          </div>

          {/* Urgent Action Alert Banner */}
          {pendingReceiptsCount > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-error-container/80 to-amber-100 border border-error/20 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-error text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">pending_actions</span>
                </div>
                <div className="flex flex-col min-w-0 text-xs">
                  <span className="font-bold text-on-surface truncate">
                    {pendingReceiptsCount} إيصال دفع بانتظار الاعتماد
                  </span>
                  <span className="text-on-surface-variant truncate">
                    تحويلات إنستاباي وفودافون كاش جديدة
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('admin-receipts')}
                className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shrink-0 shadow-sm"
                type="button"
              >
                مراجعة فورية
              </button>
            </div>
          )}

          {/* 4 Stats Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('admin-students')}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1 cursor-pointer hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </div>
                <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed/30 px-1.5 py-0.5 rounded">
                  +14%
                </span>
              </div>
              <span className="text-2xl font-black text-on-surface mt-1">1,280</span>
              <span className="text-xs text-on-surface-variant font-medium">الطلاب النشطون</span>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
                <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed/30 px-1.5 py-0.5 rounded">
                  مكتمل
                </span>
              </div>
              <span className="text-xl font-black text-on-surface mt-1">320,000 ج.م</span>
              <span className="text-xs text-on-surface-variant font-medium">إجمالي الإيرادات</span>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigate('admin-content')}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1 cursor-pointer hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                </div>
                <span className="text-[10px] text-primary font-bold bg-primary-fixed/30 px-1.5 py-0.5 rounded">
                  ممتاز
                </span>
              </div>
              <span className="text-2xl font-black text-on-surface mt-1">84%</span>
              <span className="text-xs text-on-surface-variant font-medium">إنجاز الكويزات</span>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onNavigate('admin-receipts')}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-1 cursor-pointer hover:border-error/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
                <span className="text-[10px] text-error font-bold bg-error-container px-1.5 py-0.5 rounded">
                  معلق
                </span>
              </div>
              <span className="text-2xl font-black text-error mt-1">{pendingReceiptsCount}</span>
              <span className="text-xs text-on-surface-variant font-medium">إيصالات معلقة</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">إجراءات سريعة:</span>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => onNavigate('admin-content')}
                className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-low flex flex-col items-center gap-1 hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                <span className="text-[11px] font-bold text-on-surface">كويز جديد</span>
              </button>

              <button
                onClick={() => setShowBroadcastModal(true)}
                className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-low flex flex-col items-center gap-1 hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">campaign</span>
                <span className="text-[11px] font-bold text-on-surface">تنبيه عام</span>
              </button>

              <button
                onClick={() => alert('تم تصدير كشف درجات الطلاب بصيغة Excel بنجاح!')}
                className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-low flex flex-col items-center gap-1 hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  file_download
                </span>
                <span className="text-[11px] font-bold text-on-surface">تصدير كشوف</span>
              </button>

              <button
                onClick={() => onNavigate('admin-students')}
                className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-low flex flex-col items-center gap-1 hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-amber-500 text-[20px]">bar_chart</span>
                <span className="text-[11px] font-bold text-on-surface">المتعثرون</span>
              </button>
            </div>
          </div>

          {/* Unit Performance Section */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container-low shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-on-surface">أداء الوحدات الدراسية بالدفعة</h2>
              <span className="text-[11px] text-primary font-bold">نسبة النجاح العامة</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-on-surface">Unit 1: Travel & Transport</span>
                  <span className="font-bold text-tertiary">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-on-surface">Unit 2: Science & Technology</span>
                  <span className="font-bold text-primary">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Weak point insight */}
              <div className="p-3 rounded-xl bg-error-container/20 border border-error-container text-xs text-on-surface flex items-start gap-2">
                <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-error">السؤال الأكثر خطأً هذا الأسبوع:</span>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Third Conditional Clauses (أخفق فيه 42% من الطلاب). مقترح: إضافة 5 أسئلة تدريبية
                    إضافية.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container-low shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">النشاط الحي للطلاب</span>
              <span className="text-[10px] text-tertiary flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                مباشر
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-bold text-on-surface">أحمد طارق حسن</span>
                  <span className="text-on-surface-variant">أنهى كويز Unit 1 بنتيجة 90%</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">منذ 10 د</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-bold text-on-surface">مريم خالد</span>
                  <span className="text-on-surface-variant">رفعت إيصال اشتراك InstaPay</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">منذ 18 د</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-bold text-on-surface">عمر يوسف</span>
                  <span className="text-on-surface-variant">حقق حماس 10 أيام متتالية 🔥</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">منذ 25 د</span>
              </div>
            </div>
          </div>

          {/* Upcoming Live Session Card */}
          <div className="rounded-2xl bg-gradient-to-l from-primary to-[#00174b] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">videocam</span>
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-sm">البث المباشر القادم</span>
                <span className="text-white/80">الجمعة 07:00 م • حل أصعب أفكار القواعد</span>
              </div>
            </div>
            <button
              onClick={() => alert('تم نسخ رابط البث المباشر للطلاب')}
              className="px-3 py-1.5 rounded-lg bg-white text-primary font-bold text-xs active:scale-95"
              type="button"
            >
              مشاركة الرابط
            </button>
          </div>
        </div>
      </main>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowBroadcastModal(false)}
        >
          <div
            className="max-w-xs w-full bg-surface rounded-2xl p-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-on-surface">إرسال إشعار تنبيه عام للدفعة</h3>
            <textarea
              className="w-full h-24 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
              placeholder="اكتب نص الرسالة التنبيهية التي ستصل لكل الطلاب..."
              defaultValue="تذكير: موعد كويز الوحدة الأولى ينتهي الليلة الساعة 11 مساءً!"
            ></textarea>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('تم إرسال التنبيه العام لجميع الطلاب (1,280 طالب)');
                  setShowBroadcastModal(false);
                }}
                className="flex-1 h-10 rounded-xl bg-primary text-white text-xs font-bold"
                type="button"
              >
                إرسال الآن 📢
              </button>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="px-3 h-10 rounded-xl bg-surface-container-high text-on-surface text-xs font-medium"
                type="button"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminBottomNav
        currentScreen="admin-dashboard"
        onNavigate={onNavigate}
        pendingReceiptsCount={pendingReceiptsCount}
      />
    </div>
  );
};
