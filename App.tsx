import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Planner } from './components/Planner';
import { FocusTimer } from './components/FocusTimer';
import { CharacterShop } from './components/CharacterShop';
import { Statistics } from './components/Statistics';
import { INITIAL_USER, MOCK_TODOS, INITIAL_TIMETABLE, COIN_REWARD_TASK, XP_PER_MINUTE } from './constants';
import { User, TodoItem, ShopItem, CharacterStage, TimeTableData } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [todos, setTodos] = useState<TodoItem[]>(MOCK_TODOS);
  const [timeTable, setTimeTable] = useState<TimeTableData>(INITIAL_TIMETABLE);

  // --- Logic: Task Completion ---
  const handleTaskComplete = (taskId: string) => {
    setTodos(prev => prev.map(t => {
      if (t.id === taskId && !t.isCompleted) {
        // Reward user
        setUser(u => ({ ...u, coins: u.coins + COIN_REWARD_TASK }));
        return { ...t, isCompleted: true };
      }
      return t;
    }));
  };

  // --- Logic: Buying Items ---
  const handleBuyItem = (item: ShopItem) => {
    if (user.coins >= item.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        equippedItems: [...prev.equippedItems, item.emoji]
      }));
    }
  };

  // --- Logic: Update Timetable ---
  const handleUpdateTimetable = (day: string, periodIndex: number, subject: string) => {
    setTimeTable(prev => ({
      ...prev,
      [day]: prev[day].map((sub, idx) => idx === periodIndex ? subject : sub)
    }));
  };

  // --- Logic: Session Complete (Timer) ---
  const handleSessionComplete = (minutes: number, subject: string) => {
    const xpGained = minutes * XP_PER_MINUTE;
    
    setUser(prev => {
        let newXp = prev.currentXp + xpGained;
        let newLevel = prev.level;
        let newReqXp = prev.requiredXp;
        
        // Level Up Logic
        while (newXp >= newReqXp) {
            newXp -= newReqXp;
            newLevel += 1;
            newReqXp = newLevel * 100;
        }

        // Character Evolution Check
        const totalHours = Math.floor((prev.totalStudyTime + minutes) / 60);
        let newStage = prev.characterStage;
        if (totalHours >= 10 && prev.characterStage === CharacterStage.EGG) newStage = CharacterStage.CHICK;
        else if (totalHours >= 50 && prev.characterStage === CharacterStage.CHICK) newStage = CharacterStage.OWL;
        else if (totalHours >= 100 && prev.characterStage === CharacterStage.OWL) newStage = CharacterStage.PHOENIX;

        return {
            ...prev,
            level: newLevel,
            currentXp: newXp,
            requiredXp: newReqXp,
            totalStudyTime: prev.totalStudyTime + minutes,
            characterStage: newStage
        };
    });
    
    alert(`참 잘했어요! +${xpGained} XP 획득!`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard user={user} todos={todos} />;
      case 'planner':
        return (
          <Planner 
            todos={todos} 
            setTodos={setTodos} 
            onTaskComplete={handleTaskComplete}
            timeTable={timeTable}
            onUpdateTimetable={handleUpdateTimetable}
          />
        );
      case 'focus':
        return <FocusTimer onSessionComplete={handleSessionComplete} />;
      case 'stats':
        return <Statistics />;
      case 'character':
        return <CharacterShop user={user} onBuyItem={handleBuyItem} />;
      default:
        return <Dashboard user={user} todos={todos} />;
    }
  };

  return (
    <Layout 
      header={<Header user={user} />}
      bottomNav={<Navigation activeTab={activeTab} onTabChange={setActiveTab} />}
    >
      <div className="max-w-md mx-auto">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;