'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GameStats } from '@/lib/gameUtils';
import { countUp } from '@/lib/animations';

interface GameStatsDisplayProps {
  stats: GameStats;
}

export default function GameStatsDisplay({ stats }: GameStatsDisplayProps) {
  const winRate = stats.totalGames > 0
    ? Math.round((stats.gamesWon / stats.totalGames) * 100)
    : 0;

  const totalRef = useRef<HTMLDivElement>(null);
  const wonRef = useRef<HTMLDivElement>(null);
  const winRateRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('[data-stat-card]');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out',
            delay: index * 0.1,
          }
        );
      });
    }

    // Counter animations
    if (totalRef.current) {
      const totalElement = totalRef.current.querySelector('[data-count]');
      if (totalElement) {
        countUp(totalElement as HTMLElement, 0, stats.totalGames, 1.5);
      }
    }

    if (wonRef.current) {
      const wonElement = wonRef.current.querySelector('[data-count]');
      if (wonElement) {
        countUp(wonElement as HTMLElement, 0, stats.gamesWon, 1.5);
      }
    }

    if (winRateRef.current) {
      const winRateElement = winRateRef.current.querySelector('[data-count]');
      if (winRateElement) {
        countUp(winRateElement as HTMLElement, 0, winRate, 1.5);
      }
    }
  }, [stats, winRate]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
    >
      {/* Total Games Card */}
      <div
        ref={totalRef}
        data-stat-card
        className="glass group cursor-pointer relative overflow-hidden border-2 border-blue-500/30 p-6 hover:border-blue-500/60 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-blue-500 opacity-10 blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="text-4xl md:text-5xl">🎯</div>
          <div className="flex-1">
            <div className="text-slate-400 text-sm font-medium">Total Games</div>
            <div className="text-3xl md:text-4xl font-bold gradient-text-blue">
              <span data-count>{stats.totalGames}</span>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Games Won Card */}
      <div
        ref={wonRef}
        data-stat-card
        className="glass group cursor-pointer relative overflow-hidden border-2 border-emerald-500/30 p-6 hover:border-emerald-500/60 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-transparent to-emerald-500 opacity-10 blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="text-4xl md:text-5xl">🏆</div>
          <div className="flex-1">
            <div className="text-slate-400 text-sm font-medium">Games Won</div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400">
              <span data-count>{stats.gamesWon}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Win Rate Card */}
      <div
        ref={winRateRef}
        data-stat-card
        className="glass group cursor-pointer relative overflow-hidden border-2 border-purple-500/30 p-6 hover:border-purple-500/60 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-transparent to-purple-500 opacity-10 blur-xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="text-4xl md:text-5xl">⭐</div>
          <div className="flex-1">
            <div className="text-slate-400 text-sm font-medium">Win Rate</div>
            <div className="text-3xl md:text-4xl font-bold text-purple-400">
              <span data-count>{winRate}</span>%
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
