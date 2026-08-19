const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// 1. Remove the appended form.industries block from admin_flow
const adminFlowTarget = `            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                  <div className="mt-8">
                    {renderFieldGroup('form', ['industries'], draftTranslations['ID']?.form?.industries, draftTranslations['EN']?.form?.industries, 'Pilihan Industri (Sektor)')}
                  </div>
                </div>
              </>
            )}`;

const adminFlowReplacement = `            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}`;
content = content.replace(adminFlowTarget, adminFlowReplacement);

// 2. Override title in renderSection map
const renderSectionTarget = `    return (
      <div className="space-y-4">
        {Object.keys(idData).map(key => renderFieldGroup(sectionId, [key], idData[key], enData?.[key]))}
      </div>
    );`;

const renderSectionReplacement = `    return (
      <div className="space-y-4">
        {Object.keys(idData).map(key => {
          let titleOverride = undefined;
          if (sectionId === 'admin' && key === 'industryLabel') {
            titleOverride = 'Pilihan Industri (Sektor)';
          }
          return renderFieldGroup(sectionId, [key], idData[key], enData?.[key], titleOverride);
        })}
      </div>
    );`;
content = content.replace(renderSectionTarget, renderSectionReplacement);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
