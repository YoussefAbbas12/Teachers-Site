import React, { useState } from 'react';
import { AppScreen, UserRole, PaymentReceipt, AuthUser } from './types';
import { INITIAL_RECEIPTS, ASSETS } from './data/mockData';
import { MobileShell } from './components/common/MobileShell';
import { LanguageProvider } from './context/LanguageContext';

// Auth Screens
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';

// Student Screens
import { HomeScreen } from './components/student/HomeScreen';
import { UnitDetailsScreen } from './components/student/UnitDetailsScreen';
import { QuizScreen } from './components/student/QuizScreen';
import { QuizResultScreen } from './components/student/QuizResultScreen';
import { ReviewAnswersScreen } from './components/student/ReviewAnswersScreen';
import { ProgressScreen } from './components/student/ProgressScreen';
import { ActivatePassScreen } from './components/student/ActivatePassScreen';
import { PaymentStatusScreen } from './components/student/PaymentStatusScreen';

// Admin Screens
import { AdminDashboardScreen } from './components/admin/AdminDashboardScreen';
import { AdminStudentsScreen } from './components/admin/AdminStudentsScreen';
import { AdminReceiptsScreen } from './components/admin/AdminReceiptsScreen';
import { AdminContentScreen } from './components/admin/AdminContentScreen';
import { AdminSettingsScreen } from './components/admin/AdminSettingsScreen';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'st-9021',
    name: 'أحمد طارق حسن',
    phone: '01198765432',
    code: '#ST-9021',
    role: 'student',
    grade: '3rd Sec',
    avatarUrl: ASSETS.studentAvatar,
  });
  const [receipts, setReceipts] = useState<PaymentReceipt[]>(INITIAL_RECEIPTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleRole = () => {
    if (userRole === 'student') {
      setUserRole('admin');
      setCurrentScreen('admin-dashboard');
      showToast('تم التبديل إلى لوحة المعلم (أ. أحمد حسن) 👨‍🏫');
    } else {
      setUserRole('student');
      setCurrentScreen('home');
      showToast('تم التبديل إلى وضع الطالب (أحمد طارق) 👨‍🎓');
    }
  };

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    // Keep userRole aligned
    if (screen.startsWith('admin-')) {
      setUserRole('admin');
    } else if (screen !== 'login' && screen !== 'register') {
      setUserRole('student');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    if (user.role === 'admin') {
      setCurrentScreen('admin-dashboard');
      showToast(`مرحباً بك يا ${user.name} في لوحة الإدارة 👨‍🏫`);
    } else {
      setCurrentScreen('home');
      showToast(`أهلاً بك مجدداً يا ${user.name}! جاهز لكويز اليوم؟ 🚀`);
    }
  };

  const handleRegisterSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole('student');
    setCurrentScreen('home');
    showToast(`تم إنشاء حساب الطالب ${user.name} بنجاح! مرحباً بك في Kinetic Academy 🌟`);
  };

  const handleApproveReceipt = (id: string) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );
    showToast('تم اعتماد الإيصال وتفعيل كورس الفصل الثاني للطالب بنجاح! 🚀');
  };

  const handleRejectReceipt = (id: string) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );
    showToast('تم رفض الإيصال وإشعار الطالب برفع صورة أوضح.');
  };

  const handleBatchApprove = () => {
    setReceipts((prev) =>
      prev.map((r) => ({ ...r, status: 'approved' as const }))
    );
    showToast('تم تفعيل واشتراك جميع الطلاب ذوي الإيصالات المطابقة تلقائياً! ⚡');
  };

  const pendingCount = receipts.filter((r) => r.status === 'pending').length;

  return (
    <MobileShell
      currentScreen={currentScreen}
      userRole={userRole}
      onNavigate={handleNavigate}
      onToggleRole={handleToggleRole}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] px-4 py-3 rounded-2xl bg-on-surface text-surface shadow-2xl flex items-center justify-between gap-3 text-xs font-bold animate-bounce text-right" dir="rtl">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-surface/70 hover:text-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Auth Screens */}
      {currentScreen === 'login' && (
        <LoginScreen
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onNavigate={handleNavigate}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {/* Student Screens */}
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}

      {currentScreen === 'unit-details' && <UnitDetailsScreen onNavigate={handleNavigate} />}

      {currentScreen === 'quiz' && <QuizScreen onNavigate={handleNavigate} />}

      {currentScreen === 'quiz-result' && <QuizResultScreen onNavigate={handleNavigate} />}

      {currentScreen === 'review-answers' && (
        <ReviewAnswersScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === 'progress' && <ProgressScreen onNavigate={handleNavigate} />}

      {currentScreen === 'activate-pass' && (
        <ActivatePassScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === 'payment-status' && (
        <PaymentStatusScreen onNavigate={handleNavigate} />
      )}

      {/* Teacher / Admin Screens */}
      {currentScreen === 'admin-dashboard' && (
        <AdminDashboardScreen
          onNavigate={handleNavigate}
          pendingReceiptsCount={pendingCount}
        />
      )}

      {currentScreen === 'admin-students' && (
        <AdminStudentsScreen
          onNavigate={handleNavigate}
          pendingReceiptsCount={pendingCount}
        />
      )}

      {currentScreen === 'admin-receipts' && (
        <AdminReceiptsScreen
          onNavigate={handleNavigate}
          receipts={receipts}
          onApproveReceipt={handleApproveReceipt}
          onRejectReceipt={handleRejectReceipt}
          onBatchApprove={handleBatchApprove}
        />
      )}

      {currentScreen === 'admin-content' && (
        <AdminContentScreen
          onNavigate={handleNavigate}
          pendingReceiptsCount={pendingCount}
        />
      )}

      {currentScreen === 'admin-settings' && (
        <AdminSettingsScreen
          onNavigate={handleNavigate}
          pendingReceiptsCount={pendingCount}
          onSwitchToStudent={handleToggleRole}
        />
      )}
    </MobileShell>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
