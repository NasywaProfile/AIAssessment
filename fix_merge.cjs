const fs = require('fs');
let code = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const target = `      const merged = JSON.parse(JSON.stringify(defaultTranslations));
      ['ID', 'EN'].forEach(lang => {
        if (parsed[lang]) {
          merged[lang] = { ...merged[lang], ...parsed[lang] };
          if (!parsed[lang].assessmentData) {
            merged[lang].assessmentData = JSON.parse(JSON.stringify(defaultTranslations[lang].assessmentData));
          }
          if (!parsed[lang].questions.pillarIndicators) {
            merged[lang].questions.pillarIndicators = JSON.parse(JSON.stringify(defaultTranslations[lang].questions.pillarIndicators));
          }
        }
      });`;

const replacement = `      const merged = JSON.parse(JSON.stringify(defaultTranslations));
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
      });`;

code = code.replace(target, replacement);

fs.writeFileSync('src/contexts/LanguageContext.tsx', code);
