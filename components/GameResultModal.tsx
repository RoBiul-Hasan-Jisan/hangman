'use client';

import { useRef } from 'react';

interface GameResultModalProps {
  won: boolean;
  word: string;
  onPlayAgain: () => void;
  onBackToCategories: () => void;
}

export default function GameResultModal({
  won,
  word,
  onPlayAgain,
  onBackToCategories,
}: GameResultModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const title = won ? '🎉 VICTORY! 🎉' : '💀 GAME OVER! 💀';
  const message = won
    ? `You guessed "${word}" correctly!\nYou saved the hangman!`
    : `The word was "${word}".\nThe hangman has been hanged!`;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        ref={modalRef}
        className={`glass-strong border-2 rounded-2xl p-8 md:p-12 text-center max-w-md w-full ${
          won
            ? 'border-emerald-500/50 glow-blue'
            : 'border-red-500/50 glow-pink'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >


        {/* Title */}
        <h2
          ref={titleRef}
          className={`text-4xl md:text-5xl font-black mb-6 ${
            won
              ? 'gradient-text'
              : 'text-red-400'
          }`}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          ref={messageRef}
          className="text-slate-300 text-lg mb-8 whitespace-pre-line font-medium leading-relaxed"
        >
          {message}
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBackToCategories}
            className="w-full py-3 px-6 glass text-white font-bold rounded-lg border border-slate-400/30 hover:border-slate-300/50"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}
