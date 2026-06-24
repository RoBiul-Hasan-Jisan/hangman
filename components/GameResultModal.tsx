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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        ref={modalRef}
        className={`card-elevated p-8 md:p-12 text-center max-w-md w-full ${
          won ? 'border-2 border-success/20' : 'border-2 border-error/20'
        }`}
      >
        {/* Title */}
        <h2
          ref={titleRef}
          className={`text-4xl md:text-5xl font-black mb-6 ${
            won ? 'text-success' : 'text-error'
          }`}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          ref={messageRef}
          className="text-gray-600 text-lg mb-8 whitespace-pre-line font-medium leading-relaxed"
        >
          {message}
        </p>

        {/* Word Display */}
        <div className="bg-foreground/5 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 font-medium mb-2">The Word Was</p>
          <p className="text-2xl font-bold text-accent font-mono">{word.toUpperCase()}</p>
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="btn-primary"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBackToCategories}
            className="btn-secondary"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}
