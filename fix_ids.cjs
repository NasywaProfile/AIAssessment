const fs = require('fs');

let content = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');

const idMap = {
  "namaInstansi": "companyName",
  "industri": "industry",
  "ukuranInstansi": "companySize",
  "lokasi": "location",
  "tujuanAdopsi": "aiGoal",
  "usecase": "aiUseCase",
  "toolsAi": "aiTools",
  "penggunaanEksisting": "aiCurrentUse",
  "frequentUse": "aiFrequentUse",
  "learningNeed": "aiLearningNeed",
  "masteryTarget": "aiMasteryTarget",
  "timeline": "timeline",
  "namaLengkap": "fullName",
  "jabatan": "jobTitle",
  "email": "email",
  "telepon": "phone"
};

for (const [oldId, newId] of Object.entries(idMap)) {
  const regex = new RegExp(`id="${oldId}"`, 'g');
  content = content.replace(regex, `id="${newId}"`);
}

fs.writeFileSync('src/components/AssessmentForm.tsx', content);
console.log('fixed ids');
