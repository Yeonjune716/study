import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { User, TodoItem, Category } from '../types';
import { Clock, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: User;
  todos: TodoItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, todos }) => {
  const completedTodos = todos.filter(t => t.isCompleted).length;
  const totalTodos = todos.length;
  const progress = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

  // Mock D-Day Data
  const dDayEvent = { name: '중간고사', daysLeft: 12 };
  
  // Data for today's focus chart
  const dailyGoalMinutes = 180;
  const todayMinutes = 45; // Mock: actual tracking would require daily reset logic
  
  const chartData = [
    { name: 'Completed', value: todayMinutes },
    { name: 'Remaining', value: Math.max(0, dailyGoalMinutes - todayMinutes) },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome & Streak */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">안녕하세요, {user.nickname}님 👋</h1>
          <p className="text-slate-400 text-sm">오늘도 레벨업 해볼까요?</p>
        </div>
        <div className="flex items-center space-x-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          <TrendingUp size={16} className="text-orange-400" />
          <span className="text-sm font-bold text-orange-400">{user.streak}일 연속</span>
        </div>
      </div>

      {/* D-Day Widget */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Calendar size={80} />
        </div>
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">다가오는 일정</p>
          <div className="flex justify-between items-end mt-2">
            <h2 className="text-xl font-bold text-white">{dDayEvent.name}</h2>
            <div className="text-3xl font-black text-primary">D-{dDayEvent.daysLeft}</div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-2 gap-4">
        {/* Progress Chart */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center justify-center">
          <p className="text-slate-400 text-xs font-semibold mb-2">오늘의 목표</p>
          <div className="h-24 w-24 relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell key="cell-0" fill="#a3e635" />
                  <Cell key="cell-1" fill="#334155" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xs font-bold text-white">{Math.round((todayMinutes / dailyGoalMinutes) * 100)}%</span>
            </div>
          </div>
           <p className="text-xs text-slate-400 mt-2">{todayMinutes}/{dailyGoalMinutes} 분</p>
        </div>

        {/* Task Summary */}
        <div className="space-y-4">
             <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 h-full flex flex-col justify-between">
                 <div>
                    <p className="text-slate-400 text-xs font-semibold">할 일</p>
                    <div className="flex items-end space-x-1 mt-2">
                        <span className="text-2xl font-bold text-white">{completedTodos}</span>
                        <span className="text-sm text-slate-500 mb-1">/ {totalTodos}</span>
                    </div>
                 </div>
                 <div className="w-full bg-slate-700 h-2 rounded-full mt-2">
                     <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                     ></div>
                 </div>
             </div>
        </div>
      </div>

      {/* Quote / Tip */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <p className="text-primary text-sm font-medium text-center">
            "시작이 반이다. 일단 자리에 앉아보자!"
          </p>
      </div>
    </div>
  );
};