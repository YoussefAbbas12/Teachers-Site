export type AppScreen =
  // Auth Screens
  | 'login'
  | 'register'
  // Student Screens
  | 'home'
  | 'unit-details'
  | 'quiz'
  | 'quiz-result'
  | 'review-answers'
  | 'progress'
  | 'activate-pass'
  | 'payment-status'
  // Admin Screens
  | 'admin-dashboard'
  | 'admin-students'
  | 'admin-receipts'
  | 'admin-content'
  | 'admin-settings';

export type UserRole = 'student' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  parentPhone?: string;
  role: UserRole;
  grade?: string;
  division?: string;
  governorate?: string;
  code?: string;
  avatarUrl?: string;
}

export interface QuizQuestion {
  id: number;
  unit: string;
  topic: string;
  type: 'words' | 'grammar';
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  subPrompt?: string;
  phonetic?: string;
  partOfSpeech?: string;
  highlightedWord?: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanationRule: string;
  explanationDetails: string;
  exampleSentence?: string;
  wordOrderBuilder?: {
    instruction: string;
    chips: string[];
    correctOrder: string[];
  };
}

export interface ReviewQuestionItem {
  id: number;
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  highlightedWord?: string;
  isCorrect: boolean;
  studentAnswer: string;
  correctAnswer: string;
  options: { key: string; text: string }[];
  explanationTitle: string;
  explanationText: string;
  exampleSentence?: string;
  pronunciationWord?: string;
  grammarFormula?: {
    condition: string;
    result: string;
    example: string;
  };
  isBookmarked: boolean;
}

export interface StudentRecord {
  id: string;
  code: string;
  name: string;
  avatarUrl: string;
  phone: string;
  grade: string;
  isActive: boolean;
  activeTimeText: string;
  quizAverage: number;
  unitsCompleted: number;
  totalUnits: number;
  streakDays: number;
  statusTag: 'active' | 'honor' | 'at_risk' | 'pending';
  honorTitle?: string;
  atRiskWarning?: {
    unit: string;
    score: string;
    detail: string;
  };
}

export interface PaymentReceipt {
  id: string;
  refCode: string;
  studentName: string;
  studentPhone: string;
  grade: string;
  amount: number;
  method: 'InstaPay' | 'Vodafone Cash';
  destination: string;
  timeString: string;
  avatarUrl: string;
  receiptImageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedAssistant?: string;
}

export interface CurriculumUnit {
  id: number;
  number: string;
  title: string;
  module: string;
  wordsCount: number;
  grammarCount: number;
  progressPercent: number;
  status: 'active' | 'in_progress' | 'scheduled' | 'draft';
  statusLabel: string;
  completedLessons?: number;
  totalLessons?: number;
  imageUrl?: string;
  scheduledTime?: string;
}
