"use client";

import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco, loader } from '@monaco-editor/react';
import { useTheme } from 'next-themes';


interface MonacoEditorWrapperProps {
  language: 'html' | 'css' | 'javascript';
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

export function MonacoEditorWrapper({ language, value, onChange, readOnly = false }: MonacoEditorWrapperProps) {
  const { theme, systemTheme } = useTheme();
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);

  const activeTheme = theme === 'system' ? systemTheme : theme;
  const monacoTheme = activeTheme === 'dark' ? 'vs-dark' : 'light';

  useEffect(() => {
    if (monaco) {
      // Register custom theme or rules if needed
      monaco.editor.defineTheme('singulariti-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#0f172a', // Tailwind slate-900
        }
      });
      monaco.editor.defineTheme('singulariti-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#ffffff',
        }
      });
      monaco.editor.setTheme(activeTheme === 'dark' ? 'singulariti-dark' : 'singulariti-light');
    }
  }, [monaco, activeTheme]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme={activeTheme === 'dark' ? 'singulariti-dark' : 'singulariti-light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
          wordWrap: 'on',
          automaticLayout: true,
          readOnly,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          padding: { top: 16, bottom: 16 },
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          formatOnType: true,
        }}
        loading={<div className="flex w-full h-full items-center justify-center text-slate text-sm">Loading Editor...</div>}
      />
    </div>
  );
}
