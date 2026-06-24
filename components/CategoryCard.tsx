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
  name,
  info,
  wordCount,
  played,
  won,
  onClick,
}: CategoryCardProps) {
  const winRate = played > 0 ? Math.round((won / played) * 100) : 0;

  const bgGradients: { [key: string]: string } = {
    animals: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50',
    food: 'from-orange-500/20 to-red-500/20 border-orange-500/50',
    sports: 'from-red-500/20 to-pink-500/20 border-red-500/50',
    countries: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50',
    technology: 'from-purple-500/20 to-indigo-500/20 border-purple-500/50',
    nature: 'from-green-500/20 to-lime-500/20 border-green-500/50',
  };

  return (
    <div
      onClick={onClick}
      className={`glass cursor-pointer relative overflow-hidden border-2 ${bgGradients[name.toLowerCase()] || bgGradients.animals} h-full p-6 md:p-8`}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Category Icon */}
        <div className="text-6xl md:text-7xl mb-4">
          {info.icon}
        </div>

        {/* Category Name */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 capitalize">
          {info.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">{info.description}</p>

        {/* Word Count */}
        <div className="mb-6 flex items-center gap-2">
          <div className="text-sm font-medium text-slate-300">
            <span className="text-slate-400">Words: </span>
            <span className="text-white font-bold">{wordCount}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-auto space-y-3">
          {played > 0 ? (
            <>
              {/* Win Rate */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Win Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${winRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-400">{winRate}%</span>
                </div>
              </div>

              {/* Games Played */}
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Played: <span className="text-white font-bold">{played}</span>
                </span>
                <span className="text-slate-400">
                  Won: <span className="text-emerald-400 font-bold">{won}</span>
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-400 text-sm italic">Not played yet</p>
              <p className="text-slate-500 text-xs mt-2">Click to start playing</p>
            </div>
          )}
        </div>

        {/* Play Button */}
        <div className="mt-4 pt-4 border-t border-slate-500/50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg"
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}