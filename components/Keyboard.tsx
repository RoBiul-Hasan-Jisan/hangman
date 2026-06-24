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
    <div ref={keyboardRef} className="w-full space-y-2">
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
                  px-2.5 md:px-3 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg min-w-10
                  ${
                    isDisabledButton
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-accent text-white hover:bg-accent-dark'
                  }
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
