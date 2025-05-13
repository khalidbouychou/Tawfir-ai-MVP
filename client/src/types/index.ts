// User Profile Types
export interface UserProfile {
  id: string;
  riskProfile: string;
  investmentHorizon: string;
  mainObjective: string;
  esgSensitivity: string;
  compatibilityScore: number;
}

export interface UserAnswers {
  [key: string]: string | string[] | number | boolean;
}

// Questionnaire Types
export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: 'radio' | 'checkbox' | 'slider' | 'select';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
  placeholder?: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  shortTitle: string;
  questions: Question[];
}

// Product Types
export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  percentage: number;
  expectedReturn: string;
}

// Investment Types
export interface Investment {
  id: string;
  userId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

// Portfolio Types
export interface ProductAllocation {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  performance: number;
}

export interface PerformanceData {
  month: string;
  value: number;
}

export interface InvestmentPortfolio {
  totalAmount: number;
  globalPerformance: number;
  dailyChange: number;
  allocations: ProductAllocation[];
  performanceData: PerformanceData[];
}
