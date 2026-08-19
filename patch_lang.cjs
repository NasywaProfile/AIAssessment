const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

const target = `  const [translationsState, setTranslationsState] = useState(() => {
    const saved = localStorage.getItem('nortis_translations');
    return saved ? JSON.parse(saved) : defaultTranslations;
  });`;

const replacement = `  const [translationsState, setTranslationsState] = useState(() => {
    const saved = localStorage.getItem('nortis_translations');
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = JSON.parse(JSON.stringify(defaultTranslations));
      ['ID', 'EN'].forEach(lang => {
        if (parsed[lang]) {
          merged[lang] = { ...merged[lang], ...parsed[lang] };
          if (!parsed[lang].assessmentData) {
            merged[lang].assessmentData = JSON.parse(JSON.stringify(defaultTranslations[lang].assessmentData));
          }
        }
      });
      return merged;
    }
    return defaultTranslations;
  });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
