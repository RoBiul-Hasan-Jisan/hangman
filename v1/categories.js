// Category management and UI
class CategoryManager {
    constructor() {

        // Safely load global databases
        this.categories = window.wordsDatabase || {};
        this.categoryMeta = window.categoryInfo || {};

        // Debugging
        if (Object.keys(this.categories).length === 0) {
            console.error('wordsDatabase is empty or not loaded!');
        }

        if (Object.keys(this.categoryMeta).length === 0) {
            console.error('categoryInfo is empty or not loaded!');
        }

        this.currentCategory = null;
        this.stats = this.loadStats();
    }

    // =========================
    // LOAD STATS
    // =========================
    loadStats() {
        try {
            const saved = localStorage.getItem('hangmanStats');

            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }

        return {
            totalGames: 0,
            gamesWon: 0,
            categoryStats: {}
        };
    }

    // =========================
    // SAVE STATS
    // =========================
    saveStats() {
        try {
            localStorage.setItem(
                'hangmanStats',
                JSON.stringify(this.stats)
            );
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }

    // =========================
    // UPDATE STATS
    // =========================
    updateStats(gameWon, category) {

        this.stats.totalGames++;

        if (gameWon) {
            this.stats.gamesWon++;
        }

        if (!this.stats.categoryStats[category]) {
            this.stats.categoryStats[category] = {
                played: 0,
                won: 0
            };
        }

        this.stats.categoryStats[category].played++;

        if (gameWon) {
            this.stats.categoryStats[category].won++;
        }

        this.saveStats();
        this.updateDisplayStats();
    }

    // =========================
    // DISPLAY STATS
    // =========================
    updateDisplayStats() {

        const totalGamesEl = document.getElementById('totalGames');
        const gamesWonEl = document.getElementById('gamesWon');
        const winRateEl = document.getElementById('winRate');

        if (totalGamesEl) {
            totalGamesEl.textContent = this.stats.totalGames;
        }

        if (gamesWonEl) {
            gamesWonEl.textContent = this.stats.gamesWon;
        }

        const winRate =
            this.stats.totalGames > 0
                ? Math.round(
                    (this.stats.gamesWon / this.stats.totalGames) * 100
                )
                : 0;

        if (winRateEl) {
            winRateEl.textContent = `${winRate}%`;
        }
    }

    // =========================
    // RENDER CATEGORY CARDS
    // =========================
    renderCategories() {

        const container =
            document.getElementById('categoriesContainer');

        if (!container) {
            console.error('Categories container not found!');
            return;
        }

        container.innerHTML = '';

        // No categories
        if (
            !this.categories ||
            Object.keys(this.categories).length === 0
        ) {

            container.innerHTML = `
                <div style="text-align:center;padding:20px;">
                    No categories available.<br>
                    Check words.js file.
                </div>
            `;

            return;
        }

        // Loop categories
        for (const [key, words] of Object.entries(this.categories)) {

            // Skip invalid arrays
            if (!Array.isArray(words) || words.length === 0) {
                console.warn(
                    `Category "${key}" has invalid or empty words array`
                );
                continue;
            }

            // Safe metadata fallback
            const meta =
                this.categoryMeta?.[key] || {
                    name:
                        key.charAt(0).toUpperCase() +
                        key.slice(1),

                    icon: "📚",
                    color: "#3498db",
                    description: `${words.length} words available`
                };

            // Safe stats fallback
            const stats =
                this.stats.categoryStats?.[key] || {
                    played: 0,
                    won: 0
                };

            // Create card
            const card = document.createElement('div');

            card.className = 'category-card';

            card.style.borderTop =
                `4px solid ${meta.color}`;

            card.addEventListener('click', () => {
                this.selectCategory(key);
            });

            card.innerHTML = `
                <div class="category-icon">
                    ${meta.icon}
                </div>

                <h3>${meta.name}</h3>

                <p>${meta.description}</p>

                <div class="word-count">
                    📚 ${words.length} words
                </div>

                <div
                    style="
                        margin-top:10px;
                        font-size:0.9em;
                        color:${meta.color};
                    "
                >
                    🎯 Played: ${stats.played}
                    |
                    🏆 Won: ${stats.won}
                </div>
            `;

            container.appendChild(card);
        }

        // If nothing rendered
        if (container.children.length === 0) {

            container.innerHTML = `
                <div style="text-align:center;padding:20px;">
                    No valid categories found.
                </div>
            `;
        }
    }

    // =========================
    // SELECT CATEGORY
    // =========================
    selectCategory(categoryKey) {

        // Validate category
        if (!this.categories?.[categoryKey]) {
            console.error(
                `Category "${categoryKey}" does not exist`
            );
            return;
        }

        this.currentCategory = categoryKey;

        this.hideCategoryScreen();
        this.showGameScreen();

        // Start game
        if (window.gameInstance) {
            window.gameInstance.initGame(categoryKey);
        }
    }

    // =========================
    // HIDE CATEGORY SCREEN
    // =========================
    hideCategoryScreen() {

        const categoryScreen =
            document.getElementById('categoryScreen');

        const gameScreen =
            document.getElementById('gameScreen');

        if (categoryScreen) {
            categoryScreen.classList.remove('active');
        }

        if (gameScreen) {
            gameScreen.classList.add('active');
        }
    }

    // =========================
    // SHOW CATEGORY SCREEN
    // =========================
    showCategoryScreen() {

        const categoryScreen =
            document.getElementById('categoryScreen');

        const gameScreen =
            document.getElementById('gameScreen');

        if (gameScreen) {
            gameScreen.classList.remove('active');
        }

        if (categoryScreen) {
            categoryScreen.classList.add('active');
        }

        this.updateDisplayStats();
    }

    // =========================
    // SHOW GAME SCREEN
    // =========================
    showGameScreen() {

        const gameScreen =
            document.getElementById('gameScreen');

        if (gameScreen) {
            gameScreen.classList.add('active');
        }

        // Safe category metadata
        const meta =
            this.categoryMeta?.[this.currentCategory] || {

                name:
                    this.currentCategory || 'Unknown',

                icon: '📚',

                color: '#3498db'
            };

        // Update badge
        const badge =
            document.getElementById('currentCategory');

        if (badge) {

            badge.textContent =
                `${meta.icon} ${meta.name}`;

            badge.style.backgroundColor =
                meta.color;
        }
    }

    // =========================
    // RANDOM WORD
    // =========================
    getRandomWord() {

        const words =
            this.categories?.[this.currentCategory];

        if (!Array.isArray(words) || words.length === 0) {

            console.warn(
                'No valid words found for category:',
                this.currentCategory
            );

            return 'HANGMAN';
        }

        return words[
            Math.floor(Math.random() * words.length)
        ];
    }
}

// Initialize category manager
const categoryManager = new CategoryManager();