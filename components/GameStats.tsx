'use client';

import { useRef } from 'react';
import { GameStats } from '@/lib/gameUtils';

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

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Games Card */}
      <div ref={totalRef} data-stat-card className="card-elevated p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎯</div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Games</p>
            <p className="text-3xl font-bold text-foreground">
              <span data-count>{stats.totalGames}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Games Won Card */}
      <div ref={wonRef} data-stat-card className="card-elevated p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Games Won</p>
            <p className="text-3xl font-bold text-success">
              <span data-count>{stats.gamesWon}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Win Rate Card */}
      <div ref={winRateRef} data-stat-card className="card-elevated p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⭐</div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Win Rate</p>
            <p className="text-3xl font-bold text-accent">
              <span data-count>{winRate}</span>%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
