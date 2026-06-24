'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { drawHangman } from '@/lib/gameUtils';

interface HangmanCanvasProps {
  wrongGuesses: number;
  maxWrongGuesses?: number;
  shakeIntensity?: number;
}

export default function HangmanCanvas({ 
  wrongGuesses, 
  maxWrongGuesses = 15,
  shakeIntensity = 4
}: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Memoize canvas dimensions
  const canvasDimensions = useMemo(() => ({
    width: 400,
    height: 350
  }), []);

  // Memoize wrong guess count display
  const wrongGuessDisplay = useMemo(() => {
    const percentage = (wrongGuesses / maxWrongGuesses) * 100;
    const isCritical = percentage >= 80;
    const isWarning = percentage >= 50;

    return {
      percentage,
      isCritical,
      isWarning,
      color: isCritical ? 'red' : isWarning ? 'yellow' : 'blue'
    };
  }, [wrongGuesses, maxWrongGuesses]);

  // Handle canvas drawing
  const drawCanvas = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    
    // Clear canvas with proper resolution handling
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the hangman
    drawHangman(ctx, canvas, wrongGuesses);
  }, [wrongGuesses]);

  // Handle shake animation
  const triggerShakeAnimation = useCallback(() => {
    if (!containerRef.current || wrongGuesses === 0) return;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    const intensity = wrongGuesses > 10 ? shakeIntensity * 2 : shakeIntensity;
    const repeatCount = wrongGuesses > 10 ? 5 : 3;

    animationRef.current = gsap.to(containerRef.current, {
      x: -intensity,
      duration: 0.08,
      repeat: repeatCount,
      yoyo: true,
      ease: 'power1.inOut',
      onComplete: () => {
        // Reset position
        if (containerRef.current) {
          gsap.set(containerRef.current, { x: 0 });
        }
        animationRef.current = null;
      }
    });
  }, [wrongGuesses, shakeIntensity]);

  // Main effect for drawing and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      willReadFrequently: false 
    });
    if (!ctx) return;

    // Use requestAnimationFrame for smoother rendering
    const rafId = requestAnimationFrame(() => {
      drawCanvas(ctx);
    });

    // Trigger shake animation
    triggerShakeAnimation();

    return () => {
      cancelAnimationFrame(rafId);
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [wrongGuesses, drawCanvas, triggerShakeAnimation]);

  // Render wrong guess indicators with better performance
  const renderWrongGuessIndicators = useCallback(() => {
    return Array.from({ length: maxWrongGuesses }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i < wrongGuesses
            ? 'bg-red-500 shadow-lg shadow-red-500/50 scale-110'
            : 'bg-slate-600/50'
        }`}
        aria-label={i < wrongGuesses ? 'Wrong guess' : 'Remaining guess'}
      />
    ));
  }, [wrongGuesses, maxWrongGuesses]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto flex justify-center"
      role="img"
      aria-label={`Hangman game with ${wrongGuesses} wrong guesses`}
    >
      <div className="glass border-2 border-slate-400/30 rounded-2xl p-4 md:p-6 backdrop-blur-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
            maxWidth: `${canvasDimensions.width}px`,
            height: 'auto'
          }}
        />

        {/* Wrong Guess Counter with better UX */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between px-2 gap-2">
          <span className="text-sm text-slate-400 font-medium">
            Wrong Guesses
          </span>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {renderWrongGuessIndicators()}
            </div>
            
            <span 
              className={`text-sm font-bold min-w-[3rem] text-right transition-colors duration-300 ${
                wrongGuessDisplay.isCritical 
                  ? 'text-red-400' 
                  : wrongGuessDisplay.isWarning 
                  ? 'text-yellow-400' 
                  : 'text-blue-400'
              }`}
            >
              {wrongGuesses}/{maxWrongGuesses}
            </span>
          </div>
        </div>

        {/* Progress bar for visual feedback */}
        <div className="mt-2 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              wrongGuessDisplay.isCritical 
                ? 'bg-red-500' 
                : wrongGuessDisplay.isWarning 
                ? 'bg-yellow-500' 
                : 'bg-blue-500'
            }`}
            style={{ 
              width: `${Math.min(wrongGuessDisplay.percentage, 100)}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}