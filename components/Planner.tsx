import React, { useState } from 'react';
import { TodoItem, Category, TimeTableData, DayOfWeek } from '../types';
import { Plus, Clock, BookOpen, GraduationCap, Trash2, CalendarDays, ListTodo, Edit2 } from 'lucide-react';
import { SUBJECT_COLORS } from '../constants';

interface PlannerProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  onTaskComplete: (taskId: string) => void;
  timeTable?: TimeTableData;
  onUpdateTimetable?: (day: string, periodIndex: number, subject: string) => void;
}

export const Planner: React.FC<PlannerProps> = ({ 
  todos, 
  setTodos, 
  onTaskComplete,
  timeTable,
  onUpdateTimetable
}) => {
  const [activeView, setActiveView] = useState<'todo' | 'timetable'>('todo');
  
  // Todo State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<Category>(Category.SELF);

  // Timetable State
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Mon');

  // --- Todo Functions ---
  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newTask: TodoItem = {
      id: Date.now().toString(),
      title: newTitle,
      subtitle: newSubtitle,
      category: newCategory,
      isCompleted: false,
      date: new Date().toISOString().split('T')[0],
    };
    setTodos([...todos, newTask]);
    setIsAdding(false);
    setNewTitle('');
    setNewSubtitle('');
  };

  const handleDelay = (id: string) => {
      alert("할 일이 내일로 미뤄졌습니다!");
      const updatedTodos = todos.map(t => 
        t.id === id ? { ...t, date: "tomorrow_mock" } : t
      ).filter(t => t.date !== "tomorrow_mock");
      setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
      setTodos(todos.filter(t => t.id !== id));
  }

  const categoryLabels: Record<Category, string> = {
    [Category.SCHOOL]: '학교',
    [Category.ACADEMY]: '학원',
    [Category.SELF]: '자습',
  };

  const renderSection = (title: string, category: Category, icon: React.ReactNode) => {
    const sectionTodos = todos.filter((t) => t.category === category);
    if (sectionTodos.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3 text-slate-300">
          {icon}
          <h3 className="font-semibold text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className="space-y-3">
          {sectionTodos.map((todo) => (
            <div
              key={todo.id}
              className={`relative group bg-slate-800 rounded-xl p-4 border border-slate-700 transition-all ${
                todo.isCompleted ? 'opacity-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onTaskComplete(todo.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.isCompleted
                          ? 'bg-primary border-primary text-slate-900'
                          : 'border-slate-500 hover:border-primary'
                      }`}
                    >
                      {todo.isCompleted && <div className="w-2.5 h-2.5 bg-current rounded-full" />}
                    </button>
                    <div>
                      <h4 className={`font-medium ${todo.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                        {todo.title}
                      </h4>
                      {todo.subtitle && (
                        <p className="text-xs text-slate-400 mt-0.5">{todo.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {!todo.isCompleted && (
                    <div className="flex space-x-2">
                         <button 
                            onClick={() => handleDelay(todo.id)}
                            className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors"
                         >
                            미루기
                        </button>
                         <button 
                            onClick={() => handleDelete(todo.id)}
                            className="text-slate-600 hover:text-alert transition-colors"
                         >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
              </div>
              <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r ${SUBJECT_COLORS[category]}`} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Timetable Render ---
  const renderTimetable = () => {
    if (!timeTable || !onUpdateTimetable) return null;

    const days: { key: DayOfWeek; label: string }[] = [
      { key: 'Mon', label: '월' },
      { key: 'Tue', label: '화' },
      { key: 'Wed', label: '수' },
      { key: 'Thu', label: '목' },
      { key: 'Fri', label: '금' },
    ];

    return (
      <div className="animate-fade-in">
        {/* Day Selector */}
        <div className="flex bg-slate-800 p-1 rounded-xl mb-6">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedDay === day.key
                  ? 'bg-primary text-slate-900 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Periods List */}
        <div className="space-y-3">
          {timeTable[selectedDay].map((subject, index) => (
            <div key={index} className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={subject}
                  placeholder="과목 입력"
                  onChange={(e) => onUpdateTimetable(selectedDay, index, e.target.value)}
                  className="bg-transparent text-white font-medium w-full outline-none focus:border-b focus:border-primary transition-colors placeholder:text-slate-600"
                />
              </div>
              <Edit2 size={14} className="text-slate-600" />
            </div>
          ))}
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-6">
          과목명을 탭하여 시간표를 수정하세요.
        </p>
      </div>
    );
  };

  return (
    <div className="pb-20">
      {/* Top Toggle Switch */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-slate-800 p-1 rounded-full border border-slate-700 flex">
          <button
            onClick={() => setActiveView('todo')}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeView === 'todo' ? 'bg-slate-600 text-white' : 'text-slate-400'
            }`}
          >
            <ListTodo size={16} />
            <span>할 일</span>
          </button>
          <button
            onClick={() => setActiveView('timetable')}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeView === 'timetable' ? 'bg-slate-600 text-white' : 'text-slate-400'
            }`}
          >
            <CalendarDays size={16} />
            <span>시간표</span>
          </button>
        </div>
      </div>

      {activeView === 'todo' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">오늘의 계획</h2>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-primary text-slate-900 p-2 rounded-full hover:bg-lime-500 transition-colors shadow-lg shadow-primary/20"
            >
              <Plus size={24} />
            </button>
          </div>

          {isAdding && (
            <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700 animate-slide-in-down">
              <input
                type="text"
                placeholder="할 일을 입력하세요"
                className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-primary outline-none mb-3"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="상세 내용 (예: 수학 익힘책 p.30)"
                className="w-full bg-slate-900 text-white p-3 rounded-lg border border-slate-700 focus:border-primary outline-none mb-3 text-sm"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
              />
              <div className="flex space-x-2 mb-4">
                {(Object.values(Category) as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors border ${
                      newCategory === cat
                        ? 'bg-slate-700 border-primary text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-primary text-slate-900 py-3 rounded-lg font-bold hover:bg-lime-500 transition-colors"
              >
                추가하기
              </button>
            </div>
          )}

          {renderSection('학교 수업', Category.SCHOOL, <GraduationCap size={16} />)}
          {renderSection('학원/과외', Category.ACADEMY, <Clock size={16} />)}
          {renderSection('자습', Category.SELF, <BookOpen size={16} />)}

          {todos.length === 0 && !isAdding && (
            <div className="text-center text-slate-500 mt-20">
              <p>오늘 할 일이 없네요. 자유를 즐기세요! 🎉</p>
            </div>
          )}
        </>
      ) : (
        renderTimetable()
      )}
    </div>
  );
};