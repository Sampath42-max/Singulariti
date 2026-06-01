import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricsSnapshot } from '@/hooks/useTypingMetrics';
import { captureImageCard, generateCertificate } from '@/lib/typing/exportUtils';
import { Download, Share2, Award, RotateCcw } from 'lucide-react';
import { updateTypingProfile } from '@/lib/typing/typingProfile';

interface ResultDashboardProps {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  history: MetricsSnapshot[];
  testDurationSecs: number;
  consistency: number;
  mistypedKeys: string[];
  mistakeInsight: string;
  onRestart: () => void;
}

export function ResultDashboard({
  wpm, rawWpm, accuracy, history, testDurationSecs, consistency, mistypedKeys, mistakeInsight, onRestart
}: ResultDashboardProps) {

  // Auto-save to profile
  useEffect(() => {
    updateTypingProfile(wpm, accuracy, testDurationSecs, consistency);
  }, [wpm, accuracy, testDurationSecs, consistency]);

  const handleShare = () => {
    captureImageCard('typing-result-card', 'singulariti-typing-result.png');
  };

  const handleCertificate = () => {
    const name = window.prompt("Enter your name for the certificate:", "Typing Enthusiast");
    if (!name) return;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    generateCertificate(name, wpm, accuracy, today);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Stats & Chart */}
      <div id="typing-result-card" className="flex flex-col bg-background p-6 md:p-8 rounded-2xl border border-border relative overflow-hidden">
        
        {/* Singulariti Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[120px] md:text-[200px] font-display font-black pointer-events-none tracking-tighter z-0 select-none">
          singulariti
        </div>

        {/* Hidden Header specifically for Image Export */}
        <div id="export-header" className="hidden items-center justify-between w-full mb-8 border-b border-border/50 pb-4 z-10">
          <div className="font-display font-black text-2xl tracking-tighter text-primary">singulariti.in</div>
          <div className="font-sans text-sm text-slate font-medium">Typing Speed Result</div>
        </div>

        {/* Quick Restart Button */}
        <button
          data-html2canvas-ignore="true"
          onClick={onRestart}
          className="absolute top-4 right-4 p-2 text-slate hover:text-foreground hover:bg-surface rounded-full transition-colors group z-20"
          title="Restart Test"
        >
          <RotateCcw size={20} className="group-hover:-rotate-90 transition-transform duration-300" />
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 z-10">
          <div className="flex items-end space-x-6 md:space-x-10">
            <div>
              <div className="text-sm font-sans text-slate uppercase tracking-widest font-bold mb-2">WPM</div>
              <div className="text-7xl md:text-8xl font-system font-black text-primary leading-none tracking-tighter">{wpm}</div>
            </div>
            <div>
              <div className="text-sm font-sans text-slate uppercase tracking-widest font-bold mb-2">Accuracy</div>
              <div className="text-4xl md:text-5xl font-system font-bold text-foreground leading-none tracking-tight">{accuracy}%</div>
            </div>
          </div>

          <div className="flex items-end space-x-6 bg-surface/40 px-6 py-4 rounded-xl border border-border/50 backdrop-blur-sm">
            <div>
              <div className="text-xs font-sans text-slate uppercase tracking-wider font-bold mb-1">Raw</div>
              <div className="text-xl md:text-2xl font-system font-bold text-foreground leading-none">{rawWpm}</div>
            </div>
            <div>
              <div className="text-xs font-sans text-slate uppercase tracking-wider font-bold mb-1">Consistency</div>
              <div className="text-xl md:text-2xl font-system font-bold text-foreground leading-none">{consistency}%</div>
            </div>
            <div>
              <div className="text-xs font-sans text-slate uppercase tracking-wider font-bold mb-1">Time</div>
              <div className="text-xl md:text-2xl font-system font-bold text-foreground leading-none">{testDurationSecs}s</div>
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--color-slate)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-slate)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-ink)' }}
                labelStyle={{ color: 'var(--color-slate)' }}
                itemStyle={{ color: 'var(--color-primary)' }}
              />
              <Area type="monotone" dataKey="wpm" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorWpm)" isAnimationActive={false} />
              <Area type="monotone" dataKey="rawWpm" stroke="var(--color-slate)" strokeWidth={1} fill="none" strokeDasharray="4 4" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mistake Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-border space-y-4">
          <h3 className="font-sans font-bold text-foreground flex items-center space-x-2">
            <span>Mistake Intelligence</span>
          </h3>
          <p className="text-sm font-sans text-slate">
            {mistakeInsight || "You didn't make enough recurring mistakes to generate an insight. Great job!"}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {mistypedKeys.map(k => (
              <div key={k} className="px-3 py-1 bg-background border border-border rounded text-sm text-red-400 font-system">
                {k === ' ' ? 'Space' : k}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-surface p-6 rounded-2xl border border-border flex flex-col justify-center space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 bg-background hover:bg-border border border-border text-foreground px-4 py-3 rounded-xl transition-colors font-sans text-sm font-semibold"
            >
              <Share2 size={16} />
              <span>Share Image</span>
            </button>
            <button
              onClick={handleCertificate}
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-xl transition-colors font-sans text-sm font-semibold"
            >
              <Award size={16} />
              <span>Get Certificate</span>
            </button>
          </div>
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center space-x-2 bg-foreground text-background hover:opacity-90 px-4 py-3 rounded-xl transition-opacity font-sans text-sm font-semibold"
          >
            <RotateCcw size={16} />
            <span>Restart Test</span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 bg-background/20 rounded text-xs ml-2">Tab + Enter</kbd>
          </button>
        </div>
      </div>

    </div>
  );
}
