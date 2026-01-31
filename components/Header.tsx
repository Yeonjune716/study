import React from 'react';
import { User } from '../types';
import { Coins, Star, Zap } from 'lucide-react';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const xpPercent = Math.min(100, (user.currentXp / user.requiredXp) * 100);

  return (
    <header className="bg-slate-900/90 backdrop-blur-md pt-safe-top px-4 pb-2 border-b border-slate-800 z-50 sticky top-0">
      <div className="flex justify-between items-center h-12">
        
        {/* Level & XP */}
        <div className="flex flex-col w-1/3">
            <div className="flex items-center space-x-1 text-xs font-bold text-primary mb-1">
                <Star size={12} fill="currentColor" />
                <span>Lv. {user.level}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${xpPercent}%` }}
                ></div>
            </div>
        </div>

        {/* Title/Logo */}
        <div className="font-black text-lg tracking-tight text-white">
            Study<span className="text-primary">Quest</span>
        </div>

        {/* Coins */}
        <div className="flex justify-end w-1/3">
            <div className="flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                <Coins size={14} className="text-yellow-400" fill="currentColor" />
                <span className="text-xs font-bold text-white">{user.coins}</span>
            </div>
        </div>
      </div>
    </header>
  );
};