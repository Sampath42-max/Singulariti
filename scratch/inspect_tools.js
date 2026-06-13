const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'content', 'tools', 'toolRegistry.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Use a simple extraction for the toolRegistry array
const registryMatch = fileContent.match(/export const toolRegistry: UtilityRegistryItem\[\] = (\[[\s\S]*?\]);/);
if (!registryMatch) {
  console.error("Could not find toolRegistry in file.");
  process.exit(1);
}

// Convert typescript array string to parseable JSON/JS object
let registryText = registryMatch[1];
// Clean up TypeScript/JavaScript comments or trailing commas
registryText = registryText
  .replace(/\/\/.*$/gm, '') // remove single-line comments
  .replace(/\/\*[\s\S]*?\*\//g, ''); // remove multi-line comments

// We can evaluate it safely since it's just raw data
const toolRegistry = eval(registryText);

console.log(`Total tools found: ${toolRegistry.length}`);

const categories = {};
for (const tool of toolRegistry) {
  if (!categories[tool.sectionId]) {
    categories[tool.sectionId] = [];
  }
  categories[tool.sectionId].push(tool);
}

console.log("\nTools by Category:");
for (const cat in categories) {
  console.log(`- ${cat}: ${categories[cat].length} tools`);
}

// Write the summarized tools list to a file for review
const summary = toolRegistry.map(t => ({
  id: t.id,
  name: t.name,
  sectionId: t.sectionId,
  subSectionId: t.subSectionId,
  shortDescription: t.shortDescription,
  inputType: t.inputType,
  outputType: t.outputType,
  operationType: t.operationType
}));

fs.writeFileSync(path.join(__dirname, 'tools_summary.json'), JSON.stringify(summary, null, 2));
console.log("\nSaved tools summary to scratch/tools_summary.json");
