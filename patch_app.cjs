const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
content = content.replace("import { AdminDashboard } from './components/AdminDashboard';", "import { AdminDashboard } from './components/AdminDashboard';\nimport { CMSDashboard } from './components/cms/CMSDashboard';");

// Update AppState
content = content.replace("type AppState = 'landing' | 'form' | 'questions' | 'result' | 'admin-login' | 'admin-dashboard';", "type AppState = 'landing' | 'form' | 'questions' | 'result' | 'admin-login' | 'admin-dashboard' | 'cms';");

// Add routing condition for CMS
const adminDashboardRegex = /if \(appState === 'admin-dashboard'\) \{[\s\S]*?\}/;
const replacement = `if (appState === 'admin-dashboard') {
    return (
      <LanguageProvider>
        <AdminDashboard onLogout={() => setAppState('landing')} onOpenCMS={() => setAppState('cms')} />
      </LanguageProvider>
    );
  }

  if (appState === 'cms') {
    return (
      <LanguageProvider>
        <CMSDashboard onBack={() => setAppState('admin-dashboard')} />
      </LanguageProvider>
    );
  }`;
content = content.replace(adminDashboardRegex, replacement);

fs.writeFileSync('src/App.tsx', content);
