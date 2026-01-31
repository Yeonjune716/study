export enum Category {
  SCHOOL = 'School',
  ACADEMY = 'Academy',
  SELF = 'Self',
}

export enum CharacterStage {
  EGG = 'Egg',
  CHICK = 'Chick',
  OWL = 'Owl',
  PHOENIX = 'Phoenix',
}

export interface User {
  nickname: string;
  level: number;
  currentXp: number;
  requiredXp: number;
  coins: number;
  totalStudyTime: number; // in minutes
  streak: number;
  characterStage: CharacterStage;
  equippedItems: string[];
}

export interface TodoItem {
  id: string;
  title: string;
  subtitle?: string; // e.g., textbook name
  targetAmount?: string; // e.g., p.30-40
  category: Category;
  isCompleted: boolean;
  date: string; // ISO Date string
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  type: 'hat' | 'accessory' | 'bg';
}

export interface DailyStat {
  day: string;
  minutes: number;
}

export interface SubjectStat {
  subject: string;
  value: number;
  color: string;
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export interface TimeTableData {
  [key: string]: string[]; // Key is DayOfWeek, value is array of subjects (periods 1-7)
}