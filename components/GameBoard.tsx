'use client';

import { useState, useEffect, useRef } from 'react';
import HangmanCanvas from './HangmanCanvas';
import Keyboard from './Keyboard';
import GameResultModal from './GameResultModal';
import { WORDS_DATABASE, CATEGORY_INFO, CategoryKey } from '@/lib/wordData';
import { updateStats, GameStats } from '@/lib/gameUtils';
import { slideInFromTop, slideInFromBottom, flip } from '@/lib/animations';

interface GameBoardProps {
  category: CategoryKey;
  stats: GameStats;
  onBack: () => void;
  onStatsUpdate: (stats: GameStats) => void;
}

export default function GameBoard({
  category,
  stats,
  onBack,
  onStatsUpdate,
}: GameBoardProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [gameResult, setGameResult] = useState<{
    won: boolean;
    word: string;
  } | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const gameInfoRef = useRef<HTMLDivElement>(null);
  const wordDisplayRef = useRef<HTMLDivElement>(null);

  const MAX_LIVES = 15;
  const categoryInfo = CATEGORY_INFO[category];
  const words = WORDS_DATABASE[category] || [];

  // Initialize game
  useEffect(() => {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
    }

    // Animate on mount
    slideInFromTop(headerRef.current, 0);
    slideInFromBottom(gameInfoRef.current, 0.2);
  }, [category, words]);

  // Setup keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) return;

      const key = e.key.toUpperCase();
      if (key >= 'A' && key <= 'Z' && !guessedLetters.has(key)) {
        makeGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, guessedLetters]);

  const makeGuess = (letter: string) => {
    if (guessedLetters.has(letter) || !gameActive) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }

    // Check win/loss conditions
    setTimeout(() => {
      checkGameStatus(newGuessedLetters, wrongGuesses);
    }, 0);
  };

  const checkGameStatus = (letters: Set<string>, wrongs: number) => {
    // Check win
    if (currentWord && currentWord.split('').every((l) => letters.has(l))) {
      setGameActive(false);
      setGameResult({ won: true, word: currentWord });
      const updatedStats = updateStats(stats, true, category);
      onStatsUpdate(updatedStats);
      return;
    }

    // Check loss
    if (wrongs + 1 >= MAX_LIVES) {
      setGameActive(false);
      setGameResult({ won: false, word: currentWord });
      const updatedStats = updateStats(stats, false, category);
      onStatsUpdate(updatedStats);
    }
  };

  const handleNewWord = () => {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setGameActive(true);
      setGameResult(null);

      // Animate word display
      flip(wordDisplayRef.current, 0);
    }
  };

  const handleGetHint = () => {
    const unguessed = currentWord
      .split('')
      .filter((letter) => !guessedLetters.has(letter));

    if (unguessed.length > 0) {
      const hintLetter = unguessed[0];
      const count = currentWord.split('').filter((l) => l === hintLetter).length;
      alert(
        `Try guessing the letter "${hintLetter}"!\nIt appears ${count} time(s) in the word.`
      );
    } else {
      alert("You've already guessed all letters!");
    }
  };

  const displayWord = currentWord
    .split('')
    .map((letter) => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const remainingLives = MAX_LIVES - wrongGuesses;

  return (
    <div className="min-h-screen w-full px-4 py-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex justify-between items-center mb-8 glass-strong border-2 border-slate-400/30 px-6 py-4 rounded-2xl"
        >
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-smooth-fast hover:scale-105 active:scale-95"
          >
            ← Back
          </button>
          <div
            className="text-white font-bold py-2 px-6 rounded-full glass text-lg"
            style={{
              backgroundImage: `linear-gradient(135deg, ${categoryInfo.color}20, ${categoryInfo.color}40)`,
              borderColor: `${categoryInfo.color}80`,
              borderWidth: '2px',
            }}
          >
            {categoryInfo.icon} {categoryInfo.name}
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Canvas */}
          <div className="flex justify-center items-start">
            <HangmanCanvas wrongGuesses={wrongGuesses} />
          </div>

          {/* Game Info */}
          <div ref={gameInfoRef} className="lg:col-span-2 flex flex-col gap-6">
            {/* Lives Indicator */}
            <div className="glass-strong border-2 border-red-500/30 p-6 rounded-2xl text-center">
              <div className="text-sm text-slate-400 font-medium mb-3">Lives Remaining</div>
              <div className="text-5xl font-black gradient-text mb-4">{remainingLives}</div>
              <div className="flex justify-center gap-1 flex-wrap">
                {Array.from({ length: MAX_LIVES }, (_, i) =>
                  i < remainingLives ? (
                    <span key={i} className="text-xl animate-pulse">❤️</span>
                  ) : (
                    <span key={i} className="text-xl opacity-40">🖤</span>
                  )
                )}
              </div>
            </div>

            {/* Word Display */}
            <div
              ref={wordDisplayRef}
              className="glass border-2 border-blue-500/30 p-8 rounded-2xl text-center"
            >
              <div className="text-sm text-slate-400 font-medium mb-4">Secret Word</div>
              <div className="text-6xl md:text-7xl font-black text-white tracking-widest break-words font-mono">
                {displayWord}
              </div>
            </div>

            {/* Used Letters */}
            <div className="glass border-2 border-purple-500/30 p-6 rounded-2xl">
              <div className="text-sm text-slate-400 font-medium mb-4">Used Letters</div>
              <div className="flex flex-wrap gap-2 min-h-10">
                {Array.from(guessedLetters).length > 0 ? (
                  Array.from(guessedLetters)
                    .sort()
                    .map((letter) => (
                      <span
                        key={letter}
                        className="glass text-white px-4 py-2 rounded-lg text-sm font-bold border border-slate-400/30 hover:border-purple-400/50 transition-all"
                      >
                        {letter}
                      </span>
                    ))
                ) : (
                  <span className="text-slate-500 italic">No letters guessed yet</span>
                )}
              </div>
            </div>

            {/* Keyboard */}
            <Keyboard
              guessedLetters={guessedLetters}
              onGuess={makeGuess}
              disabled={!gameActive}
            />

            {/* Controls */}
            <div className="flex gap-3 flex-col md:flex-row">
              <button
                onClick={handleGetHint}
                disabled={!gameActive}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-smooth-fast disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:scale-105 active:scale-95"
              >
                💡 Get Hint
              </button>
              <button
                onClick={handleNewWord}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-smooth-fast hover:scale-105 active:scale-95"
              >
                🔄 New Word
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {gameResult && (
        <GameResultModal
          won={gameResult.won}
          word={gameResult.word}
          onPlayAgain={handleNewWord}
          onBackToCategories={onBack}
        />
      )}

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
