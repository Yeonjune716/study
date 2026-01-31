import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { SUBJECT_COLORS } from '../constants';

const weeklyData = [
  { day: '월', minutes: 120 },
  { day: '화', minutes: 90 },
  { day: '수', minutes: 150 },
  { day: '목', minutes: 60 },
  { day: '금', minutes: 180 },
  { day: '토', minutes: 240 },
  { day: '일', minutes: 120 },
];

const subjectData = [
  { name: '수학', value: 400, color: '#a3e635' },
  { name: '영어', value: 300, color: '#3b82f6' },
  { name: '과학', value: 300, color: '#a855f7' },
  { name: '역사', value: 200, color: '#f97316' },
];

export const Statistics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">학습 리포트</h2>

      {/* Weekly Chart */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 mb-4">주간 집중 시간 (분)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#94a3b8', fontSize: 10 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes >= 120 ? '#a3e635' : '#475569'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Ratio */}
      <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">과목별 비중</h3>
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Best Focus Time */}
       <div className="bg-gradient-to-r from-indigo-900 to-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
           <div>
               <p className="text-xs text-indigo-300 font-bold uppercase">최고의 집중 시간</p>
               <p className="text-xl font-bold text-white mt-1">20:00 - 22:00</p>
           </div>
           <div className="bg-indigo-500/20 p-2 rounded-lg">
               <span className="text-2xl">🌙</span>
           </div>
       </div>
    </div>
  );
};