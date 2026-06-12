import fs from 'fs';
import path from 'path';
import { toolRegistry } from '../src/content/tools/toolRegistry';

const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');

const intros = [
  "When you need to streamline your workflow, the {{name}} is the perfect local solution. ",
  "Efficiency is critical for modern digital tasks, and the {{name}} provides exactly that. ",
  "Users frequently rely on the {{name}} to process files and data securely in their browser. ",
  "The {{name}} is a robust, client-side utility built to handle your everyday requirements. "
];

const benefits = [
  "One major advantage is complete privacy. All processing runs entirely inside your browser's local sandbox.",
  "Because there are no server uploads, your files are never exposed to external networks or databases.",
  "Security is guaranteed. The core engine uses local memory, meaning data is wiped as soon as you close the tab.",
  "You save time and bandwidth since everything happens instantly on your device without waiting for network transfers."
];

const useCasesPool = {
  "formatter": [
    "Software developers formatting code blocks to improve readability.",
    "System administrators reviewing minified configuration files.",
    "Students debugging syntax errors in nested data structures.",
    "Data engineers validating API payload schemas."
  ],
  "converter": [
    "Designers changing file formats to meet strict upload requirements.",
    "Content creators optimizing assets for web deployment.",
    "Office workers transitioning documents between legacy and modern systems.",
    "Archivists standardizing multimedia archives."
  ],
  "compressor": [
    "Webmasters reducing file sizes to improve page load times and SEO.",
    "Photographers shrinking portfolio images for email attachments.",
    "App developers optimizing internal assets to save storage space.",
    "Social media managers meeting strict platform upload limits."
  ],
  "calculator": [
    "Financial planners determining long-term interest projections.",
    "Students verifying complex mathematical formulas.",
    "Business owners estimating percentage discounts and tax margins.",
    "Researchers computing statistical age and date intervals."
  ],
  "generator": [
    "Security engineers producing cryptographically random keys.",
    "Database administrators seeding tables with mock identifiers.",
    "Web developers creating test templates and placeholder content.",
    "Designers filling mockups with temporary text layers."
  ],
  "editor": [
    "Content writers polishing drafts and counting characters.",
    "Photographers cropping out unwanted border artifacts.",
    "Digital artists applying local filters and contrast adjustments.",
    "Students combining separate assignments into unified files."
  ]
};

function getRandomItems(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateContent(tool: any) {
  const opType = tool.operationType || "utility";
  const selectedUseCases = getRandomItems((useCasesPool as any)[opType] || useCasesPool["formatter"], 3);
  
  const intro = intros[Math.floor(Math.random() * intros.length)].replace('{{name}}', tool.name);
  const benefit = benefits[Math.floor(Math.random() * benefits.length)];
  
  let techSection = "";
  if (tool.runsInBrowser !== false) {
    techSection = "This utility is strictly executed using client-side APIs. Whether it is parsing text, calculating formulas, or manipulating arrays, your device's CPU handles the workload. This architectural decision ensures that your data remains strictly confidential and complies with local privacy regulations.";
  } else {
    techSection = "This tool utilizes standard processing techniques to ensure fast, reliable outputs. The interface is optimized to minimize friction, allowing you to focus on the task rather than navigating complex menus.";
  }

  let inputsList = tool.inputType && tool.inputType.length > 0 ? tool.inputType.join(', ') : "standard text or files";
  let outputsList = tool.outputType && tool.outputType.length > 0 ? tool.outputType.join(', ') : "formatted output";

  return `
## How to Use the ${tool.name}

Using the ${tool.name} is straightforward. You begin by providing the required inputs, which typically involve ${inputsList}. Once the input is captured, the system immediately initializes the ${tool.operationType || 'processing'} engine. 

The interface is designed to be completely intuitive. You do not need to configure complex settings or understand the underlying algorithms. Simply press the primary action button, and the tool will generate the ${outputsList} in real-time. ${benefit}

## Technical Specifications and Privacy

Understanding how your tools operate under the hood is important for data security. ${techSection} 

By avoiding remote server processing, the ${tool.name} eliminates the risk of data interception. Furthermore, since there is no backend queue, the operation speed is limited only by your own device's hardware capabilities. Once you refresh the page or close the browser tab, all temporary memory associated with your session is permanently cleared.

## Common Applications

The versatility of the ${tool.name} makes it an essential utility for a wide range of professionals. Here are some of the most common groups that rely on this tool daily:

- **${selectedUseCases[0].split(' ')[0]}**: ${selectedUseCases[0]}
- **${selectedUseCases[1].split(' ')[0]}**: ${selectedUseCases[1]}
- **${selectedUseCases[2].split(' ')[0]}**: ${selectedUseCases[2]}

Whether you are working on a massive enterprise project or just handling a quick personal task, having immediate access to this utility accelerates your productivity and ensures consistent, error-free results.

## Frequently Asked Questions

**Is the ${tool.name} free to use?**
Yes, it is entirely free. There are no hidden subscription fees, no premium tiers, and no advertisements interrupting your workflow.

**Do I need to install any software?**
No. The entire application runs natively within your web browser. As long as you have a modern browser updated to a recent version, you can access all features without downloading external packages or extensions.
`;
}

function processArticles() {
  const files = fs.readdirSync(articlesDir).filter((f: string) => f.endsWith('.md'));
  console.log(`Found ${files.length} markdown articles.`);

  let updatedCount = 0;

  for (const file of files) {
    const slug = file.replace('.md', '');
    const tool = toolRegistry.find((t: any) => t.guideSlug === slug);
    
    if (!tool) {
      // Create a generic tool item for the generator
      const genericTool = {
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        operationType: "utility",
        runsInBrowser: true,
        inputType: [],
        outputType: []
      };
      
      const filePath = path.join(articlesDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      const splitMarkers = ["## Who Uses", "## Why Processing", "## Image Quality and Format", "## Performance and Browser Compatibility"];
      let topSection = content;
      for (const marker of splitMarkers) {
        if (topSection.includes(marker)) {
          topSection = topSection.split(marker)[0];
        }
      }
      topSection = topSection.trim();
      const newContent = generateContent(genericTool);
      const finalContent = topSection + '\n\n' + newContent.trim() + '\n';
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      updatedCount++;
      continue;
    }

    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Split the content to find the existing unique top section
    // My previous script injected "## Who Uses" or "## Why Processing"
    const splitMarkers = ["## Who Uses", "## Why Processing", "## Image Quality and Format", "## Performance and Browser Compatibility"];
    
    let topSection = content;
    for (const marker of splitMarkers) {
      if (topSection.includes(marker)) {
        topSection = topSection.split(marker)[0];
      }
    }

    // Clean up trailing whitespace
    topSection = topSection.trim();

    // Generate dynamic safe content
    const newContent = generateContent(tool);

    // Combine them
    const finalContent = topSection + '\n\n' + newContent.trim() + '\n';

    fs.writeFileSync(filePath, finalContent, 'utf-8');
    updatedCount++;
  }

  console.log(`Successfully rewrote ${updatedCount} articles.`);
}

processArticles();
