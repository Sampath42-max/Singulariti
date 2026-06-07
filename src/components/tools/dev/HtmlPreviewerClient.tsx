"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { useHtmlPreviewerStore } from '@/store/useCompilerStore';
import { MonacoEditorWrapper } from '../shared/MonacoEditorWrapper';
import { DevicePreviewFrame } from '../shared/DevicePreviewFrame';
import { ToolLayout } from '../shared/ToolLayout';
import { Play, Download, Upload, Layout, FileJson, AlignLeft, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { saveAs } from 'file-saver';

export function HtmlPreviewerClient() {
  const store = useHtmlPreviewerStore();
  const [srcDoc, setSrcDoc] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (store.autoRun) {
      const timeout = setTimeout(() => {
        setSrcDoc(store.html);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [store.html, store.autoRun]);

  const handleManualRun = () => {
    setSrcDoc(store.html);
  };

  const handleExportHTML = () => {
    const blob = new Blob([store.html], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'singulariti-preview.html');
  };

  const formatCode = async () => {
    try {
      const beautify = (await import('js-beautify')).default;
      store.setHtml(beautify.html(store.html, { indent_size: 2 }));
    } catch (e) {
      console.error('Beautify failed', e);
    }
  };

  const loadTemplate = (name: string) => {
    if (name === 'blank') {
      store.setHtml('<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Blank Template</title>\n</head>\n<body>\n  \n</body>\n</html>');
    } else if (name === 'login') {
      store.setHtml('<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; }\n    .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); width: 300px; }\n    input { width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }\n    button { width: 100%; padding: 0.5rem; background: #0f766e; color: white; border: none; border-radius: 4px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>Login</h2>\n    <input type="email" placeholder="Email">\n    <input type="password" placeholder="Password">\n    <button>Sign In</button>\n  </div>\n</body>\n</html>');
    }
  };

  const howToUse = [
    "Paste your raw HTML code into the Code Editor panel.",
    "The Live Preview panel will automatically render your HTML.",
    "Use the top toolbar to load templates, format your code, or export the result as an HTML file.",
    "Toggle between different layout modes using the layout icons in the toolbar."
  ];

  const faqs = [
    {
      question: "Is my code saved on your servers?",
      answer: "No, all code processing and rendering happens entirely locally in your browser. We do not store or transmit any of your code to our servers."
    },
    {
      question: "Can I use external CSS or JavaScript libraries?",
      answer: "Yes! You can include standard <link> and <script> tags within your HTML code to pull in external resources via CDN."
    },
    {
      question: "How do I format my code?",
      answer: "Simply click the 'Beautify' button in the toolbar. It will automatically indent and format your HTML code for better readability."
    }
  ];

  const renderEditor = () => {
    return (
      <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden m-1 relative">
        <div className="bg-background px-4 py-2 border-b border-border flex justify-between items-center text-[12px] font-sans font-bold text-ink uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-primary" /> HTML Source
          </div>
        </div>
        <MonacoEditorWrapper language="html" value={store.html} onChange={(v) => store.setHtml(v || '')} />
      </div>
    );
  };

  return (
    <ToolLayout
      utilityId="html-previewer"
      title="Premium HTML Previewer"
      description="A lightning-fast, production-grade HTML renderer with Monaco Editor, live responsive preview, and automatic validation."
      categoryName="Developer Tools"
      categoryPath="/tools/dev"
      howToUse={howToUse}
      faqs={faqs}
    >
      <div className="flex flex-col w-full h-[85vh] border border-border rounded-2xl overflow-hidden bg-background shadow-sm relative">
        
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
              <option value="blank">Blank HTML5</option>
              <option value="login">Login Form</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={formatCode}
              className="p-2 text-slate hover:bg-slate/10 hover:text-ink rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium"
              title="Beautify HTML"
            >
              <AlignLeft className="w-4 h-4" /> <span className="hidden md:inline">Beautify</span>
            </button>
            <button 
              onClick={handleExportHTML}
              className="p-2 text-slate hover:bg-slate/10 hover:text-ink rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium"
              title="Download HTML"
            >
              <Download className="w-4 h-4" /> <span className="hidden md:inline">Export</span>
            </button>
            <div className="h-6 w-px bg-border mx-2 hidden md:block" />
            <div className="hidden md:flex items-center gap-1 bg-background p-1 rounded-lg border border-border">
              <button 
                onClick={() => store.setLayout('horizontal')}
                className={`p-1.5 rounded-md ${store.layout === 'horizontal' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Horizontal Split"
              >
                <Layout className="w-4 h-4" />
              </button>
              <button 
                onClick={() => store.setLayout('vertical')}
                className={`p-1.5 rounded-md ${store.layout === 'vertical' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Vertical Split"
              >
                <Layout className="w-4 h-4 rotate-90" />
              </button>
              <button 
                onClick={() => store.setLayout('preview-only')}
                className={`p-1.5 rounded-md ${store.layout === 'preview-only' ? 'bg-primary text-white' : 'text-slate hover:bg-slate/10'}`}
                title="Preview Only"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-hidden relative">
          {isMobile ? (
            <div className="flex flex-col h-full bg-surface">
              <div className="flex border-b border-border bg-background shrink-0">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'editor' ? 'border-b-2 border-primary text-primary' : 'text-slate hover:bg-slate/5'}`}
                >
                  Code Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'preview' ? 'border-b-2 border-primary text-primary' : 'text-slate hover:bg-slate/5'}`}
                >
                  Live Preview
                </button>
              </div>
              <div className="flex-1 relative">
                {activeTab === 'editor' ? renderEditor() : (
                  <DevicePreviewFrame srcDoc={srcDoc} deviceView={store.deviceView} setDeviceView={store.setDeviceView} />
                )}
              </div>
            </div>
          ) : store.layout === 'preview-only' ? (
            <div className="w-full h-full relative p-2">
              <DevicePreviewFrame srcDoc={srcDoc} deviceView={store.deviceView} setDeviceView={store.setDeviceView} />
            </div>
          ) : store.layout === 'code-only' ? (
            renderEditor()
          ) : (
            <PanelGroup direction={store.layout === 'vertical' ? 'horizontal' : 'vertical'}>
              <Panel defaultSize={50} minSize={30}>
                {renderEditor()}
              </Panel>
              <PanelResizeHandle className={`bg-border hover:bg-primary/50 transition-colors ${store.layout === 'horizontal' ? 'h-2' : 'w-2'}`} />
              <Panel defaultSize={50} minSize={30}>
                <div className="w-full h-full relative flex flex-col p-1">
                  <DevicePreviewFrame srcDoc={srcDoc} deviceView={store.deviceView} setDeviceView={store.setDeviceView} />
                </div>
              </Panel>
            </PanelGroup>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
