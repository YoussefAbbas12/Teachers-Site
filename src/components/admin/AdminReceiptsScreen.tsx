import React, { useState } from 'react';
import { AppScreen, PaymentReceipt } from '../../types';
import { INITIAL_RECEIPTS, ASSETS } from '../../data/mockData';
import { AdminHeader } from '../common/AdminHeader';
import { AdminBottomNav } from '../common/AdminBottomNav';

interface AdminReceiptsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  receipts: PaymentReceipt[];
  onApproveReceipt: (id: string) => void;
  onRejectReceipt: (id: string) => void;
  onBatchApprove: () => void;
}

type TabType = 'pending' | 'approved' | 'rejected' | 'all';
type MethodFilter = 'all' | 'InstaPay' | 'Vodafone Cash';

export const AdminReceiptsScreen: React.FC<AdminReceiptsScreenProps> = ({
  onNavigate,
  receipts,
  onApproveReceipt,
  onRejectReceipt,
  onBatchApprove,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [methodFilter, setMethodFilter] = useState<MethodFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalReceipt, setModalReceipt] = useState<PaymentReceipt | null>(null);

  const pendingList = receipts.filter((r) => r.status === 'pending');
  const approvedList = receipts.filter((r) => r.status === 'approved');
  const rejectedList = receipts.filter((r) => r.status === 'rejected');

  const filteredReceipts = receipts.filter((r) => {
    if (activeTab === 'pending' && r.status !== 'pending') return false;
    if (activeTab === 'approved' && r.status !== 'approved') return false;
    if (activeTab === 'rejected' && r.status !== 'rejected') return false;
    if (methodFilter !== 'all' && r.method !== methodFilter) return false;
    if (searchQuery.trim() !== '') {
      return (
        r.studentName.includes(searchQuery) ||
        r.studentPhone.includes(searchQuery) ||
        r.refCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      <AdminHeader
        title="مراجعة الإيصالات"
        onNavigate={onNavigate}
        unreadNotificationsCount={pendingList.length}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Header Title */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-primary">الاشتراكات والتحويلات</span>
              <h1 className="font-headline-lg-mobile text-2xl font-bold text-on-surface">
                إيصالات الدفع ({pendingList.length} بانتظارك)
              </h1>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              مراجعة حية
            </span>
          </div>

          {/* Micro Stats Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-amber-600 font-bold">المعلقة</span>
              <span className="text-lg font-black text-amber-600">{pendingList.length}</span>
              <span className="text-[10px] text-on-surface-variant font-mono">
                {pendingList.length * 250} ج.م
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-tertiary font-bold">مفعلة اليوم</span>
              <span className="text-lg font-black text-tertiary">28</span>
              <span className="text-[10px] text-on-surface-variant font-mono">7,000 ج.م</span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-error font-bold">مرفوضة / تعديل</span>
              <span className="text-lg font-black text-error">{rejectedList.length}</span>
              <span className="text-[10px] text-on-surface-variant">طلب توضيح</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الطالب، الهاتف، أو كود الطلب..."
              className="w-full h-11 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
            />
            <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant text-[20px]">
              search
            </span>
          </div>

          {/* Tabs Control */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-surface-container-low rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-1.5 font-bold rounded-lg transition-all ${
                activeTab === 'pending'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              قيد الانتظار ({pendingList.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-1.5 font-bold rounded-lg transition-all ${
                activeTab === 'approved'
                  ? 'bg-surface-container-lowest text-tertiary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              مفعلة ({approvedList.length + 28})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-1.5 font-bold rounded-lg transition-all ${
                activeTab === 'rejected'
                  ? 'bg-surface-container-lowest text-error shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              مرفوضة ({rejectedList.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-1.5 font-bold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              الكل
            </button>
          </div>

          {/* Payment Method Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setMethodFilter('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                methodFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
              type="button"
            >
              كل الطرق
            </button>
            <button
              onClick={() => setMethodFilter('InstaPay')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                methodFilter === 'InstaPay'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
              type="button"
            >
              ⚡ InstaPay (إنستاباي)
            </button>
            <button
              onClick={() => setMethodFilter('Vodafone Cash')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                methodFilter === 'Vodafone Cash'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
              type="button"
            >
              📱 فودافون كاش
            </button>
          </div>

          {/* Auto Match Banner */}
          {pendingList.length > 1 && (
            <div className="p-3 rounded-2xl bg-tertiary-fixed/30 border border-tertiary-fixed flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  auto_awesome
                </span>
                <span className="font-bold text-on-surface">
                  تم مطابقة مبالغ {Math.min(pendingList.length, 3)} إيصالات تلقائياً
                </span>
              </div>
              <button
                onClick={onBatchApprove}
                className="px-3 py-1.5 rounded-xl bg-tertiary text-white font-bold text-xs hover:bg-tertiary-container transition-colors active:scale-95 shrink-0"
                type="button"
              >
                تفعيل فوري للكل ⚡
              </button>
            </div>
          )}

          {/* Receipts Cards List */}
          <div className="space-y-3">
            {filteredReceipts.length === 0 ? (
              <div className="p-8 rounded-3xl bg-surface-container-lowest text-center flex flex-col items-center gap-2 border border-surface-container-low">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">
                  task_alt
                </span>
                <span className="font-bold text-sm text-on-surface">لا توجد إيصالات في هذا القسم</span>
                <p className="text-xs text-on-surface-variant">جميع التحويلات تم مراجعتها بنجاح!</p>
              </div>
            ) : (
              filteredReceipts.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-3"
                >
                  {/* Card Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatarUrl}
                        alt={rec.studentName}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-on-surface">{rec.studentName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant text-[10px] font-bold">
                            {rec.grade}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant mt-0.5">
                          <span className="font-mono text-primary font-bold">{rec.refCode}</span>
                          <span>•</span>
                          <span>{rec.timeString}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left flex flex-col items-end">
                      <span className="text-lg font-black text-primary font-mono">
                        {rec.amount} ج.م
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.method === 'InstaPay'
                            ? 'bg-primary-fixed text-primary'
                            : 'bg-secondary-fixed text-secondary'
                        }`}
                      >
                        {rec.method}
                      </span>
                    </div>
                  </div>

                  {/* Destination and details */}
                  <div className="p-2.5 rounded-xl bg-surface-container-low text-xs flex items-center justify-between">
                    <span className="text-on-surface-variant">الجهة المحول لها:</span>
                    <span className="font-mono font-bold text-on-surface">{rec.destination}</span>
                  </div>

                  {rec.assignedAssistant && (
                    <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant bg-surface-container-low p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        assignment_ind
                      </span>
                      <span>قيد المتابعة بواسطة: {rec.assignedAssistant}</span>
                    </div>
                  )}

                  {/* Receipt Thumbnail & Zoom Button */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low border border-surface-container">
                    <img
                      src={rec.receiptImageUrl}
                      alt="Receipt preview"
                      className="w-16 h-16 object-cover rounded-lg shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setModalReceipt(rec)}
                    />
                    <div className="flex flex-col text-xs min-w-0 flex-1">
                      <span className="font-bold text-on-surface truncate">لقطة شاشة التحويل</span>
                      <span className="text-[11px] text-tertiary">مطابق لمبلغ 250 ج.م ✓</span>
                      <button
                        onClick={() => setModalReceipt(rec)}
                        className="mt-1 text-primary font-bold text-right flex items-center gap-1 hover:underline text-[11px]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                        <span>معاينة وتكبير الإيصال</span>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {rec.status === 'pending' ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onApproveReceipt(rec.id)}
                        className="h-11 rounded-xl bg-tertiary text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-tertiary-container active:scale-95 transition-all shadow-sm"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>تأكيد التفعيل وفتح الكورس</span>
                      </button>

                      <div className="flex gap-1">
                        <button
                          onClick={() => onRejectReceipt(rec.id)}
                          className="flex-1 h-11 rounded-xl bg-error-container text-error font-bold text-xs flex items-center justify-center gap-1 hover:bg-error/20 active:scale-95 transition-all"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                          <span>رفض</span>
                        </button>

                        <a
                          href={`https://wa.me/2${rec.studentPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95"
                          title="مراسلة الطالب واتساب"
                        >
                          <span className="material-symbols-outlined text-[18px]">chat</span>
                        </a>
                      </div>
                    </div>
                  ) : rec.status === 'approved' ? (
                    <div className="p-2.5 rounded-xl bg-tertiary/10 text-tertiary font-bold text-xs flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        تم تفعيل الاشتراك للطالب بنجاح ✓
                      </span>
                      <span className="text-[10px] text-on-surface-variant">فتح جميع الوحدات</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-error/10 text-error font-bold text-xs flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                        تم رفض الإيصال وإشعار الطالب
                      </span>
                      <button
                        onClick={() => onApproveReceipt(rec.id)}
                        className="text-primary underline text-[11px]"
                        type="button"
                      >
                        إعادة النظر
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Full Modal Image Preview */}
      {modalReceipt && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalReceipt(null)}
        >
          <div
            className="max-w-sm w-full bg-surface rounded-3xl p-5 flex flex-col gap-4 shadow-2xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-on-surface">إيصال {modalReceipt.studentName}</h3>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  {modalReceipt.refCode} • {modalReceipt.method}
                </span>
              </div>
              <button
                onClick={() => setModalReceipt(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={modalReceipt.receiptImageUrl}
                alt="Full receipt"
                className="max-h-96 w-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onApproveReceipt(modalReceipt.id);
                  setModalReceipt(null);
                }}
                className="flex-1 h-11 rounded-xl bg-tertiary text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>اعتماد وتفعيل الآن (250 ج.م)</span>
              </button>
              <button
                onClick={() => setModalReceipt(null)}
                className="px-4 h-11 rounded-xl bg-surface-container-high text-on-surface font-medium text-xs"
                type="button"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminBottomNav
        currentScreen="admin-receipts"
        onNavigate={onNavigate}
        pendingReceiptsCount={pendingList.length}
      />
    </div>
  );
};
