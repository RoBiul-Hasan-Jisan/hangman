export interface GameStats {
  totalGames: number;
  gamesWon: number;
  categoryStats: Record<string, { played: number; won: number }>;
}

export const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  gamesWon: 0,
  categoryStats: {},
};

export const loadStats = (): GameStats => {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  
  try {
    const saved = localStorage.getItem('hangmanStats');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
  
  return DEFAULT_STATS;
};

export const saveStats = (stats: GameStats): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('hangmanStats', JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
};

export const updateStats = (stats: GameStats, gameWon: boolean, category: string): GameStats => {
  const updated = { ...stats };
  updated.totalGames++;
  
  if (gameWon) {
    updated.gamesWon++;
  }
  
  if (!updated.categoryStats[category]) {
    updated.categoryStats[category] = { played: 0, won: 0 };
  }
  
  updated.categoryStats[category].played++;
  if (gameWon) {
    updated.categoryStats[category].won++;
  }
  
  saveStats(updated);
  return updated;
};

export const getWinRate = (stats: GameStats): number => {
  return stats.totalGames > 0
    ? Math.round((stats.gamesWon / stats.totalGames) * 100)
    : 0;
};

export const drawHangman = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  wrongGuesses: number
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#2c3e50';

  // Draw gallows
  ctx.beginPath();
  ctx.moveTo(50, 300);
  ctx.lineTo(250, 300);
  ctx.moveTo(150, 300);
  ctx.lineTo(150, 50);
  ctx.moveTo(150, 50);
  ctx.lineTo(280, 50);
  ctx.moveTo(280, 50);
  ctx.lineTo(280, 80);
  ctx.stroke();

  // Draw hangman based on wrong guesses
  if (wrongGuesses >= 1) {
    // Head
    ctx.beginPath();
    ctx.arc(280, 105, 25, 0, 2 * Math.PI);
    ctx.stroke();

    if (wrongGuesses >= 2) {
      // Body
      ctx.beginPath();
      ctx.moveTo(280, 130);
      ctx.lineTo(280, 200);
      ctx.stroke();

      if (wrongGuesses >= 3) {
        // Left arm
        ctx.beginPath();
        ctx.moveTo(280, 150);
        ctx.lineTo(245, 175);
        ctx.stroke();

        if (wrongGuesses >= 4) {
          // Right arm
          ctx.beginPath();
          ctx.moveTo(280, 150);
          ctx.lineTo(315, 175);
          ctx.stroke();

          if (wrongGuesses >= 5) {
            // Left leg
            ctx.beginPath();
            ctx.moveTo(280, 200);
            ctx.lineTo(250, 240);
            ctx.stroke();

            if (wrongGuesses >= 6) {
              // Right leg
              ctx.beginPath();
              ctx.moveTo(280, 200);
              ctx.lineTo(310, 240);
              ctx.stroke();
            }
          }
        }
      }
    }
  }
};
