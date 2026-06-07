"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../shared/ToolLayout';
import { Maximize2, Minimize2 } from 'lucide-react';

export function WebCompilerClient() {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>Start editing to see some magic happen!</p>');
  const [css, setCss] = useState('body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  background-color: #f8fafc;\n  color: #0f172a;\n}\n\nh1 {\n  color: #0f766e;\n}');
  const [js, setJs] = useState('console.log("Compiler loaded successfully.");');
  const [srcDoc, setSrcDoc] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced compilation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const combined = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                console.error("JavaScript Error: ", err);
              }
            <\/script>
          </body>
        </html>
      `;
      setSrcDoc(combined);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <ToolLayout
      utilityId="web-compiler"
      title="Web Compiler"
      description="Write HTML, CSS, and JavaScript and see the results instantly. Perfect for prototyping and testing web snippets."
      categoryName="Developer Tools"
      categoryPath="/tools/dev"
      howToUse={[
        "Type your HTML markup in the HTML editor panel.",
        "Add styling in the CSS panel to visually format your HTML.",
        "Write logic or interactivity in the JavaScript panel.",
        "Watch your code execute and render instantly in the Live Preview pane."
      ]}
      faqs={[
        { question: "Is this secure?", answer: "Yes. Your code is executed locally in a sandboxed iframe inside your browser. No code is transmitted to a server." },
        { question: "Does it support external libraries?", answer: "Currently, you can use standard browser APIs. If you need external libraries, add `<script src='...'>` or `<link rel='stylesheet' href='...'>` inside the HTML editor." }
      ]}
    >
      <div className={`flex flex-col gap-6 ${isExpanded ? 'fixed inset-4 z-50 bg-background overflow-hidden' : ''}`}>
        {isExpanded && (
          <div className="flex justify-between items-center px-4 py-3 bg-surface border border-border rounded-xl">
            <h3 className="font-display font-bold text-ink text-lg">Live Web Compiler</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-2 bg-background border border-border rounded-lg hover:bg-slate/10 transition-colors"
            >
              <Minimize2 className="w-5 h-5 text-ink" />
            </button>
          </div>
        )}
        
        {/* Editors Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 ${isExpanded ? 'h-[40vh]' : 'h-64 md:h-80'}`}>
          {/* HTML Editor */}
          <div className="flex flex-col border border-border rounded-xl bg-surface overflow-hidden h-full">
            <div className="bg-slate/5 px-4 py-2 border-b border-border flex justify-between items-center">
              <span className="text-[12px] font-sans font-bold text-ink uppercase tracking-wider">HTML</span>
            </div>
            <textarea
              className="flex-1 w-full p-4 bg-background text-ink font-mono text-[13px] outline-none resize-none"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              placeholder="<!-- HTML here -->"
            />
          </div>

          {/* CSS Editor */}
          <div className="flex flex-col border border-border rounded-xl bg-surface overflow-hidden h-full">
            <div className="bg-slate/5 px-4 py-2 border-b border-border flex justify-between items-center">
              <span className="text-[12px] font-sans font-bold text-ink uppercase tracking-wider">CSS</span>
            </div>
            <textarea
              className="flex-1 w-full p-4 bg-background text-ink font-mono text-[13px] outline-none resize-none"
              value={css}
              onChange={(e) => setCss(e.target.value)}
              spellCheck={false}
              placeholder="/* CSS here */"
            />
          </div>

          {/* JS Editor */}
          <div className="flex flex-col border border-border rounded-xl bg-surface overflow-hidden h-full">
            <div className="bg-slate/5 px-4 py-2 border-b border-border flex justify-between items-center">
              <span className="text-[12px] font-sans font-bold text-ink uppercase tracking-wider">JS</span>
            </div>
            <textarea
              className="flex-1 w-full p-4 bg-background text-ink font-mono text-[13px] outline-none resize-none"
              value={js}
              onChange={(e) => setJs(e.target.value)}
              spellCheck={false}
              placeholder="// JavaScript here"
            />
          </div>
        </div>

        {/* Live Preview Area */}
        <div className={`flex flex-col border border-border rounded-xl bg-white overflow-hidden ${isExpanded ? 'flex-1' : 'h-96 md:h-[500px]'}`}>
          <div className="bg-surface px-4 py-2 border-b border-border flex justify-between items-center">
            <span className="text-[12px] font-sans font-bold text-ink uppercase tracking-wider">Live Preview</span>
            {!isExpanded && (
              <button 
                onClick={() => setIsExpanded(true)}
                className="text-[12px] font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
              </button>
            )}
          </div>
          <iframe
            srcDoc={srcDoc}
            title="Web Compiler Preview"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-modals"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
