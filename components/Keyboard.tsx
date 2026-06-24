'use client';

import { useRef } from 'react';

interface KeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function Keyboard({ guessedLetters, onGuess, disabled }: KeyboardProps) {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleLetterClick = (letter: string) => {
    onGuess(letter);
  };

  return (
    <div ref={keyboardRef} className="w-full max-w-4xl mx-auto mt-8 space-y-2 px-4">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1 md:gap-2 flex-wrap"
        >
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isDisabledButton = isGuessed || disabled;

            return (
              <button
                key={letter}
                data-letter={letter}
                data-letter-btn
                onClick={() => handleLetterClick(letter)}
                disabled={isDisabledButton}
                className={`
                  relative px-2.5 md:px-4 py-2.5 md:py-3 text-xs md:text-base font-bold rounded-lg
                  ${
                    isDisabledButton
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed opacity-40 border border-slate-600/30'
                      : 'glass text-white border border-slate-400/30 hover:border-blue-400/50 hover:bg-blue-500/10'
                  }
                `}
                style={{
                  minWidth: '32px',
                  perspective: '1000px',
                }}
              >
                <span className="relative z-10">{letter}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
