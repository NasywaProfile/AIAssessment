const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// Fix import
content = content.replace(
  "import { useLanguage } from '../../contexts/LanguageContext';",
  "import { useLanguage, defaultTranslations } from '../../contexts/LanguageContext';"
);

// Fix useLanguage destructuring
content = content.replace(
  "const { translations, updateTranslations, images, updateImage, defaultTranslations } = useLanguage();",
  "const { translations, updateTranslations, images, updateImage } = useLanguage();"
);

// Render fallback
content = content.replace(
  "{activeTab !== 'images' && draftTranslations['ID'] && draftTranslations['ID'][activeTab] && (",
  "{activeTab !== 'images' && draftTranslations && draftTranslations['ID'] && (draftTranslations['ID'][activeTab] ? ("
);
content = content.replace(
  "              </div>\n            )}",
  "              </div>\n            ) : (\n              <div className=\"p-8 text-center text-slate-500\">\n                <p>No translation fields found for this section.</p>\n                <pre className=\"mt-4 text-xs text-left bg-slate-100 p-4 rounded-lg overflow-auto\">{JSON.stringify(Object.keys(draftTranslations['ID'] || {}), null, 2)}</pre>\n              </div>\n            ))}"
);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
