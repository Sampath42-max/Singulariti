const fs = require('fs');
const path = require('path');

// 1. Load toolRegistry.ts
const toolRegistryPath = path.join(__dirname, '..', 'src', 'content', 'tools', 'toolRegistry.ts');
const toolRegistryContent = fs.readFileSync(toolRegistryPath, 'utf8');
const toolRegistryMatch = toolRegistryContent.match(/export const toolRegistry: UtilityRegistryItem\[\] = (\[[\s\S]*?\]);/);
let toolRegistry = [];
if (toolRegistryMatch) {
  let text = toolRegistryMatch[1]
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  toolRegistry = eval(text);
}

// 2. Load src/registry/index.ts
const mainRegistryPath = path.join(__dirname, '..', 'src', 'registry', 'index.ts');
let mainRegistryContent = fs.readFileSync(mainRegistryPath, 'utf8');
// Remove import statements so we can eval
mainRegistryContent = mainRegistryContent.replace(/import[\s\S]*?;/g, '');
// Find export const registry = { ... }
const mainRegistryMatch = mainRegistryContent.match(/export const registry: EcosystemRegistry = (\{[\s\S]*\});/);
let mainRegistryTools = [];
if (mainRegistryMatch) {
  let text = mainRegistryMatch[1];
  text = text.replace(/icon:\s*<[^>]*\/>/g, 'icon: null');
  const registry = eval(`(${text})`);
  
  for (const category of registry.categories || []) {
    for (const collection of category.collections || []) {
      for (const tool of collection.tools || []) {
        mainRegistryTools.push({
          id: tool.id,
          name: tool.name,
          description: tool.description,
          path: tool.path,
          category: category.id,
          collection: collection.id
        });
      }
    }
  }
}

console.log(`ToolRegistry (toolRegistry.ts) has ${toolRegistry.length} tools.`);
console.log(`MainRegistry (index.ts) has ${mainRegistryTools.length} tools.`);

const toolRegistryIds = new Set(toolRegistry.map(t => t.id));
const mainRegistryIds = new Set(mainRegistryTools.map(t => t.id));

const missingInToolRegistry = mainRegistryTools.filter(t => !toolRegistryIds.has(t.id));
console.log(`\nTools in index.ts but missing in toolRegistry.ts (${missingInToolRegistry.length}):`);
for (const t of missingInToolRegistry) {
  console.log(`- ${t.id} (${t.name}) [Path: ${t.path}]`);
}

// 3. Check for obsolete markdown files in src/content/articles/
const articlesDir = path.join(__dirname, '..', 'src', 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
console.log(`\nTotal markdown files in src/content/articles/: ${files.length}`);

const obsoleteFiles = [];
for (const file of files) {
  const slug = file.replace('.md', '');
  if (!mainRegistryIds.has(slug)) {
    obsoleteFiles.push(file);
  }
}

console.log(`Obsolete markdown files found (${obsoleteFiles.length}):`);
for (const f of obsoleteFiles) {
  console.log(`- ${f}`);
}
