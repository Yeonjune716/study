import React from 'react';
import { User, CharacterStage, ShopItem } from '../types';
import { SHOP_ITEMS } from '../constants';
import { Coins, Lock, ShoppingBag } from 'lucide-react';

interface CharacterShopProps {
  user: User;
  onBuyItem: (item: ShopItem) => void;
}

export const CharacterShop: React.FC<CharacterShopProps> = ({ user, onBuyItem }) => {
  const getCharacterEmoji = (stage: CharacterStage) => {
    switch (stage) {
      case CharacterStage.EGG: return '🥚';
      case CharacterStage.CHICK: return '🐣';
      case CharacterStage.OWL: return '🦉';
      case CharacterStage.PHOENIX: return '🦅';
      default: return '🥚';
    }
  };

  const getNextStageInfo = (stage: CharacterStage) => {
      if(stage === CharacterStage.EGG) return { next: '병아리', hours: 10 };
      if(stage === CharacterStage.CHICK) return { next: '부엉이', hours: 50 };
      if(stage === CharacterStage.OWL) return { next: '불사조', hours: 100 };
      return { next: '최고 레벨', hours: 9999 };
  }

  const nextInfo = getNextStageInfo(user.characterStage);
  const currentHours = Math.floor(user.totalStudyTime / 60);
  const progressPercent = Math.min(100, (currentHours / nextInfo.hours) * 100);

  return (
    <div className="space-y-8">
      {/* Character Display */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 text-center">
            <div className="text-8xl mb-4 animate-bounce-slow filter drop-shadow-2xl">
                {getCharacterEmoji(user.characterStage)}
            </div>
            
            {/* Equipped Items Overlay (Simplified Visuals) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center">
                 {user.equippedItems.map((itemEmoji, idx) => (
                     <div key={idx} className="absolute text-4xl -mt-4 animate-pulse">
                         {itemEmoji}
                     </div>
                 ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{user.nickname}님의 {user.characterStage}</h2>
            <p className="text-primary font-medium text-sm">레벨 {user.level}</p>
        </div>

        {/* Evolution Progress */}
        <div className="w-full mt-8">
             <div className="flex justify-between text-xs text-slate-400 mb-2">
                 <span>현재: {currentHours}시간</span>
                 <span>다음: {nextInfo.next} ({nextInfo.hours}시간)</span>
             </div>
             <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                 <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                 ></div>
             </div>
        </div>
      </div>

      {/* Shop */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
            <ShoppingBag className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-white">아이템 상점</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => {
            const isOwned = user.equippedItems.includes(item.emoji); // Simplified ownership logic
            const canAfford = user.coins >= item.price;

            return (
              <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                
                <button
                  onClick={() => !isOwned && canAfford && onBuyItem(item)}
                  disabled={isOwned || !canAfford}
                  className={`mt-3 w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1 ${
                    isOwned 
                      ? 'bg-slate-700 text-slate-400 cursor-default'
                      : canAfford 
                        ? 'bg-primary text-slate-900 hover:bg-lime-500'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isOwned ? (
                    <span>보유중</span>
                  ) : (
                    <>
                      <Coins size={12} />
                      <span>{item.price}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
          
          {/* Locked Item Example */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center opacity-70">
              <Lock className="text-slate-500 mb-2" size={24} />
              <span className="text-xs text-slate-500">Lv. 10에 잠금 해제</span>
          </div>
        </div>
      </div>
    </div>
  );
};