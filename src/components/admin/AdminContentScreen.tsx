import React, { useState } from 'react';
import { AppScreen, CurriculumUnit } from '../../types';
import { INITIAL_CURRICULUM_UNITS } from '../../data/mockData';
import { AdminHeader } from '../common/AdminHeader';
import { AdminBottomNav } from '../common/AdminBottomNav';

interface AdminContentScreenProps {
  onNavigate: (screen: AppScreen) => void;
  pendingReceiptsCount: number;
}

export const AdminContentScreen: React.FC<AdminContentScreenProps> = ({
  onNavigate,
  pendingReceiptsCount,
}) => {
  const [units, setUnits] = useState<CurriculumUnit[]>(INITIAL_CURRICULUM_UNITS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(1);
  const [quizDuration, setQuizDuration] = useState('20');
  const [questionCount, setQuestionCount] = useState('15');

  const toggleUnitStatus = (id: number) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === 'active' ? 'in_progress' : 'active',
              statusLabel: u.status === 'active' ? 'متاح للطلاب' : 'نشط ومباشر',
            }
          : u
      )
    );
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم إنشاء الاختبار "${newQuizTitle || 'اختبار جديد'}" ونشره بنجاح لطلاب الوحدة!`);
    setShowCreateModal(false);
    setNewQuizTitle('');
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      <AdminHeader
        title="بنك الأسئلة والمحتوى"
        onNavigate={onNavigate}
        unreadNotificationsCount={pendingReceiptsCount}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Header Title */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-primary">المناهج والاختبارات</span>
              <h1 className="font-headline-lg-mobile text-2xl font-bold text-on-surface">
                بنك الأسئلة والوحدات
              </h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-primary-container"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>كويز جديد</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[10px] text-on-surface-variant font-medium">الأسئلة</span>
              <span className="text-base font-black text-on-surface">650</span>
              <span className="text-[9px] text-tertiary font-bold">معتمد</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[10px] text-on-surface-variant font-medium">مفردات</span>
              <span className="text-base font-black text-primary">350</span>
              <span className="text-[9px] text-primary font-bold">Words</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[10px] text-on-surface-variant font-medium">قواعد</span>
              <span className="text-base font-black text-secondary">300</span>
              <span className="text-[9px] text-secondary font-bold">Grammar</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[10px] text-on-surface-variant font-medium">جاهزية</span>
              <span className="text-base font-black text-tertiary">88%</span>
              <span className="text-[9px] text-tertiary font-bold">جاهز</span>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => alert('إضافة سؤال جديد إلى بنك الأسئلة المركزي')}
              className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low flex items-center gap-2 hover:bg-surface-container-high transition-colors text-right"
              type="button"
            >
              <div className="w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">post_add</span>
              </div>
              <div>
                <span className="font-bold text-on-surface block">إضافة سؤال جديد</span>
                <span className="text-[10px] text-on-surface-variant">اختيار من متعدد أو أكمل</span>
              </div>
            </button>

            <button
              onClick={() => alert('تم استيراد بنك الأسئلة بصيغة Excel/Word بنجاح!')}
              className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low flex items-center gap-2 hover:bg-surface-container-high transition-colors text-right"
              type="button"
            >
              <div className="w-8 h-8 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
              </div>
              <div>
                <span className="font-bold text-on-surface block">استيراد بنك مجمع</span>
                <span className="text-[10px] text-on-surface-variant">ملف Excel أو CSV</span>
              </div>
            </button>
          </div>

          {/* Units Management List */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-on-surface">وحدات الفصل الدراسي الثاني (6 وحدات)</h2>

            {units.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      {u.imageUrl ? (
                        <img
                          src={u.imageUrl}
                          alt={u.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[24px]">menu_book</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-primary">{u.number}</span>
                        <span className="text-xs text-on-surface-variant">• {u.module}</span>
                      </div>
                      <h3 className="font-bold text-sm text-on-surface">{u.title}</h3>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        {u.wordsCount} سؤال مفردات • {u.grammarCount} سؤال قواعد
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active'
                          ? 'bg-tertiary-fixed text-tertiary'
                          : u.status === 'in_progress'
                          ? 'bg-primary-fixed text-primary'
                          : u.status === 'scheduled'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {u.statusLabel}
                    </span>
                    <button
                      onClick={() => toggleUnitStatus(u.id)}
                      className="text-[11px] text-primary font-bold hover:underline"
                      type="button"
                    >
                      {u.status === 'active' ? 'إيقاف مؤقت' : 'تفعيل ونشر'}
                    </button>
                  </div>
                </div>

                {u.scheduledTime && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-amber-600">
                      schedule
                    </span>
                    <span>موعد النشر التلقائي: {u.scheduledTime}</span>
                  </div>
                )}

                {/* Sub-quizzes list */}
                <div className="flex items-center gap-2 pt-1 border-t border-surface-container-low text-xs">
                  <button
                    onClick={() => onNavigate('quiz')}
                    className="flex-1 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-medium flex items-center justify-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      play_circle
                    </span>
                    <span>معاينة كويز المفردات</span>
                  </button>
                  <button
                    onClick={() => onNavigate('quiz')}
                    className="flex-1 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface font-medium flex items-center justify-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      spellcheck
                    </span>
                    <span>معاينة كويز القواعد</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="max-w-xs w-full bg-surface rounded-3xl p-5 flex flex-col gap-3 shadow-2xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-on-surface">إنشاء اختبار كويز جديد</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                  اختر الوحدة:
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface"
                >
                  <option value={1}>Unit 1: Travel & Transport</option>
                  <option value={2}>Unit 2: Science & Tech</option>
                  <option value={3}>Unit 3: Arts & Culture</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                  عنوان الاختبار:
                </label>
                <input
                  type="text"
                  required
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  placeholder="مثال: مراجعة القواعد الأسبوعية"
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                    المدة (دقيقة):
                  </label>
                  <input
                    type="number"
                    value={quizDuration}
                    onChange={(e) => setQuizDuration(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-on-surface-variant font-medium mb-1">
                    عدد الأسئلة:
                  </label>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-[11px] font-bold text-on-surface">نشر فوري للدفعة</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm mt-1"
              >
                <span>حفظ ونشر الاختبار 🚀</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <AdminBottomNav
        currentScreen="admin-content"
        onNavigate={onNavigate}
        pendingReceiptsCount={pendingReceiptsCount}
      />
    </div>
  );
};
