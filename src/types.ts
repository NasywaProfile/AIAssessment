export interface AssessmentSubmission {
  id: string;
  timestamp: string;
  // Form data
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  aiGoal: string;
  aiUseCase: string;
  aiTools: string;
  aiCurrentUse: string;
  aiFrequentUse: string;
  aiLearningNeed: string;
  aiMasteryTarget: string;
  timeline: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  // Scores
  overallScore: number;
  scores: {
    strategi: number;
    proses: number;
    sdm: number;
    data: number;
    tataKelola: number; // camelCase for the ID 'tata-kelola'
  };
  readinessLevel: string;
  readinessDescription: string;
}

export interface FormData {
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  aiGoal: string;
  aiUseCase: string;
  aiTools: string;
  aiCurrentUse: string;
  aiFrequentUse: string;
  aiLearningNeed: string;
  aiMasteryTarget: string;
  timeline: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
}
