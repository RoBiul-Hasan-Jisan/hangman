'use client';

import { useRef } from 'react';
import CategoryCard from './CategoryCard';
import GameStatsDisplay from './GameStats';
import { CATEGORY_INFO, WORDS_DATABASE, CategoryKey } from '@/lib/wordData';
import { GameStats } from '@/lib/gameUtils';

interface CategoryScreenProps {
  stats: GameStats;
  onSelectCategory: (category: CategoryKey) => void;
}

export default function CategoryScreen({
  stats,
  onSelectCategory,
}: CategoryScreenProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(CATEGORY_INFO) as Array<
    [CategoryKey, (typeof CATEGORY_INFO)[CategoryKey]]
  >;



  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b border-card-border bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              <span className="gradient-text">Hangman</span>
            </h1>
            <p className="text-lg text-gray-600">
              Pick a category and guess the word
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="mb-16">
          <GameStatsDisplay stats={stats} />
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Choose a Category</h2>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(([key, info]) => {
              const wordCount = WORDS_DATABASE[key]?.length || 0;
              const categoryStats = stats.categoryStats[key] || { played: 0, won: 0 };

              return (
                <div key={key} data-category-card>
                  <CategoryCard
                    name={key}
                    info={info}
                    wordCount={wordCount}
                    played={categoryStats.played}
                    won={categoryStats.won}
                    onClick={() => onSelectCategory(key)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
