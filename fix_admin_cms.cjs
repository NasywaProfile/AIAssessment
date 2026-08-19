const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

const filterTarget = `      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }

      idData = filteredIdData;`;

const filterReplacement = `      if (sectionId === 'questions') {
        delete filteredIdData['pillarIndicator']; // hide legacy field
      }
      if (sectionId === 'admin') {
        delete filteredIdData['loginTitle'];
        delete filteredIdData['loginSubtitle'];
        delete filteredIdData['loginHeader'];
        delete filteredIdData['password'];
        delete filteredIdData['passwordPlaceholder'];
        delete filteredIdData['wrongPassword'];
        delete filteredIdData['loginBtn'];
        delete filteredIdData['backHome'];
      }

      idData = filteredIdData;`;

content = content.replace(filterTarget, filterReplacement);

const renderTarget = `            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Admin Login Button</h2>
                  {renderSection('header')}
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}`;

const renderReplacement = `            {activeTab === 'admin_flow' && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Halaman Admin Dashboard</h2>
                  {renderSection('admin')}
                </div>
              </>
            )}`;

content = content.replace(renderTarget, renderReplacement);
fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
