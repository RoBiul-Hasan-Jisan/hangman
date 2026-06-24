'use client';

import { useState, useEffect } from 'react';
import HangmanCanvas from './HangmanCanvas';
import Keyboard from './Keyboard';
import GameResultModal from './GameResultModal';
import { WORDS_DATABASE, CATEGORY_INFO, CategoryKey } from '@/lib/wordData';
import { updateStats, GameStats } from '@/lib/gameUtils';


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



  const MAX_LIVES = 15;
  const categoryInfo = CATEGORY_INFO[category];
  const words = WORDS_DATABASE[category] || [];

  // Initialize game
  useEffect(() => {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
    }
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
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b border-card-border bg-card-bg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="text-foreground hover:text-accent font-semibold text-sm"
            >
              ← Back to Categories
            </button>
            <h1 className="text-2xl font-bold">
              {categoryInfo.icon} {categoryInfo.name}
            </h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">Lives</p>
              <p className="text-2xl font-bold text-error">{remainingLives}/{MAX_LIVES}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hangman Canvas */}
          <div className="card-elevated p-6 flex justify-center items-center">
            <HangmanCanvas wrongGuesses={wrongGuesses} />
          </div>

          {/* Game Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Word Display */}
            <div className="card-elevated p-8 text-center">
              <p className="text-sm text-gray-600 font-medium mb-4">Secret Word</p>
              <p className="text-7xl md:text-8xl font-bold tracking-widest font-mono text-accent break-words">
                {displayWord}
              </p>
            </div>

            {/* Lives Indicator */}
            <div className="card-elevated p-6">
              <p className="text-sm text-gray-600 font-medium mb-4">Lives Remaining</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {Array.from({ length: MAX_LIVES }, (_, i) =>
                  i < remainingLives ? (
                    <span key={i} className="text-2xl">❤️</span>
                  ) : (
                    <span key={i} className="text-2xl opacity-30">🖤</span>
                  )
                )}
              </div>
            </div>

            {/* Used Letters */}
            <div className="card-elevated p-6">
              <p className="text-sm text-gray-600 font-medium mb-4">Used Letters</p>
              <div className="flex flex-wrap gap-2 min-h-12">
                {Array.from(guessedLetters).length > 0 ? (
                  Array.from(guessedLetters)
                    .sort()
                    .map((letter) => (
                      <span
                        key={letter}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full"
                      >
                        {letter}
                      </span>
                    ))
                ) : (
                  <span className="text-gray-500 italic text-sm">No letters guessed yet</span>
                )}
              </div>
            </div>

            {/* Keyboard */}
            <Keyboard
              guessedLetters={guessedLetters}
              onGuess={makeGuess}
              disabled={!gameActive}
            />

            {/* Control Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleGetHint}
                disabled={!gameActive}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💡 Get Hint
              </button>
              <button
                onClick={handleNewWord}
                className="btn-secondary flex-1"
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
    </div>
  );
}
