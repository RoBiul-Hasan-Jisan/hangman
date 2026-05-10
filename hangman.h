<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangman Game - Guess the Word!</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .game-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 30px;
            max-width: 1000px;
            width: 100%;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        h1 {
            text-align: center;
            color: #e74c3c;
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
            text-align: center;
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 0.9em;
        }

        /* Hangman Canvas */
        .hangman-area {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }

        canvas {
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* Game Info */
        .game-info {
            text-align: center;
            margin-bottom: 25px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        .lives {
            font-size: 1.3em;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .lives span {
            font-weight: bold;
            color: #e74c3c;
            font-size: 1.4em;
        }

        .heart {
            color: #e74c3c;
            font-size: 1.2em;
        }

        .word-display {
            font-family: 'Courier New', monospace;
            font-size: 2.5em;
            font-weight: bold;
            letter-spacing: 10px;
            text-align: center;
            margin: 20px 0;
            color: #2c3e50;
            word-break: break-all;
        }

        .used-letters {
            margin: 20px 0;
            padding: 10px;
            background: #ecf0f1;
            border-radius: 10px;
            text-align: center;
        }

        .used-letters strong {
            color: #2c3e50;
        }

        .used-letters span {
            display: inline-block;
            margin: 5px;
            padding: 5px 10px;
            background: #95a5a6;
            color: white;
            border-radius: 5px;
            font-size: 0.9em;
        }

        /* Keyboard */
        .keyboard {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            gap: 10px;
            margin: 20px 0;
        }

        .key-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px;
            font-size: 1.1em;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .key-btn:hover:not(:disabled) {
            background: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .key-btn:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
            transform: none;
        }

        /* Controls */
        .controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
        }

        button {
            padding: 12px 24px;
            font-size: 1em;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .new-game-btn {
            background: #27ae60;
            color: white;
        }

        .new-game-btn:hover {
            background: #229954;
            transform: translateY(-2px);
        }

        .hint-btn {
            background: #f39c12;
            color: white;
        }

        .hint-btn:hover {
            background: #e67e22;
            transform: translateY(-2px);
        }

        /* Message Popup */
        .message-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .message-box {
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: slideUp 0.3s;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .message-box h2 {
            margin-bottom: 15px;
            color: #2c3e50;
        }

        .message-box p {
            margin-bottom: 20px;
            color: #7f8c8d;
        }

        .message-box button {
            background: #3498db;
            color: white;
            padding: 10px 20px;
        }

        /* Stats */
        .stats {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding: 10px;
            background: #ecf0f1;
            border-radius: 10px;
        }

        .stat-item {
            text-align: center;
            flex: 1;
        }

        .stat-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #3498db;
        }

        .stat-label {
            font-size: 0.8em;
            color: #7f8c8d;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .game-container {
                padding: 20px;
            }
            
            .word-display {
                font-size: 1.5em;
                letter-spacing: 5px;
            }
            
            .keyboard {
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
            }
            
            .key-btn {
                padding: 8px;
                font-size: 0.9em;
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎮 HANGMAN GAME 🎮</h1>
        <div class="subtitle">Guess the word before the hangman is complete!</div>

        <div class="hangman-area">
            <canvas id="hangmanCanvas" width="400" height="300"></canvas>
        </div>

        <div class="game-info">
            <div class="lives">
                ❤️ Lives Remaining: <span id="lives">15</span> / 15
            </div>
            <div class="word-display" id="wordDisplay"></div>
            <div class="used-letters">
                <strong>Used Letters:</strong> <span id="usedLetters"></span>
            </div>
        </div>

        <div class="stats">
            <div class="stat-item">
                <div class="stat-value" id="gamesPlayed">0</div>
                <div class="stat-label">Games Played</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" id="gamesWon">0</div>
                <div class="stat-label">Games Won</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" id="winRate">0%</div>
                <div class="stat-label">Win Rate</div>
            </div>
        </div>

        <div class="keyboard" id="keyboard"></div>

        <div class="controls">
            <button class="new-game-btn" onclick="newGame()">🔄 New Game</button>
            <button class="hint-btn" onclick="getHint()">💡 Get Hint</button>
        </div>
    </div>

    <script>
        // ==================== YOUR WORDS FROM word_file.py ====================
        // This is your exact word list converted to JavaScript
        const words_diary = [
            "ELEPHANT", "GIRAFFE", "KANGAROO", "DOLPHIN", "PENGUIN",
            "CROCODILE", "BUTTERFLY", "SCORPION", "FLAMINGO", "CHAMELEON",
            "AUSTRALIA", "INDONESIA", "PAKISTAN", "PHILIPPINES", "NETHERLANDS",
            "SWITZERLAND", "ARGENTINA", "VENEZUELA", "NIGERIA", "MADAGASCAR",
            "COMPUTER", "KEYBOARD", "MONITOR", "PROCESSOR", "SOFTWARE",
            "ALGORITHM", "DATABASE", "NETWORK", "INTERNET", "CYBERSECURITY",
            "MOUNTAIN", "VOLCANO", "HURRICANE", "EARTHQUAKE", "THUNDER",
            "LIGHTNING", "RAINBOW", "ATMOSPHERE", "ECOSYSTEM", "BIODIVERSITY",
            "JAVASCRIPT", "PYTHON", "JAVA", "RUBY", "SWIFT",
            "HANGMAN", "DEVELOPER", "PROGRAMMING", "ALGORITHM", "DATABASE"
        ];
        
        // Remove any words with hyphens or spaces (matching your Python logic)
        const validWords = words_diary.filter(word => !word.includes('-') && !word.includes(' '));
        
        // Game variables
        let currentWord = "";
        let guessedLetters = new Set();
        let wrongGuesses = 0;
        let maxLives = 15;
        let gameActive = true;
        let gamesPlayed = 0;
        let gamesWon = 0;
        
        // Load stats from localStorage
        function loadStats() {
            const saved = localStorage.getItem('hangmanStats');
            if (saved) {
                const stats = JSON.parse(saved);
                gamesPlayed = stats.gamesPlayed || 0;
                gamesWon = stats.gamesWon || 0;
                updateStatsDisplay();
            }
        }
        
        function saveStats() {
            localStorage.setItem('hangmanStats', JSON.stringify({
                gamesPlayed: gamesPlayed,
                gamesWon: gamesWon
            }));
        }
        
        function updateStatsDisplay() {
            document.getElementById('gamesPlayed').textContent = gamesPlayed;
            document.getElementById('gamesWon').textContent = gamesWon;
            const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
            document.getElementById('winRate').textContent = `${winRate}%`;
        }
        
        // Canvas drawing
        const canvas = document.getElementById('hangmanCanvas');
        const ctx = canvas.getContext('2d');
        
        function drawHangman() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#2c3e50';
            
            // Draw gallows
            ctx.beginPath();
            ctx.moveTo(50, 250);
            ctx.lineTo(200, 250);
            ctx.moveTo(125, 250);
            ctx.lineTo(125, 50);
            ctx.moveTo(125, 50);
            ctx.lineTo(225, 50);
            ctx.moveTo(225, 50);
            ctx.lineTo(225, 80);
            ctx.stroke();
            
            // Draw hangman based on wrong guesses
            if (wrongGuesses >= 1) {
                // Head
                ctx.beginPath();
                ctx.arc(225, 100, 20, 0, 2 * Math.PI);
                ctx.stroke();
                
                if (wrongGuesses >= 2) {
                    // Body
                    ctx.beginPath();
                    ctx.moveTo(225, 120);
                    ctx.lineTo(225, 180);
                    ctx.stroke();
                    
                    if (wrongGuesses >= 3) {
                        // Left arm
                        ctx.beginPath();
                        ctx.moveTo(225, 140);
                        ctx.lineTo(195, 160);
                        ctx.stroke();
                        
                        if (wrongGuesses >= 4) {
                            // Right arm
                            ctx.beginPath();
                            ctx.moveTo(225, 140);
                            ctx.lineTo(255, 160);
                            ctx.stroke();
                            
                            if (wrongGuesses >= 5) {
                                // Left leg
                                ctx.beginPath();
                                ctx.moveTo(225, 180);
                                ctx.lineTo(195, 220);
                                ctx.stroke();
                                
                                if (wrongGuesses >= 6) {
                                    // Right leg
                                    ctx.beginPath();
                                    ctx.moveTo(225, 180);
                                    ctx.lineTo(255, 220);
                                    ctx.stroke();
                                    
                                    if (wrongGuesses >= 7) {
                                        // Eyes
                                        ctx.beginPath();
                                        ctx.arc(217, 95, 3, 0, 2 * Math.PI);
                                        ctx.arc(233, 95, 3, 0, 2 * Math.PI);
                                        ctx.fill();
                                        
                                        if (wrongGuesses >= 8) {
                                            ctx.beginPath();
                                            ctx.arc(217, 95, 1, 0, 2 * Math.PI);
                                            ctx.arc(233, 95, 1, 0, 2 * Math.PI);
                                            ctx.fillStyle = 'white';
                                            ctx.fill();
                                            ctx.fillStyle = 'black';
                                            
                                            if (wrongGuesses >= 9) {
                                                ctx.beginPath();
                                                ctx.arc(217, 95, 1, 0, 2 * Math.PI);
                                                ctx.fill();
                                                ctx.beginPath();
                                                ctx.arc(233, 95, 1, 0, 2 * Math.PI);
                                                ctx.fill();
                                                
                                                if (wrongGuesses >= 10) {
                                                    // Sad mouth
                                                    ctx.beginPath();
                                                    ctx.moveTo(215, 108);
                                                    ctx.quadraticCurveTo(225, 115, 235, 108);
                                                    ctx.stroke();
                                                    
                                                    if (wrongGuesses >= 11) {
                                                        // Tears
                                                        ctx.beginPath();
                                                        ctx.moveTo(210, 100);
                                                        ctx.lineTo(207, 105);
                                                        ctx.stroke();
                                                        ctx.beginPath();
                                                        ctx.moveTo(209, 100);
                                                        ctx.lineTo(206, 105);
                                                        ctx.stroke();
                                                        
                                                        if (wrongGuesses >= 12) {
                                                            ctx.beginPath();
                                                            ctx.moveTo(240, 100);
                                                            ctx.lineTo(243, 105);
                                                            ctx.stroke();
                                                            ctx.beginPath();
                                                            ctx.moveTo(241, 100);
                                                            ctx.lineTo(244, 105);
                                                            ctx.stroke();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        function updateDisplay() {
            // Update word display
            let displayWord = currentWord.split('').map(letter => 
                guessedLetters.has(letter) ? letter : '_'
            ).join(' ');
            document.getElementById('wordDisplay').textContent = displayWord;
            
            // Update lives
            const remainingLives = maxLives - wrongGuesses;
            document.getElementById('lives').textContent = remainingLives;
            document.getElementById('lives').style.color = remainingLives <= 3 ? '#e74c3c' : '#2c3e50';
            
            // Update used letters
            const usedLettersArray = Array.from(guessedLetters).sort();
            const usedLettersContainer = document.getElementById('usedLetters');
            usedLettersContainer.innerHTML = usedLettersArray.map(letter => 
                `<span>${letter}</span>`
            ).join('');
            
            // Update keyboard buttons
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const btn = document.getElementById(`key-${letter}`);
                if (btn) {
                    btn.disabled = guessedLetters.has(letter);
                }
            }
            
            drawHangman();
        }
        
        function makeGuess(letter) {
            if (!gameActive) return;
            if (guessedLetters.has(letter)) return;
            
            guessedLetters.add(letter);
            
            if (currentWord.includes(letter)) {
                // Correct guess
                updateDisplay();
                checkWin();
            } else {
                // Wrong guess
                wrongGuesses++;
                updateDisplay();
                checkLoss();
            }
        }
        
        function checkWin() {
            const allLettersGuessed = currentWord.split('').every(letter => guessedLetters.has(letter));
            if (allLettersGuessed) {
                gameActive = false;
                gamesWon++;
                saveStats();
                updateStatsDisplay();
                showMessage('🎉 Congratulations! 🎉', `You guessed the word "${currentWord}" correctly! You saved the hangman!`, true);
            }
        }
        
        function checkLoss() {
            if (wrongGuesses >= maxLives) {
                gameActive = false;
                showMessage('💀 Game Over! 💀', `The word was "${currentWord}". The hangman has been hanged!`, false);
            }
        }
        
        function showMessage(title, message, isWin) {
            const overlay = document.createElement('div');
            overlay.className = 'message-overlay';
            overlay.innerHTML = `
                <div class="message-box">
                    <h2 style="color: ${isWin ? '#27ae60' : '#e74c3c'}">${title}</h2>
                    <p>${message}</p>
                    <button onclick="this.closest('.message-overlay').remove(); newGame()">Play Again</button>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        function getHint() {
            if (!gameActive) return;
            
            // Find unguessed letters
            const unguessedLetters = currentWord.split('').filter(letter => !guessedLetters.has(letter));
            if (unguessedLetters.length > 0) {
                const hintLetter = unguessedLetters[0];
                showMessage('💡 Hint! 💡', `Try guessing the letter "${hintLetter}"!`, false);
                
                // Auto-remove the hint message after 2 seconds
                setTimeout(() => {
                    const overlay = document.querySelector('.message-overlay');
                    if (overlay && overlay.innerText.includes('Hint')) {
                        overlay.remove();
                    }
                }, 2000);
            } else {
                const msg = document.createElement('div');
                msg.style.position = 'fixed';
                msg.style.bottom = '20px';
                msg.style.right = '20px';
                msg.style.backgroundColor = '#f39c12';
                msg.style.color = 'white';
                msg.style.padding = '10px 20px';
                msg.style.borderRadius = '10px';
                msg.style.zIndex = '1000';
                msg.textContent = 'No hints available - you\'ve guessed all letters!';
                document.body.appendChild(msg);
                setTimeout(() => msg.remove(), 2000);
            }
        }
        
        function getValidWord() {
            // Same logic as your Python function
            let word = validWords[Math.floor(Math.random() * validWords.length)];
            while (word.includes('-') || word.includes(' ')) {
                word = validWords[Math.floor(Math.random() * validWords.length)];
            }
            return word.toUpperCase();
        }
        
        function newGame() {
            currentWord = getValidWord();
            guessedLetters.clear();
            wrongGuesses = 0;
            gameActive = true;
            gamesPlayed++;
            saveStats();
            updateStatsDisplay();
            updateDisplay();
            
            // Remove any existing message overlays
            const overlays = document.querySelectorAll('.message-overlay');
            overlays.forEach(overlay => overlay.remove());
            
            // Show welcome message for first game
            if (gamesPlayed === 1) {
                console.log(`Game started! Word length: ${currentWord.length}`);
            }
        }
        
        function createKeyboard() {
            const keyboard = document.getElementById('keyboard');
            keyboard.innerHTML = '';
            
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const button = document.createElement('button');
                button.textContent = letter;
                button.className = 'key-btn';
                button.id = `key-${letter}`;
                button.onclick = () => makeGuess(letter);
                keyboard.appendChild(button);
            }
        }
        
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (!gameActive) return;
            const key = event.key.toUpperCase();
            if (key >= 'A' && key <= 'Z') {
                makeGuess(key);
                // Visual feedback for key press
                const btn = document.getElementById(`key-${key}`);
                if (btn && !btn.disabled) {
                    btn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        btn.style.transform = '';
                    }, 100);
                }
            }
        });
        
        // Initialize game
        function init() {
            createKeyboard();
            loadStats();
            newGame();
        }
        
        init();
    </script>
</body>
</html>