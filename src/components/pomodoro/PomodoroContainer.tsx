'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePomodoroEngine } from '@/hooks/usePomodoroEngine';
import { TimerDisplay, TimerControls, TaskManagement, AmbientSounds, StatsDisplay } from './PomodoroComponents';
import { Maximize, Minimize, Eye, EyeOff } from 'lucide-react';

export default function PomodoroContainer() {
  const engine = usePomodoroEngine();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen().catch(err => console.error(err));
    } else {
      await document.exitFullscreen().catch(err => console.error(err));
    }
  };

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        engine.toggleTimer();
      } else if (e.code === 'KeyR' || e.key === 'r') {
        e.preventDefault();
        engine.resetTimer();
      } else if (e.code === 'KeyF' || e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [engine, toggleFullscreen]);

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center min-h-[80vh] w-full transition-colors duration-500 rounded-3xl ${
        isFullscreen ? 'bg-background min-h-screen rounded-none' : 'bg-transparent'
      }`}
    >
      <audio ref={engine.audioRef} loop />

      {/* Top right controls */}
      <div className={`absolute top-6 right-6 flex items-center space-x-4 z-50 transition-opacity duration-300 ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className="p-2 bg-surface/50 hover:bg-surface rounded-full text-slate hover:text-foreground transition-colors backdrop-blur-sm border border-border/50"
          title={isFocusMode ? "Disable Focus Mode" : "Enable Focus Mode"}
        >
          {isFocusMode ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-surface/50 hover:bg-surface rounded-full text-slate hover:text-foreground transition-colors backdrop-blur-sm border border-border/50"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
        
        <TimerDisplay 
          timeLeft={engine.timeLeft} 
          totalTime={engine.totalTime} 
        />
        
        <TimerControls 
          mode={engine.mode}
          isRunning={engine.isRunning}
          toggleTimer={engine.toggleTimer}
          changeMode={engine.changeMode}
          resetTimer={engine.resetTimer}
          setCustomTime={engine.setCustomTime}
        />

        {/* Extra UI hidden in Focus Mode */}
        <div className={`w-full max-w-4xl mx-auto transition-all duration-500 overflow-hidden ${isFocusMode ? 'opacity-0 max-h-0 pointer-events-none' : 'opacity-100 max-h-[1000px] mt-12'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <TaskManagement 
                tasks={engine.tasks}
                addTask={engine.addTask}
                toggleTask={engine.toggleTask}
                deleteTask={engine.deleteTask}
              />
            </div>
            <div className="space-y-8">
              <StatsDisplay stats={engine.stats} />
              <AmbientSounds audioRef={engine.audioRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
