import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricsSnapshot } from '@/hooks/useTypingMetrics';
import { captureImageCard, generateCertificate } from '@/lib/typing/exportUtils';
import { Download, Share2, Award } from 'lucide-react';
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
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    generateCertificate('', wpm, accuracy, today);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Stats & Chart */}
      <div id="typing-result-card" className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-background p-6 rounded-2xl border border-border relative overflow-hidden">
        
        {/* Singulariti Watermark for sharing */}
        <div className="absolute -bottom-4 -right-4 opacity-5 text-9xl font-display font-black pointer-events-none tracking-tighter">
          singulariti
        </div>

        <div className="md:col-span-1 space-y-6 flex flex-col justify-center">
          <div>
            <div className="text-sm font-sans text-slate uppercase tracking-wider font-bold">WPM</div>
            <div className="text-6xl font-system font-black text-primary">{wpm}</div>
          </div>
          <div>
            <div className="text-sm font-sans text-slate uppercase tracking-wider font-bold">Accuracy</div>
            <div className="text-4xl font-system font-bold text-foreground">{accuracy}%</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-sans text-slate uppercase tracking-wider font-bold">Raw</div>
              <div className="text-xl font-system font-bold text-foreground">{rawWpm}</div>
            </div>
            <div>
              <div className="text-xs font-sans text-slate uppercase tracking-wider font-bold">Consistency</div>
              <div className="text-xl font-system font-bold text-foreground">{consistency}%</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 h-[250px] w-full">
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
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--ink-color)' }}
                labelStyle={{ color: 'var(--slate-color)' }}
                itemStyle={{ color: 'var(--color-primary)' }}
              />
              <Area type="monotone" dataKey="wpm" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorWpm)" />
              <Area type="monotone" dataKey="rawWpm" stroke="var(--color-slate)" strokeWidth={1} fill="none" strokeDasharray="4 4" />
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
            <span>Start Next Test</span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 bg-background/20 rounded text-xs ml-2">Tab + Enter</kbd>
          </button>
        </div>
      </div>

    </div>
  );
}
