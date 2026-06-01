import React from 'react';
import { Metadata } from 'next';
import PomodoroContainer from '@/components/pomodoro/PomodoroContainer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Pomodoro Timer | Deep Focus Environment',
  description: 'A beautiful, distraction-free Pomodoro timer designed for deep work. Includes ambient sounds, task management, and focus modes.',
};

export default function PomodoroTimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 flex flex-col items-center pt-24 pb-20 px-4 max-w-7xl mx-auto w-full">
        {/* Title Area */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Focus Timer
          </h1>
          <p className="text-slate max-w-2xl mx-auto text-lg">
            A premium distraction-free environment for deep work.
          </p>
        </div>

        {/* Core Timer App */}
        <PomodoroContainer />

        {/* SEO & Educational Content */}
        <section className="mt-32 max-w-3xl mx-auto space-y-12 text-slate-300 px-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold text-foreground">What is the Pomodoro Technique?</h2>
            <p className="leading-relaxed">
              The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
              It uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. 
              Each interval is known as a Pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer 
              that Cirillo used as a university student.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold text-foreground">Benefits of Pomodoro</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li><strong>Manage Distractions:</strong> By committing to a short burst of focused work, it's easier to ignore external interruptions.</li>
              <li><strong>Prevent Burnout:</strong> Regular breaks ensure your mind stays fresh throughout long working sessions.</li>
              <li><strong>Improve Planning:</strong> Over time, you'll learn exactly how many pomodoros a given task requires, improving your estimation skills.</li>
              <li><strong>Maintain Motivation:</strong> Ticking off completed sessions gives a continuous sense of progression and accomplishment.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold text-foreground">How to use this timer effectively</h2>
            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
              <li><strong>Add your tasks:</strong> Use the focus tasks list to log what you intend to work on.</li>
              <li><strong>Start a 25-minute session:</strong> Hit the start button (or press Space) and focus completely until the timer rings.</li>
              <li><strong>Take a short break:</strong> Step away from your screen for 5 minutes. Stretch or grab a glass of water.</li>
              <li><strong>Repeat:</strong> After four pomodoros, take a longer 15-minute break to properly recharge.</li>
            </ol>
            <p className="mt-4 p-4 bg-surface rounded-xl border border-border">
              <em>Pro Tip:</em> Use the <strong>Focus Mode</strong> (eye icon) and hit <strong>F</strong> for fullscreen to hide all distractions and immerse yourself completely. Combine this with the ambient soundscapes for maximum concentration.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
