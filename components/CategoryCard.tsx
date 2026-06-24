'use client';

import { CategoryInfo } from '@/lib/wordData';

interface CategoryCardProps {
  name: string;
  info: CategoryInfo;
  wordCount: number;
  played: number;
  won: number;
  onClick: () => void;
}

export default function CategoryCard({
  info,
  wordCount,
  played,
  won,
  onClick,
}: CategoryCardProps) {
  const winRate = played > 0 ? Math.round((won / played) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className="card-interactive w-full h-full text-left hover:shadow-lg p-6 flex flex-col"
    >
      {/* Icon */}
      <div className="text-5xl mb-4">{info.icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2 text-foreground capitalize">
        {info.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {info.description}
      </p>

      {/* Word Count Badge */}
      <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4 w-fit">
        {wordCount} words
      </div>

      {/* Stats Section */}
      <div className="mt-auto space-y-3 pt-4 border-t border-card-border">
        {played > 0 ? (
          <>
            {/* Win Rate Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">Win Rate</span>
                <span className="text-sm font-bold text-accent">{winRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent-light"
                  style={{ width: `${winRate}%` }}
                ></div>
              </div>
            </div>

            {/* Play Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-gray-600">Played</p>
                <p className="text-lg font-bold text-foreground">{played}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Won</p>
                <p className="text-lg font-bold text-success">{won}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic text-center py-2">
            Not played yet
          </p>
        )}
      </div>
    </button>
  );
}
