// Battle system

class BattleSystem {
    constructor() {
        this.currentBattle = null;
        this.battleLog = [];
        this.isPlayerTurn = true;
        this.battleState = 'waiting'; // waiting, selecting, animating, ended
        this.onBattleEnd = null;
    }

    startBattle(playerCreature, wildCreature, onBattleEnd = null) {
        this.currentBattle = {
            player: {
                creature: playerCreature,
                moves: playerCreature.moves
            },
            opponent: {
                creature: wildCreature,
                moves: wildCreature.moves
            },
            turn: 1,
            ended: false
        };
        
        this.battleLog = [];
        this.onBattleEnd = onBattleEnd;
        this.battleState = 'selecting';
        
        // Determine who goes first based on speed
        this.isPlayerTurn = playerCreature.currentStats.speed >= wildCreature.currentStats.speed;
        
        this.addToBattleLog(`A wild ${wildCreature.name} appeared!`);
        this.addToBattleLog(`Go ${playerCreature.name}!`);
        
        return this.currentBattle;
    }

    performAction(action, data = {}) {
        if (!this.currentBattle || this.currentBattle.ended) {
            return null;
        }

        let result = null;

        switch (action) {
            case 'attack':
                result = this.performAttack(data.moveIndex || 0);
                break;
            case 'capture':
                result = this.attemptCapture();
                break;
            case 'run':
                result = this.attemptRun();
                break;
            case 'switch':
                result = this.switchCreature(data.newCreature);
                break;
        }

        // Check if battle should end
        this.checkBattleEnd();

        // If battle continues and it's not player turn, perform AI action
        if (!this.currentBattle.ended && !this.isPlayerTurn) {
            setTimeout(() => this.performAIAction(), 1000);
        }

        return result;
    }

    performAttack(moveIndex = 0) {
        const attacker = this.isPlayerTurn ? this.currentBattle.player.creature : this.currentBattle.opponent.creature;
        const defender = this.isPlayerTurn ? this.currentBattle.opponent.creature : this.currentBattle.player.creature;
        const move = attacker.moves[moveIndex] || attacker.moves[0];

        // Calculate damage
        const damage = this.calculateDamage(attacker, defender, move);
        
        // Apply damage
        const wasDefeated = defender.takeDamage(damage);
        
        // Log attack
        this.addToBattleLog(`${attacker.name} used ${move.name}!`);
        
        // Check type effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        if (effectiveness > 1) {
            this.addToBattleLog("It's super effective!");
        } else if (effectiveness < 1) {
            this.addToBattleLog("It's not very effective...");
        }
        
        this.addToBattleLog(`${defender.name} took ${damage} damage!`);
        
        if (wasDefeated) {
            this.addToBattleLog(`${defender.name} fainted!`);
        }

        // Switch turns
        this.isPlayerTurn = !this.isPlayerTurn;
        this.currentBattle.turn++;

        return {
            attacker: attacker.name,
            defender: defender.name,
            move: move.name,
            damage: damage,
            wasDefeated: wasDefeated,
            effectiveness: effectiveness
        };
    }

    calculateDamage(attacker, defender, move) {
        // Base damage calculation
        const attackPower = attacker.currentStats.attack;
        const defensePower = defender.currentStats.defense;
        const movePower = move.power;
        
        // Base damage formula
        let damage = Math.floor((attackPower * movePower) / (defensePower * 2));
        
        // Type effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        damage = Math.floor(damage * effectiveness);
        
        // Random factor (85-100%)
        const randomFactor = Utils.randomFloat(0.85, 1.0);
        damage = Math.floor(damage * randomFactor);
        
        // Ensure minimum damage
        return Math.max(1, damage);
    }

    getTypeEffectiveness(attackType, defenseType) {
        const attackElement = GameData.elementTypes[attackType];
        if (!attackElement) return 1.0;
        
        if (attackElement.strengths.includes(defenseType)) {
            return 2.0;
        } else if (attackElement.weaknesses.includes(defenseType)) {
            return 0.5;
        }
        
        return 1.0;
    }

    attemptCapture() {
        const wildCreature = this.currentBattle.opponent.creature;
        
        // Calculate capture rate based on creature's health
        const healthPercentage = wildCreature.getHealthPercentage();
        let captureRate = GameData.config.baseCaptureRate;
        
        // Lower health = higher capture rate
        captureRate += (100 - healthPercentage) / 100 * 0.5;
        
        // Rarity affects capture rate
        const rarityModifier = {
            'common': 1.0,
            'uncommon': 0.7,
            'rare': 0.4,
            'legendary': 0.1
        };
        
        captureRate *= rarityModifier[wildCreature.rarity] || 1.0;
        
        // Attempt capture
        const success = Math.random() < captureRate;
        
        if (success) {
            this.addToBattleLog(`${wildCreature.name} was captured!`);
            this.endBattle('captured', wildCreature);
        } else {
            this.addToBattleLog(`${wildCreature.name} broke free!`);
            // Wild creature gets a turn to attack
            this.isPlayerTurn = false;
        }
        
        return {
            success: success,
            creature: success ? wildCreature : null
        };
    }

    attemptRun() {
        // Calculate run success chance based on speed difference
        const playerSpeed = this.currentBattle.player.creature.currentStats.speed;
        const wildSpeed = this.currentBattle.opponent.creature.currentStats.speed;
        
        let runChance = 0.5; // Base 50% chance
        if (playerSpeed > wildSpeed) {
            runChance += (playerSpeed - wildSpeed) / (playerSpeed + wildSpeed) * 0.3;
        } else {
            runChance -= (wildSpeed - playerSpeed) / (playerSpeed + wildSpeed) * 0.2;
        }
        
        runChance = Utils.clamp(runChance, 0.1, 0.9);
        
        const success = Math.random() < runChance;
        
        if (success) {
            this.addToBattleLog("Got away safely!");
            this.endBattle('ran');
        } else {
            this.addToBattleLog("Couldn't get away!");
            // Wild creature gets a turn to attack
            this.isPlayerTurn = false;
        }
        
        return { success: success };
    }

    performAIAction() {
        if (this.currentBattle.ended || this.isPlayerTurn) {
            return;
        }

        // Simple AI: always attack with a random move
        const moveIndex = Utils.random(0, this.currentBattle.opponent.creature.moves.length - 1);
        this.performAttack(moveIndex);
    }

    checkBattleEnd() {
        const playerCreature = this.currentBattle.player.creature;
        const wildCreature = this.currentBattle.opponent.creature;
        
        if (playerCreature.isDefeated()) {
            this.addToBattleLog(`${playerCreature.name} fainted!`);
            this.endBattle('lost');
        } else if (wildCreature.isDefeated()) {
            this.addToBattleLog(`${wildCreature.name} fainted!`);
            
            // Calculate experience gain
            const expGain = this.calculateExperienceGain(wildCreature);
            const leveledUp = playerCreature.gainExperience(expGain);
            
            this.addToBattleLog(`${playerCreature.name} gained ${expGain} experience!`);
            
            if (leveledUp) {
                this.addToBattleLog(`${playerCreature.name} grew to level ${playerCreature.level}!`);
                
                // Check for evolution
                if (playerCreature.canEvolve()) {
                    this.addToBattleLog(`${playerCreature.name} can evolve!`);
                }
            }
            
            this.endBattle('won', null, expGain);
        }
    }

    calculateExperienceGain(defeatedCreature) {
        const baseExp = defeatedCreature.level * 50;
        const rarityMultiplier = {
            'common': 1.0,
            'uncommon': 1.3,
            'rare': 1.6,
            'legendary': 2.0
        };
        
        return Math.floor(baseExp * (rarityMultiplier[defeatedCreature.rarity] || 1.0));
    }

    endBattle(result, capturedCreature = null, expGained = 0) {
        this.currentBattle.ended = true;
        this.battleState = 'ended';
        
        const battleResult = {
            result: result, // 'won', 'lost', 'ran', 'captured'
            capturedCreature: capturedCreature,
            experienceGained: expGained,
            turns: this.currentBattle.turn,
            battleLog: [...this.battleLog]
        };
        
        if (this.onBattleEnd) {
            this.onBattleEnd(battleResult);
        }
        
        return battleResult;
    }

    addToBattleLog(message) {
        this.battleLog.push({
            message: message,
            timestamp: Date.now()
        });
        
        // Keep log size manageable
        if (this.battleLog.length > 50) {
            this.battleLog.shift();
        }
    }

    getBattleLog() {
        return this.battleLog.map(entry => entry.message);
    }

    getCurrentBattle() {
        return this.currentBattle;
    }

    isBattleActive() {
        return this.currentBattle && !this.currentBattle.ended;
    }
}
