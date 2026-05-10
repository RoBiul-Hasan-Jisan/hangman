// Hangman Game Logic
class HangmanGame {
    constructor() {
        this.currentWord = "";
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxLives = 15;
        this.gameActive = true;
        this.currentCategory = null;
        this.canvas = document.getElementById('hangmanCanvas');
        this.ctx = this.canvas?.getContext('2d');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Back button
        const backBtn = document.getElementById('backToCategories');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.backToCategories());
        }
        
        // New game button
        const newGameBtn = document.getElementById('newGameBtn');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => this.newWord());
        }
        
        // Hint button
        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.getHint());
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (!this.gameActive) return;
            const key = e.key.toUpperCase();
            if (key >= 'A' && key <= 'Z') {
                this.makeGuess(key);
            }
        });
    }
    
    initGame(categoryKey) {
        this.currentCategory = categoryKey;
        this.currentWord = categoryManager.getRandomWord();
        this.guessedLetters.clear();
        this.wrongGuesses = 0;
        this.gameActive = true;
        
        this.updateDisplay();
        this.createKeyboard();
        this.drawHangman();
    }
    
    newWord() {
        if (this.currentCategory) {
            this.currentWord = categoryManager.getRandomWord();
            this.guessedLetters.clear();
            this.wrongGuesses = 0;
            this.gameActive = true;
            
            this.updateDisplay();
            this.createKeyboard();
            this.drawHangman();
        }
    }
    
    backToCategories() {
        categoryManager.showCategoryScreen();
        this.gameActive = false;
    }
    
    createKeyboard() {
        const keyboard = document.getElementById('keyboard');
        if (!keyboard) return;
        
        keyboard.innerHTML = '';
        
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'key-btn';
            button.id = `key-${letter}`;
            button.onclick = () => this.makeGuess(letter);
            keyboard.appendChild(button);
        }
    }
    
    makeGuess(letter) {
        if (!this.gameActive) return;
        if (this.guessedLetters.has(letter)) return;
        
        this.guessedLetters.add(letter);
        
        // Disable button
        const btn = document.getElementById(`key-${letter}`);
        if (btn) btn.disabled = true;
        
        if (this.currentWord.includes(letter)) {
            // Correct guess
            this.updateDisplay();
            this.checkWin();
        } else {
            // Wrong guess
            this.wrongGuesses++;
            this.updateDisplay();
            this.drawHangman();
            this.checkLoss();
        }
        
        this.updateHeartsDisplay();
    }
    
    updateDisplay() {
        // Update word display
        const displayWord = this.currentWord.split('').map(letter => 
            this.guessedLetters.has(letter) ? letter : '_'
        ).join(' ');
        
        const wordDisplay = document.getElementById('wordDisplay');
        if (wordDisplay) wordDisplay.textContent = displayWord;
        
        // Update lives
        const remainingLives = this.maxLives - this.wrongGuesses;
        const livesCount = document.getElementById('livesCount');
        if (livesCount) livesCount.textContent = remainingLives;
        
        // Update used letters
        const usedLettersContainer = document.getElementById('usedLetters');
        if (usedLettersContainer) {
            const usedArray = Array.from(this.guessedLetters).sort();
            usedLettersContainer.innerHTML = usedArray.map(letter => 
                `<span class="used-letter">${letter}</span>`
            ).join('');
        }
        
        this.updateHeartsDisplay();
    }
    
    updateHeartsDisplay() {
        const heartsContainer = document.getElementById('heartsContainer');
        if (!heartsContainer) return;
        
        const remainingLives = this.maxLives - this.wrongGuesses;
        let heartsHtml = '';
        
        for (let i = 0; i < this.maxLives; i++) {
            if (i < remainingLives) {
                heartsHtml += '❤️ ';
            } else {
                heartsHtml += '🖤 ';
            }
        }
        
        heartsContainer.innerHTML = heartsHtml;
    }
    
    drawHangman() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#2c3e50';
        
        // Draw gallows
        this.ctx.beginPath();
        this.ctx.moveTo(50, 300);
        this.ctx.lineTo(250, 300);
        this.ctx.moveTo(150, 300);
        this.ctx.lineTo(150, 50);
        this.ctx.moveTo(150, 50);
        this.ctx.lineTo(280, 50);
        this.ctx.moveTo(280, 50);
        this.ctx.lineTo(280, 80);
        this.ctx.stroke();
        
        // Draw hangman based on wrong guesses
        if (this.wrongGuesses >= 1) {
            // Head
            this.ctx.beginPath();
            this.ctx.arc(280, 105, 25, 0, 2 * Math.PI);
            this.ctx.stroke();
            
            if (this.wrongGuesses >= 2) {
                // Body
                this.ctx.beginPath();
                this.ctx.moveTo(280, 130);
                this.ctx.lineTo(280, 200);
                this.ctx.stroke();
                
                if (this.wrongGuesses >= 3) {
                    // Left arm
                    this.ctx.beginPath();
                    this.ctx.moveTo(280, 150);
                    this.ctx.lineTo(245, 175);
                    this.ctx.stroke();
                    
                    if (this.wrongGuesses >= 4) {
                        // Right arm
                        this.ctx.beginPath();
                        this.ctx.moveTo(280, 150);
                        this.ctx.lineTo(315, 175);
                        this.ctx.stroke();
                        
                        if (this.wrongGuesses >= 5) {
                            // Left leg
                            this.ctx.beginPath();
                            this.ctx.moveTo(280, 200);
                            this.ctx.lineTo(250, 240);
                            this.ctx.stroke();
                            
                            if (this.wrongGuesses >= 6) {
                                // Right leg
                                this.ctx.beginPath();
                                this.ctx.moveTo(280, 200);
                                this.ctx.lineTo(310, 240);
                                this.ctx.stroke();
                                
                                if (this.wrongGuesses >= 7) {
                                    // Face details
                                    this.ctx.fillStyle = '#2c3e50';
                                    this.ctx.beginPath();
                                    this.ctx.arc(270, 100, 3, 0, 2 * Math.PI);
                                    this.ctx.arc(290, 100, 3, 0, 2 * Math.PI);
                                    this.ctx.fill();
                                    
                                    if (this.wrongGuesses >= 8) {
                                        this.ctx.beginPath();
                                        this.ctx.arc(270, 100, 1, 0, 2 * Math.PI);
                                        this.ctx.fillStyle = 'white';
                                        this.ctx.fill();
                                        this.ctx.beginPath();
                                        this.ctx.arc(290, 100, 1, 0, 2 * Math.PI);
                                        this.ctx.fill();
                                        this.ctx.fillStyle = '#2c3e50';
                                        
                                        if (this.wrongGuesses >= 9) {
                                            this.ctx.beginPath();
                                            this.ctx.arc(270, 100, 1, 0, 2 * Math.PI);
                                            this.ctx.fill();
                                            this.ctx.beginPath();
                                            this.ctx.arc(290, 100, 1, 0, 2 * Math.PI);
                                            this.ctx.fill();
                                            
                                            if (this.wrongGuesses >= 10) {
                                                this.ctx.beginPath();
                                                this.ctx.moveTo(268, 115);
                                                this.ctx.quadraticCurveTo(280, 122, 292, 115);
                                                this.ctx.stroke();
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
    
    checkWin() {
        const allGuessed = this.currentWord.split('').every(letter => 
            this.guessedLetters.has(letter)
        );
        
        if (allGuessed) {
            this.gameActive = false;
            categoryManager.updateStats(true, this.currentCategory);
            this.showMessage('🎉 VICTORY! 🎉', 
                `You guessed "${this.currentWord}" correctly!\nYou saved the hangman!`, 
                true);
        }
    }
    
    checkLoss() {
        if (this.wrongGuesses >= this.maxLives) {
            this.gameActive = false;
            categoryManager.updateStats(false, this.currentCategory);
            this.showMessage('💀 GAME OVER! 💀', 
                `The word was "${this.currentWord}".\nThe hangman has been hanged!`, 
                false);
        }
    }
    
    getHint() {
        if (!this.gameActive) return;
        
        const unguessed = this.currentWord.split('').filter(
            letter => !this.guessedLetters.has(letter)
        );
        
        if (unguessed.length > 0) {
            const hintLetter = unguessed[0];
            this.showMessage('💡 HINT 💡', 
                `Try guessing the letter "${hintLetter}"!\nIt appears ${this.countOccurrences(hintLetter)} time(s) in the word.`, 
                false);
        } else {
            this.showMessage('No Hints', 'You\'ve already guessed all letters!', false);
        }
    }
    
    countOccurrences(letter) {
        return this.currentWord.split('').filter(l => l === letter).length;
    }
    
    showMessage(title, message, isWin) {
        const overlay = document.createElement('div');
        overlay.className = 'message-overlay';
        overlay.innerHTML = `
            <div class="message-box">
                <h2 style="color: ${isWin ? '#27ae60' : '#e74c3c'}">${title}</h2>
                <p>${message}</p>
                <button onclick="this.closest('.message-overlay').remove(); location.reload();">Play Again</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }
}

// Initialize game when page loads
let gameInstance = null;

window.addEventListener('DOMContentLoaded', () => {
    categoryManager.renderCategories();
    categoryManager.updateDisplayStats();
    gameInstance = new HangmanGame();
    window.gameInstance = gameInstance;
});