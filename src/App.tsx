import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AssessmentForm } from './components/AssessmentForm';
import { AssessmentQuestions } from './components/AssessmentQuestions';
import { AssessmentResult } from './components/AssessmentResult';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { CMSDashboard } from './components/cms/CMSDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { FormData, AssessmentSubmission } from './types';

export default function App() {
  type AppState = 'landing' | 'form' | 'questions' | 'result' | 'admin-login' | 'admin-dashboard' | 'cms';
  const [appState, setAppState] = useState<AppState>('landing');
  const [formData, setFormData] = useState<FormData | undefined>(undefined);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [submission, setSubmission] = useState<AssessmentSubmission | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appState]);

  if (appState === 'admin-login') {
    return (
      <LanguageProvider>
        <AdminLogin onBack={() => setAppState('landing')} onSuccess={() => setAppState('admin-dashboard')} />
      </LanguageProvider>
    );
  }

  if (appState === 'admin-dashboard') {
    return (
      <LanguageProvider>
        <AdminDashboard onLogout={() => setAppState('landing')} onOpenCMS={() => setAppState('cms')} />
      </LanguageProvider>
    );
  }

  if (appState === 'cms') {
    return (
      <LanguageProvider>
        <CMSDashboard onBack={() => setAppState('admin-dashboard')} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Header onAdminLogin={() => setAppState('admin-login')} />
        {appState === 'landing' && <LandingPage onStart={() => setAppState('form')} />}
        {appState === 'form' && <AssessmentForm initialData={formData} onBack={() => setAppState('landing')} onSubmit={(data) => { setFormData(data); setAppState('questions'); }} />}
        {appState === 'questions' && <AssessmentQuestions formData={formData!} onBack={() => setAppState('form')} onComplete={(id, subData) => { setSubmissionId(id); if (subData) setSubmission(subData); setAppState('result'); }} />}
        {appState === 'result' && <AssessmentResult submissionId={submissionId!} initialSubmission={submission} onBack={() => { setFormData(undefined); setSubmission(null); setAppState('landing'); }} />}
      </div>
    </LanguageProvider>
  );
}

