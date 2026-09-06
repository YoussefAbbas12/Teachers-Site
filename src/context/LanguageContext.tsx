import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Platform & Roles
    appName: 'Kinetic Academy',
    appSubtitle: 'منصة اللغة الإنجليزية للثانوية العامة',
    student: 'طالب',
    teacher: 'معلم',
    admin: 'لوحة المعلم',
    switchRole: 'تبديل الدور',
    studentView: 'وضع الطالب',
    teacherDashboard: 'لوحة المعلم',

    // Navigation & Screens
    home: 'الرئيسية',
    unitDetails: 'تفاصيل الوحدة',
    quizLesson: 'الاختبار التفاعلي',
    quizResult: 'نتيجة الاختبار',
    reviewAnswers: 'مراجعة الإجابات',
    progress: 'تقرير الإنجاز',
    activatePass: 'تفعيل الاشتراك',
    paymentStatus: 'حالة الدفع',
    adminDashboard: 'لوحة التحكم',
    adminStudents: 'قائمة الطلاب',
    adminReceipts: 'مراجعة الإيصالات',
    adminContent: 'بنك الأسئلة',
    adminSettings: 'إعدادات المنصة',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب جديد',
    logout: 'تسجيل الخروج',

    // Common Actions
    back: 'رجوع',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    continue: 'متابعة',
    close: 'إغلاق',
    edit: 'تعديل',
    delete: 'حذف',
    search: 'بحث...',
    filter: 'تصفية',
    all: 'الكل',
    active: 'نشط',
    pending: 'قيد المراجعة',
    approved: 'معتمد',
    rejected: 'مرفوض',

    // Auth Screen Translations
    welcomeBack: 'مرحباً بك مجدداً',
    welcomeBackSubtitle: 'سجّل دخولك للوصول للدروس والكويزات وبنك الأسئلة',
    joinKinetic: 'انضم إلى Kinetic Academy',
    joinSubtitle: 'أنشئ حسابك كطالب ثانوية عامة وابدأ التعلّم الآن',
    phoneOrCode: 'رقم الهاتف أو كود الطالب',
    phonePlaceholder: '01xxxxxxxxx أو #ST-xxxx',
    password: 'كلمة المرور',
    passwordConfirm: 'تأكيد كلمة المرور',
    passwordPlaceholder: '••••••••',
    rememberMe: 'تذكرني على هذا الجهاز',
    forgotPassword: 'نسيت كلمة المرور؟',
    forgotPasswordModalTitle: 'استعادة كلمة المرور',
    forgotPasswordModalDesc: 'تواصل مع فريق الدعم الفني عبر واتساب وسنقوم بإرسال رمز الاستعادة فوراً:',
    contactWhatsAppSupport: 'مراسلة الدعم عبر واتساب',
    loginBtn: 'تسجيل الدخول إلى المنصة',
    registerBtn: 'إنشاء حساب طالب جديد',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    createAccountLink: 'إنشاء حساب طالب',
    loginLink: 'سجّل الدخول الآن',
    demoStudentLogin: 'دخول سريع: طالب (أحمد طارق)',
    demoTeacherLogin: 'دخول سريع: المعلم (أ. أحمد حسن)',
    guestBrowsing: 'متابعة كزائر تجريبي',
    loginAsStudentTab: 'طالب 👨‍🎓',
    loginAsTeacherTab: 'معلم / مشرف 👨‍🏫',

    // Registration Form Fields
    fullName: 'الاسم ثلاثي للطالب',
    fullNamePlaceholder: 'مثال: أحمد طارق محمد',
    studentPhone: 'رقم هاتف الطالب (واتساب)',
    parentPhone: 'رقم ولي الأمر (للمتابعة)',
    academicYear: 'الصف الدراسي',
    sec3: 'الصف الثالث الثانوي (3rd Sec)',
    sec2: 'الصف الثاني الثانوي (2nd Sec)',
    sec1: 'الصف الأول الثانوي (1st Sec)',
    division: 'الشعبة الدراسية',
    scienceBiology: 'علمي علوم',
    scienceMath: 'علمي رياضة',
    literary: 'أدبي',
    general: 'عام',
    governorate: 'المحافظة',
    agreeTerms: 'أوافق على الشروط والأحكام وسياسة الخصوصية للمنصة',

    // Settings Screen
    settingsTitle: 'إعدادات المنصة والنظام',
    languageSectionTitle: 'لغة الواجهة (Interface Language)',
    languageSectionDesc: 'اختر لغة العرض المناسبة لك (العربية أو الإنجليزية)',
    arabicLanguage: 'العربية (Arabic)',
    englishLanguage: 'English (الإنجليزية)',
    languageSwitchedAr: 'تم تبديل لغة الواجهة إلى العربية بنجاح',
    languageSwitchedEn: 'Interface language successfully changed to English',
    paymentSettings: 'إعدادات الدفع والاشتراكات',
    instaPayAddress: 'عنوان InstaPay (إنستاباي)',
    vodafoneCashNumber: 'رقم محفظة فودافون كاش',
    termPriceEgp: 'قيمة اشتراك الترم (ج.م)',
    saveSettings: 'حفظ التعديلات',
    settingsSavedSuccess: 'تم حفظ وتحديث الإعدادات بنجاح! ✓',
    assistantsTeam: 'فريق المساعدين والدعم',
    backupDatabase: 'النسخ الاحتياطي للبيانات',
    downloadBackup: 'تحميل Backup',
  },
  en: {
    // Platform & Roles
    appName: 'Kinetic Academy',
    appSubtitle: 'High School English Platform',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Teacher Panel',
    switchRole: 'Switch Role',
    studentView: 'Student View',
    teacherDashboard: 'Teacher Dashboard',

    // Navigation & Screens
    home: 'Home',
    unitDetails: 'Unit Details',
    quizLesson: 'Interactive Quiz',
    quizResult: 'Quiz Result',
    reviewAnswers: 'Review Answers',
    progress: 'Progress Report',
    activatePass: 'Activate Pass',
    paymentStatus: 'Payment Status',
    adminDashboard: 'Dashboard',
    adminStudents: 'Students List',
    adminReceipts: 'Receipt Approvals',
    adminContent: 'Content & Quizzes',
    adminSettings: 'Platform Settings',
    login: 'Log In',
    register: 'Sign Up',
    logout: 'Log Out',

    // Common Actions
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    continue: 'Continue',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search...',
    filter: 'Filter',
    all: 'All',
    active: 'Active',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',

    // Auth Screen Translations
    welcomeBack: 'Welcome Back',
    welcomeBackSubtitle: 'Log in to access your lessons, interactive quizzes, and question bank',
    joinKinetic: 'Join Kinetic Academy',
    joinSubtitle: 'Create your student account and start mastering your curriculum',
    phoneOrCode: 'Phone Number or Student ID',
    phonePlaceholder: '01xxxxxxxxx or #ST-xxxx',
    password: 'Password',
    passwordConfirm: 'Confirm Password',
    passwordPlaceholder: '••••••••',
    rememberMe: 'Remember me on this device',
    forgotPassword: 'Forgot Password?',
    forgotPasswordModalTitle: 'Reset Password',
    forgotPasswordModalDesc: 'Contact our support team on WhatsApp and we will send you a reset code right away:',
    contactWhatsAppSupport: 'Contact WhatsApp Support',
    loginBtn: 'Log In to Platform',
    registerBtn: 'Create Student Account',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    createAccountLink: 'Sign up now',
    loginLink: 'Log in now',
    demoStudentLogin: 'Quick Demo: Student (Ahmed Tarek)',
    demoTeacherLogin: 'Quick Demo: Teacher (Mr. Ahmed Hassan)',
    guestBrowsing: 'Continue as Guest',
    loginAsStudentTab: 'Student 👨‍🎓',
    loginAsTeacherTab: 'Teacher / Admin 👨‍🏫',

    // Registration Form Fields
    fullName: 'Full Student Name',
    fullNamePlaceholder: 'e.g. Ahmed Tarek Mohamed',
    studentPhone: 'Student Phone (WhatsApp)',
    parentPhone: 'Parent Phone (For Updates)',
    academicYear: 'Academic Grade',
    sec3: '3rd Secondary (Grade 12)',
    sec2: '2nd Secondary (Grade 11)',
    sec1: '1st Secondary (Grade 10)',
    division: 'Study Division',
    scienceBiology: 'Science (Biology)',
    scienceMath: 'Science (Math)',
    literary: 'Literary (Arts)',
    general: 'General',
    governorate: 'Governorate',
    agreeTerms: 'I agree to the Terms of Service & Privacy Policy',

    // Settings Screen
    settingsTitle: 'Platform & System Settings',
    languageSectionTitle: 'Interface Language (لغة الواجهة)',
    languageSectionDesc: 'Select your preferred language (Arabic or English)',
    arabicLanguage: 'العربية (Arabic)',
    englishLanguage: 'English (الإنجليزية)',
    languageSwitchedAr: 'تم تبديل لغة الواجهة إلى العربية بنجاح',
    languageSwitchedEn: 'Interface language successfully changed to English',
    paymentSettings: 'Payment & Subscription Settings',
    instaPayAddress: 'InstaPay Address (IPA)',
    vodafoneCashNumber: 'Vodafone Cash Wallet Number',
    termPriceEgp: 'Term Pass Price (EGP)',
    saveSettings: 'Save Changes',
    settingsSavedSuccess: 'Settings saved and updated successfully! ✓',
    assistantsTeam: 'Teaching Assistants Team',
    backupDatabase: 'Database Backup',
    downloadBackup: 'Download Backup',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  direction: 'rtl',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kinetic_lang');
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    try {
      localStorage.setItem('kinetic_lang', language);
    } catch {
      // ignore
    }
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['ar'][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      <div dir={direction} className={direction === 'rtl' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
