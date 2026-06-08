'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { celebrate } from '@/lib/animations';

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

  useEffect(() => {
    if (backdropRef.current) {
      // Fade in backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }

    if (modalRef.current) {
      // Modal entrance with scale and bounce
      gsap.fromTo(
        modalRef.current,
        { scale: 0.5, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out',
        }
      );
    }

    if (titleRef.current) {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out',
          delay: 0.2,
        }
      );

      // Celebration animation for winner
      if (won) {
        celebrate(titleRef.current);
      }
    }

    if (messageRef.current) {
      // Message fade in
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }

    if (buttonsRef.current) {
      // Buttons stagger in
      const buttons = buttonsRef.current.querySelectorAll('button');
      buttons.forEach((btn, index) => {
        gsap.fromTo(
          btn,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'back.out',
            delay: 0.4 + index * 0.1,
          }
        );
      });
    }
  }, [won]);

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
        {/* Confetti effect for winner */}
        {won && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
        )}

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
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg transition-smooth-fast hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBackToCategories}
            className="w-full py-3 px-6 glass text-white font-bold rounded-lg transition-smooth-fast border border-slate-400/30 hover:border-slate-300/50 active:scale-95"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}
