const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// Update filter logic
content = content.replace(
  "const matchesLevel = !filterLevel || sub.readinessLevel.startsWith(`Level ${filterLevel}`);",
  "const matchesLevel = !filterLevel || sub.readinessLevel === filterLevel;"
);

// Update select options
const oldSelect = `<option value="1">{t("admin.level1")}</option>
                  <option value="2">{t("admin.level2")}</option>
                  <option value="3">{t("admin.level3")}</option>
                  <option value="4">{t("admin.level4")}</option>
                  <option value="5">{t("admin.level5")}</option>`;
const newSelect = `<option value="AI-Unready">{t("admin.level1")}</option>
                  <option value="AI-Aware">{t("admin.level2")}</option>
                  <option value="AI-Ready">{t("admin.level3")}</option>
                  <option value="AI-Enabled">{t("admin.level4")}</option>
                  <option value="AI-Mature">{t("admin.level5")}</option>`;

content = content.replace(oldSelect, newSelect);

fs.writeFileSync('src/components/AdminDashboard.tsx', content);
