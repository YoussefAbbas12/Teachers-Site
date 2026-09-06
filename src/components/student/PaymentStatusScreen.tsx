import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { ASSETS } from '../../data/mockData';

interface PaymentStatusScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const PaymentStatusScreen: React.FC<PaymentStatusScreenProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const orderRef = '#KP-2025-8841';

  const handleCopy = () => {
    navigator.clipboard.writeText(orderRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container-low pt-safe">
        <div className="h-16 px-margin-mobile flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Close"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-on-surface">طلب الاشتراك</span>
            <span className="text-[10px] text-primary font-bold">قيد المراجعة والتحقق</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            قيد المراجعة
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pt-20 pb-12 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Status Hero */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 mb-3 animate-pulse">
              <span className="material-symbols-outlined text-[32px]">hourglass_top</span>
            </div>
            <h1 className="text-xl font-bold text-on-surface">طلبك قيد المراجعة والتحقق</h1>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
              تم استلام إيصال التحويل وجاري مطابقته بواسطة مساعد مستر أحمد حسن لتفعيل حسابك فوراً.
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-full bg-surface-container-low text-xs font-mono font-bold text-primary flex items-center gap-2">
              <span>رقم الطلب: {orderRef}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-on-surface-variant hover:text-primary active:scale-95"
                title="نسخ رقم الطلب"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Timeline Steps Tracker */}
          <div className="rounded-2xl bg-surface-container-lowest p-5 border border-surface-container-low shadow-sm flex flex-col gap-4">
            <h2 className="text-xs font-bold text-on-surface">مراحل تفعيل الحساب:</h2>

            <div className="space-y-4 relative mr-2">
              {/* Vertical line */}
              <div className="absolute right-3.5 top-3 bottom-3 w-0.5 bg-surface-container-high"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-tertiary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold text-on-surface">تم استلام الطلب ورفع الإيصال</span>
                  <span className="text-[11px] text-on-surface-variant">اليوم 10:42 ص • مكتمل ✓</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 animate-pulse">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
                <div className="flex flex-col text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">جاري مطابقة الإيصال بواسطة المساعد</span>
                    <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[9px] font-bold">
                      الآن
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    فحص كود التحويل عبر InstaPay (15-25 دقيقة متبقية)
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">lock_open</span>
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-medium text-on-surface-variant">فتح محتوى الترم بالكامل</span>
                  <span className="text-[11px] text-on-surface-variant/70">
                    يتم فور اعتماد الإيصال من المعلم
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Details */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container-low shadow-sm flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <span className="text-on-surface-variant">الباقة المطلوبة:</span>
              <span className="font-bold text-on-surface">اشتراك الفصل الدراسي الثاني كاملاً</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <span className="text-on-surface-variant">المبلغ المسدد:</span>
              <span className="font-bold text-primary font-mono text-sm">250 ج.م</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <span className="text-on-surface-variant">طريقة الدفع:</span>
              <span className="font-medium text-on-surface">InstaPay (إنستاباي)</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-on-surface-variant">صورة الإيصال المرفقة:</span>
              <button
                type="button"
                onClick={() => setShowReceiptModal(true)}
                className="text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>معاينة الإيصال</span>
                <span className="material-symbols-outlined text-[14px]">visibility</span>
              </button>
            </div>
          </div>

          {/* While you wait features */}
          <div className="rounded-2xl bg-surface-container-low p-4 border border-surface-container flex flex-col gap-2">
            <span className="text-xs font-bold text-on-surface">أثناء انتظار التفعيل، يمكنك البدء:</span>
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('quiz')}
                className="w-full p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">quiz</span>
                  <span className="font-medium text-on-surface">تجربة كويز المفردات المجاني</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                  arrow_back
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('unit-details')}
                className="w-full p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between hover:bg-surface-container-high transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">menu_book</span>
                  <span className="font-medium text-on-surface">تصفح فهرس دروس الوحدة الأولى</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                  arrow_back
                </span>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]"
              type="button"
            >
              <span>العودة للشاشة الرئيسية</span>
              <span className="material-symbols-outlined text-[18px]">home</span>
            </button>

            <button
              onClick={() => onNavigate('activate-pass')}
              className="w-full h-11 rounded-xl bg-surface-container-high text-on-surface font-medium text-xs hover:bg-surface-container-highest transition-colors cursor-pointer"
              type="button"
            >
              تعديل بيانات الدفع أو إعادة الرفع
            </button>
          </div>
        </div>
      </main>

      {/* Receipt Preview Modal */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowReceiptModal(false)}
        >
          <div
            className="max-w-xs w-full bg-surface rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">معاينة إيصال التحويل</span>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <img
              src={ASSETS.receiptUploadDemo}
              alt="Receipt"
              className="w-full max-h-96 object-contain rounded-xl border border-surface-container"
            />
            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full h-10 rounded-xl bg-primary text-white text-xs font-bold"
              type="button"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
