const fs = require('fs');

let content = fs.readFileSync('src/components/AssessmentForm.tsx', 'utf8');

// Add FormData to props
content = content.replace(
  "interface AssessmentFormProps {",
  "import { FormData } from '../types';\n\ninterface AssessmentFormProps {\n  initialData?: FormData;"
);

content = content.replace(
  "onSubmit: () => void;",
  "onSubmit: (data: FormData) => void;"
);

// Add useState
content = content.replace(
  "export function AssessmentForm({ onBack, onSubmit }: AssessmentFormProps) {",
  `export function AssessmentForm({ onBack, onSubmit, initialData }: AssessmentFormProps) {
  const [formData, setFormData] = React.useState<FormData>(initialData || {
    companyName: '',
    industry: '',
    companySize: '',
    location: '',
    aiGoal: '',
    aiUseCase: '',
    aiTools: '',
    aiCurrentUse: '',
    aiFrequentUse: '',
    aiLearningNeed: '',
    aiMasteryTarget: '',
    timeline: '',
    fullName: '',
    jobTitle: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };`
);

content = content.replace(
  /const handleSubmit = \(e: React.FormEvent\) => \{\n    e.preventDefault\(\);\n    onSubmit\(\);\n  \};/,
  `const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };`
);

// Add value and onChange to each field
const addPropsToField = (id, fieldName) => {
  const regex = new RegExp(`id="${id}"([\\s\\S]*?)(className=|/>)`);
  content = content.replace(regex, `id="${id}"$1value={formData.${fieldName}} onChange={handleChange}\n                $2`);
};

addPropsToField("namaInstansi", "companyName");
addPropsToField("industri", "industry");
addPropsToField("ukuranInstansi", "companySize");
addPropsToField("lokasi", "location");

addPropsToField("tujuanAdopsi", "aiGoal");
addPropsToField("usecase", "aiUseCase");
addPropsToField("toolsAi", "aiTools");
addPropsToField("penggunaanEksisting", "aiCurrentUse");
addPropsToField("frequentUse", "aiFrequentUse");
addPropsToField("learningNeed", "aiLearningNeed");
addPropsToField("masteryTarget", "aiMasteryTarget");
addPropsToField("timeline", "timeline");

addPropsToField("namaLengkap", "fullName");
addPropsToField("jabatan", "jobTitle");
addPropsToField("email", "email");
addPropsToField("telepon", "phone");

fs.writeFileSync('src/components/AssessmentForm.tsx', content);
console.log('patched assessment form state');
