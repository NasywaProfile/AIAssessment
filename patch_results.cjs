const fs = require('fs');
let content = fs.readFileSync('src/components/AssessmentResult.tsx', 'utf8');

if (!content.includes('window.scrollTo')) {
  content = content.replace(
    "useEffect(() => {",
    "useEffect(() => {\n    window.scrollTo({ top: 0, behavior: 'smooth' });"
  );
  fs.writeFileSync('src/components/AssessmentResult.tsx', content);
}
