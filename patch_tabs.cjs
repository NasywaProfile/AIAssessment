const fs = require('fs');
let content = fs.readFileSync('src/components/cms/CMSDashboard.tsx', 'utf8');

const oldTabs = `  const tabs = [
    { id: 'landing', label: 'Landing Page', icon: LayoutTemplate, desc: 'Homepage content & hero section' },
    { id: 'form', label: 'Assessment Form', icon: FileText, desc: 'Form fields and placeholders' },
    { id: 'assessmentData', label: 'Assessment Questions', icon: ListTodo, desc: 'Manage pillars and questions' },
    { id: 'questions', label: 'Survey Text & Scale', icon: HelpCircle, desc: 'Survey instructions and rating scale' },
    { id: 'result', label: 'Results Page', icon: CheckCircle, desc: 'Completion page text' },
    { id: 'images', label: 'Images & Logo', icon: ImageIcon, desc: 'Website logo and assets' }
  ];`;

const newTabs = `  const tabs = [
    { id: 'images', label: 'Images & Logo', icon: ImageIcon, desc: 'Website logo and assets' },
    { id: 'landing', label: 'Landing Page', icon: LayoutTemplate, desc: 'Homepage content & hero section' },
    { id: 'form', label: 'Assessment Form', icon: FileText, desc: 'Form fields and placeholders' },
    { id: 'assessmentData', label: 'Assessment Questions', icon: ListTodo, desc: 'Manage pillars and questions' },
    { id: 'questions', label: 'Survey Text & Scale', icon: HelpCircle, desc: 'Survey instructions and rating scale' },
    { id: 'result', label: 'Results Page', icon: CheckCircle, desc: 'Completion page text' }
  ];`;

content = content.replace(oldTabs, newTabs);
content = content.replace("const [activeTab, setActiveTab] = useState<string>('landing');", "const [activeTab, setActiveTab] = useState<string>('images');");

fs.writeFileSync('src/components/cms/CMSDashboard.tsx', content);
