const fs = require('fs');
let compContent = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');

compContent = compContent.replace("import { getAssessmentData } from '../data/assessmentData';", "");
compContent = compContent.replace("const { t, language } = useLanguage();", "const { t, language, translations } = useLanguage();");
compContent = compContent.replace("const assessmentData = getAssessmentData(language);", "const assessmentData = translations[language].assessmentData;");

fs.writeFileSync('src/components/AssessmentQuestions.tsx', compContent);
