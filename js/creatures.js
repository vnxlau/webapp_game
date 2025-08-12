// Creature management system

class Creature {
    constructor(templateName, level = 1, isWild = true) {
        const template = GameData.creatureTemplates[templateName];
        if (!template) {
            throw new Error(`Unknown creature template: ${templateName}`);
        }

        this.id = Utils.generateId();
        this.templateName = templateName;
        this.name = template.name;
        this.type = template.type;
        this.level = level;
        this.isWild = isWild;
        this.experience = 0;
        this.rarity = template.rarity;
        this.habitat = template.habitat;
        
        // Calculate stats based on level
        this.baseStats = Utils.deepClone(template.baseStats);
        this.currentStats = this.calculateStats();
        this.maxHp = this.currentStats.hp;
        this.currentHp = this.maxHp;
        
        // Evolution
        this.evolutionLevel = template.evolutionLevel;
        this.evolutionTarget = template.evolutionTarget;
        
        // Status conditions
        this.statusConditions = [];
        
        // Moves (simplified - each creature knows basic attack)
        this.moves = this.generateMoves();
    }

    calculateStats() {
        const stats = {};
        for (const [stat, base] of Object.entries(this.baseStats)) {
            // Simple stat calculation: base + (level * growth)
            const growth = Math.floor(base * 0.1); // 10% of base stat per level
            stats[stat] = base + (this.level - 1) * growth;
        }
        return stats;
    }

    generateMoves() {
        const elementType = GameData.elementTypes[this.type];
        return [
            {
                name: `${elementType.name} Strike`,
                type: this.type,
                power: 40,
                accuracy: 90,
                description: `A basic ${elementType.name.toLowerCase()} attack`
            },
            {
                name: 'Tackle',
                type: 'NORMAL',
                power: 35,
                accuracy: 95,
                description: 'A physical tackle attack'
            }
        ];
    }

    get experienceToNextLevel() {
        return this.level * this.level * 100;
    }

    gainExperience(amount) {
        this.experience += amount;
        let leveledUp = false;
        
        while (this.experience >= this.experienceToNextLevel) {
            this.levelUp();
            leveledUp = true;
        }
        
        return leveledUp;
    }

    levelUp() {
        this.experience -= this.experienceToNextLevel;
        this.level++;
        
        // Recalculate stats
        const oldStats = this.currentStats;
        this.currentStats = this.calculateStats();
        this.maxHp = this.currentStats.hp;
        
        // Heal creature when leveling up
        this.currentHp = this.maxHp;
        
        // Log stat increases
        const statGains = {};
        for (const [stat, value] of Object.entries(this.currentStats)) {
            statGains[stat] = value - oldStats[stat];
        }
        
        return {
            level: this.level,
            statGains: statGains,
            canEvolve: this.canEvolve()
        };
    }

    canEvolve() {
        return this.evolutionLevel && this.level >= this.evolutionLevel && this.evolutionTarget;
    }

    evolve() {
        if (!this.canEvolve()) {
            return false;
        }

        const newTemplate = GameData.creatureTemplates[this.evolutionTarget];
        if (!newTemplate) {
            return false;
        }

        // Store old name for evolution message
        const oldName = this.name;
        
        // Update creature data
        this.templateName = this.evolutionTarget;
        this.name = newTemplate.name;
        this.baseStats = Utils.deepClone(newTemplate.baseStats);
        this.evolutionLevel = newTemplate.evolutionLevel;
        this.evolutionTarget = newTemplate.evolutionTarget;
        this.rarity = newTemplate.rarity;
        
        // Recalculate stats and heal
        this.currentStats = this.calculateStats();
        this.maxHp = this.currentStats.hp;
        this.currentHp = this.maxHp;
        
        // Update moves
        this.moves = this.generateMoves();
        
        return {
            oldName: oldName,
            newName: this.name,
            level: this.level
        };
    }

    takeDamage(amount) {
        this.currentHp = Math.max(0, this.currentHp - amount);
        return this.currentHp <= 0;
    }

    heal(amount) {
        this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
    }

    fullHeal() {
        this.currentHp = this.maxHp;
        this.statusConditions = [];
    }

    isDefeated() {
        return this.currentHp <= 0;
    }

    getHealthPercentage() {
        return (this.currentHp / this.maxHp) * 100;
    }

    getTypeEmoji() {
        return GameData.elementTypes[this.type]?.emoji || '❓';
    }

    getTypeColor() {
        return GameData.elementTypes[this.type]?.color || '#666666';
    }

    // Calculate type effectiveness for attacks
    getAttackEffectiveness(defenderType) {
        const attackerElement = GameData.elementTypes[this.type];
        const defenderElement = GameData.elementTypes[defenderType];
        
        if (!attackerElement || !defenderElement) return 1.0;
        
        if (attackerElement.strengths.includes(defenderType)) {
            return 2.0; // Super effective
        } else if (attackerElement.weaknesses.includes(defenderType)) {
            return 0.5; // Not very effective
        } else {
            return 1.0; // Normal damage
        }
    }

    // Generate a wild creature based on biome and level range
    static generateWild(biome, minLevel = 1, maxLevel = 10) {
        const suitableCreatures = [];
        
        for (const [templateName, template] of Object.entries(GameData.creatureTemplates)) {
            if (template.habitat.includes(biome.type)) {
                suitableCreatures.push(templateName);
            }
        }
        
        if (suitableCreatures.length === 0) {
            // Fallback to normal types if no suitable creatures
            suitableCreatures.push('furball', 'quickpaw');
        }
        
        const randomTemplate = Utils.getRandomElement(suitableCreatures);
        const level = Utils.random(minLevel, maxLevel);
        
        return new Creature(randomTemplate, level, true);
    }

    // Create starter creature
    static createStarter(starterName = 'flamewyrm') {
        return new Creature(starterName, 5, false);
    }

    // Serialize for save data
    toJSON() {
        return {
            id: this.id,
            templateName: this.templateName,
            level: this.level,
            experience: this.experience,
            currentHp: this.currentHp,
            isWild: this.isWild,
            statusConditions: this.statusConditions
        };
    }

    // Deserialize from save data
    static fromJSON(data) {
        const creature = new Creature(data.templateName, data.level, data.isWild);
        creature.id = data.id;
        creature.experience = data.experience;
        creature.currentHp = data.currentHp;
        creature.statusConditions = data.statusConditions || [];
        return creature;
    }
}

// Creature Collection Manager
class CreatureCollection {
    constructor() {
        this.capturedCreatures = [];
        this.activeTeam = [];
        this.maxTeamSize = GameData.config.maxTeamSize;
    }

    captureCreature(creature) {
        if (creature.isWild) {
            creature.isWild = false;
            this.capturedCreatures.push(creature);
            
            // Auto-add to team if there's space
            if (this.activeTeam.length < this.maxTeamSize) {
                this.addToTeam(creature);
            }
            
            return true;
        }
        return false;
    }

    addToTeam(creature) {
        if (this.activeTeam.length >= this.maxTeamSize) {
            return false;
        }
        
        if (this.capturedCreatures.includes(creature) && !this.activeTeam.includes(creature)) {
            this.activeTeam.push(creature);
            return true;
        }
        
        return false;
    }

    removeFromTeam(creature) {
        const index = this.activeTeam.indexOf(creature);
        if (index > -1) {
            this.activeTeam.splice(index, 1);
            return true;
        }
        return false;
    }

    getActiveCreature() {
        return this.activeTeam.find(creature => !creature.isDefeated()) || null;
    }

    hasUsableCreatures() {
        return this.activeTeam.some(creature => !creature.isDefeated());
    }

    healAllCreatures() {
        this.capturedCreatures.forEach(creature => creature.fullHeal());
    }

    getUniqueSpeciesCount() {
        const uniqueNames = new Set(this.capturedCreatures.map(c => c.name));
        return uniqueNames.size;
    }

    getCollectorLevel() {
        const uniqueCount = this.getUniqueSpeciesCount();
        
        if (uniqueCount >= 100) return 5; // Master Collector
        if (uniqueCount >= 75) return 4;  // Expert Collector
        if (uniqueCount >= 50) return 3;  // Advanced Collector
        if (uniqueCount >= 25) return 2;  // Collector
        if (uniqueCount >= 10) return 1;  // Novice Collector
        return 0; // Beginner
    }

    getCollectorLevelName() {
        const levels = ['Beginner', 'Novice Collector', 'Collector', 'Advanced Collector', 'Expert Collector', 'Master Collector'];
        return levels[this.getCollectorLevel()];
    }

    // Serialize for save data
    toJSON() {
        return {
            capturedCreatures: this.capturedCreatures.map(c => c.toJSON()),
            activeTeam: this.activeTeam.map(c => c.id)
        };
    }

    // Deserialize from save data
    fromJSON(data) {
        this.capturedCreatures = data.capturedCreatures.map(c => Creature.fromJSON(c));
        
        // Rebuild active team references
        this.activeTeam = [];
        if (data.activeTeam) {
            data.activeTeam.forEach(creatureId => {
                const creature = this.capturedCreatures.find(c => c.id === creatureId);
                if (creature) {
                    this.activeTeam.push(creature);
                }
            });
        }
    }
}
