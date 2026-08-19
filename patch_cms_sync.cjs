const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// Inside renderSection:
const target = `  const renderSection = (sectionId: string) => {
    const idData = draftTranslations['ID'][sectionId];
    const enData = draftTranslations['EN'][sectionId];`;

const replacement = `  const renderSection = (sectionId: string) => {
    let idData = draftTranslations['ID'][sectionId];
    let enData = draftTranslations['EN'][sectionId];
    
    // Only render fields that exist in defaultTranslations
    const defaultIdData = defaultTranslations['ID'][sectionId as keyof typeof defaultTranslations['ID']];
    if (idData && defaultIdData) {
      const filteredIdData: any = {};
      Object.keys(defaultIdData).forEach(key => {
        if (idData[key] !== undefined) {
          filteredIdData[key] = idData[key];
        }
      });
      idData = filteredIdData;
    }
`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
