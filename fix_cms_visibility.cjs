const fs = require('fs');
let code = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf-8');

const target = `      if (sectionId === 'form') {
        delete filteredIdData['industries'];
        delete filteredIdData['companySizes'];
        delete filteredIdData['timelines'];
        delete filteredIdData['dropdownPlaceholder'];
      }`;

const replacement = `      if (sectionId === 'form') {
        delete filteredIdData['industries']; // Rendered in admin
        delete filteredIdData['dropdownPlaceholder'];
      }`;

code = code.replace(target, replacement);

const targetTitle = `        {Object.keys(idData).map(key => {
          let titleOverride = undefined;
          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          return renderFieldGroup(sectionId, [key], idData[key], enData?.[key], titleOverride);
        })}`;

const replacementTitle = `        {Object.keys(idData).map(key => {
          let titleOverride = undefined;
          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          if (sectionId === 'form' && key === 'companySizes') {
            titleOverride = 'Pilihan Ukuran Perusahaan';
          }
          if (sectionId === 'form' && key === 'timelines') {
            titleOverride = 'Pilihan Estimasi Waktu';
          }
          return renderFieldGroup(sectionId, [key], idData[key], enData?.[key], titleOverride);
        })}`;

code = code.replace(targetTitle, replacementTitle);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', code);
