"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { useWebCompilerStore, LayoutMode } from '@/store/useCompilerStore';
import { MonacoEditorWrapper } from '../shared/MonacoEditorWrapper';
import { DevicePreviewFrame } from '../shared/DevicePreviewFrame';
import { ConsoleOverlay } from '../shared/ConsoleOverlay';
import { ToolLayout } from '../shared/ToolLayout';
import { Play, Download, Upload, Layout, FileJson, Settings2, Trash2, Eraser, AlignLeft } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function WebCompilerClient() {
  const store = useWebCompilerStore();
  const [srcDoc, setSrcDoc] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Iframe Message Listener for Console
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source === 'singulariti-compiler-console') {
        setLogs(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type: event.data.type,
          content: event.data.content,
          timestamp: Date.now()
        }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const generateSrcDoc = () => {
    const consoleInterceptor = `
      <script>
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info
        };

        function sendLog(type, args) {
          try {
            const content = Array.from(args).map(arg => {
              if (arg instanceof Event) return '[object Event]';
              if (arg instanceof Error) return arg.toString();
              return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
            }).join(' ');
            window.parent.postMessage({ source: 'singulariti-compiler-console', type, content }, '*');
          } catch(e) {
            window.parent.postMessage({ source: 'singulariti-compiler-console', type: 'error', content: 'Console logging error: ' + String(e) }, '*');
          }
        }

        console.log = function() { sendLog('log', arguments); originalConsole.log.apply(console, arguments); };
        console.error = function() { sendLog('error', arguments); originalConsole.error.apply(console, arguments); };
        console.warn = function() { sendLog('warn', arguments); originalConsole.warn.apply(console, arguments); };
        console.info = function() { sendLog('info', arguments); originalConsole.info.apply(console, arguments); };
        
        window.addEventListener('error', function(e) {
          sendLog('error', [e.message + ' at line ' + e.lineno]);
        });
      <\/script>
    `;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${consoleInterceptor}
          <style>${store.css}</style>
        </head>
        <body>
          ${store.html}
          <script>
            try {
              ${store.js}
            } catch (err) {
              console.error(err);
            }
          <\/script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    if (store.autoRun) {
      const timeout = setTimeout(() => {
        setSrcDoc(generateSrcDoc());
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [store.html, store.css, store.js, store.autoRun]);

  const handleManualRun = () => {
    setSrcDoc(generateSrcDoc());
  };

  const handleExport = async () => {
    const zip = new JSZip();
    zip.file('index.html', `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  ${store.html}\n  <script src="script.js"></script>\n</body>\n</html>`);
    zip.file('styles.css', store.css);
    zip.file('script.js', store.js);
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'singulariti-project.zip');
  };

  const loadTemplate = (name: string) => {
    if (name === 'portfolio') {
      store.loadTemplate({
        html: '<div class="portfolio">\n  <h1>My Portfolio</h1>\n  <p>Welcome to my premium playground.</p>\n  <button id="btn">Click Me</button>\n</div>',
        css: 'body { font-family: system-ui; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n.portfolio { text-align: center; }\nbutton { padding: 10px 20px; border-radius: 8px; border: none; background: #0ea5e9; color: white; cursor: pointer; }',
        js: 'document.getElementById("btn").addEventListener("click", () => {\n  console.log("Button clicked!");\n  alert("Hello from Singulariti!");\n});'
      });
    }
  };

  const formatCode = async () => {
    try {
      const beautify = (await import('js-beautify')).default;
      store.setHtml(beautify.html(store.html, { indent_size: 2 }));
      store.setCss(beautify.css(store.css, { indent_size: 2 }));
      store.setJs(beautify.js(store.js, { indent_size: 2 }));
    } catch (e) {
      console.error('Beautify failed', e);
    }
  };

  const howToUse = [
    "Write your HTML, CSS, and JS code in the top panels.",
    "The output will automatically render in the bottom Live Preview panel.",
    "Check the Console overlay in the bottom panel for any JavaScript logs or errors.",
    "Use the top toolbar to load templates, format your code, or export the project as a ZIP file."
  ];

  const faqs = [
    {
      question: "Is my code saved on your servers?",
      answer: "No, all code processing and rendering happens entirely locally in your browser. We do not store or transmit any of your code to our servers."
    },
    {
      question: "How does the Console work?",
      answer: "The console captures output from console.log(), console.warn(), and console.error() in your JavaScript code and displays it securely in the overlay."
    },
    {
      question: "Can I use external libraries?",
      answer: "Yes! You can include standard <link> and <script> tags within your HTML code to pull in external resources via CDN."
    }
  ];

  const renderEditors = () => {
    if (isMobile) {
      return (
        <div className="flex flex-col h-full bg-surface border-r border-border">
          <div className="flex border-b border-border bg-background">
            {['html', 'css', 'js'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-slate hover:bg-slate/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            {activeTab === 'html' && <MonacoEditorWrapper language="html" value={store.html} onChange={(v) => store.setHtml(v || '')} />}
            {activeTab === 'css' && <MonacoEditorWrapper language="css" value={store.css} onChange={(v) => store.setCss(v || '')} />}
            {activeTab === 'js' && <MonacoEditorWrapper language="javascript" value={store.js} onChange={(v) => store.setJs(v || '')} />}
          </div>
        </div>
      );
    }

    return (
      <PanelGroup direction="horizontal">
        <Panel defaultSize={33} minSize={20}>
          <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden m-1">
            <div className="bg-background px-4 py-2 border-b border-border flex justify-between items-center text-[12px] font-sans font-bold text-ink uppercase tracking-wider">
              HTML
            </div>
            <MonacoEditorWrapper language="html" value={store.html} onChange={(v) => store.setHtml(v || '')} />
          </div>
        </Panel>
        <PanelResizeHandle className="bg-transparent hover:bg-primary/20 transition-colors w-2" />
        <Panel defaultSize={33} minSize={20}>
          <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden m-1">
            <div className="bg-background px-4 py-2 border-b border-border flex justify-between items-center text-[12px] font-sans font-bold text-ink uppercase tracking-wider">
              CSS
            </div>
            <MonacoEditorWrapper language="css" value={store.css} onChange={(v) => store.setCss(v || '')} />
          </div>
        </Panel>
        <PanelResizeHandle className="bg-transparent hover:bg-primary/20 transition-colors w-2" />
        <Panel defaultSize={33} minSize={20}>
          <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden m-1">
            <div className="bg-background px-4 py-2 border-b border-border flex justify-between items-center text-[12px] font-sans font-bold text-ink uppercase tracking-wider">
              JS
            </div>
            <MonacoEditorWrapper language="javascript" value={store.js} onChange={(v) => store.setJs(v || '')} />
          </div>
        </Panel>
      </PanelGroup>
    );
  };

  return (
    <ToolLayout
      utilityId="web-compiler"
      title="Premium Web Compiler"
      description="A production-grade HTML, CSS, and JS playground with Monaco Editor, live responsive preview, and console integration."
      categoryName="Developer Tools"
      categoryPath="/tools/dev"
      howToUse={howToUse}
      faqs={faqs}
    >
      <div className="flex flex-col w-full h-[85vh] border border-border rounded-2xl overflow-hidden bg-background shadow-sm">
        
        {/* Top Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleManualRun}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-bold hover:bg-primary/90 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Run
            </button>
            <div className="h-6 w-px bg-border mx-2" />
            <select 
              onChange={(e) => loadTemplate(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-[13px] font-medium text-ink outline-none focus:border-primary cursor-pointer hidden md:block"
            >
              <option value="">Load Template...</option>
              <option value="portfolio">Portfolio Theme</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={formatCode}
              className="p-2 text-slate hover:bg-slate/10 hover:text-ink rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium"
              title="Format Code"
            >
              <AlignLeft className="w-4 h-4" /> <span className="hidden md:inline">Format</span>
            </button>
            <button 
              onClick={handleExport}
              className="p-2 text-slate hover:bg-slate/10 hover:text-ink rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium"
              title="Export as ZIP"
            >
              <Download className="w-4 h-4" /> <span className="hidden md:inline">Export</span>
            </button>
            <div className="h-6 w-px bg-border mx-2 hidden md:block" />
            <div className="hidden md:flex items-center gap-1 bg-background p-1 rounded-lg border border-border">
              <button 
                onClick={() => store.setLayout('code-only')}
                className={`p-1.5 rounded-md ${store.layout === 'code-only' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Code Only"
              >
                <FileJson className="w-4 h-4" />
              </button>
              <button 
                onClick={() => store.setLayout('vertical')}
                className={`p-1.5 rounded-md ${store.layout === 'vertical' || store.layout === 'horizontal' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Split View"
              >
                <Layout className="w-4 h-4" />
              </button>
              <button 
                onClick={() => store.setLayout('preview-only')}
                className={`p-1.5 rounded-md ${store.layout === 'preview-only' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Preview Only"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-hidden relative">
          {store.layout === 'preview-only' ? (
            <div className="w-full h-full relative flex flex-col">
              <DevicePreviewFrame srcDoc={srcDoc} deviceView={store.deviceView} setDeviceView={store.setDeviceView} />
              <ConsoleOverlay logs={logs} onClear={() => setLogs([])} />
            </div>
          ) : store.layout === 'code-only' ? (
            renderEditors()
          ) : (
            <PanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={30}>
                {renderEditors()}
              </Panel>
              <PanelResizeHandle className="bg-border hover:bg-primary/50 transition-colors h-2" />
              <Panel defaultSize={50} minSize={30}>
                <div className="w-full h-full relative flex flex-col p-1">
                  <DevicePreviewFrame srcDoc={srcDoc} deviceView={store.deviceView} setDeviceView={store.setDeviceView} />
                  <ConsoleOverlay logs={logs} onClear={() => setLogs([])} />
                </div>
              </Panel>
            </PanelGroup>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
