// Main entry point - initializes and starts the game

let gameEngine = null;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pokemon RPG: Web Edition - Starting...');
    
    // Show loading message
    showLoadingScreen();
    
    // Initialize game engine
    try {
        gameEngine = new GameEngine();
        console.log('Game initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize game:', error);
        showError('Failed to start game. Please refresh the page and try again.');
    }
});

// Loading screen
function showLoadingScreen() {
    const loadingHtml = `
        <div id="loading-screen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-family: Arial, sans-serif;
        ">
            <h1 style="font-size: 48px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                Pokemon RPG
            </h1>
            <h2 style="font-size: 24px; margin-bottom: 40px; opacity: 0.8;">
                Web Edition
            </h2>
            <div style="
                width: 60px;
                height: 60px;
                border: 6px solid rgba(255,255,255,0.3);
                border-top: 6px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="margin-top: 20px; font-size: 18px; opacity: 0.7;">
                Generating world...
            </p>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
    
    // Remove loading screen after a short delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 2000);
}

function showError(message) {
    const errorHtml = `
        <div id="error-screen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        ">
            <h1 style="color: #ff4444; margin-bottom: 20px;">⚠️ Error</h1>
            <p style="font-size: 18px; margin-bottom: 30px; max-width: 600px;">${message}</p>
            <button onclick="location.reload()" style="
                padding: 12px 24px;
                font-size: 16px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">
                Reload Page
            </button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHtml);
}

// Global key handlers
document.addEventListener('keydown', (e) => {
    // Prevent default behavior for game keys
    if (['w', 'a', 's', 'd', ' ', 'Enter'].includes(e.key) || e.key.startsWith('Arrow')) {
        e.preventDefault();
    }
    
    // Global shortcuts
    switch (e.key) {
        case 'F11':
            // Allow fullscreen toggle
            break;
        case 'F5':
            // Allow page refresh
            break;
        case 'Escape':
            // Close any open modals
            if (gameEngine) {
                const openModal = document.querySelector('.modal:not(.hidden)');
                if (openModal) {
                    gameEngine.closeModal(openModal);
                }
            }
            break;
    }
});

// Handle page visibility changes (pause when tab not active)
document.addEventListener('visibilitychange', () => {
    if (gameEngine) {
        if (document.hidden) {
            gameEngine.pause();
        } else {
            gameEngine.resume();
        }
    }
});

// Handle page unload (save game)
window.addEventListener('beforeunload', () => {
    if (gameEngine) {
        gameEngine.saveGame();
    }
});

// Expose game engine for debugging (in development)
if (typeof window !== 'undefined') {
    window.gameEngine = () => gameEngine;
    window.debugInfo = () => {
        if (!gameEngine) return 'Game not initialized';
        
        return {
            player: gameEngine.player,
            world: gameEngine.world,
            gameState: gameEngine.gameState,
            battleSystem: gameEngine.battleSystem
        };
    };
}

// Console welcome message
console.log(`
🎮 Pokemon RPG: Web Edition
============================
Welcome to the web-based Pokemon-inspired RPG!

Controls:
- WASD or Arrow Keys: Move
- Space/Enter: Explore current location
- C: Open creature collection
- M: Open world map
- Escape: Close modals

Debug Commands:
- gameEngine(): Access game engine
- debugInfo(): View game state

Have fun exploring!
`);
