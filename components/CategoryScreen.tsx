'use client';

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
  const categories = Object.entries(CATEGORY_INFO) as Array<
    [CategoryKey, (typeof CATEGORY_INFO)[CategoryKey]]
  >;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      {/* Static gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text drop-shadow-2xl">
          🎮 HANGMAN 🎮
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl">
          Choose a category and test your knowledge
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-12 relative z-10">
        {categories.map(([key, info]) => {
          const wordCount = WORDS_DATABASE[key]?.length || 0;
          const categoryStats = stats.categoryStats[key] || { played: 0, won: 0 };

          return (
            <div key={key}>
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

      {/* Stats Section */}
      <div className="w-full max-w-6xl relative z-10">
        <GameStatsDisplay stats={stats} />
      </div>
    </div>
  );
}