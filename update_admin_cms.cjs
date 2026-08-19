const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

// 1. Remove submissions, of, showing from admin section
const targetFilter = `      if (sectionId === 'admin') {
        delete filteredIdData['loginTitle'];
        delete filteredIdData['loginSubtitle'];
        delete filteredIdData['loginHeader'];
        delete filteredIdData['password'];
        delete filteredIdData['passwordPlaceholder'];
        delete filteredIdData['wrongPassword'];
        delete filteredIdData['loginBtn'];
        delete filteredIdData['backHome'];
      }`;

const replacementFilter = `      if (sectionId === 'admin') {
        delete filteredIdData['loginTitle'];
        delete filteredIdData['loginSubtitle'];
        delete filteredIdData['loginHeader'];
        delete filteredIdData['password'];
        delete filteredIdData['passwordPlaceholder'];
        delete filteredIdData['wrongPassword'];
        delete filteredIdData['loginBtn'];
        delete filteredIdData['backHome'];
        delete filteredIdData['submissions'];
        delete filteredIdData['of'];
        delete filteredIdData['showing'];
      }`;

content = content.replace(targetFilter, replacementFilter);

// 2. Add form.industries field group to the admin tab
const targetAdminFlow = `            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}`;

const replacementAdminFlow = `            {activeTab === 'admin_flow' && (
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

content = content.replace(targetAdminFlow, replacementAdminFlow);

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
