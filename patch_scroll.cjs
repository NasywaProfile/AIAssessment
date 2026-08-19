const fs = require('fs');

// 1. Patch App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
if (!appContent.includes('useEffect(')) {
  appContent = appContent.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';"
  );
  
  appContent = appContent.replace(
    "const [submissionId, setSubmissionId] = useState<string | null>(null);",
    "const [submissionId, setSubmissionId] = useState<string | null>(null);\n\n  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [appState]);"
  );
  fs.writeFileSync('src/App.tsx', appContent);
  console.log("Patched App.tsx");
}

// 2. Patch AssessmentQuestions.tsx
let aqContent = fs.readFileSync('src/components/AssessmentQuestions.tsx', 'utf8');
// Replace the existing empty-deps useEffect with one that depends on currentStep
if (aqContent.includes('useEffect(() => {\n    window.scrollTo({ top: 0, behavior: \'smooth\' });\n  }, []);')) {
  aqContent = aqContent.replace(
    "useEffect(() => {\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }, []);",
    "useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [currentStep]);"
  );
} else if (aqContent.includes('useEffect(() => {') && !aqContent.includes('[currentStep]')) {
  // If it exists but maybe formatted differently
  aqContent = aqContent.replace(
    /useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/,
    "useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [currentStep]);"
  );
}

// Also let's just make sure handleNext uses window.scrollTo(0,0) instead of just smooth scrolling to be snappy
if (aqContent.includes("window.scrollTo({ top: 0, behavior: 'smooth' });")) {
   aqContent = aqContent.replace(/window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\);/g, "window.scrollTo(0, 0);");
}

fs.writeFileSync('src/components/AssessmentQuestions.tsx', aqContent);
console.log("Patched AssessmentQuestions.tsx");

