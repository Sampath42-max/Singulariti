"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../shared/ToolLayout';
import { TextBox } from '../shared/TextBox';
import { ResultBox } from '../shared/ResultBox';
import { Button } from '@/components/ui/Button';
import { diffLines, diffWords, diffChars } from 'diff';

interface TextToolContainerProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
}

export function TextToolContainer({ toolId, toolName, toolDescription }: TextToolContainerProps) {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState(''); // Used for compare/diff
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  
  // Custom states for generators
  const [count, setCount] = useState(3); // e.g. paragraphs count
  const [stringLength, setStringLength] = useState(12); // random string length
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');

  // Custom states for Text Compare
  const [compareMode, setCompareMode] = useState<'line' | 'word' | 'char'>('line');
  const [compareSummary, setCompareSummary] = useState<{
    chars1: number;
    chars2: number;
    words1: number;
    words2: number;
    lines1: number;
    lines2: number;
    changedLines: number;
    addedLines: number;
    removedLines: number;
    similarity: number;
  } | null>(null);

  // Clear compare summaries when input changes
  useEffect(() => {
    if (toolId === 'text-compare') {
      setCompareSummary(null);
    }
  }, [input, input2, toolId]);

  // Auto-run logic for tools that process on-the-fly
  useEffect(() => {
    setError('');
    
    if (!input && toolId !== 'lorem-ipsum' && toolId !== 'random-text') {
      setOutput('');
      return;
    }

    try {
      switch (toolId) {
        case 'word-counter':
        case 'character-counter':
        case 'line-counter':
        case 'sentence-counter':
        case 'paragraph-counter': {
          const chars = input.length;
          const words = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
          const lines = input === "" ? 0 : input.split('\n').length;
          const sentences = input.trim() === "" ? 0 : input.split(/[.!?]+/).filter(Boolean).length;
          const paragraphs = input.trim() === "" ? 0 : input.split(/\n\s*\n/).filter(Boolean).length;

          if (toolId === 'word-counter') {
            setOutput(`Words: ${words}\nCharacters: ${chars}\nLines: ${lines}\nSentences: ${sentences}\nParagraphs: ${paragraphs}`);
          } else if (toolId === 'character-counter') {
            setOutput(`Characters (with spaces): ${chars}\nCharacters (no spaces): ${input.replace(/\s/g, '').length}`);
          } else if (toolId === 'line-counter') {
            setOutput(`Total Lines: ${lines}`);
          } else if (toolId === 'sentence-counter') {
            setOutput(`Total Sentences: ${sentences}`);
          } else if (toolId === 'paragraph-counter') {
            setOutput(`Total Paragraphs: ${paragraphs}`);
          }
          break;
        }
        case 'text-uppercase':
          setOutput(input.toUpperCase());
          break;
        case 'text-lowercase':
          setOutput(input.toLowerCase());
          break;
        case 'capitalize-text':
          setOutput(input.replace(/(^\s*|[.!?]\s+)([a-z])/g, m => m.toUpperCase()));
          break;
        case 'title-case':
          setOutput(input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
          break;
        case 'case-converter':
          setOutput(`UPPERCASE:\n${input.toUpperCase()}\n\nlowercase:\n${input.toLowerCase()}\n\nTitle Case:\n${input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}`);
          break;
        case 'remove-duplicate-lines': {
          const lines = input.split('\n');
          const unique = Array.from(new Set(lines));
          setOutput(unique.join('\n'));
          break;
        }
        case 'text-sorter': {
          const lines = input.split('\n');
          setOutput(lines.sort((a, b) => a.localeCompare(b)).join('\n'));
          break;
        }
        case 'remove-extra-spaces':
          setOutput(input.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim());
          break;
        case 'text-reverser':
          setOutput(input.split('').reverse().join(''));
          break;
        case 'slug-generator':
          setOutput(input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
          break;
        default:
          break;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing.');
    }
  }, [input, toolId]);

  // Execute logic for interactive tools (e.g. Find & Replace, Diff, Generators)
  const handleExecute = () => {
    setError('');
    try {
      if (toolId === 'find-replace') {
        if (!findStr) {
          setError('Please specify the text to find.');
          return;
        }
        setOutput(input.replaceAll(findStr, replaceStr));
      } else if (toolId === 'text-compare') {
        const chars1 = input.length;
        const chars2 = input2.length;
        const words1 = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
        const words2 = input2.trim() === "" ? 0 : input2.trim().split(/\s+/).length;
        const lines1 = input === "" ? 0 : input.split('\n').length;
        const lines2 = input2 === "" ? 0 : input2.split('\n').length;

        let changedLines = 0;
        let addedLines = 0;
        let removedLines = 0;

        const maxLines = Math.max(lines1, lines2);
        const l1List = input.split('\n');
        const l2List = input2.split('\n');

        for (let i = 0; i < maxLines; i++) {
          const l1 = l1List[i];
          const l2 = l2List[i];
          if (l1 !== undefined && l2 !== undefined && l1 !== l2) {
            changedLines++;
          } else if (l1 !== undefined && l2 === undefined) {
            removedLines++;
          } else if (l1 === undefined && l2 !== undefined) {
            addedLines++;
          }
        }

        // Calculate similarity percentage using diffChars
        const diffCh = diffChars(input, input2);
        let sameChars = 0;
        diffCh.forEach(part => {
          if (!part.added && !part.removed) {
            sameChars += part.value.length;
          }
        });
        const maxLen = Math.max(chars1, chars2);
        const similarity = maxLen === 0 ? 100 : Math.round((sameChars / maxLen) * 100);

        setCompareSummary({
          chars1,
          chars2,
          words1,
          words2,
          lines1,
          lines2,
          changedLines,
          addedLines,
          removedLines,
          similarity
        });

        // Compute output text based on selected mode
        if (compareMode === 'line') {
          const report: string[] = [];
          report.push(`=== LINE COMPARE REPORT ===`);
          report.push(`Similarity: ${similarity}%`);
          report.push(`Changed Lines: ${changedLines}, Added: ${addedLines}, Removed: ${removedLines}\n`);
          
          for (let i = 0; i < maxLines; i++) {
            const l1 = l1List[i];
            const l2 = l2List[i];
            if (l1 === l2) {
              report.push(`Line ${i + 1} [SAME]: ${l1}`);
            } else if (l1 !== undefined && l2 !== undefined) {
              report.push(`Line ${i + 1} [CHANGED]:\n- ${l1}\n+ ${l2}`);
            } else if (l1 !== undefined) {
              report.push(`Line ${i + 1} [REMOVED]: - ${l1}`);
            } else if (l2 !== undefined) {
              report.push(`Line ${i + 1} [ADDED]: + ${l2}`);
            }
          }
          setOutput(report.join('\n'));
        } else if (compareMode === 'word') {
          const diffW = diffWords(input, input2);
          const report: string[] = [];
          diffW.forEach(part => {
            if (part.removed) {
              report.push(`[-${part.value}]`);
            } else if (part.added) {
              report.push(`[+${part.value}]`);
            } else {
              report.push(part.value);
            }
          });
          setOutput(report.join(''));
        } else if (compareMode === 'char') {
          const report: string[] = [];
          report.push(`=== CHARACTER COMPARE REPORT ===`);
          report.push(`Similarity: ${similarity}%\n`);

          let pos = 0;
          for (let idx = 0; idx < diffCh.length; idx++) {
            const current = diffCh[idx];
            const next = diffCh[idx + 1];
            
            if (current.removed && next && next.added) {
              const minLen = Math.min(current.value.length, next.value.length);
              for (let c = 0; c < minLen; c++) {
                report.push(`Position ${pos + c + 1}: Replaced '${current.value[c]}' with '${next.value[c]}'`);
              }
              if (current.value.length > minLen) {
                for (let c = minLen; c < current.value.length; c++) {
                  report.push(`Position ${pos + c + 1}: Removed '${current.value[c]}'`);
                }
              } else if (next.value.length > minLen) {
                for (let c = minLen; c < next.value.length; c++) {
                  report.push(`Position ${pos + minLen + 1}: Added '${next.value[c]}'`);
                }
              }
              pos += current.value.length;
              idx++;
            } else if (current.removed) {
              for (let c = 0; c < current.value.length; c++) {
                report.push(`Position ${pos + c + 1}: Removed '${current.value[c]}'`);
              }
              pos += current.value.length;
            } else if (current.added) {
              for (let c = 0; c < current.value.length; c++) {
                report.push(`Position ${pos + 1}: Added '${current.value[c]}'`);
              }
            } else {
              pos += current.value.length;
            }
          }
          if (report.length === 2) {
            report.push("No character-level differences found.");
          }
          setOutput(report.join('\n'));
        }
      } else if (toolId === 'text-diff') {
        const lines1 = input.split('\n');
        const lines2 = input2.split('\n');
        const diffResult: string[] = [];
        
        const maxLines = Math.max(lines1.length, lines2.length);
        for (let i = 0; i < maxLines; i++) {
          const l1 = lines1[i];
          const l2 = lines2[i];
          if (l1 === l2) {
            diffResult.push(`  ${l1}`);
          } else {
            if (l1 !== undefined) diffResult.push(`- ${l1}`);
            if (l2 !== undefined) diffResult.push(`+ ${l2}`);
          }
        }
        setOutput(diffResult.join('\n'));
      } else if (toolId === 'lorem-ipsum') {
        const loremParagraphs = [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
          "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi."
        ];
        const res = [];
        for (let i = 0; i < count; i++) {
          res.push(loremParagraphs[i % loremParagraphs.length]);
        }
        setOutput(res.join('\n\n'));
      } else if (toolId === 'random-text') {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let res = "";
        for (let i = 0; i < stringLength; i++) {
          res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setOutput(res);
      }
    } catch (err: any) {
      setError(err.message || 'Processing failed.');
    }
  };

  // Static instructions and FAQs
  const howToUseMap: Record<string, string[]> = {
    'word-counter': [
      "Type or paste your text into the input box.",
      "The stats update automatically as you type.",
      "Click Copy Result to save the summary details."
    ],
    'text-compare': [
      "Enter the original text in the first input box.",
      "Enter the comparison text in the second input box.",
      "Select a comparison mode: Line, Word, or Character.",
      "Click Compare Texts to view all differences with color coding."
    ],
    'text-diff': [
      "Enter the original text in the left/first input box.",
      "Enter the updated text in the right/second input box.",
      "Click Compare and view inline additions (+) and deletions (-)."
    ],
    'lorem-ipsum': [
      "Choose the number of paragraphs you need.",
      "Click Generate Text.",
      "Copy the formatted placeholder text directly."
    ],
    'random-text': [
      "Select your preferred character length.",
      "Click Generate String.",
      "Copy the generated secure random string."
    ]
  };

  const defaultHowToUse = [
    "Paste your text into the input field.",
    "Observe the auto-generated output update instantly.",
    "Click Copy Result to copy the output to your clipboard."
  ];

  const faqsMap: Record<string, {question: string, answer: string}[]> = {
    'word-counter': [
      { question: "Is my text uploaded to a server?", answer: "No. The word counting logic executes entirely in your browser. Your data is private and secure." },
      { question: "How does it define a word?", answer: "It splits words by any whitespace sequence. Words separated by spaces, tabs, or newlines are counted separately." }
    ],
    'text-compare': [
      { question: "How does Text Compare highlight differences?", answer: "In line mode, it aligns lines horizontally, highlighting changed, added, and removed lines. In word mode, it highlights individual additions (+green) and deletions (-red) inline. In character mode, it shows the exact position and replaced letters." }
    ],
    'text-diff': [
      { question: "How does the diff checker work?", answer: "It compares the two text inputs line-by-line. Deleted lines are indicated with a minus (-) prefix, and added lines have a plus (+) prefix." }
    ],
    'lorem-ipsum': [
      { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is standard placeholder dummy text used in graphic, print, and web design layout mockups." }
    ]
  };

  const defaultFaqs = [
    { question: "Is this tool free?", answer: "Yes, all Singulariti tools are 100% free with no usage limits." },
    { question: "Does this save any data?", answer: "No, all actions happen inside your local browser. No data is stored or transmitted." }
  ];

  const needsSecondInput = toolId === 'text-compare' || toolId === 'text-diff';
  const isInteractive = needsSecondInput || toolId === 'find-replace' || toolId === 'lorem-ipsum' || toolId === 'random-text';

  const handleClearAll = () => {
    setInput('');
    setInput2('');
    setOutput('');
    setCompareSummary(null);
  };

  return (
    <ToolLayout
      title={toolName}
      description={toolDescription}
      categoryName="Text Tools"
      categoryPath="/tools/text"
      howToUse={howToUseMap[toolId] || defaultHowToUse}
      faqs={faqsMap[toolId] || defaultFaqs}
    >
      <div className="space-y-6">
        {/* Generators Controls */}
        {loremIpsumControls()}
        {randomTextControls()}
        {findReplaceControls()}

        {/* Text Compare Mode Selection */}
        {toolId === 'text-compare' && (
          <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border flex-wrap gap-4">
            <div className="flex flex-col gap-1.5 font-sans">
              <label className="text-[12px] font-bold text-ink uppercase tracking-wider">Comparison Mode</label>
              <select 
                value={compareMode} 
                onChange={(e) => setCompareMode(e.target.value as any)}
                className="p-2 border border-border rounded-lg bg-surface text-ink text-sm outline-none w-48 focus:border-primary/80"
              >
                <option value="line">Line Compare</option>
                <option value="word">Word Compare</option>
                <option value="char">Character Compare</option>
              </select>
            </div>
            <Button variant="outline" onClick={handleClearAll}>Clear All Inputs</Button>
          </div>
        )}

        {/* Input Blocks */}
        {toolId !== 'lorem-ipsum' && toolId !== 'random-text' && (
          <div className={`grid grid-cols-1 ${needsSecondInput ? 'md:grid-cols-2' : ''} gap-6`}>
            <TextBox 
              value={input} 
              onChange={setInput} 
              label={needsSecondInput ? "Original Text (Version A)" : "Source Text Input"} 
              error={error} 
            />
            {needsSecondInput && (
              <TextBox 
                value={input2} 
                onChange={setInput2} 
                label="Updated Text (Version B)" 
              />
            )}
          </div>
        )}

        {/* Comparison Trigger */}
        {needsSecondInput && (
          <div className="flex justify-center">
            <Button variant="primary" onClick={handleExecute} className="px-6 py-2.5">
              {toolId === 'text-compare' ? 'Compare Texts' : 'Generate Diff'}
            </Button>
          </div>
        )}

        {/* Comparison Summary (Only for Text Compare) */}
        {toolId === 'text-compare' && compareSummary && (
          <div className="space-y-4 p-5 bg-background border border-border rounded-xl font-sans text-sm">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Comparison Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-surface border border-border rounded-lg text-center">
                <span className="text-[11px] font-bold text-slate uppercase block">Text 1 (A)</span>
                <p className="text-[13px] font-semibold text-ink mt-1 font-mono">
                  {compareSummary.lines1} L · {compareSummary.words1} W · {compareSummary.chars1} C
                </p>
              </div>
              <div className="p-3 bg-surface border border-border rounded-lg text-center">
                <span className="text-[11px] font-bold text-slate uppercase block">Text 2 (B)</span>
                <p className="text-[13px] font-semibold text-ink mt-1 font-mono">
                  {compareSummary.lines2} L · {compareSummary.words2} W · {compareSummary.chars2} C
                </p>
              </div>
              <div className="p-3 bg-surface border border-border rounded-lg text-center">
                <span className="text-[11px] font-bold text-slate uppercase block">Line Differences</span>
                <p className="text-[13px] font-semibold text-ink mt-1 font-mono">
                  <span className="text-yellow-600">{compareSummary.changedLines} Chg</span> ·{' '}
                  <span className="text-emerald-600">+{compareSummary.addedLines} Add</span> ·{' '}
                  <span className="text-red-600">-{compareSummary.removedLines} Del</span>
                </p>
              </div>
              <div className="p-3 bg-surface border border-border rounded-lg text-center flex flex-col justify-center items-center">
                <span className="text-[11px] font-bold text-slate uppercase block">Similarity</span>
                <span className="text-base font-bold text-primary mt-0.5">{compareSummary.similarity}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Visual Diff Panel (Only for Text Compare) */}
        {toolId === 'text-compare' && compareSummary && (
          <div className="p-5 bg-background border border-border rounded-xl space-y-3 font-sans">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Visual Difference Results</h3>
            
            {compareMode === 'line' && (
              <div className="space-y-1.5 font-mono text-[13px] border border-border p-4 rounded-lg bg-surface max-h-96 overflow-y-auto">
                {(() => {
                  const l1List = input.split('\n');
                  const l2List = input2.split('\n');
                  const maxLines = Math.max(l1List.length, l2List.length);
                  const elements = [];
                  for (let i = 0; i < maxLines; i++) {
                    const l1 = l1List[i];
                    const l2 = l2List[i];
                    if (l1 === l2) {
                      elements.push(
                        <div key={i} className="text-slate/80 py-0.5 border-b border-border/10">
                          <span className="inline-block w-8 text-slate/50 select-none text-[11px]">{i + 1}</span>
                          <span>{l1}</span>
                        </div>
                      );
                    } else if (l1 !== undefined && l2 !== undefined) {
                      elements.push(
                        <div key={i} className="py-1 border-b border-border/10 space-y-0.5">
                          <div className="bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded border-l-4 border-yellow-500">
                            <span className="inline-block w-8 text-yellow-500/50 select-none text-[11px]">{i + 1} [CHANGED]</span>
                            <span className="line-through opacity-65 mr-2">{l1}</span>
                            <span className="font-bold">{l2}</span>
                          </div>
                        </div>
                      );
                    } else if (l1 !== undefined) {
                      elements.push(
                        <div key={i} className="bg-red-500/10 text-red-600 px-2 py-0.5 rounded border-l-4 border-red-500 border-b border-border/10">
                          <span className="inline-block w-8 text-red-500/50 select-none text-[11px]">{i + 1} [REMOVED]</span>
                          <span className="line-through">{l1}</span>
                        </div>
                      );
                    } else if (l2 !== undefined) {
                      elements.push(
                        <div key={i} className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded border-l-4 border-emerald-500 border-b border-border/10">
                          <span className="inline-block w-8 text-emerald-500/50 select-none text-[11px]">{i + 1} [ADDED]</span>
                          <span className="font-bold">{l2}</span>
                        </div>
                      );
                    }
                  }
                  return elements;
                })()}
              </div>
            )}

            {compareMode === 'word' && (
              <div className="p-4 border border-border rounded-lg bg-surface max-h-96 overflow-y-auto font-mono text-[14px] leading-relaxed select-text">
                {(() => {
                  const diffW = diffWords(input, input2);
                  return diffW.map((part, idx) => {
                    if (part.removed) {
                      return (
                        <span key={idx} className="bg-red-500/15 text-red-600 line-through px-1 mx-0.5 rounded select-all font-semibold">
                          {part.value}
                        </span>
                      );
                    } else if (part.added) {
                      return (
                        <span key={idx} className="bg-emerald-500/15 text-emerald-600 px-1 mx-0.5 rounded font-bold select-all">
                          {part.value}
                        </span>
                      );
                    } else {
                      return <span key={idx} className="text-ink">{part.value}</span>;
                    }
                  });
                })()}
              </div>
            )}

            {compareMode === 'char' && (
              <div className="space-y-1.5 font-mono text-[12px] border border-border p-4 rounded-lg bg-surface max-h-72 overflow-y-auto text-slate">
                {(() => {
                  const diffCh = diffChars(input, input2);
                  const elements = [];
                  let pos = 0;
                  for (let idx = 0; idx < diffCh.length; idx++) {
                    const current = diffCh[idx];
                    const next = diffCh[idx + 1];
                    
                    if (current.removed && next && next.added) {
                      const minLen = Math.min(current.value.length, next.value.length);
                      for (let c = 0; c < minLen; c++) {
                        elements.push(
                          <div key={`${idx}-${c}`} className="py-0.5 border-b border-border/10 flex items-center gap-2">
                            <span className="text-yellow-600 font-bold bg-yellow-500/10 px-1 rounded text-[10px]">CHANGED</span>
                            <span>Pos {pos + c + 1}: Replaced <span className="line-through text-red-500">'{current.value[c]}'</span> with <span className="font-bold text-emerald-600">'{next.value[c]}'</span></span>
                          </div>
                        );
                      }
                      if (current.value.length > minLen) {
                        for (let c = minLen; c < current.value.length; c++) {
                          elements.push(
                            <div key={`${idx}-rem-${c}`} className="py-0.5 border-b border-border/10 flex items-center gap-2">
                              <span className="text-red-600 font-bold bg-red-500/10 px-1 rounded text-[10px]">REMOVED</span>
                              <span>Pos {pos + c + 1}: Removed <span className="line-through">'{current.value[c]}'</span></span>
                            </div>
                          );
                        }
                      } else if (next.value.length > minLen) {
                        for (let c = minLen; c < next.value.length; c++) {
                          elements.push(
                            <div key={`${idx}-add-${c}`} className="py-0.5 border-b border-border/10 flex items-center gap-2">
                              <span className="text-emerald-600 font-bold bg-emerald-500/10 px-1 rounded text-[10px]">ADDED</span>
                              <span>Pos {pos + minLen + 1}: Added <span className="font-bold">'{next.value[c]}'</span></span>
                            </div>
                          );
                        }
                      }
                      pos += current.value.length;
                      idx++;
                    } else if (current.removed) {
                      for (let c = 0; c < current.value.length; c++) {
                        elements.push(
                          <div key={`${idx}-${c}`} className="py-0.5 border-b border-border/10 flex items-center gap-2">
                            <span className="text-red-600 font-bold bg-red-500/10 px-1 rounded text-[10px]">REMOVED</span>
                            <span>Pos {pos + c + 1}: Removed <span className="line-through">'{current.value[c]}'</span></span>
                          </div>
                        );
                      }
                      pos += current.value.length;
                    } else if (current.added) {
                      for (let c = 0; c < current.value.length; c++) {
                        elements.push(
                          <div key={`${idx}-${c}`} className="py-0.5 border-b border-border/10 flex items-center gap-2">
                            <span className="text-emerald-600 font-bold bg-emerald-500/10 px-1 rounded text-[10px]">ADDED</span>
                            <span>Pos {pos + 1}: Added <span className="font-bold">'{current.value[c]}'</span></span>
                          </div>
                        );
                      }
                    } else {
                      pos += current.value.length;
                    }
                  }
                  if (elements.length === 0) {
                    return <div className="text-center py-4 text-slate">No character differences.</div>;
                  }
                  return elements;
                })()}
              </div>
            )}
          </div>
        )}

        {/* Result Block */}
        <ResultBox value={output} downloadFileName={`${toolId}-result.txt`} />
      </div>
    </ToolLayout>
  );

  // Helper renderers
  function loremIpsumControls() {
    if (toolId !== 'lorem-ipsum') return null;
    return (
      <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[12px] font-bold text-ink">Paragraphs:</label>
          <input 
            type="number" 
            min="1" max="50" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            className="w-24 p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
          />
        </div>
        <Button variant="primary" onClick={handleExecute} className="mt-5">Generate Placeholder</Button>
      </div>
    );
  }

  function randomTextControls() {
    if (toolId !== 'random-text') return null;
    return (
      <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[12px] font-bold text-ink">String Length:</label>
          <input 
            type="number" 
            min="4" max="128" 
            value={stringLength} 
            onChange={(e) => setStringLength(Math.max(4, Number(e.target.value)))}
            className="w-24 p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
          />
        </div>
        <Button variant="primary" onClick={handleExecute} className="mt-5">Generate String</Button>
      </div>
    );
  }

  function findReplaceControls() {
    if (toolId !== 'find-replace') return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-background rounded-xl border border-border">
        <div className="flex flex-col gap-1 font-sans">
          <label className="text-[12px] font-bold text-ink">Find Text:</label>
          <input 
            type="text" 
            value={findStr} 
            onChange={(e) => setFindStr(e.target.value)} 
            placeholder="Find text..." 
            className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
          />
        </div>
        <div className="flex flex-col gap-1 font-sans">
          <label className="text-[12px] font-bold text-ink">Replace With:</label>
          <input 
            type="text" 
            value={replaceStr} 
            onChange={(e) => setReplaceStr(e.target.value)} 
            placeholder="Replace text..." 
            className="p-2 border border-border rounded bg-surface text-ink text-sm outline-none" 
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button variant="primary" onClick={handleExecute}>Replace All</Button>
        </div>
      </div>
    );
  }
}
