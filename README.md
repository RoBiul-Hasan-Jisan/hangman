# Hangman Game - Next.js Edition

A modern, fully-functional Hangman word guessing game built with **Next.js 16**, **React 19**, and **TypeScript**. The vanilla JavaScript version has been completely converted to a professional React-based application with component-driven architecture.

##  Features

- **6 Word Categories**: Animals, Food & Drinks, Sports, Countries, Technology, and Nature
- **Game Statistics**: Track total games played, wins, and win rate per category
- **Interactive Gameplay**: Real-time letter guessing with visual hangman drawing
- **Hints System**: Get helpful hints during gameplay
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Persistent Stats**: Game statistics are stored in localStorage
- **Keyboard Support**: Press letter keys to make guesses
- **Beautiful UI**: Modern gradient backgrounds with smooth animations and transitions

##  Tech Stack

- **Framework**: Next.js 16 (with App Router)
- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 3
- **Font System**: Geist fonts via Next.js
- **Canvas API**: For drawing the hangman figure

##  Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component (state management)
│   └── globals.css         # Global styles and animations
├── components/
│   ├── CategoryScreen.tsx    # Category selection screen
│   ├── CategoryCard.tsx      # Individual category card
│   ├── GameBoard.tsx         # Main game screen
│   ├── GameResultModal.tsx   # Win/loss modal
│   ├── HangmanCanvas.tsx     # Canvas drawing component
│   ├── Keyboard.tsx          # Letter buttons grid
│   └── GameStats.tsx         # Statistics display
├── lib/
│   ├── wordData.ts           # Word database and category metadata
│   └── gameUtils.ts          # Game logic utilities
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

##  How to Play

1. **Select a Category**: Choose from 6 different word categories
2. **Guess Letters**: Click letter buttons or press keys A-Z to guess
3. **Win Condition**: Guess the word before running out of lives (15 total)
4. **Lose Condition**: Incorrect guesses add body parts to the hangman
5. **Use Hints**: Click "Get Hint" to reveal the first unguessed letter
6. **Track Progress**: View statistics on the category selection screen

##  Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```



### Architecture
-  **Component-Based**: Modular React components instead of vanilla DOM manipulation
-  **Type Safety**: Full TypeScript support with proper interfaces
-  **State Management**: React hooks (useState, useEffect) for clean state handling
-  **Performance**: Server-side rendering and optimized bundle with Next.js

### Code Quality
-  **Maintainability**: Organized folder structure with clear separation of concerns
-  **Reusability**: Shared utilities in `lib/` folder
-  **Configuration**: Centralized configuration in single files (Tailwind, TypeScript, Next.js)

### User Experience
-  **Responsive Design**: Works on all screen sizes
-  **Smooth Animations**: CSS animations for page transitions
-  **Better Visuals**: Improved color scheme and layout using Tailwind CSS
-  **Accessibility**: Semantic HTML and proper button/form elements

##  Customization

### Add New Categories
Edit `lib/wordData.ts` and add entries to:
1. `CATEGORY_INFO` object for metadata (icon, color, description)
2. `WORDS_DATABASE` object for word lists
3. `CategoryKey` type for TypeScript support

### Modify Game Settings
Edit `components/GameBoard.tsx`:
- `MAX_LIVES` constant to change difficulty
- Game logic in `makeGuess()` function

### Customize Styling
Edit `tailwind.config.ts` to modify:
- Color palette
- Fonts and typography
- Breakpoints and responsive behavior

##  Game Statistics

Statistics are automatically saved to browser's localStorage under the key `hangmanStats`. The data structure includes:
- Total games played
- Total games won
- Per-category statistics (played and won counts)

Clear your browser's storage to reset statistics.

##  Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint checks |

##  Known Limitations

- Stats are stored locally in the browser (not synced across devices)
- No user accounts or cloud sync
- Works only with modern browsers that support Canvas and localStorage

##  Deployment

### Deploy to Vercel
```bash
vercel deploy
```


##  License

This project is open source .

##  Contributing

Feel free to submit issues and enhancement requests!

---



