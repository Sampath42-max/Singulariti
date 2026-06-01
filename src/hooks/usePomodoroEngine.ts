import { useState, useEffect, useRef, useCallback } from 'react';

export type PomodoroMode = 'pomodoro' | 'short_break' | 'long_break' | 'custom';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface PomodoroStats {
  sessionsCompleted: number;
  totalFocusSeconds: number;
  currentStreak: number;
  lastSessionDate?: string;
}

const DEFAULT_TIMES = {
  pomodoro: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60,
  custom: 25 * 60,
};

export function usePomodoroEngine() {
  const [mode, setMode] = useState<PomodoroMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<PomodoroStats>({
    sessionsCompleted: 0,
    totalFocusSeconds: 0,
    currentStreak: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const storedStats = localStorage.getItem('singulariti_pomodoro_stats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
      const storedTasks = localStorage.getItem('singulariti_pomodoro_tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.error("Failed to load pomodoro data", e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('singulariti_pomodoro_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('singulariti_pomodoro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSessionComplete = useCallback(() => {
    if (mode === 'pomodoro' || mode === 'custom') {
      const today = new Date().toDateString();
      setStats(prev => {
        let newStreak = prev.currentStreak;
        if (prev.lastSessionDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (prev.lastSessionDate === yesterday.toDateString()) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }
        return {
          ...prev,
          sessionsCompleted: prev.sessionsCompleted + 1,
          totalFocusSeconds: prev.totalFocusSeconds + DEFAULT_TIMES[mode],
          currentStreak: newStreak,
          lastSessionDate: today,
        };
      });
      // Auto-switch to short break
      changeMode('short_break');
    } else {
      // After break, switch to pomodoro
      changeMode('pomodoro');
    }
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, handleSessionComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const changeMode = (newMode: PomodoroMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DEFAULT_TIMES[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIMES[mode]);
  };

  const setCustomTime = (minutes: number) => {
    DEFAULT_TIMES.custom = minutes * 60;
    changeMode('custom');
  };

  // Task Management
  const addTask = (title: string) => {
    if (!title.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), title, completed: false }]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return {
    mode,
    timeLeft,
    isRunning,
    stats,
    tasks,
    totalTime: DEFAULT_TIMES[mode],
    toggleTimer,
    changeMode,
    resetTimer,
    setCustomTime,
    addTask,
    toggleTask,
    deleteTask,
  };
}
