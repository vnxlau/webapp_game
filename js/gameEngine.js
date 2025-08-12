// Main game engine - coordinates all game systems

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.world = null;
        this.player = null;
        this.renderer = null;
        this.battleSystem = null;
        this.gameState = 'loading'; // loading, playing, battle, paused
        this.lastFrameTime = 0;
        this.isRunning = false;
        
        // Movement smoothing
        this.movementQueue = [];
        this.isMoving = false;
        this.lastMoveTime = 0;
        this.moveDelay = 100; // Minimum time between moves (ms)
        
        // UI elements
        this.ui = {
            playerName: document.getElementById('player-name'),
            playerLevel: document.getElementById('player-level'),
            playerExp: document.getElementById('player-exp'),
            playerExpNext: document.getElementById('player-exp-next'),
            currentBiome: document.getElementById('current-biome'),
            coordinates: document.getElementById('coordinates'),
            teamDisplay: document.getElementById('team-display')
        };
        
        // Modal elements
        this.modals = {
            battle: document.getElementById('battle-modal'),
            collection: document.getElementById('collection-modal'),
            map: document.getElementById('map-modal')
        };
        
        this.initialize();
    }

    async initialize() {
        console.log('Initializing game engine...');
        
        try {
            // Initialize game systems
            this.renderer = new WorldRenderer(this.canvas);
            this.battleSystem = new BattleSystem();
            
            // Try to load saved game
            const savedGame = this.loadGame();
            
            if (savedGame) {
                this.loadFromSave(savedGame);
                console.log('Game loaded from save');
            } else {
                this.createNewGame();
                console.log('New game created');
            }
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Start game loop
            this.gameState = 'playing';
            this.isRunning = true;
            this.gameLoop(0);
            
            // Auto-save every 30 seconds
            setInterval(() => this.saveGame(), GameData.config.autoSaveInterval);
            
            console.log('Game engine initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError('Failed to initialize game. Please refresh the page.');
        }
    }

    createNewGame() {
        // Generate world
        this.world = new WorldGenerator(
            GameData.config.worldSize.width,
            GameData.config.worldSize.height
        );
        
        // Create player
        this.player = new Player('Trainer');
        
        // Position player at starting town
        const startingTown = this.world.pois.find(poi => poi.type === 'town');
        if (startingTown) {
            this.player.worldX = startingTown.x;
            this.player.worldY = startingTown.y;
        } else {
            // Default spawn position
            this.player.worldX = Math.floor(this.world.width / 2);
            this.player.worldY = Math.floor(this.world.height / 2);
        }
        
        // Initialize renderer
        this.renderer = new WorldRenderer(this.canvas, this.world);
        
        // Initialize battle system
        this.battleSystem = new BattleSystem();
        
        this.updateUI();
    }

    loadFromSave(saveData) {
        // Load world
        this.world = new WorldGenerator();
        Object.assign(this.world, saveData.world);
        
        // Load player
        this.player = new Player();
        this.player.fromJSON(saveData.player);
        
        // Initialize renderer
        this.renderer = new WorldRenderer(this.canvas, this.world);
        
        // Initialize battle system
        this.battleSystem = new BattleSystem();
        
        this.updateUI();
    }

    setupEventListeners() {
        // Movement controls
        document.getElementById('move-up').addEventListener('click', () => this.movePlayer('up'));
        document.getElementById('move-down').addEventListener('click', () => this.movePlayer('down'));
        document.getElementById('move-left').addEventListener('click', () => this.movePlayer('left'));
        document.getElementById('move-right').addEventListener('click', () => this.movePlayer('right'));
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Action buttons
        document.getElementById('btn-explore').addEventListener('click', () => this.exploreCurrentLocation());
        document.getElementById('btn-collection').addEventListener('click', () => this.showCollection());
        document.getElementById('btn-map').addEventListener('click', () => this.showMap());
        
        // Battle controls
        document.getElementById('btn-attack').addEventListener('click', () => this.performBattleAction('attack'));
        document.getElementById('btn-capture').addEventListener('click', () => this.performBattleAction('capture'));
        document.getElementById('btn-run').addEventListener('click', () => this.performBattleAction('run'));
        
        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });
        
        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    handleKeyPress(e) {
        if (this.gameState !== 'playing') return;
        
        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.movePlayer('up');
                break;
            case 's':
            case 'arrowdown':
                this.movePlayer('down');
                break;
            case 'a':
            case 'arrowleft':
                this.movePlayer('left');
                break;
            case 'd':
            case 'arrowright':
                this.movePlayer('right');
                break;
            case ' ':
            case 'enter':
                this.exploreCurrentLocation();
                break;
            case 'c':
                this.showCollection();
                break;
            case 'm':
                this.showMap();
                break;
        }
    }

    movePlayer(direction) {
        if (this.gameState !== 'playing') return;
        
        const currentTime = Date.now();
        
        // Prevent movement if still on cooldown
        if (currentTime - this.lastMoveTime < this.moveDelay) return;
        
        const moved = this.player.move(direction, this.world);
        
        if (moved) {
            this.lastMoveTime = currentTime;
            this.updateUI();
            
            // Check for encounters
            const encounter = this.player.checkForEncounter(this.world);
            if (encounter) {
                this.startBattle(encounter);
            }
        }
    }

    exploreCurrentLocation() {
        const poi = this.player.getCurrentPOI(this.world);
        const biome = this.player.getCurrentBiome(this.world);
        
        if (poi) {
            this.handlePOIInteraction(poi);
        } else {
            // Random encounter in current biome
            const encounter = Creature.generateWild(biome, this.player.level - 2, this.player.level + 3);
            this.startBattle(encounter);
        }
    }

    handlePOIInteraction(poi) {
        switch (poi.type) {
            case 'town':
                this.handleTownInteraction(poi);
                break;
            case 'dungeon':
            case 'cave':
            case 'ruins':
                this.handleDungeonInteraction(poi);
                break;
            case 'shrine':
                this.handleShrineInteraction(poi);
                break;
        }
    }

    handleTownInteraction(poi) {
        // Heal all creatures
        this.player.creatureCollection.healAllCreatures();
        this.showMessage(`Welcome to ${poi.name}! Your creatures have been healed.`);
    }

    handleDungeonInteraction(poi) {
        // Spawn a stronger creature
        const biome = this.player.getCurrentBiome(this.world);
        const encounter = Creature.generateWild(biome, this.player.level, this.player.level + 5);
        this.startBattle(encounter);
    }

    handleShrineInteraction(poi) {
        // Give player experience
        const expGain = this.player.level * 25;
        this.player.gainExperience(expGain);
        this.updateUI();
        this.showMessage(`You prayed at the ${poi.name} and gained ${expGain} experience!`);
    }

    startBattle(wildCreature) {
        const playerCreature = this.player.creatureCollection.getActiveCreature();
        
        if (!playerCreature || playerCreature.isDefeated()) {
            this.showMessage('You have no creatures able to battle!');
            return;
        }
        
        // Trigger visual encounter effect
        this.worldRenderer.triggerCreatureEncounter(this.player.worldX, this.player.worldY);
        
        this.gameState = 'battle';
        this.showModal(this.modals.battle);
        
        this.battleSystem.startBattle(playerCreature, wildCreature, (result) => {
            this.handleBattleEnd(result);
        });
        
        this.updateBattleUI();
    }

    performBattleAction(action, data = {}) {
        if (this.gameState !== 'battle') return;
        
        const result = this.battleSystem.performAction(action, data);
        this.updateBattleUI();
        
        return result;
    }

    handleBattleEnd(result) {
        console.log('Battle ended:', result);
        
        this.gameState = 'playing';
        this.closeModal(this.modals.battle);
        
        switch (result.result) {
            case 'won':
                this.player.gameStats.battlesWon++;
                this.player.gainExperience(Math.floor(result.experienceGained / 2));
                this.showMessage(`Victory! Gained ${result.experienceGained} experience.`);
                break;
                
            case 'captured':
                this.player.gameStats.battlesWon++;
                this.player.gameStats.creaturesCapured++;
                this.player.creatureCollection.captureCreature(result.capturedCreature);
                this.showMessage(`${result.capturedCreature.name} was captured!`);
                break;
                
            case 'lost':
                this.player.gameStats.battlesLost++;
                this.showMessage('You were defeated! Your creatures need healing.');
                break;
                
            case 'ran':
                this.showMessage('Got away safely!');
                break;
        }
        
        this.updateUI();
    }

    showCollection() {
        this.updateCollectionUI();
        this.showModal(this.modals.collection);
    }

    showMap() {
        this.updateMapUI();
        this.showModal(this.modals.map);
    }

    updateUI() {
        // Player info
        this.ui.playerName.textContent = this.player.name;
        this.ui.playerLevel.textContent = this.player.level;
        this.ui.playerExp.textContent = this.player.experience;
        this.ui.playerExpNext.textContent = this.player.experienceToNextLevel;
        
        // Location info
        const biome = this.player.getCurrentBiome(this.world);
        if (biome) {
            this.ui.currentBiome.textContent = biome.name;
        }
        this.ui.coordinates.textContent = `(${this.player.x}, ${this.player.y})`;
        
        // Team display
        this.updateTeamDisplay();
    }

    updateTeamDisplay() {
        const teamDisplay = this.ui.teamDisplay;
        teamDisplay.innerHTML = '';
        
        this.player.creatureCollection.activeTeam.forEach((creature, index) => {
            const creatureElement = document.createElement('div');
            creatureElement.className = 'team-creature';
            creatureElement.style.backgroundColor = creature.getTypeColor();
            creatureElement.textContent = creature.getTypeEmoji();
            creatureElement.title = `${creature.name} (Lv.${creature.level}) - ${creature.currentHp}/${creature.maxHp} HP`;
            
            if (creature.isDefeated()) {
                creatureElement.style.opacity = '0.3';
            }
            
            teamDisplay.appendChild(creatureElement);
        });
    }

    updateBattleUI() {
        const battle = this.battleSystem.getCurrentBattle();
        if (!battle) return;
        
        const playerCreature = battle.player.creature;
        const opponentCreature = battle.opponent.creature;
        
        // Update creature info
        document.getElementById('active-creature-name').textContent = playerCreature.name;
        document.getElementById('active-creature-level').textContent = `Lv.${playerCreature.level}`;
        document.getElementById('opponent-name').textContent = `Wild ${opponentCreature.name}`;
        document.getElementById('opponent-level').textContent = `Lv.${opponentCreature.level}`;
        
        // Update health bars
        const playerHealthBar = document.getElementById('player-health');
        const opponentHealthBar = document.getElementById('opponent-health');
        
        playerHealthBar.style.width = `${playerCreature.getHealthPercentage()}%`;
        opponentHealthBar.style.width = `${opponentCreature.getHealthPercentage()}%`;
        
        // Update health bar colors
        playerHealthBar.style.backgroundColor = this.getHealthColor(playerCreature.getHealthPercentage());
        opponentHealthBar.style.backgroundColor = this.getHealthColor(opponentCreature.getHealthPercentage());
        
        // Update battle log
        const battleLog = document.getElementById('battle-log');
        battleLog.innerHTML = this.battleSystem.getBattleLog().slice(-5).map(msg => `<div>${msg}</div>`).join('');
        battleLog.scrollTop = battleLog.scrollHeight;
    }

    updateCollectionUI() {
        const collection = this.player.creatureCollection;
        
        // Update stats
        document.getElementById('collector-level').textContent = collection.getCollectorLevelName();
        document.getElementById('total-captured').textContent = collection.capturedCreatures.length;
        document.getElementById('unique-species').textContent = collection.getUniqueSpeciesCount();
        
        // Update creature grid
        const creatureGrid = document.getElementById('creature-grid');
        creatureGrid.innerHTML = '';
        
        collection.capturedCreatures.forEach(creature => {
            const card = this.createCreatureCard(creature);
            creatureGrid.appendChild(card);
        });
    }

    createCreatureCard(creature) {
        const card = document.createElement('div');
        card.className = 'creature-card';
        
        card.innerHTML = `
            <div class="creature-sprite" style="background-color: ${creature.getTypeColor()}">
                ${creature.getTypeEmoji()}
            </div>
            <h4>${creature.name}</h4>
            <p>Level ${creature.level}</p>
            <p class="type-${creature.type.toLowerCase()}">${GameData.elementTypes[creature.type].name}</p>
            <p>${creature.currentHp}/${creature.maxHp} HP</p>
        `;
        
        return card;
    }

    updateMapUI() {
        const mapCanvas = document.getElementById('world-map');
        const ctx = mapCanvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
        
        // Render world overview
        const scaleX = mapCanvas.width / this.world.width;
        const scaleY = mapCanvas.height / this.world.height;
        
        for (let y = 0; y < this.world.height; y++) {
            for (let x = 0; x < this.world.width; x++) {
                const biome = this.world.getBiomeAt(x, y);
                if (biome) {
                    ctx.fillStyle = biome.color;
                    ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
                }
            }
        }
        
        // Render POIs
        this.world.pois.forEach(poi => {
            ctx.fillStyle = '#000';
            ctx.fillRect(poi.x * scaleX - 1, poi.y * scaleY - 1, 3, 3);
        });
        
        // Render player position
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(this.player.x * scaleX - 2, this.player.y * scaleY - 2, 4, 4);
    }

    getHealthColor(percentage) {
        if (percentage > 60) return GameData.ui.colors.healthHigh;
        if (percentage > 30) return GameData.ui.colors.healthMid;
        return GameData.ui.colors.healthLow;
    }

    showModal(modal) {
        modal.classList.remove('hidden');
    }

    closeModal(modal) {
        modal.classList.add('hidden');
    }

    showMessage(message, duration = 3000) {
        // Create temporary message element
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 16px;
        `;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, duration);
    }

    showError(message) {
        this.showMessage(`Error: ${message}`, 5000);
    }

    gameLoop(currentTime) {
        if (!this.isRunning) return;
        
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        
        // Update game state
        this.update(deltaTime);
        
        // Render
        if (this.gameState === 'playing') {
            this.renderer.render(this.world, this.player, deltaTime);
        }
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Update player stats (for UI refresh)
        this.player.gameStats.updatePlayTime();
        
        // Auto-save detection
        // (Auto-save is handled by setInterval in initialize())
    }

    saveGame() {
        const saveData = {
            version: '1.0',
            timestamp: Date.now(),
            world: this.world.getWorldData(),
            player: this.player.toJSON()
        };
        
        Utils.saveToStorage('pokemonRPG_save', saveData);
        console.log('Game saved');
    }

    loadGame() {
        return Utils.loadFromStorage('pokemonRPG_save');
    }

    deleteSave() {
        Utils.removeFromStorage('pokemonRPG_save');
        console.log('Save deleted');
    }

    pause() {
        this.isRunning = false;
        this.gameState = 'paused';
    }

    resume() {
        this.isRunning = true;
        this.gameState = 'playing';
        this.gameLoop(performance.now());
    }

    restart() {
        this.deleteSave();
        location.reload();
    }
}
