"use client";

import React from 'react';
import { BlogPost } from '@/lib/blog';
import { 
  ArrowRight, Shield, AlertTriangle, Cpu, HelpCircle, 
  ListChecks, Users, Layers, Activity, FileText, CheckCircle 
} from 'lucide-react';

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
  const { sections } = post;
  if (!sections) return null;

  return (
    <article className="space-y-10 font-sans text-slate blog-article-content">
      
      {/* 1. Introduction */}
      <section className="blog-content-body">
        <div dangerouslySetInnerHTML={{ __html: sections.introduction }} />
      </section>

      {/* 2. What This Tool Does */}
      {sections.whatThisToolDoes && (
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-ink tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" /> What This Tool Does
          </h2>
          <p className="text-sm leading-relaxed">{sections.whatThisToolDoes}</p>
        </section>
      )}

      {/* 3. Why This Tool Is Included */}
      {sections.whyIncluded && (
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-ink tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> Why This Tool Is Included
          </h2>
          <p className="text-sm leading-relaxed">{sections.whyIncluded}</p>
        </section>
      )}

      {/* 4. Who Can Use This Tool */}
      {sections.whoCanUse && sections.whoCanUse.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-ink tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Who Can Use This Tool
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm pl-0 list-none">
            {sections.whoCanUse.map((user, idx) => (
              <li key={idx} className="flex items-center gap-2 bg-surface border border-border p-2.5 rounded-xl">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-ink text-[13px] font-semibold">{user}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Inputs & Outputs */}
      {(sections.inputsRequired || sections.outputProduced) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.inputsRequired && sections.inputsRequired.length > 0 && (
            <div className="bg-surface border border-border p-5 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Inputs Required</h3>
              <ul className="space-y-1.5 text-xs">
                {sections.inputsRequired.map((inp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sections.outputProduced && sections.outputProduced.length > 0 && (
            <div className="bg-surface border border-border p-5 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Output Produced</h3>
              <ul className="space-y-1.5 text-xs">
                {sections.outputProduced.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 6. How to Use */}
      {sections.howToUse && sections.howToUse.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl text-ink tracking-tight flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> How to Use This Tool
          </h2>
          <ol className="space-y-2.5 list-none pl-0">
            {sections.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 7. User Operation Flow */}
      {sections.userOperationFlow && (
        <section className="bg-surface/50 border border-border rounded-2xl p-5 space-y-3">
          <h3 className="font-display font-bold text-[13px] text-ink uppercase tracking-wider">User Operation Flow</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {sections.userOperationFlow.split(' → ').map((flowStep, idx, arr) => (
              <React.Fragment key={idx}>
                <span className="bg-background border border-border px-3 py-1.5 rounded-lg text-ink font-semibold shadow-xs">
                  {flowStep}
                </span>
                {idx < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate/50" />}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* 8. Operation Works & Internal Processing */}
      {(sections.operationWorks || sections.internalProcessingFlow) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.operationWorks && sections.operationWorks.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">How the Operation Works</h3>
              <ul className="space-y-2 text-xs pl-0 list-none">
                {sections.operationWorks.map((work, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{work}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sections.internalProcessingFlow && sections.internalProcessingFlow.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Internal Processing Flow</h3>
              <ul className="space-y-2 text-xs pl-0 list-none">
                {sections.internalProcessingFlow.map((flow, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed font-mono text-slate">{flow}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 9. Operation Diagram */}
      {sections.operationDiagram && (
        <section className="space-y-3">
          <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider">Operation Diagram</h3>
          <pre className="bg-surface border border-border p-4 rounded-xl overflow-x-auto text-[11px] font-mono text-ink leading-normal whitespace-pre">
            {sections.operationDiagram.trim()}
          </pre>
        </section>
      )}

      {/* 10. Formula or Logic */}
      {sections.formulaOrLogic && (
        <section className="bg-primary/5 border border-primary/20 p-5 rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Formula / Calculation / Logic
          </h3>
          <div className="blog-content-body text-sm leading-relaxed">
            <p className="font-mono bg-background/50 border border-border/60 p-3.5 rounded-xl text-ink font-semibold">
              {sections.formulaOrLogic}
            </p>
          </div>
        </section>
      )}

      {/* 11. Working Example */}
      {sections.workingExample && (
        <section className="border border-border rounded-2xl overflow-hidden space-y-0">
          <div className="bg-surface border-b border-border p-4">
            <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Working Example</h3>
          </div>
          <div className="p-5 bg-background space-y-4 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate block mb-1">Input Parameter</span>
              <pre className="bg-surface border border-border p-3 rounded-lg overflow-x-auto text-ink whitespace-pre">{sections.workingExample.input}</pre>
            </div>
            
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate block mb-1">Execution Steps</span>
              <ul className="list-decimal pl-4 space-y-1 font-sans text-slate text-xs">
                {sections.workingExample.operation.map((opStep, idx) => (
                  <li key={idx}>{opStep}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate block mb-1">Output Result</span>
              <pre className="bg-surface border border-border p-3 rounded-lg overflow-x-auto text-ink whitespace-pre">{sections.workingExample.output}</pre>
            </div>
          </div>
        </section>
      )}

      {/* 12. Before & After */}
      {sections.beforeAfter && (
        <section className="space-y-3">
          <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider">Transformation (Before vs. After)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-surface border-b border-border px-4 py-2 font-display font-bold text-ink">Before</div>
              <pre className="p-3 overflow-x-auto text-slate bg-background whitespace-pre-wrap">{sections.beforeAfter.before}</pre>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-surface border-b border-border px-4 py-2 font-display font-bold text-ink">After</div>
              <pre className="p-3 overflow-x-auto text-ink bg-background whitespace-pre-wrap">{sections.beforeAfter.after}</pre>
            </div>
          </div>
        </section>
      )}

      {/* 13. Button Actions */}
      {sections.buttonActions && sections.buttonActions.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display font-bold text-xs text-slate uppercase tracking-wider">Button Actions Explained</h3>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-2 text-left font-display font-bold text-xs text-ink w-1/4">Button Name</th>
                  <th className="px-4 py-2 text-left font-display font-bold text-xs text-ink">Action Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs bg-background">
                {sections.buttonActions.map((btn, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2.5 font-semibold text-primary">{btn.button}</td>
                    <td className="px-4 py-2.5 text-slate">{btn.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 14. Major & Minor Use Cases */}
      {(sections.majorUses || sections.minorUses) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.majorUses && sections.majorUses.length > 0 && (
            <div className="bg-surface border border-border p-5 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Major Use Cases</h3>
              <ul className="space-y-1.5 text-xs">
                {sections.majorUses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sections.minorUses && sections.minorUses.length > 0 && (
            <div className="bg-surface border border-border p-5 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider">Minor Use Cases</h3>
              <ul className="space-y-1.5 text-xs">
                {sections.minorUses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 15. Common Mistakes */}
      {sections.commonMistakes && sections.commonMistakes.length > 0 && (
        <section className="p-5 border border-amber-500/20 bg-amber-500/[0.03] rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Common User Mistakes
          </h3>
          <ul className="space-y-1.5 text-xs pl-0 list-none">
            {sections.commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-semibold text-amber-500 dark:text-amber-400 mt-0.5">•</span>
                <span className="leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 16. What Happens If input is Invalid */}
      {sections.invalidInputHandling && sections.invalidInputHandling.length > 0 && (
        <section className="p-5 border border-red-500/20 bg-red-500/[0.03] rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> What Happens If the Input Is Invalid
          </h3>
          <ul className="space-y-1.5 text-xs pl-0 list-none">
            {sections.invalidInputHandling.map((handler, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-semibold text-red-500 dark:text-red-400 mt-0.5">•</span>
                <span className="leading-relaxed">{handler}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 17. Limitations */}
      {sections.limitations && sections.limitations.length > 0 && (
        <section className="p-5 border border-slate/30 bg-surface rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate" /> Honest Limitations
          </h3>
          <ul className="space-y-1.5 text-xs pl-0 list-none">
            {sections.limitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate">
                <span className="font-semibold text-slate mt-0.5">•</span>
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 18. Privacy Note */}
      {sections.privacyNote && (
        <section className="p-5 border border-primary/20 bg-primary/[0.03] rounded-2xl space-y-3">
          <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> Privacy & Security Note
          </h3>
          <p className="text-xs leading-relaxed font-semibold text-primary">{sections.privacyNote}</p>
        </section>
      )}

      {/* 19. Conclusion */}
      <section className="blog-content-body pt-4 border-t border-border/40">
        <div dangerouslySetInnerHTML={{ __html: sections.conclusion }} />
      </section>

    </article>
  );
}
