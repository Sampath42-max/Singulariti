import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Plus, Trash2, Volume2, VolumeX, Flame } from 'lucide-react';
import { PomodoroMode, Task, PomodoroStats } from '@/hooks/usePomodoroEngine';

export function TimerDisplay({ timeLeft, totalTime }: { timeLeft: number, totalTime: number }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const percentage = (timeLeft / totalTime) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96 mx-auto mb-12">
      <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 256 256">
        <circle 
          cx="128" cy="128" r={radius}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          className="text-surface"
        />
        <motion.circle 
          cx="128" cy="128" r={radius}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round"
          className="text-primary"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="z-10 flex flex-col items-center">
        <motion.div 
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter tabular-nums"
          key={`${minutes}:${seconds}`}
          initial={{ opacity: 0.5, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </motion.div>
      </div>
    </div>
  );
}

export function TimerControls({ 
  mode, isRunning, toggleTimer, changeMode, resetTimer, setCustomTime 
}: {
  mode: PomodoroMode,
  isRunning: boolean,
  toggleTimer: () => void,
  changeMode: (m: PomodoroMode) => void,
  resetTimer: () => void,
  setCustomTime: (m: number) => void
}) {
  const modes = [
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'short_break', label: 'Short Break' },
    { id: 'long_break', label: 'Long Break' }
  ];

  return (
    <div className="flex flex-col items-center space-y-8 z-20">
      <div className="flex bg-surface/50 p-1 rounded-full space-x-1 border border-border/50">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => changeMode(m.id as PomodoroMode)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === m.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-slate hover:text-foreground hover:bg-surface'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={resetTimer}
          className="p-3 text-slate hover:text-foreground hover:bg-surface rounded-full transition-colors"
          title="Reset Timer (R)"
        >
          <RotateCcw size={24} />
        </button>

        <button 
          onClick={toggleTimer}
          className={`flex items-center justify-center w-20 h-20 rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
            isRunning ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25' : 'bg-primary hover:bg-primary/90 shadow-primary/25'
          }`}
          title={isRunning ? "Pause (Space)" : "Start (Space)"}
        >
          {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
        </button>
        
        <div className="w-12 h-12" /> {/* Empty space for balance */}
      </div>
    </div>
  );
}

export function TaskManagement({
  tasks, addTask, toggleTask, deleteTask
}: {
  tasks: Task[], addTask: (t: string) => void, toggleTask: (id: string) => void, deleteTask: (id: string) => void
}) {
  const [input, setInput] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-surface/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="font-display font-semibold mb-4 text-lg">Focus Tasks</h3>
      
      <form onSubmit={handleAdd} className="flex space-x-2 mb-6">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 transition-opacity"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {tasks.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-slate text-sm py-4"
            >
              No tasks added yet. Add one above!
            </motion.p>
          )}
          {tasks.map(t => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                t.completed ? 'bg-surface/50 border-transparent opacity-60' : 'bg-background border-border shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <button onClick={() => toggleTask(t.id)} className="text-primary flex-shrink-0">
                  {t.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <span className={`text-sm truncate ${t.completed ? 'line-through text-slate' : ''}`}>
                  {t.title}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(t.id)}
                className="text-slate hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AmbientSounds({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sounds = [
    { id: 'rain', name: 'Rain', url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=heavy-rain-nature-sounds-8186.mp3' },
    { id: 'forest', name: 'Forest', url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447d7dd4.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3' },
    { id: 'cafe', name: 'Cafe', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=restaurant-noise-19958.mp3' },
    { id: 'ocean', name: 'Ocean', url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=sea-waves-nature-sounds-8185.mp3' }
  ];

  const handleSound = (id: string, url: string) => {
    if (!audioRef.current) return;
    
    if (activeSound === id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setActiveSound(id);
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm text-slate uppercase tracking-wider">Ambient Focus</h3>
        {activeSound && (
           <button 
             onClick={() => audioRef.current && (isPlaying ? audioRef.current.pause() : audioRef.current.play(), setIsPlaying(!isPlaying))}
             className="text-primary hover:text-primary/80"
           >
             {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
           </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sounds.map(s => (
          <button
            key={s.id}
            onClick={() => handleSound(s.id, s.url)}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
              activeSound === s.id 
                ? (isPlaying ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border text-foreground') 
                : 'bg-transparent border-border/50 text-slate hover:border-border hover:text-foreground hover:bg-surface/30'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StatsDisplay({ stats }: { stats: PomodoroStats }) {
  return (
    <div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
      <div className="bg-surface/30 rounded-xl p-4 text-center border border-border/50">
        <div className="text-2xl font-display font-bold text-foreground">{stats.sessionsCompleted}</div>
        <div className="text-xs text-slate uppercase tracking-wider mt-1">Sessions</div>
      </div>
      <div className="bg-surface/30 rounded-xl p-4 text-center border border-border/50">
        <div className="text-2xl font-display font-bold text-foreground">{Math.round(stats.totalFocusSeconds / 3600)}</div>
        <div className="text-xs text-slate uppercase tracking-wider mt-1">Hours</div>
      </div>
      <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20">
        <div className="text-2xl font-display font-bold text-primary flex items-center justify-center space-x-1">
          <span>{stats.currentStreak}</span>
          <Flame size={20} className="text-orange-500" />
        </div>
        <div className="text-xs text-primary/80 uppercase tracking-wider mt-1">Day Streak</div>
      </div>
    </div>
  );
}
