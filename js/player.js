// Player management system

class Player {
    constructor(name = 'Trainer') {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.x = 50; // Starting position
        this.y = 50;
        this.defeatedBosses = [];
        this.visitedLocations = new Set();
        this.inventory = new Inventory();
        this.creatureCollection = new CreatureCollection();
        this.gameStats = new GameStats();
        
        // Add starter creature
        this.addStarterCreature();
    }

    addStarterCreature() {
        const starter = Creature.createStarter('flamewyrm');
        this.creatureCollection.captureCreature(starter);
    }

    get experienceToNextLevel() {
        return this.level * this.level * 150;
    }

    gainExperience(amount) {
        this.experience += amount;
        let leveledUp = false;
        
        while (this.experience >= this.experienceToNextLevel) {
            this.levelUp();
            leveledUp = true;
        }
        
        this.gameStats.totalExperienceGained += amount;
        return leveledUp;
    }

    levelUp() {
        this.experience -= this.experienceToNextLevel;
        this.level++;
        
        // Heal all creatures when player levels up
        this.creatureCollection.healAllCreatures();
        
        return {
            newLevel: this.level,
            bonusHeal: true
        };
    }

    moveTo(newX, newY, world) {
        // Check bounds
        if (newX < 0 || newX >= world.width || newY < 0 || newY >= world.height) {
            return false;
        }

        // Check if the destination is valid (not deep water for walking)
        const biome = world.getBiomeAt(newX, newY);
        if (biome && biome.type === 'water') {
            // Need a water creature or boat to traverse water
            return false;
        }

        this.x = newX;
        this.y = newY;
        
        // Track visited locations
        this.visitedLocations.add(`${newX},${newY}`);
        
        // Update movement stats
        this.gameStats.stepsTaken++;
        
        return true;
    }

    move(direction, world) {
        let newX = this.x;
        let newY = this.y;
        
        switch (direction) {
            case 'up':
                newY--;
                break;
            case 'down':
                newY++;
                break;
            case 'left':
                newX--;
                break;
            case 'right':
                newX++;
                break;
            default:
                return false;
        }
        
        return this.moveTo(newX, newY, world);
    }

    defeatBoss(bossId) {
        if (!this.defeatedBosses.includes(bossId)) {
            this.defeatedBosses.push(bossId);
            this.gameStats.bossesDefeated++;
            return true;
        }
        return false;
    }

    hasDefeatedAllBosses() {
        return this.defeatedBosses.length >= GameData.bosses.length;
    }

    canChallengeFinalBoss() {
        return this.hasDefeatedAllBosses();
    }

    getCurrentBiome(world) {
        return world.getBiomeAt(this.x, this.y);
    }

    getCurrentPOI(world) {
        return world.getPOIAt(this.x, this.y);
    }

    // Check for wild creature encounters
    checkForEncounter(world) {
        const biome = this.getCurrentBiome(world);
        if (!biome) return null;
        
        const encounterChance = biome.encounterRate * GameData.config.baseEncounterRate;
        
        if (Math.random() < encounterChance) {
            const playerLevel = this.level;
            const minLevel = Math.max(1, playerLevel - 3);
            const maxLevel = playerLevel + 2;
            
            return Creature.generateWild(biome, minLevel, maxLevel);
        }
        
        return null;
    }

    // Serialize for save data
    toJSON() {
        return {
            name: this.name,
            level: this.level,
            experience: this.experience,
            x: this.x,
            y: this.y,
            defeatedBosses: this.defeatedBosses,
            visitedLocations: Array.from(this.visitedLocations),
            inventory: this.inventory.toJSON(),
            creatureCollection: this.creatureCollection.toJSON(),
            gameStats: this.gameStats.toJSON()
        };
    }

    // Deserialize from save data
    fromJSON(data) {
        this.name = data.name;
        this.level = data.level;
        this.experience = data.experience;
        this.x = data.x;
        this.y = data.y;
        this.defeatedBosses = data.defeatedBosses || [];
        this.visitedLocations = new Set(data.visitedLocations || []);
        
        if (data.inventory) {
            this.inventory.fromJSON(data.inventory);
        }
        
        if (data.creatureCollection) {
            this.creatureCollection.fromJSON(data.creatureCollection);
        }
        
        if (data.gameStats) {
            this.gameStats.fromJSON(data.gameStats);
        }
    }
}

// Inventory system
class Inventory {
    constructor() {
        this.items = new Map();
        this.maxSlots = 50;
    }

    addItem(itemId, quantity = 1) {
        const currentQuantity = this.items.get(itemId) || 0;
        this.items.set(itemId, currentQuantity + quantity);
        return true;
    }

    removeItem(itemId, quantity = 1) {
        const currentQuantity = this.items.get(itemId) || 0;
        if (currentQuantity >= quantity) {
            const newQuantity = currentQuantity - quantity;
            if (newQuantity === 0) {
                this.items.delete(itemId);
            } else {
                this.items.set(itemId, newQuantity);
            }
            return true;
        }
        return false;
    }

    hasItem(itemId, quantity = 1) {
        return (this.items.get(itemId) || 0) >= quantity;
    }

    getItemCount(itemId) {
        return this.items.get(itemId) || 0;
    }

    toJSON() {
        return {
            items: Object.fromEntries(this.items),
            maxSlots: this.maxSlots
        };
    }

    fromJSON(data) {
        this.items = new Map(Object.entries(data.items || {}));
        this.maxSlots = data.maxSlots || 50;
    }
}

// Game statistics tracking
class GameStats {
    constructor() {
        this.stepsTaken = 0;
        this.battlesWon = 0;
        this.battlesLost = 0;
        this.creaturesCapured = 0;
        this.bossesDefeated = 0;
        this.totalExperienceGained = 0;
        this.locationsDiscovered = 0;
        this.timePlayedMs = 0;
        this.gameStartTime = Date.now();
    }

    updatePlayTime() {
        this.timePlayedMs = Date.now() - this.gameStartTime;
    }

    getPlayTimeFormatted() {
        const hours = Math.floor(this.timePlayedMs / (1000 * 60 * 60));
        const minutes = Math.floor((this.timePlayedMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }

    toJSON() {
        this.updatePlayTime();
        return {
            stepsTaken: this.stepsTaken,
            battlesWon: this.battlesWon,
            battlesLost: this.battlesLost,
            creaturesCapured: this.creaturesCapured,
            bossesDefeated: this.bossesDefeated,
            totalExperienceGained: this.totalExperienceGained,
            locationsDiscovered: this.locationsDiscovered,
            timePlayedMs: this.timePlayedMs,
            gameStartTime: this.gameStartTime
        };
    }

    fromJSON(data) {
        this.stepsTaken = data.stepsTaken || 0;
        this.battlesWon = data.battlesWon || 0;
        this.battlesLost = data.battlesLost || 0;
        this.creaturesCapured = data.creaturesCapured || 0;
        this.bossesDefeated = data.bossesDefeated || 0;
        this.totalExperienceGained = data.totalExperienceGained || 0;
        this.locationsDiscovered = data.locationsDiscovered || 0;
        this.timePlayedMs = data.timePlayedMs || 0;
        this.gameStartTime = data.gameStartTime || Date.now();
    }
}
