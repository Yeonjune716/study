import React from 'react';
import { Home, ListTodo, Timer, User, BarChart2 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'planner', icon: ListTodo, label: '계획' },
    { id: 'focus', icon: Timer, label: '집중' },
    { id: 'stats', icon: BarChart2, label: '통계' },
    { id: 'character', icon: User, label: '내 정보' },
  ];

  return (
    <nav className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};