'use client';

import { useState, useEffect } from 'react';
import CategoryScreen from '@/components/CategoryScreen';
import GameBoard from '@/components/GameBoard';
import { CategoryKey } from '@/lib/wordData';
import { GameStats, loadStats } from '@/lib/gameUtils';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'categories' | 'game'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [stats, setStats] = useState<GameStats>({
    totalGames: 0,
    gamesWon: 0,
    categoryStats: {},
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load stats on mount
  useEffect(() => {
    const loadedStats = loadStats();
    setStats(loadedStats);
    setIsHydrated(true);
  }, []);

  const handleSelectCategory = (category: CategoryKey) => {
    setSelectedCategory(category);
    setCurrentScreen('game');
  };

  const handleBackToCategories = () => {
    setCurrentScreen('categories');
    setSelectedCategory(null);
  };

  const handleStatsUpdate = (newStats: GameStats) => {
    setStats(newStats);
  };

  if (!isHydrated) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {currentScreen === 'categories' ? (
        <CategoryScreen stats={stats} onSelectCategory={handleSelectCategory} />
      ) : selectedCategory ? (
        <GameBoard
          category={selectedCategory}
          stats={stats}
          onBack={handleBackToCategories}
          onStatsUpdate={handleStatsUpdate}
        />
      ) : null}
    </>
  );
}
