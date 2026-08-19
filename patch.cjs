const fs = require('fs');
const content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

let newContent = content.replace(
  /aiNeeds: 'Kebutuhan & Adopsi AI'[\s\S]*?personalContact: 'Kontak Personal',/,
  `aiNeeds: 'Kondisi Eksisting AI di Individu',
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
      timelines: {
        soon: 'Segera (1-3 Bulan)',
        short: 'Jangka Pendek (3-6 Bulan)',
        medium: 'Jangka Menengah (6-12 Bulan)',
        long: 'Jangka Panjang (>1 Tahun)',
        exploring: 'Masih dalam tahap eksplorasi'
      },
      personalContact: 'Data Pribadi',`
);

newContent = newContent.replace(
  /aiNeeds: 'AI Needs & Adoption'[\s\S]*?personalContact: 'Personal Contact',/,
  `aiNeeds: 'Individual AI Existing Conditions',
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
      timelines: {
        soon: 'Immediate (1-3 Months)',
        short: 'Short Term (3-6 Months)',
        medium: 'Medium Term (6-12 Months)',
        long: 'Long Term (>1 Year)',
        exploring: 'Still in exploration phase'
      },
      personalContact: 'Personal Data',`
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', newContent);
