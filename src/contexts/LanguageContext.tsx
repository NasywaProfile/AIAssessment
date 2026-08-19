import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  updateTranslations: (newTranslations: any) => void;
  translations: any;
  images: Record<string, string>;
  updateImage: (key: string, url: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const defaultImages = {
  logo: '/LogoNortis.png'
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ID');
  
  const [translationsState, setTranslationsState] = useState(() => {
    const saved = localStorage.getItem('nortis_translations');
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = JSON.parse(JSON.stringify(defaultTranslations));
      ['ID', 'EN'].forEach(lang => {
        if (parsed[lang]) {
          // Perform a careful deep merge for specific known sections to prevent data loss
          Object.keys(parsed[lang]).forEach(section => {
            if (typeof parsed[lang][section] === 'object' && parsed[lang][section] !== null && !Array.isArray(parsed[lang][section])) {
               merged[lang][section] = { ...merged[lang][section], ...parsed[lang][section] };
            } else {
               merged[lang][section] = parsed[lang][section];
            }
          });
          
          if (!parsed[lang].assessmentData) {
            merged[lang].assessmentData = JSON.parse(JSON.stringify(defaultTranslations[lang].assessmentData));
          }
          if (!parsed[lang].questions || !parsed[lang].questions.pillarIndicators) {
            merged[lang].questions = merged[lang].questions || {};
            merged[lang].questions.pillarIndicators = JSON.parse(JSON.stringify(defaultTranslations[lang].questions.pillarIndicators));
          }
          if (!merged[lang].form.industries) {
             merged[lang].form.industries = JSON.parse(JSON.stringify(defaultTranslations[lang].form.industries));
          }
          if (!merged[lang].form.companySizes) {
             merged[lang].form.companySizes = JSON.parse(JSON.stringify(defaultTranslations[lang].form.companySizes));
          }
          if (!merged[lang].form.timelines) {
             merged[lang].form.timelines = JSON.parse(JSON.stringify(defaultTranslations[lang].form.timelines));
          }
        }
      });
      return merged;
    }
    return defaultTranslations;
  });

  const [images, setImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('nortis_images');
    return saved ? JSON.parse(saved) : defaultImages;
  });

  const updateTranslations = (newTranslations: any) => {
    setTranslationsState(newTranslations);
    localStorage.setItem('nortis_translations', JSON.stringify(newTranslations));
  };

  const updateImage = (key: string, url: string) => {
    const newImages = { ...images, [key]: url };
    setImages(newImages);
    localStorage.setItem('nortis_images', JSON.stringify(newImages));
  };

  const t = (key: string): string => {
    // We will implement a translation function here that pulls from our dictionary
    const keys = key.split('.');
    let result: any = translationsState[language];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, updateTranslations, translations: translationsState, images, updateImage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations dictionary
export const defaultTranslations = {
  ID: {
    header: {
      adminLogin: 'Admin Login',
    },
    landing: {
      title: 'Penilaian Kesiapan AI',
      subtitle: 'Ukur tingkat kesiapan organisasi Anda dalam mengadopsi teknologi Artificial Intelligence',
      duration: 'Durasi: 15-20 menit',
      startAssessment: 'Mulai Assessment',
      description: 'Assessment komprehensif yang mengevaluasi 5 pilar utama kesiapan AI organisasi Anda: Strategi & Kepemimpinan, Proses & Alur Kerja, SDM & Kapabilitas, Data & Teknologi, serta Tata Kelola & AI yang Bertanggung Jawab.',
      whatYouGet: 'Apa yang Anda Dapatkan:',
      benefits: [
        'Skor Kesiapan AI (NORTIS Index) yang terukur',
        'Analisis mendalam untuk setiap pilar',
        'Rekomendasi strategis yang dapat ditindaklanjuti',
        'Roadmap 90 hari untuk transformasi AI',
        'Laporan lengkap yang dapat diekspor'
      ],
      pillarsTitle: '5 Pilar Assessment:',
      pillars: {
        strategy: 'Strategi & Kepemimpinan',
        process: 'Proses & Alur Kerja',
        people: 'SDM & Kapabilitas',
        data: 'Data & Teknologi',
        governance: 'Tata Kelola & AI Bertanggung Jawab'
      },
      readyToMeasure: 'Siap Mengukur Kesiapan AI Anda?',
      readyDesc: 'Mulai sekarang dan dapatkan insight yang actionable untuk transformasi AI organisasi Anda'
    },
    form: {
      title: 'Nortis Assessment',
      subtitle: 'Mohon lengkapi informasi instansi dan personal Anda untuk membantu kami memahami kebutuhan AI di perusahaan Anda secara komprehensif.',
      companyData: 'Data Instansi',
      companyName: 'Nama Instansi',
      companyNamePlaceholder: 'Contoh: PT. Inovasi Teknologi',
      industry: 'Industri',
      industryPlaceholder: 'Pilih industri',
      industries: {
        finance: 'Perbankan & Keuangan',
        it: 'Teknologi & IT',
        manufacturing: 'Manufaktur',
        retail: 'Retail & E-commerce',
        healthcare: 'Healthcare',
        education: 'Pendidikan',
        telecom: 'Telekomunikasi',
        energy: 'Energi',
        logistics: 'Transportasi & Logistik',
        other: 'Lainnya'
      },
      companySize: 'Ukuran Instansi',
      companySizePlaceholder: 'Pilih ukuran instansi',
      companySizes: {
        s50: '1-50 karyawan',
        s200: '51-200 karyawan',
        s500: '201-500 karyawan',
        s1000: '501-1000 karyawan',
        splus: '1000+ karyawan'
      },
      location: 'Lokasi',
      locationPlaceholder: 'Kota, Negara',
      aiNeeds: 'Kondisi Eksisting AI di Individu',
      aiGoal: 'Tujuan Utama Adopsi AI',
      aiGoalPlaceholder: 'Contoh: Meningkatkan efisiensi operasional, customer experience, dll.',
      aiUseCase: 'Use Case AI yang Dipertimbangkan',
      aiUseCasePlaceholder: 'Contoh: Chatbot customer service, predictive analytics, automation, dll.',
      aiTools: 'Tools AI apa saja yang diperlukan?',
      aiToolsPlaceholder: 'Contoh: ChatGPT, Google Gemini, Midjourney, automation tools, dll.',
      aiCurrentUse: 'Sudah menggunakan AI untuk apa saja?',
      aiCurrentUsePlaceholder: 'Contoh: Content creation, customer service, data analysis, dll.',
      aiFrequentUse: 'AI apa yang paling sering digunakan?',
      aiFrequentUsePlaceholder: 'Contoh: ChatGPT untuk brainstorming, Gemini untuk research, Midjourney untuk design, dll.',
      aiLearningNeed: 'Kebutuhan belajar AI untuk apa?',
      aiLearningNeedPlaceholder: 'Contoh: Meningkatkan produktivitas tim, automasi proses bisnis, analisis data, dll.',
      aiMasteryTarget: 'Target bisa menguasai AI di bidang apa?',
      aiMasteryTargetPlaceholder: 'Contoh: Marketing & Sales, Operations & Automation, Product Development, Data Analytics, dll.',
      timeline: 'Timeline Implementasi yang Diharapkan',
      timelinePlaceholder: 'Pilih timeline',
      timelines: {
        m3: '0-3 Bulan',
        m6: '3-6 Bulan',
        m12: '6-12 Bulan',
        mplus: '12+ Bulan',
        none: 'Belum ada timeline'
      },
      personalContact: 'Data Pribadi',
      fullName: 'Nama Lengkap',
      fullNamePlaceholder: 'Nama lengkap Anda',
      jobTitle: 'Jabatan',
      jobTitlePlaceholder: 'Posisi Anda saat ini',
      email: 'Email Profesional',
      emailPlaceholder: 'nama@perusahaan.com',
      phone: 'Nomor Telepon',
      phonePlaceholder: '+62 812-3456-7890',
      dropdownPlaceholder: 'Pilih salah satu...',
      back: 'Kembali',
      next: 'Lanjut Assessment'
    },
    questions: {
      title: 'Penilaian Kesiapan AI',
      subtitle: 'Evaluasi kesiapan organisasi Anda dalam mengadopsi teknologi AI',
      progress: 'Progress',
      pillarIndicators: ['Pilar 1 dari 5', 'Pilar 2 dari 5', 'Pilar 3 dari 5', 'Pilar 4 dari 5', 'Pilar 5 dari 5'],
      scaleTitle: 'Skala Penilaian:',
      scale: [
        { score: 0, label: 'Tidak ada sama sekali' },
        { score: 1, label: 'Ada secara ad-hoc / sporadis' },
        { score: 2, label: 'Sudah mulai, belum konsisten' },
        { score: 3, label: 'Cukup siap, masih terbatas' },
        { score: 4, label: 'Siap & terstruktur' },
        { score: 5, label: 'Mature & scalable' },
      ],
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
      finish: 'Selesai'
    },

    assessmentData: [
      {
        id: 'strategi',
        title: 'Strategi & Kepemimpinan',
        shortTitle: 'Strategi',
        description: 'Kepemimpinan dan arahan strategis organisasi dalam adopsi AI',
        questions: [
          { id: 'S1', text: 'Apakah AI masuk dalam agenda strategis organisasi?' },
          { id: 'S2', text: 'Apakah pimpinan memahami manfaat & risiko AI?' },
          { id: 'S3', text: 'Apakah ada sponsor/owner AI di level manajemen?' },
          { id: 'S4', text: 'Apakah tujuan penggunaan AI jelas & terukur?' },
          { id: 'S5', text: 'Apakah AI selaras dengan visi & misi organisasi?' },
        ]
      },
      {
        id: 'proses',
        title: 'Proses & Alur Kerja',
        shortTitle: 'Proses',
        description: 'Kesiapan proses bisnis dan alur kerja untuk diintegrasikan dengan AI',
        questions: [
          { id: 'P1', text: 'Apakah proses kerja utama terdokumentasi dengan baik?' },
          { id: 'P2', text: 'Apakah bottleneck/pain point proses sudah diidentifikasi?' },
          { id: 'P3', text: 'Apakah proses siap diubah/dioptimalkan dengan AI?' },
          { id: 'P4', text: 'Apakah SOP mendukung penggunaan teknologi digital/AI?' },
          { id: 'P5', text: 'Apakah ada workflow yang berpotensi otomatisasi?' },
        ]
      },
      {
        id: 'sdm',
        title: 'SDM & Kapabilitas',
        shortTitle: 'SDM',
        description: 'Kesiapan sumber daya manusia dan budaya kerja dalam mengadopsi AI',
        questions: [
          { id: 'H1', text: 'Apakah SDM memiliki literasi AI dasar?' },
          { id: 'H2', text: 'Apakah ada AI champion/internal driver?' },
          { id: 'H3', text: 'Apakah tim terbuka terhadap perubahan berbasis teknologi?' },
          { id: 'H4', text: 'Apakah SDM mampu menggunakan AI tools secara praktis?' },
          { id: 'H5', text: 'Apakah ada rencana pengembangan kompetensi AI?' },
        ]
      },
      {
        id: 'data',
        title: 'Data & Teknologi',
        shortTitle: 'Data',
        description: 'Ketersediaan dan kualitas data serta kesiapan infrastruktur teknologi',
        questions: [
          { id: 'D1', text: 'Apakah data tersedia & mudah diakses?' },
          { id: 'D2', text: 'Apakah kualitas data memadai untuk AI?' },
          { id: 'D3', text: 'Apakah organisasi sudah menggunakan tools digital/AI?' },
          { id: 'D4', text: 'Apakah sistem saling terintegrasi?' },
          { id: 'D5', text: 'Apakah keamanan data & sistem terjaga?' },
        ]
      },
      {
        id: 'tata-kelola',
        title: 'Tata Kelola & AI Bertanggung Jawab',
        shortTitle: 'Tata Kelola',
        description: 'Kebijakan, etika, dan kontrol terhadap implementasi AI',
        questions: [
          { id: 'G1', text: 'Apakah ada kebijakan data & privasi?' },
          { id: 'G2', text: 'Apakah organisasi memahami risiko AI?' },
          { id: 'G3', text: 'Apakah etika AI dipertimbangkan dalam penggunaan?' },
          { id: 'G4', text: 'Apakah ada kontrol & audit penggunaan AI?' },
          { id: 'G5', text: 'Apakah organisasi siap mengikuti regulasi AI?' },
        ]
      }
    ],
    result: {
      title: 'Assessment Selesai',
      desc: 'Terima kasih telah menyelesaikan penilaian kesiapan AI.',
      backHome: 'Kembali ke Beranda'
    },
    admin: {
      loginTitle: 'Admin Dashboard',
      loginSubtitle: 'AI Readiness Assessment',
      loginHeader: 'Login sebagai Admin',
      password: 'Password Admin',
      passwordPlaceholder: 'Masukkan password',
      wrongPassword: 'Password salah',
      loginBtn: 'Masuk',
      backHome: 'Kembali ke Beranda',
      dashboardTitle: 'Admin Dashboard',
      dashboardSubtitle: 'AI Readiness Assessment Management',
      logout: 'Logout',
      totalSubmissions: 'Total Submissions',
      last7Days: 'last 7 days',
      avgScore: 'Avg. Overall Score',
      outOf5: 'Out of 5.0',
      industries: 'Industries',
      differentSectors: 'Different sectors',
      aiMature: 'AI-Mature Orgs',
      topPerformers: 'Top performers',
      searchPlaceholder: 'Search by company, PIC name, email, or industry...',
      filters: 'Filters',
      exportCsv: 'Export CSV',
      exportExcel: 'Export Excel',
      readinessLevel: 'Readiness Level',
      allLevels: 'All Levels',
      level1: 'AI-Unready',
      level2: 'AI-Aware',
      level3: 'AI-Ready',
      level4: 'AI-Enabled',
      level5: 'AI-Mature',
      allIndustries: 'All Industries',
      industryLabel: 'Industry',
      showing: 'Showing',
      of: 'of',
      submissions: 'submissions',
      noSubmissions: 'No submissions yet',
      noSubmissionsDesc: 'Submissions will appear here once users complete the assessment'
    }
  },
  EN: {
    header: {
      adminLogin: 'Admin Login',
    },
    landing: {
      title: 'AI Readiness Assessment',
      subtitle: 'Measure your organization\'s readiness level in adopting Artificial Intelligence technology',
      duration: 'Duration: 15-20 minutes',
      startAssessment: 'Start Assessment',
      description: 'A comprehensive assessment evaluating 5 key pillars of your organization\'s AI readiness: Strategy & Leadership, Process & Workflow, People & Capabilities, Data & Technology, and Governance & Responsible AI.',
      whatYouGet: 'What You\'ll Get:',
      benefits: [
        'Measurable AI Readiness Score (NORTIS Index)',
        'In-depth analysis for each pillar',
        'Actionable strategic recommendations',
        '90-day roadmap for AI transformation',
        'Fully exportable comprehensive report'
      ],
      pillarsTitle: '5 Assessment Pillars:',
      pillars: {
        strategy: 'Strategy & Leadership',
        process: 'Process & Workflow',
        people: 'People & Capabilities',
        data: 'Data & Technology',
        governance: 'Governance & Responsible AI'
      },
      readyToMeasure: 'Ready to Measure Your AI Readiness?',
      readyDesc: 'Start now and get actionable insights for your organization\'s AI transformation'
    },
    form: {
      title: 'Nortis Assessment',
      subtitle: 'Please complete your company and personal information to help us comprehensively understand your company\'s AI needs.',
      companyData: 'Company Data',
      companyName: 'Company Name',
      companyNamePlaceholder: 'Example: Tech Innovation Inc.',
      industry: 'Industry',
      industryPlaceholder: 'Select industry',
      industries: {
        finance: 'Banking & Finance',
        it: 'Technology & IT',
        manufacturing: 'Manufacturing',
        retail: 'Retail & E-commerce',
        healthcare: 'Healthcare',
        education: 'Education',
        telecom: 'Telecommunications',
        energy: 'Energy',
        logistics: 'Transportation & Logistics',
        other: 'Other'
      },
      companySize: 'Company Size',
      companySizePlaceholder: 'Select company size',
      companySizes: {
        s50: '1-50 employees',
        s200: '51-200 employees',
        s500: '201-500 employees',
        s1000: '501-1000 employees',
        splus: '1000+ employees'
      },
      location: 'Location',
      locationPlaceholder: 'City, Country',
      aiNeeds: 'Individual AI Existing Conditions',
      aiGoal: 'Main Goal of AI Adoption',
      aiGoalPlaceholder: 'Example: Improve operational efficiency, customer experience, etc.',
      aiUseCase: 'AI Use Cases Considered',
      aiUseCasePlaceholder: 'Example: Customer service chatbot, predictive analytics, automation, etc.',
      aiTools: 'What AI tools are needed?',
      aiToolsPlaceholder: 'Example: ChatGPT, Google Gemini, Midjourney, automation tools, etc.',
      aiCurrentUse: 'What have you used AI for?',
      aiCurrentUsePlaceholder: 'Example: Content creation, customer service, data analysis, etc.',
      aiFrequentUse: 'What AI is most frequently used?',
      aiFrequentUsePlaceholder: 'Example: ChatGPT for brainstorming, Gemini for research, Midjourney for design, etc.',
      aiLearningNeed: 'What do you need to learn AI for?',
      aiLearningNeedPlaceholder: 'Example: Improve team productivity, business process automation, data analysis, etc.',
      aiMasteryTarget: 'In what area do you target to master AI?',
      aiMasteryTargetPlaceholder: 'Example: Marketing & Sales, Operations & Automation, Product Development, Data Analytics, etc.',
      timeline: 'Expected Implementation Timeline',
      timelinePlaceholder: 'Select timeline',
      timelines: {
        m3: '0-3 Months',
        m6: '3-6 Months',
        m12: '6-12 Months',
        mplus: '12+ Months',
        none: 'No timeline yet'
      },
      personalContact: 'Personal Data',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Your full name',
      jobTitle: 'Job Title',
      jobTitlePlaceholder: 'Your current position',
      email: 'Professional Email',
      emailPlaceholder: 'name@company.com',
      phone: 'Phone Number',
      phonePlaceholder: '+62 812-3456-7890',
      dropdownPlaceholder: 'Select an option...',
      back: 'Back',
      next: 'Continue Assessment'
    },
    questions: {
      title: 'AI Readiness Assessment',
      subtitle: 'Evaluate your organization\'s readiness in adopting AI technology',
      progress: 'Progress',
      pillarIndicators: ['Pillar 1 of 5', 'Pillar 2 of 5', 'Pillar 3 of 5', 'Pillar 4 of 5', 'Pillar 5 of 5'],
      scaleTitle: 'Scoring Scale:',
      scale: [
        { score: 0, label: 'None at all' },
        { score: 1, label: 'Ad-hoc / sporadic' },
        { score: 2, label: 'Started, but inconsistent' },
        { score: 3, label: 'Fairly ready, still limited' },
        { score: 4, label: 'Ready & structured' },
        { score: 5, label: 'Mature & scalable' },
      ],
      prev: 'Previous',
      next: 'Next',
      finish: 'Finish'
    },

    assessmentData: [
      {
        id: 'strategi',
        title: 'Strategy & Leadership',
        shortTitle: 'Strategy',
        description: 'Organizational leadership and strategic direction in AI adoption',
        questions: [
          { id: 'S1', text: 'Is AI included in the organization\'s strategic agenda?' },
          { id: 'S2', text: 'Do leaders understand the benefits & risks of AI?' },
          { id: 'S3', text: 'Is there an AI sponsor/owner at the management level?' },
          { id: 'S4', text: 'Are the goals for AI usage clear & measurable?' },
          { id: 'S5', text: 'Is AI aligned with the organization\'s vision & mission?' },
        ]
      },
      {
        id: 'proses',
        title: 'Process & Workflow',
        shortTitle: 'Process',
        description: 'Readiness of business processes and workflows to be integrated with AI',
        questions: [
          { id: 'P1', text: 'Are core work processes well documented?' },
          { id: 'P2', text: 'Have process bottlenecks/pain points been identified?' },
          { id: 'P3', text: 'Are processes ready to be altered/optimized with AI?' },
          { id: 'P4', text: 'Do SOPs support the use of digital technology/AI?' },
          { id: 'P5', text: 'Are there workflows that have potential for automation?' },
        ]
      },
      {
        id: 'sdm',
        title: 'People & Capabilities',
        shortTitle: 'People',
        description: 'Readiness of human resources and work culture in adopting AI',
        questions: [
          { id: 'H1', text: 'Do employees have basic AI literacy?' },
          { id: 'H2', text: 'Is there an AI champion/internal driver?' },
          { id: 'H3', text: 'Is the team open to technology-driven changes?' },
          { id: 'H4', text: 'Are employees capable of using AI tools practically?' },
          { id: 'H5', text: 'Is there a plan for AI competency development?' },
        ]
      },
      {
        id: 'data',
        title: 'Data & Technology',
        shortTitle: 'Data',
        description: 'Availability and quality of data as well as technological infrastructure readiness',
        questions: [
          { id: 'D1', text: 'Is data available and easily accessible?' },
          { id: 'D2', text: 'Is data quality adequate for AI?' },
          { id: 'D3', text: 'Has the organization used digital/AI tools?' },
          { id: 'D4', text: 'Are the systems integrated with each other?' },
          { id: 'D5', text: 'Is data & system security maintained?' },
        ]
      },
      {
        id: 'tata-kelola',
        title: 'Governance & Responsible AI',
        shortTitle: 'Governance',
        description: 'Policies, ethics, and control over AI implementation',
        questions: [
          { id: 'G1', text: 'Is there a data & privacy policy?' },
          { id: 'G2', text: 'Does the organization understand AI risks?' },
          { id: 'G3', text: 'Is AI ethics considered in its usage?' },
          { id: 'G4', text: 'Are there controls & audits for AI usage?' },
          { id: 'G5', text: 'Is the organization ready to comply with AI regulations?' },
        ]
      }
    ],
    result: {
      title: 'Assessment Completed',
      desc: 'Thank you for completing the AI readiness assessment.',
      backHome: 'Back to Home'
    },
    admin: {
      loginTitle: 'Admin Dashboard',
      loginSubtitle: 'AI Readiness Assessment',
      loginHeader: 'Login as Admin',
      password: 'Admin Password',
      passwordPlaceholder: 'Enter password',
      wrongPassword: 'Wrong password',
      loginBtn: 'Login',
      backHome: 'Back to Home',
      dashboardTitle: 'Admin Dashboard',
      dashboardSubtitle: 'AI Readiness Assessment Management',
      logout: 'Logout',
      totalSubmissions: 'Total Submissions',
      last7Days: 'last 7 days',
      avgScore: 'Avg. Overall Score',
      outOf5: 'Out of 5.0',
      industries: 'Industries',
      differentSectors: 'Different sectors',
      aiMature: 'AI-Mature Orgs',
      topPerformers: 'Top performers',
      searchPlaceholder: 'Search by company, PIC name, email, or industry...',
      filters: 'Filters',
      exportCsv: 'Export CSV',
      exportExcel: 'Export Excel',
      readinessLevel: 'Readiness Level',
      allLevels: 'All Levels',
      level1: 'AI-Unready',
      level2: 'AI-Aware',
      level3: 'AI-Ready',
      level4: 'AI-Enabled',
      level5: 'AI-Mature',
      allIndustries: 'All Industries',
      industryLabel: 'Industry',
      showing: 'Showing',
      of: 'of',
      submissions: 'submissions',
      noSubmissions: 'No submissions yet',
      noSubmissionsDesc: 'Submissions will appear here once users complete the assessment'
    }
  }
};
