// Category management and UI
class CategoryManager {
    constructor() {
        this.categories = wordsDatabase;
        this.categoryMeta = categoryInfo;
        this.currentCategory = null;
        this.stats = this.loadStats();
    }
    
    loadStats() {
        const saved = localStorage.getItem('hangmanStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            totalGames: 0,
            gamesWon: 0,
            categoryStats: {}
        };
    }
    
    saveStats() {
        localStorage.setItem('hangmanStats', JSON.stringify(this.stats));
    }
    
    updateStats(gameWon, category) {
        this.stats.totalGames++;
        if (gameWon) {
            this.stats.gamesWon++;
        }
        
        if (!this.stats.categoryStats[category]) {
            this.stats.categoryStats[category] = { played: 0, won: 0 };
        }
        this.stats.categoryStats[category].played++;
        if (gameWon) {
            this.stats.categoryStats[category].won++;
        }
        
        this.saveStats();
        this.updateDisplayStats();
    }
    
    updateDisplayStats() {
        const totalGamesEl = document.getElementById('totalGames');
        const gamesWonEl = document.getElementById('gamesWon');
        const winRateEl = document.getElementById('winRate');
        
        if (totalGamesEl) totalGamesEl.textContent = this.stats.totalGames;
        if (gamesWonEl) gamesWonEl.textContent = this.stats.gamesWon;
        
        const winRate = this.stats.totalGames > 0 
            ? Math.round((this.stats.gamesWon / this.stats.totalGames) * 100) 
            : 0;
        if (winRateEl) winRateEl.textContent = `${winRate}%`;
    }
    
    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (const [key, words] of Object.entries(this.categories)) {
            const meta = this.categoryMeta[key];
            const stats = this.stats.categoryStats[key] || { played: 0, won: 0 };
            
            const card = document.createElement('div');
            card.className = 'category-card';
            card.style.borderTop = `4px solid ${meta.color}`;
            card.onclick = () => this.selectCategory(key);
            
            card.innerHTML = `
                <div class="category-icon">${meta.icon}</div>
                <h3>${meta.name}</h3>
                <p>${meta.description}</p>
                <div class="word-count">📚 ${words.length} words</div>
                <div style="margin-top: 10px; font-size: 0.9em; color: ${meta.color}">
                    🎯 Played: ${stats.played} | 🏆 Won: ${stats.won}
                </div>
            `;
            
            container.appendChild(card);
        }
    }
    
    selectCategory(categoryKey) {
        this.currentCategory = categoryKey;
        this.hideCategoryScreen();
        this.showGameScreen();
        
        // Initialize game with selected category
        if (window.gameInstance) {
            window.gameInstance.initGame(categoryKey);
        }
    }
    
    hideCategoryScreen() {
        const categoryScreen = document.getElementById('categoryScreen');
        const gameScreen = document.getElementById('gameScreen');
        
        categoryScreen.classList.remove('active');
        gameScreen.classList.add('active');
    }
    
    showCategoryScreen() {
        const categoryScreen = document.getElementById('categoryScreen');
        const gameScreen = document.getElementById('gameScreen');
        
        gameScreen.classList.remove('active');
        categoryScreen.classList.add('active');
        
        this.updateDisplayStats();
    }
    
    showGameScreen() {
        const gameScreen = document.getElementById('gameScreen');
        gameScreen.classList.add('active');
        
        // Update category badge
        const meta = this.categoryMeta[this.currentCategory];
        const badge = document.getElementById('currentCategory');
        if (badge && meta) {
            badge.textContent = `${meta.icon} ${meta.name}`;
            badge.style.backgroundColor = meta.color;
        }
    }
    
    getRandomWord() {
        const words = this.categories[this.currentCategory];
        if (!words || words.length === 0) return "HANGMAN";
        return words[Math.floor(Math.random() * words.length)];
    }
}

// Initialize category manager when page loads
const categoryManager = new CategoryManager();