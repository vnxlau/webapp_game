// Game data and configuration

const GameData = {
    // Element types and their relationships
    elementTypes: {
        FIRE: {
            name: 'Fire',
            color: '#FF6B35',
            strengths: ['GRASS', 'ICE'],
            weaknesses: ['WATER', 'GROUND', 'ROCK'],
            emoji: '🔥'
        },
        WATER: {
            name: 'Water',
            color: '#3498DB',
            strengths: ['FIRE', 'GROUND', 'ROCK'],
            weaknesses: ['GRASS', 'ELECTRIC'],
            emoji: '💧'
        },
        GRASS: {
            name: 'Grass',
            color: '#2ECC71',
            strengths: ['WATER', 'GROUND', 'ROCK'],
            weaknesses: ['FIRE', 'ICE', 'POISON', 'FLYING'],
            emoji: '🌿'
        },
        ELECTRIC: {
            name: 'Electric',
            color: '#F1C40F',
            strengths: ['WATER', 'FLYING'],
            weaknesses: ['GROUND'],
            emoji: '⚡'
        },
        ICE: {
            name: 'Ice',
            color: '#85C1E9',
            strengths: ['GRASS', 'GROUND', 'FLYING'],
            weaknesses: ['FIRE', 'FIGHTING', 'ROCK'],
            emoji: '❄️'
        },
        GROUND: {
            name: 'Ground',
            color: '#D2691E',
            strengths: ['FIRE', 'ELECTRIC', 'POISON', 'ROCK'],
            weaknesses: ['WATER', 'GRASS', 'ICE'],
            emoji: '🌍'
        },
        ROCK: {
            name: 'Rock',
            color: '#696969',
            strengths: ['FIRE', 'ICE', 'FLYING'],
            weaknesses: ['WATER', 'GRASS', 'FIGHTING', 'GROUND'],
            emoji: '🗿'
        },
        FLYING: {
            name: 'Flying',
            color: '#87CEEB',
            strengths: ['GRASS', 'FIGHTING'],
            weaknesses: ['ELECTRIC', 'ICE', 'ROCK'],
            emoji: '🦅'
        },
        POISON: {
            name: 'Poison',
            color: '#8E44AD',
            strengths: ['GRASS'],
            weaknesses: ['GROUND', 'PSYCHIC'],
            emoji: '☠️'
        },
        PSYCHIC: {
            name: 'Psychic',
            color: '#E91E63',
            strengths: ['FIGHTING', 'POISON'],
            weaknesses: [],
            emoji: '🔮'
        },
        FIGHTING: {
            name: 'Fighting',
            color: '#CD853F',
            strengths: ['NORMAL', 'ROCK', 'ICE'],
            weaknesses: ['FLYING', 'PSYCHIC'],
            emoji: '👊'
        },
        NORMAL: {
            name: 'Normal',
            color: '#95A5A6',
            strengths: [],
            weaknesses: ['FIGHTING'],
            emoji: '⚪'
        }
    },

    // Base creature templates
    creatureTemplates: {
        // Fire creatures
        flamewyrm: {
            name: 'Flamewyrm',
            type: 'FIRE',
            baseStats: { hp: 45, attack: 35, defense: 30, speed: 25 },
            evolutionLevel: 16,
            evolutionTarget: 'infernowyrm',
            rarity: 'common',
            habitat: ['volcanic', 'desert']
        },
        infernowyrm: {
            name: 'Infernowyrm',
            type: 'FIRE',
            baseStats: { hp: 65, attack: 55, defense: 45, speed: 40 },
            evolutionLevel: null,
            rarity: 'uncommon',
            habitat: ['volcanic']
        },
        emberite: {
            name: 'Emberite',
            type: 'FIRE',
            baseStats: { hp: 35, attack: 40, defense: 25, speed: 30 },
            evolutionLevel: 18,
            evolutionTarget: 'blazestone',
            rarity: 'common',
            habitat: ['volcanic', 'mountain']
        },
        blazestone: {
            name: 'Blazestone',
            type: 'FIRE',
            baseStats: { hp: 55, attack: 65, defense: 50, speed: 35 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['volcanic']
        },

        // Water creatures
        aquafin: {
            name: 'Aquafin',
            type: 'WATER',
            baseStats: { hp: 40, attack: 30, defense: 35, speed: 20 },
            evolutionLevel: 16,
            evolutionTarget: 'tidalfin',
            rarity: 'common',
            habitat: ['water', 'swamp']
        },
        tidalfin: {
            name: 'Tidalfin',
            type: 'WATER',
            baseStats: { hp: 60, attack: 50, defense: 55, speed: 35 },
            evolutionLevel: null,
            rarity: 'uncommon',
            habitat: ['water']
        },
        streamlet: {
            name: 'Streamlet',
            type: 'WATER',
            baseStats: { hp: 50, attack: 25, defense: 40, speed: 45 },
            evolutionLevel: 20,
            evolutionTarget: 'torrentbeast',
            rarity: 'common',
            habitat: ['water', 'forest']
        },

        // Grass creatures
        leafling: {
            name: 'Leafling',
            type: 'GRASS',
            baseStats: { hp: 45, attack: 25, defense: 40, speed: 20 },
            evolutionLevel: 14,
            evolutionTarget: 'thornbeast',
            rarity: 'common',
            habitat: ['forest', 'jungle', 'grassland']
        },
        thornbeast: {
            name: 'Thornbeast',
            type: 'GRASS',
            baseStats: { hp: 70, attack: 45, defense: 65, speed: 25 },
            evolutionLevel: null,
            rarity: 'uncommon',
            habitat: ['forest', 'jungle']
        },
        vinewhip: {
            name: 'Vinewhip',
            type: 'GRASS',
            baseStats: { hp: 40, attack: 35, defense: 30, speed: 35 },
            evolutionLevel: 18,
            evolutionTarget: 'jungleguard',
            rarity: 'common',
            habitat: ['jungle', 'swamp']
        },

        // Electric creatures
        sparkle: {
            name: 'Sparkle',
            type: 'ELECTRIC',
            baseStats: { hp: 35, attack: 40, defense: 25, speed: 50 },
            evolutionLevel: 15,
            evolutionTarget: 'voltbeast',
            rarity: 'uncommon',
            habitat: ['grassland', 'mountain']
        },
        voltbeast: {
            name: 'Voltbeast',
            type: 'ELECTRIC',
            baseStats: { hp: 55, attack: 65, defense: 40, speed: 75 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['mountain']
        },

        // Ice creatures
        frostling: {
            name: 'Frostling',
            type: 'ICE',
            baseStats: { hp: 50, attack: 30, defense: 45, speed: 15 },
            evolutionLevel: 20,
            evolutionTarget: 'glacierbeast',
            rarity: 'uncommon',
            habitat: ['ice', 'tundra', 'mountain']
        },
        snowpup: {
            name: 'Snowpup',
            type: 'ICE',
            baseStats: { hp: 40, attack: 25, defense: 35, speed: 30 },
            evolutionLevel: 16,
            evolutionTarget: 'blizzardwolf',
            rarity: 'common',
            habitat: ['tundra', 'ice']
        },

        // Ground creatures
        rockpup: {
            name: 'Rockpup',
            type: 'GROUND',
            baseStats: { hp: 55, attack: 40, defense: 50, speed: 15 },
            evolutionLevel: 18,
            evolutionTarget: 'earthguard',
            rarity: 'common',
            habitat: ['mountain', 'desert', 'grassland']
        },
        sandcrawler: {
            name: 'Sandcrawler',
            type: 'GROUND',
            baseStats: { hp: 45, attack: 35, defense: 45, speed: 25 },
            evolutionLevel: 16,
            evolutionTarget: 'dunelord',
            rarity: 'common',
            habitat: ['desert']
        },

        // Rock creatures
        pebble: {
            name: 'Pebble',
            type: 'ROCK',
            baseStats: { hp: 40, attack: 45, defense: 60, speed: 10 },
            evolutionLevel: 22,
            evolutionTarget: 'boulder',
            rarity: 'common',
            habitat: ['mountain', 'volcanic']
        },
        crystalite: {
            name: 'Crystalite',
            type: 'ROCK',
            baseStats: { hp: 35, attack: 50, defense: 55, speed: 20 },
            evolutionLevel: 25,
            evolutionTarget: 'gemguard',
            rarity: 'rare',
            habitat: ['mountain', 'volcanic']
        },

        // Flying creatures
        windlet: {
            name: 'Windlet',
            type: 'FLYING',
            baseStats: { hp: 35, attack: 30, defense: 25, speed: 60 },
            evolutionLevel: 16,
            evolutionTarget: 'stormwing',
            rarity: 'common',
            habitat: ['grassland', 'mountain', 'forest']
        },
        cloudpuff: {
            name: 'Cloudpuff',
            type: 'FLYING',
            baseStats: { hp: 50, attack: 25, defense: 30, speed: 45 },
            evolutionLevel: 20,
            evolutionTarget: 'skyguard',
            rarity: 'uncommon',
            habitat: ['mountain']
        },

        // Poison creatures
        toxiling: {
            name: 'Toxiling',
            type: 'POISON',
            baseStats: { hp: 40, attack: 35, defense: 35, speed: 30 },
            evolutionLevel: 16,
            evolutionTarget: 'venombeast',
            rarity: 'common',
            habitat: ['swamp', 'jungle']
        },
        sludgeling: {
            name: 'Sludgeling',
            type: 'POISON',
            baseStats: { hp: 60, attack: 30, defense: 40, speed: 20 },
            evolutionLevel: 18,
            evolutionTarget: 'toxicguard',
            rarity: 'uncommon',
            habitat: ['swamp']
        },

        // Psychic creatures
        mindling: {
            name: 'Mindling',
            type: 'PSYCHIC',
            baseStats: { hp: 45, attack: 40, defense: 30, speed: 35 },
            evolutionLevel: 20,
            evolutionTarget: 'psybeast',
            rarity: 'rare',
            habitat: ['mountain', 'forest']
        },

        // Fighting creatures
        fistling: {
            name: 'Fistling',
            type: 'FIGHTING',
            baseStats: { hp: 50, attack: 45, defense: 35, speed: 30 },
            evolutionLevel: 18,
            evolutionTarget: 'brawler',
            rarity: 'uncommon',
            habitat: ['mountain', 'grassland']
        },

        // Normal creatures
        furball: {
            name: 'Furball',
            type: 'NORMAL',
            baseStats: { hp: 55, attack: 30, defense: 30, speed: 35 },
            evolutionLevel: 15,
            evolutionTarget: 'fluffguard',
            rarity: 'common',
            habitat: ['grassland', 'forest']
        },
        quickpaw: {
            name: 'Quickpaw',
            type: 'NORMAL',
            baseStats: { hp: 40, attack: 35, defense: 25, speed: 55 },
            evolutionLevel: 16,
            evolutionTarget: 'swiftclaw',
            rarity: 'common',
            habitat: ['grassland', 'forest']
        },

        // Japanese-inspired creatures (Ghibli-style)
        kitsunesprout: {
            name: 'Kitsune Sprout',
            type: 'GRASS',
            baseStats: { hp: 45, attack: 30, defense: 35, speed: 40 },
            evolutionLevel: 18,
            evolutionTarget: 'kitsunesage',
            rarity: 'common',
            habitat: ['forest', 'grassland'],
            description: 'A young fox spirit with a single tail and blooming flowers on its back.'
        },
        kitsunesage: {
            name: 'Kitsune Sage',
            type: 'GRASS',
            baseStats: { hp: 75, attack: 55, defense: 60, speed: 65 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['forest'],
            description: 'An ancient fox spirit with three tails and wisdom of the forest.'
        },
        tanukipup: {
            name: 'Tanuki Pup',
            type: 'NORMAL',
            baseStats: { hp: 50, attack: 40, defense: 40, speed: 30 },
            evolutionLevel: 20,
            evolutionTarget: 'tanukitrickster',
            rarity: 'common',
            habitat: ['forest', 'grassland'],
            description: 'A playful raccoon dog that loves to play tricks on travelers.'
        },
        tanukitrickster: {
            name: 'Tanuki Trickster',
            type: 'NORMAL',
            baseStats: { hp: 80, attack: 65, defense: 65, speed: 55 },
            evolutionLevel: null,
            rarity: 'uncommon',
            habitat: ['forest'],
            description: 'A master of illusion who can shapeshift and deceive enemies.'
        },
        kodamaspirit: {
            name: 'Kodama Spirit',
            type: 'FAIRY',
            baseStats: { hp: 35, attack: 25, defense: 30, speed: 60 },
            evolutionLevel: 22,
            evolutionTarget: 'kodamaguardian',
            rarity: 'uncommon',
            habitat: ['forest'],
            description: 'A tiny tree spirit that glows with gentle light and protects the forest.'
        },
        kodamaguardian: {
            name: 'Kodama Guardian',
            type: 'FAIRY',
            baseStats: { hp: 65, attack: 45, defense: 55, speed: 80 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['forest'],
            description: 'A powerful tree spirit that commands the respect of all forest creatures.'
        },
        kappawarrior: {
            name: 'Kappa Warrior',
            type: 'WATER',
            baseStats: { hp: 55, attack: 45, defense: 50, speed: 35 },
            evolutionLevel: 25,
            evolutionTarget: 'kappamaster',
            rarity: 'uncommon',
            habitat: ['water', 'swamp'],
            description: 'A turtle-like creature with a water-filled bowl on its head that grants it power.'
        },
        kappamaster: {
            name: 'Kappa Master',
            type: 'WATER',
            baseStats: { hp: 85, attack: 70, defense: 75, speed: 50 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['water'],
            description: 'A legendary water spirit known for its incredible strength and wisdom.'
        },
        onichild: {
            name: 'Oni Child',
            type: 'DARK',
            baseStats: { hp: 60, attack: 50, defense: 35, speed: 25 },
            evolutionLevel: 28,
            evolutionTarget: 'oniwarrior',
            rarity: 'uncommon',
            habitat: ['mountain', 'cave'],
            description: 'A young demon with small horns and fierce determination.'
        },
        oniwarrior: {
            name: 'Oni Warrior',
            type: 'DARK',
            baseStats: { hp: 95, attack: 85, defense: 60, speed: 40 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['mountain'],
            description: 'A powerful demon warrior with massive horns and incredible strength.'
        },
        tenguchick: {
            name: 'Tengu Chick',
            type: 'FLYING',
            baseStats: { hp: 40, attack: 45, defense: 30, speed: 50 },
            evolutionLevel: 24,
            evolutionTarget: 'tengumaster',
            rarity: 'uncommon',
            habitat: ['mountain', 'forest'],
            description: 'A young crow spirit learning the ways of wind and martial arts.'
        },
        tengumaster: {
            name: 'Tengu Master',
            type: 'FLYING',
            baseStats: { hp: 70, attack: 75, defense: 55, speed: 85 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['mountain'],
            description: 'A master of martial arts and wind magic with incredible aerial prowess.'
        },
        shibainu: {
            name: 'Shiba Inu',
            type: 'NORMAL',
            baseStats: { hp: 45, attack: 40, defense: 40, speed: 45 },
            evolutionLevel: null,
            rarity: 'common',
            habitat: ['grassland', 'forest'],
            description: 'A loyal and brave dog with a spirited personality and unwavering courage.'
        },
        nekomata: {
            name: 'Nekomata',
            type: 'PSYCHIC',
            baseStats: { hp: 50, attack: 35, defense: 35, speed: 60 },
            evolutionLevel: null,
            rarity: 'rare',
            habitat: ['forest', 'ruins'],
            description: 'A mystical two-tailed cat with supernatural powers and ancient wisdom.'
        }
    },

    // Boss creatures
    bosses: [
        {
            id: 1,
            name: 'Flame Emperor',
            type: 'FIRE',
            level: 25,
            stats: { hp: 150, attack: 80, defense: 60, speed: 45 },
            location: { biome: 'volcanic', name: 'Molten Peak' }
        },
        {
            id: 2,
            name: 'Tide Master',
            type: 'WATER',
            level: 30,
            stats: { hp: 160, attack: 75, defense: 70, speed: 50 },
            location: { biome: 'water', name: 'Deep Abyss' }
        },
        {
            id: 3,
            name: 'Forest Guardian',
            type: 'GRASS',
            level: 28,
            stats: { hp: 180, attack: 70, defense: 85, speed: 35 },
            location: { biome: 'jungle', name: 'Ancient Grove' }
        },
        {
            id: 4,
            name: 'Storm Lord',
            type: 'ELECTRIC',
            level: 32,
            stats: { hp: 140, attack: 90, defense: 55, speed: 80 },
            location: { biome: 'mountain', name: 'Thunder Peak' }
        },
        {
            id: 5,
            name: 'Frost Monarch',
            type: 'ICE',
            level: 35,
            stats: { hp: 170, attack: 75, defense: 80, speed: 40 },
            location: { biome: 'ice', name: 'Frozen Throne' }
        },
        {
            id: 6,
            name: 'Earth Shaker',
            type: 'GROUND',
            level: 33,
            stats: { hp: 200, attack: 85, defense: 90, speed: 25 },
            location: { biome: 'mountain', name: 'Bedrock Depths' }
        },
        {
            id: 7,
            name: 'Crystal Titan',
            type: 'ROCK',
            level: 36,
            stats: { hp: 220, attack: 80, defense: 100, speed: 20 },
            location: { biome: 'mountain', name: 'Crystal Caverns' }
        },
        {
            id: 8,
            name: 'Sky Sovereign',
            type: 'FLYING',
            level: 38,
            stats: { hp: 155, attack: 95, defense: 65, speed: 90 },
            location: { biome: 'mountain', name: 'Celestial Peaks' }
        },
        {
            id: 9,
            name: 'Venom Overlord',
            type: 'POISON',
            level: 40,
            stats: { hp: 175, attack: 85, defense: 75, speed: 55 },
            location: { biome: 'swamp', name: 'Toxic Marshlands' }
        }
    ],

    // Final boss
    finalBoss: {
        name: 'The Ancient One',
        type: 'PSYCHIC',
        level: 50,
        stats: { hp: 300, attack: 120, defense: 100, speed: 80 },
        location: { biome: 'special', name: 'Realm of Consciousness' }
    },

    // Game configuration
    config: {
        worldSize: { width: 100, height: 100 },
        maxTeamSize: 6,
        baseEncounterRate: 0.15,
        baseCaptureRate: 0.3,
        experienceMultiplier: 1.0,
        autoSaveInterval: 30000, // 30 seconds
        renderDistance: 20,
        tileSize: 32
    },

    // UI Configuration
    ui: {
        animations: {
            battleTransition: 500,
            damageNumber: 1000,
            levelUp: 2000
        },
        colors: {
            healthHigh: '#4CAF50',
            healthMid: '#FF9800',
            healthLow: '#F44336',
            experience: '#2196F3',
            backgroundPrimary: '#1a1a2e',
            backgroundSecondary: '#16213e'
        }
    }
};
