import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { User, Category } from '../types';
import { XP_PER_MINUTE } from '../constants';

interface FocusTimerProps {
  onSessionComplete: (minutes: number, subject: string) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onSessionComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [mode, setMode] = useState<'stopwatch' | 'pomodoro'>('stopwatch');
  const [pomoState, setPomoState] = useState<'work' | 'break'>('work');
  const [selectedSubject, setSelectedSubject] = useState<string>('수학');
  const [whiteNoise, setWhiteNoise] = useState(false);

  // Refs for interval
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (mode === 'stopwatch') {
          setTime((prev) => prev + 1);
        } else {
          // Pomodoro countdown
          setTime((prev) => {
            if (prev <= 0) {
              handlePomodoroSwitch();
              return prev;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handlePomodoroSwitch = () => {
    // Determine next state
    setIsRunning(false);
    // Beep sound here ideally
    if (pomoState === 'work') {
      const minutesWorked = 25;
      onSessionComplete(minutesWorked, selectedSubject);
      setPomoState('break');
      setTime(5 * 60); // 5 min break
    } else {
      setPomoState('work');
      setTime(25 * 60); // 25 min work
    }
  };

  const toggleTimer = () => {
    if (!isRunning && mode === 'pomodoro' && time === 0) {
      setTime(25 * 60);
    }
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (mode === 'stopwatch' && time > 60) {
      // Only count if more than 1 minute
      const minutes = Math.floor(time / 60);
      onSessionComplete(minutes, selectedSubject);
    }
    setTime(0);
    if (mode === 'pomodoro') {
      setPomoState('work');
      setTime(25 * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full items-center justify-center space-y-8 py-4">
      {/* Subject Selector */}
      <div className="w-full">
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 block text-center">
          현재 과목
        </label>
        <div className="flex justify-center space-x-2">
          {['수학', '영어', '과학', '역사'].map((sub) => (
            <button
              key={sub}
              onClick={() => !isRunning && setSelectedSubject(sub)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSubject === sub
                  ? 'bg-primary text-slate-900'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative">
        <div className={`w-64 h-64 rounded-full flex items-center justify-center border-8 shadow-[0_0_30px_rgba(163,230,53,0.1)] transition-colors ${
             isRunning ? 'border-primary' : 'border-slate-700'
        }`}>
          <div className="text-center">
             <div className="text-6xl font-black tabular-nums tracking-tight text-white">
                {formatTime(time)}
             </div>
             <div className="text-slate-400 text-sm mt-2 font-medium">
                {mode === 'pomodoro' ? (pomoState === 'work' ? '🔥 집중' : '☕ 휴식') : '⏱️ 스톱워치'}
             </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        {!isRunning && time === 0 && (
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => { setMode('stopwatch'); setTime(0); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'stopwatch' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              스톱워치
            </button>
            <button
              onClick={() => { setMode('pomodoro'); setTime(25 * 60); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'pomodoro' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              뽀모도로
            </button>
          </div>
        )}

        {(isRunning || time > 0) && (
            <div className="flex items-center space-x-4">
                 <button
                  onClick={toggleTimer}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors shadow-lg"
                >
                  {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                <button
                  onClick={stopTimer}
                  className="w-12 h-12 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-alert hover:bg-slate-700 transition-colors"
                >
                  <Square size={20} fill="currentColor" />
                </button>
            </div>
        )}
      </div>

      {/* White Noise Toggle */}
       <button
        onClick={() => setWhiteNoise(!whiteNoise)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
          whiteNoise
            ? 'bg-slate-700 border-primary text-primary'
            : 'bg-transparent border-slate-700 text-slate-500'
        }`}
      >
        {whiteNoise ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span className="text-xs font-medium">화이트 노이즈 {whiteNoise ? 'ON' : 'OFF'}</span>
      </button>

      {/* Info */}
      <p className="text-xs text-slate-500 text-center max-w-xs">
         팁: 최소 1분 이상 공부해야 XP가 지급되고 통계에 기록됩니다.
      </p>
    </div>
  );
};