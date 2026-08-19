const fs = require('fs');
let langContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

const idAssessmentData = `
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
`;

const enAssessmentData = `
    assessmentData: [
      {
        id: 'strategi',
        title: 'Strategy & Leadership',
        shortTitle: 'Strategy',
        description: 'Organizational leadership and strategic direction in AI adoption',
        questions: [
          { id: 'S1', text: 'Is AI included in the organization\\'s strategic agenda?' },
          { id: 'S2', text: 'Do leaders understand the benefits & risks of AI?' },
          { id: 'S3', text: 'Is there an AI sponsor/owner at the management level?' },
          { id: 'S4', text: 'Are the goals for AI usage clear & measurable?' },
          { id: 'S5', text: 'Is AI aligned with the organization\\'s vision & mission?' },
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
`;

langContent = langContent.replace('    result: {', idAssessmentData + '    result: {');

// Find the second 'result: {' for EN
let parts = langContent.split('    result: {');
if(parts.length === 3) {
   langContent = parts[0] + '    result: {' + parts[1] + enAssessmentData + '    result: {' + parts[2];
}

fs.writeFileSync('src/contexts/LanguageContext.tsx', langContent);
