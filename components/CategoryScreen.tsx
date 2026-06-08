'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CategoryCard from './CategoryCard';
import GameStatsDisplay from './GameStats';
import { CATEGORY_INFO, WORDS_DATABASE, CategoryKey } from '@/lib/wordData';
import { GameStats } from '@/lib/gameUtils';
import { slideInFromTop, staggerIn, pulse } from '@/lib/animations';

interface CategoryScreenProps {
  stats: GameStats;
  onSelectCategory: (category: CategoryKey) => void;
}

export default function CategoryScreen({
  stats,
  onSelectCategory,
}: CategoryScreenProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const categories = Object.entries(CATEGORY_INFO) as Array<
    [CategoryKey, (typeof CATEGORY_INFO)[CategoryKey]]
  >;

  useEffect(() => {
    // Animate header container
    slideInFromTop(headerRef.current, 0);

    // Animate title with scale and opacity
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out',
          delay: 0.2,
        }
      );

      // Add breathing pulse to title
      pulse(titleRef.current);
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.4,
        }
      );
    }

    // Stagger animate category cards
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('[data-category-card]');
      staggerIn(cards, 'popIn', 0.08);
    }

    // Animate stats section
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.6,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-16 relative z-10">
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl font-black mb-6 gradient-text drop-shadow-2xl"
        >
          🎮 HANGMAN 🎮
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl"
        >
          Choose a category and test your knowledge
        </p>
      </div>

      {/* Categories Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-12 relative z-10">
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

      {/* Stats Section */}
      <div ref={statsRef} className="w-full max-w-6xl relative z-10">
        <GameStatsDisplay stats={stats} />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
