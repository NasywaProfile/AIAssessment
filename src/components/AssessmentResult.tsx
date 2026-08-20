import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AssessmentSubmission } from '../types';
import { apiService } from '../services/api';

interface AssessmentResultProps {
  submissionId: string;
  initialSubmission?: AssessmentSubmission | null;
  onBack: () => void;
}

export function AssessmentResult({ onBack, submissionId, initialSubmission }: AssessmentResultProps) {
  const [submission, setSubmission] = useState<AssessmentSubmission | null>(initialSubmission || null);
  const [loading, setLoading] = useState<boolean>(!initialSubmission);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (initialSubmission) {
      setSubmission(initialSubmission);
      setLoading(false);
      return;
    }

    if (submissionId) {
      setLoading(true);
      apiService.getSubmissionById(submissionId).then((data) => {
        if (data) {
          setSubmission(data);
        } else {
          const existingStr = localStorage.getItem('nortis_assessment_submissions') || localStorage.getItem('nortis_submissions');
          if (existingStr) {
            const existing: AssessmentSubmission[] = JSON.parse(existingStr);
            const found = existing.find(s => s.id === submissionId);
            if (found) setSubmission(found);
          }
        }
        setLoading(false);
      });
    }
  }, [submissionId, initialSubmission]);

  const { t, language, translations } = useLanguage();

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-[400px] flex flex-col items-center bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-2 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
        
        <h1 className="text-lg font-bold text-slate-900 mb-1 text-center shrink-0">
          {t('result.title')}
        </h1>
        <p className="text-slate-500 text-[11px] text-center mb-4 shrink-0 px-2">
          {t('result.desc')}
        </p>

        {loading && (
          <div className="w-full text-center py-6 text-slate-400 text-xs font-medium">
            Memuat skor assessment...
          </div>
        )}

        {!loading && submission && (
          <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4 shrink-0">
            <div className="flex flex-col items-center border-b border-slate-200 pb-3 mb-3">
              <h3 className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Overall Score</h3>
              <div className="text-3xl leading-none font-bold text-slate-900 mb-2 tracking-tight">
                {submission.overallScore !== undefined ? submission.overallScore.toFixed(1) : '0.0'} <span className="text-base text-slate-300 font-medium">/ 5.0</span>
              </div>
              <div className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold uppercase tracking-wider text-center mb-1">
                {submission.readinessLevel}
              </div>
              <div className="text-[11px] text-slate-500 font-medium text-center">
                Recommendation: <span className="text-slate-800 font-semibold">{submission.readinessDescription}</span>
              </div>
            </div>
            
            <div className="space-y-2 px-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language]?.assessmentData?.[0]?.shortTitle || 'Strategy'}</span>
                <span className="font-bold text-slate-800">{submission.scores?.strategi !== undefined ? submission.scores.strategi.toFixed(1) : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language]?.assessmentData?.[1]?.shortTitle || 'Process'}</span>
                <span className="font-bold text-slate-800">{submission.scores?.proses !== undefined ? submission.scores.proses.toFixed(1) : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language]?.assessmentData?.[2]?.shortTitle || 'People'}</span>
                <span className="font-bold text-slate-800">{submission.scores?.sdm !== undefined ? submission.scores.sdm.toFixed(1) : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language]?.assessmentData?.[3]?.shortTitle || 'Data'}</span>
                <span className="font-bold text-slate-800">{submission.scores?.data !== undefined ? submission.scores.data.toFixed(1) : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">{translations[language]?.assessmentData?.[4]?.shortTitle || 'Governance'}</span>
                <span className="font-bold text-slate-800">{submission.scores?.tataKelola !== undefined ? submission.scores.tataKelola.toFixed(1) : '0.0'}</span>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={onBack}
          className="w-full py-2 bg-emerald-900 text-white font-medium text-xs rounded-lg hover:bg-emerald-800 transition-colors shrink-0"
        >
          {t('result.backHome')}
        </button>
      </div>
    </main>
  );
}

