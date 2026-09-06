import React, { useState } from 'react';
import { AppScreen, StudentRecord } from '../../types';
import { INITIAL_STUDENTS } from '../../data/mockData';
import { AdminHeader } from '../common/AdminHeader';
import { AdminBottomNav } from '../common/AdminBottomNav';

interface AdminStudentsScreenProps {
  onNavigate: (screen: AppScreen) => void;
  pendingReceiptsCount: number;
}

type StudentFilter = 'all' | 'honor' | 'at_risk' | 'pending';

export const AdminStudentsScreen: React.FC<AdminStudentsScreenProps> = ({
  onNavigate,
  pendingReceiptsCount,
}) => {
  const [filter, setFilter] = useState<StudentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter((st) => {
    if (filter === 'honor' && st.statusTag !== 'honor') return false;
    if (filter === 'at_risk' && st.statusTag !== 'at_risk') return false;
    if (filter === 'pending' && st.statusTag !== 'pending') return false;
    if (searchQuery.trim() !== '') {
      return (
        st.name.includes(searchQuery) ||
        st.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.phone.includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col" dir="rtl">
      <AdminHeader
        title="إدارة الطلاب"
        onNavigate={onNavigate}
        unreadNotificationsCount={pendingReceiptsCount}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full gap-stack-lg pt-stack-xs">
          {/* Header Title */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-primary">دفعة الثانوية العامة 2025</span>
              <h1 className="font-headline-lg-mobile text-2xl font-bold text-on-surface">
                الطلاب والمتابعة (1,280)
              </h1>
            </div>
            <button
              onClick={() => alert('تم إرسال رسائل التذكير التلقائي لجميع أولياء أمور الطلاب')}
              className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold flex items-center gap-1 hover:bg-primary/20"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">sms</span>
              <span>تنبيه جماعي</span>
            </button>
          </div>

          {/* Micro Stats Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-tertiary font-bold">المتفوقون</span>
              <span className="text-lg font-black text-on-surface">142</span>
              <span className="text-[10px] text-on-surface-variant">&gt; 90% إنجاز</span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-error font-bold">في خطر</span>
              <span className="text-lg font-black text-error">38</span>
              <span className="text-[10px] text-on-surface-variant">&lt; 60% إنجاز</span>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-low text-center flex flex-col">
              <span className="text-[11px] text-primary font-bold">متوسط الدفعة</span>
              <span className="text-lg font-black text-primary">82.4%</span>
              <span className="text-[10px] text-on-surface-variant">عام</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو كود الطالب أو الهاتف..."
              className="w-full h-11 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
            />
            <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant text-[20px]">
              search
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'all'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              الكل (1,280)
            </button>
            <button
              onClick={() => setFilter('honor')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'honor'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              لوحة الشرف 👑
            </button>
            <button
              onClick={() => setFilter('at_risk')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'at_risk'
                  ? 'bg-error text-white shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              يحتاجون متابعة ⚠️
            </button>
          </div>

          {/* Students Cards Stack */}
          <div className="space-y-3">
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col gap-3"
              >
                {/* Top Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={st.avatarUrl}
                      alt={st.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-on-surface">{st.name}</span>
                        {st.statusTag === 'honor' && (
                          <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            المركز الأول 👑
                          </span>
                        )}
                        {st.statusTag === 'at_risk' && (
                          <span className="px-2 py-0.2 rounded-full bg-error-container text-error text-[10px] font-bold">
                            ⚠️ متعثر
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-0.5">
                        <span className="font-mono text-primary font-bold">{st.code}</span>
                        <span>•</span>
                        <span>نشط {st.activeTimeText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left flex flex-col items-end">
                    <span className="text-base font-black text-primary">{st.quizAverage}%</span>
                    <span className="text-[10px] text-on-surface-variant">
                      {st.unitsCompleted}/{st.totalUnits} وحدات
                    </span>
                  </div>
                </div>

                {/* At risk warning box */}
                {st.atRiskWarning && (
                  <div className="p-3 rounded-xl bg-error-container/20 border border-error-container text-xs text-on-surface">
                    <span className="font-bold text-error block mb-1">
                      تنبيه ضعف: {st.atRiskWarning.unit} ({st.atRiskWarning.score})
                    </span>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      {st.atRiskWarning.detail}
                    </p>
                    <button
                      onClick={() =>
                        alert(`تم إرسال تدريب علاجي مكثف لقاعدة Past Perfect إلى ${st.name}!`)
                      }
                      className="mt-2 px-3 py-1 rounded-lg bg-error text-white text-[11px] font-bold hover:bg-error/90 active:scale-95 transition-all"
                      type="button"
                    >
                      إرسال تدريب علاجي مخصص ⚡
                    </button>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-surface-container-low text-xs">
                  <span className="text-on-surface-variant font-mono text-[11px]">{st.phone}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/2${st.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-tertiary/10 text-tertiary font-bold hover:bg-tertiary/20 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      <span>واتساب</span>
                    </a>
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface font-medium hover:bg-surface-container-highest"
                      type="button"
                    >
                      عرض الملف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Teaching Assistant Callout */}
          <div className="rounded-2xl bg-surface-container-low p-4 border border-surface-container flex items-start gap-3 text-xs">
            <span className="material-symbols-outlined text-primary text-[24px] shrink-0">
              smart_toy
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">تحليل الذكاء الاصطناعي الأكاديمي:</span>
              <p className="text-on-surface-variant mt-1 leading-relaxed">
                88% من طلاب الدفعة أتموا بنجاح اختبار الوحدة الأولى بمتوسط 82%. ننصح ببدء كويز الوحدة
                الثانية يوم الخميس مع إرسال فيديو توضيحي لزمن Past Perfect للطلاب المتعثرين.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Add Student Button */}
      <button
        onClick={() => alert('نافذة إضافة وتسجيل طالب جديد يدوياً')}
        className="fixed bottom-20 left-6 z-40 h-12 px-4 rounded-full bg-primary text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">person_add</span>
        <span>تسجيل طالب</span>
      </button>

      {/* Student Details Sheet/Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="max-w-xs w-full bg-surface rounded-3xl p-5 flex flex-col gap-4 shadow-2xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-on-surface">ملف إنجاز الطالب</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={selectedStudent.avatarUrl}
                alt={selectedStudent.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-on-surface">{selectedStudent.name}</span>
                <span className="font-mono text-xs text-primary font-bold">{selectedStudent.code}</span>
                <span className="text-[11px] text-on-surface-variant">{selectedStudent.grade}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-on-surface-variant block text-[10px]">متوسط الكويزات</span>
                <span className="text-base font-black text-primary">
                  {selectedStudent.quizAverage}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <span className="text-on-surface-variant block text-[10px]">الحماس</span>
                <span className="text-base font-black text-amber-600">
                  {selectedStudent.streakDays} أيام 🔥
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`تم إصدار وتصدير الشهادة الأكاديمية للطالب ${selectedStudent.name}!`);
                setSelectedStudent(null);
              }}
              className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span>إصدار شهادة تقدير</span>
            </button>
          </div>
        </div>
      )}

      <AdminBottomNav
        currentScreen="admin-students"
        onNavigate={onNavigate}
        pendingReceiptsCount={pendingReceiptsCount}
      />
    </div>
  );
};
