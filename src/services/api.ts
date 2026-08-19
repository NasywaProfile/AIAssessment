import { AssessmentSubmission, FormData } from '../types';

const API_BASE = '/api';

export const apiService = {
  // 1. Submit assessment data to Laravel MySQL Backend
  async saveSubmission(submissionData: Partial<AssessmentSubmission>): Promise<string> {
    try {
      const response = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      if (response.ok) {
        const result = await response.json();
        return result.submissionId || result.id;
      }
    } catch (e) {
      console.warn('API unavailable, storing in localStorage fallback:', e);
    }

    // Local Storage Fallback
    const id = 'SUB-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const newSubmission: AssessmentSubmission = {
      id,
      timestamp: new Date().toISOString(),
      companyName: submissionData.companyName || '',
      industry: submissionData.industry || '',
      companySize: submissionData.companySize || '',
      location: submissionData.location || '',
      aiGoal: submissionData.aiGoal || '',
      aiUseCase: submissionData.aiUseCase || '',
      aiTools: submissionData.aiTools || '',
      aiCurrentUse: submissionData.aiCurrentUse || '',
      aiFrequentUse: submissionData.aiFrequentUse || '',
      aiLearningNeed: submissionData.aiLearningNeed || '',
      aiMasteryTarget: submissionData.aiMasteryTarget || '',
      timeline: submissionData.timeline || '',
      fullName: submissionData.fullName || '',
      jobTitle: submissionData.jobTitle || '',
      email: submissionData.email || '',
      phone: submissionData.phone || '',
      overallScore: submissionData.overallScore || 0,
      scores: submissionData.scores || { strategi: 0, proses: 0, sdm: 0, data: 0, tataKelola: 0 },
      readinessLevel: submissionData.readinessLevel || 'Pemula (Beginner)',
      readinessDescription: submissionData.readinessDescription || '',
    };

    const existingStr = localStorage.getItem('nortis_assessment_submissions');
    const existing: AssessmentSubmission[] = existingStr ? JSON.parse(existingStr) : [];
    existing.unshift(newSubmission);
    localStorage.setItem('nortis_assessment_submissions', JSON.stringify(existing));
    return id;
  },

  // 2. Fetch all submissions for Admin Dashboard from MySQL
  async getSubmissions(): Promise<AssessmentSubmission[]> {
    try {
      const response = await fetch(`${API_BASE}/submissions`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          return result.data;
        }
      }
    } catch (e) {
      console.warn('API unavailable, reading from localStorage:', e);
    }
    const existingStr = localStorage.getItem('nortis_assessment_submissions');
    return existingStr ? JSON.parse(existingStr) : [];
  },

  // 3. Delete submission
  async deleteSubmission(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) return true;
    } catch (e) {
      console.warn('API delete error, deleting locally:', e);
    }
    const existingStr = localStorage.getItem('nortis_assessment_submissions');
    if (existingStr) {
      const existing: AssessmentSubmission[] = JSON.parse(existingStr);
      const filtered = existing.filter(s => s.id !== id);
      localStorage.setItem('nortis_assessment_submissions', JSON.stringify(filtered));
    }
    return true;
  },

  // 4. Admin Auth
  async loginAdmin(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      return data;
    } catch (e) {
      // Local fallback auth check
      if (email === 'admin@nortis.ai' && password === 'password') {
        return { success: true, token: 'local-token-admin' };
      }
      return { success: false, message: 'Koneksi API gagal' };
    }
  },

  // 5. Fetch CMS Config from MySQL
  async getCMSData(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/cms`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) return result.data;
      }
    } catch (e) {
      console.warn('CMS API fetch failed:', e);
    }
    return null;
  },

  // 6. Save CMS Config to MySQL
  async saveCMSData(payload: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/cms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return response.ok;
    } catch (e) {
      console.warn('CMS API save failed:', e);
      return false;
    }
  }
};
