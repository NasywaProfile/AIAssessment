const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const replacement = `  const getTimelineLabel = (value: string) => {
    const map: Record<string, string> = {
      '0-3m': 'm3',
      '3-6m': 'm6',
      '6-12m': 'm12',
      '12m+': 'mplus',
      'none': 'none'
    };
    const key = map[value];
    if (key) {
      const translated = t(\`form.timelines.\${key}\`);
      return translated !== \`form.timelines.\${key}\` ? translated : value;
    }
    return value;
  };

  const getExportData = () => {`;

content = content.replace("  const getExportData = () => {", replacement);

content = content.replace(
  "Timeline: s.timeline,",
  "Timeline: getTimelineLabel(s.timeline),"
);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
