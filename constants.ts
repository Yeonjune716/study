import { Category, CharacterStage, ShopItem, TodoItem, User, TimeTableData } from './types';

export const INITIAL_USER: User = {
  nickname: '학생',
  level: 1,
  currentXp: 0,
  requiredXp: 100,
  coins: 50,
  totalStudyTime: 120, // Initial mock time
  streak: 3,
  characterStage: CharacterStage.EGG,
  equippedItems: [],
};

export const SHOP_ITEMS: ShopItem[] = [
  { id: '1', name: '마법사 모자', price: 100, emoji: '🎩', type: 'hat' },
  { id: '2', name: '멋진 안경', price: 150, emoji: '🕶️', type: 'accessory' },
  { id: '3', name: '황금 왕관', price: 500, emoji: '👑', type: 'hat' },
  { id: '4', name: '모닝 커피', price: 50, emoji: '☕', type: 'accessory' },
];

export const MOCK_TODOS: TodoItem[] = [
  {
    id: '1',
    title: '수학 수업',
    subtitle: '이차방정식',
    category: Category.SCHOOL,
    isCompleted: true,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: '영어 학원',
    subtitle: '문법 5단원',
    category: Category.ACADEMY,
    isCompleted: false,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    title: '과학 자습',
    subtitle: '물리 문제 풀이',
    targetAmount: 'p.12-15',
    category: Category.SELF,
    isCompleted: false,
    date: new Date().toISOString().split('T')[0],
  },
];

export const SUBJECT_COLORS = {
  [Category.SCHOOL]: 'bg-blue-500',
  [Category.ACADEMY]: 'bg-purple-500',
  [Category.SELF]: 'bg-primary',
};

export const INITIAL_TIMETABLE: TimeTableData = {
  Mon: ['국어', '수학', '영어', '과학', '체육', '역사', '자습'],
  Tue: ['수학', '영어', '음악', '사회', '국어', '과학', '동아리'],
  Wed: ['영어', '수학', '도덕', '미술', '체육', '자습', ''],
  Thu: ['과학', '역사', '국어', '수학', '기술', '영어', '진로'],
  Fri: ['사회', '과학', '수학', '영어', '국어', '체육', '학급'],
};

export const XP_PER_MINUTE = 1;
export const COIN_REWARD_TASK = 10;
export const COIN_REWARD_COMPLETE_ALL = 50;