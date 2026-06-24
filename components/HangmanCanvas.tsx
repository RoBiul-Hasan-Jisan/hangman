'use client';

import { useEffect, useRef } from 'react';
import { drawHangman } from '@/lib/gameUtils';

interface HangmanCanvasProps {
  wrongGuesses: number;
}

export default function HangmanCanvas({ wrongGuesses }: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw the hangman
    drawHangman(ctx, canvasRef.current, wrongGuesses);
  }, [wrongGuesses]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto flex justify-center"
    >
      <div className="glass border-2 border-slate-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={350}
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
          }}
        />

        {/* Wrong Guess Counter */}
        <div className="mt-4 flex items-center justify-between px-2">
          <span className="text-sm text-slate-400">Wrong Guesses</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < wrongGuesses
                      ? 'bg-red-500 shadow-lg shadow-red-500/50'
                      : 'bg-slate-600'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm font-bold text-red-400 ml-2">
              {wrongGuesses}/15
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
