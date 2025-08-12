// World Generator - Creates procedural worlds with different biomes

class WorldGenerator {
    constructor(width = 100, height = 100, seed = null) {
        this.width = width;
        this.height = height;
        this.seed = seed || Math.random();
        this.world = [];
        this.biomes = [];
        this.heightMap = [];
        this.moistureMap = [];
        this.temperatureMap = [];
        
        this.generateWorld();
    }

    generateWorld() {
        console.log('Generating world with seed:', this.seed);
        
        // Generate base height map
        this.heightMap = Utils.generateHeightMap(this.width, this.height, 4);
        
        // Generate moisture map
        this.moistureMap = this.generateNoiseMap(0.02, 3);
        
        // Generate temperature map (affected by height)
        this.temperatureMap = this.generateTemperatureMap();
        
        // Generate biomes based on height, moisture, and temperature
        this.generateBiomes();
        
        // Place creatures and resources
        this.placePOIs();
        
        // Debug: Log biome distribution
        const biomeCounts = {};
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const biome = this.biomes[y][x];
                if (biome) {
                    biomeCounts[biome.type] = (biomeCounts[biome.type] || 0) + 1;
                }
            }
        }
        console.log('Biome distribution:', biomeCounts);
        
        console.log('World generation complete!');
    }

    generateNoiseMap(frequency, octaves) {
        const map = [];
        
        for (let y = 0; y < this.height; y++) {
            map[y] = [];
            for (let x = 0; x < this.width; x++) {
                let value = 0;
                let amplitude = 1;
                let freq = frequency;
                
                for (let i = 0; i < octaves; i++) {
                    value += Utils.perlinNoise(
                        (x + this.seed * 1000), 
                        (y + this.seed * 1000), 
                        freq
                    ) * amplitude;
                    amplitude *= 0.5;
                    freq *= 2;
                }
                
                map[y][x] = Utils.clamp(value, 0, 1);
            }
        }
        
        return map;
    }

    generateTemperatureMap() {
        const map = [];
        
        for (let y = 0; y < this.height; y++) {
            map[y] = [];
            for (let x = 0; x < this.width; x++) {
                // Base temperature decreases with distance from equator (center)
                const distanceFromEquator = Math.abs(y - this.height / 2) / (this.height / 2);
                let temperature = 1 - distanceFromEquator * 0.8;
                
                // Decrease temperature with altitude
                const height = this.heightMap[y][x];
                temperature -= height * 0.3;
                
                // Add some noise for variation
                temperature += Utils.perlinNoise(
                    (x + this.seed * 2000), 
                    (y + this.seed * 2000), 
                    0.01
                ) * 0.2;
                
                map[y][x] = Utils.clamp(temperature, 0, 1);
            }
        }
        
        return map;
    }

    generateBiomes() {
        this.biomes = [];
        
        for (let y = 0; y < this.height; y++) {
            this.biomes[y] = [];
            for (let x = 0; x < this.width; x++) {
                const height = this.heightMap[y][x];
                const moisture = this.moistureMap[y][x];
                const temperature = this.temperatureMap[y][x];
                
                this.biomes[y][x] = this.determineBiome(height, moisture, temperature);
            }
        }
    }

    determineBiome(height, moisture, temperature) {
        // Water level (reduced threshold for less water)
        if (height < 0.2) {
            return {
                type: 'water',
                name: 'Ocean',
                color: '#4682B4',
                encounterRate: 0.05,
                creatureTypes: ['WATER'],
                resources: ['fish', 'seaweed']
            };
        }
        
        // Mountain peaks
        if (height > 0.8) {
            if (temperature < 0.3) {
                return {
                    type: 'ice',
                    name: 'Frozen Peaks',
                    color: '#B8C6DB',
                    encounterRate: 0.1,
                    creatureTypes: ['ICE', 'FLYING'],
                    resources: ['ice_crystal', 'rare_minerals']
                };
            } else {
                return {
                    type: 'mountain',
                    name: 'Rocky Mountains',
                    color: '#8B7355',
                    encounterRate: 0.15,
                    creatureTypes: ['ROCK', 'GROUND', 'FIGHTING'],
                    resources: ['stone', 'minerals', 'crystals']
                };
            }
        }
        
        // Volcanic areas (high height + high temperature)
        if (height > 0.6 && temperature > 0.7) {
            return {
                type: 'volcanic',
                name: 'Volcanic Wasteland',
                color: '#DC143C',
                encounterRate: 0.2,
                creatureTypes: ['FIRE', 'ROCK'],
                resources: ['lava_stone', 'sulfur', 'rare_gems']
            };
        }
        
        // Desert (low moisture + high temperature)
        if (moisture < 0.3 && temperature > 0.6) {
            return {
                type: 'desert',
                name: 'Sandy Desert',
                color: '#F4A460',
                encounterRate: 0.12,
                creatureTypes: ['GROUND', 'FIRE', 'NORMAL'],
                resources: ['sand', 'cactus', 'desert_gems']
            };
        }
        
        // Forest (high moisture + moderate temperature)
        if (moisture > 0.6 && temperature > 0.4 && temperature < 0.8) {
            return {
                type: 'forest',
                name: 'Dense Forest',
                color: '#228B22',
                encounterRate: 0.25,
                creatureTypes: ['GRASS', 'NORMAL', 'POISON'],
                resources: ['wood', 'berries', 'herbs']
            };
        }
        
        // Jungle (very high moisture + high temperature)
        if (moisture > 0.8 && temperature > 0.7) {
            return {
                type: 'jungle',
                name: 'Tropical Jungle',
                color: '#006400',
                encounterRate: 0.3,
                creatureTypes: ['GRASS', 'POISON', 'FLYING'],
                resources: ['tropical_fruits', 'exotic_wood', 'medicinal_plants']
            };
        }
        
        // Swamp (high moisture + low-moderate temperature)
        if (moisture > 0.7 && temperature < 0.6) {
            return {
                type: 'swamp',
                name: 'Murky Swamp',
                color: '#556B2F',
                encounterRate: 0.22,
                creatureTypes: ['POISON', 'WATER', 'GRASS'],
                resources: ['moss', 'swamp_gas', 'rare_mushrooms']
            };
        }
        
        // Tundra (low temperature)
        if (temperature < 0.3) {
            return {
                type: 'tundra',
                name: 'Frozen Tundra',
                color: '#D3D3D3',
                encounterRate: 0.08,
                creatureTypes: ['ICE', 'NORMAL'],
                resources: ['ice', 'frozen_berries', 'fur']
            };
        }
        
        // Default to grassland
        return {
            type: 'grassland',
            name: 'Rolling Plains',
            color: '#9ACD32',
            encounterRate: 0.18,
            creatureTypes: ['NORMAL', 'ELECTRIC', 'FLYING'],
            resources: ['grass', 'flowers', 'seeds']
        };
    }

    placePOIs() {
        // Points of Interest: towns, dungeons, special locations
        this.pois = [];
        
        // Place a starting town
        this.pois.push({
            x: Math.floor(this.width / 2),
            y: Math.floor(this.height / 2),
            type: 'town',
            name: 'Starter Town',
            description: 'A peaceful town where trainers begin their journey'
        });
        
        // Place random dungeons and special locations
        const numPOIs = Math.floor((this.width * this.height) / 500); // More POIs
        
        // Add more building types for exploration
        const buildingTypes = [
            'dungeon', 'shrine', 'cave', 'ruins', 
            'house', 'inn', 'shop', 'dojo', 'tower', 
            'garden', 'bridge', 'windmill', 'lighthouse', 'temple'
        ];
        
        for (let i = 0; i < numPOIs; i++) {
            const x = Utils.random(5, this.width - 5);
            const y = Utils.random(5, this.height - 5);
            const biome = this.biomes[y][x];
            
            // Don't place POIs in water unless it's a lighthouse or bridge
            if (biome.type === 'water') {
                const waterTypes = ['lighthouse', 'bridge'];
                const poiType = Utils.getRandomElement(waterTypes);
                
                this.pois.push({
                    x: x,
                    y: y,
                    type: poiType,
                    name: this.generatePOIName(poiType, biome),
                    description: this.generatePOIDescription(poiType, biome),
                    biome: biome.type,
                    canExplore: true,
                    hasCreatures: poiType === 'lighthouse'
                });
                continue;
            }
            
            const poiType = Utils.getRandomElement(buildingTypes);
            
            this.pois.push({
                x: x,
                y: y,
                type: poiType,
                name: this.generatePOIName(poiType, biome),
                description: this.generatePOIDescription(poiType, biome),
                biome: biome.type,
                canExplore: this.canExploreBuilding(poiType),
                hasCreatures: this.hasCreatures(poiType),
                hasShop: this.hasShop(poiType),
                hasHealing: this.hasHealing(poiType)
            });
        }
    }

    canExploreBuilding(type) {
        return ['dungeon', 'cave', 'ruins', 'tower', 'temple', 'house', 'inn'].includes(type);
    }

    hasCreatures(type) {
        return ['dungeon', 'cave', 'ruins', 'tower', 'garden'].includes(type);
    }

    hasShop(type) {
        return ['shop', 'inn'].includes(type);
    }

    hasHealing(type) {
        return ['shrine', 'temple', 'inn'].includes(type);
    }

    generatePOIName(type, biome) {
        const prefixes = {
            dungeon: ['Ancient', 'Forgotten', 'Dark', 'Hidden'],
            shrine: ['Sacred', 'Mystical', 'Divine', 'Holy'],
            cave: ['Crystal', 'Echo', 'Deep', 'Twilight'],
            ruins: ['Lost', 'Crumbling', 'Ancient', 'Abandoned'],
            house: ['Cozy', 'Peaceful', 'Quiet', 'Warm'],
            inn: ['Traveler\'s', 'Weary', 'Golden', 'Silver'],
            shop: ['Merchant\'s', 'Trading', 'Wonder', 'Mystic'],
            dojo: ['Training', 'Master\'s', 'Ancient', 'Fighting'],
            tower: ['Wizard\'s', 'Lonely', 'Tall', 'Mysterious'],
            garden: ['Serene', 'Blooming', 'Secret', 'Enchanted'],
            bridge: ['Stone', 'Wooden', 'Ancient', 'Crossing'],
            windmill: ['Old', 'Creaking', 'Hillside', 'Working'],
            lighthouse: ['Beacon', 'Guiding', 'Coastal', 'Stormy'],
            temple: ['Grand', 'Sacred', 'Ancient', 'Peaceful']
        };
        
        const suffixes = {
            dungeon: ['Dungeon', 'Labyrinth', 'Depths', 'Catacombs'],
            shrine: ['Shrine', 'Altar', 'Sanctuary', 'Grove'],
            cave: ['Cave', 'Cavern', 'Grotto', 'Hollow'],
            ruins: ['Ruins', 'Remnants', 'Vestiges', 'Remains'],
            house: ['House', 'Cottage', 'Home', 'Dwelling'],
            inn: ['Inn', 'Tavern', 'Lodge', 'Rest'],
            shop: ['Shop', 'Store', 'Emporium', 'Market'],
            dojo: ['Dojo', 'Academy', 'School', 'Hall'],
            tower: ['Tower', 'Spire', 'Keep', 'Observatory'],
            garden: ['Garden', 'Grove', 'Meadow', 'Orchard'],
            bridge: ['Bridge', 'Crossing', 'Span', 'Passage'],
            windmill: ['Windmill', 'Mill', 'Spinner', 'Grinder'],
            lighthouse: ['Lighthouse', 'Beacon', 'Tower', 'Light'],
            temple: ['Temple', 'Cathedral', 'Monastery', 'Basilica']
        };
        
        const prefix = Utils.getRandomElement(prefixes[type] || prefixes.ruins);
        const suffix = Utils.getRandomElement(suffixes[type] || suffixes.ruins);
        
        return `${prefix} ${suffix}`;
    }

    generatePOIDescription(type, biome) {
        const descriptions = {
            dungeon: `A mysterious ${type} hidden in the ${biome.name}. Legends speak of powerful creatures dwelling within.`,
            shrine: `An ancient ${type} in the ${biome.name}. It radiates with mystical energy.`,
            cave: `A natural ${type} formation in the ${biome.name}. Strange sounds echo from its depths.`,
            ruins: `The ${type} of an ancient civilization in the ${biome.name}. What secrets do they hold?`,
            house: `A charming ${type} nestled in the ${biome.name}. Perhaps someone lives here?`,
            inn: `A welcoming ${type} in the ${biome.name}. Travelers can rest and recover here.`,
            shop: `A bustling ${type} in the ${biome.name}. Rare items and supplies can be found here.`,
            dojo: `A training ${type} in the ${biome.name}. Masters here teach the art of creature combat.`,
            tower: `A tall ${type} rising from the ${biome.name}. Who knows what knowledge lies at its peak?`,
            garden: `A beautiful ${type} blooming in the ${biome.name}. Rare creatures might be found among the flowers.`,
            bridge: `An ancient ${type} crossing through the ${biome.name}. A perfect place for encounters.`,
            windmill: `An old ${type} turning in the ${biome.name}. The miller might have stories to tell.`,
            lighthouse: `A beacon ${type} standing in the ${biome.name}. It guides travelers through treacherous waters.`,
            temple: `A magnificent ${type} built in the ${biome.name}. Pilgrims come here to seek blessings.`
        };
        
        return descriptions[type] || `A mysterious structure in the ${biome.name}.`;
    }

    getBiomeAt(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        return this.biomes[y][x];
    }

    getPOIAt(x, y) {
        return this.pois.find(poi => poi.x === x && poi.y === y);
    }

    getWorldData() {
        return {
            width: this.width,
            height: this.height,
            seed: this.seed,
            biomes: this.biomes,
            pois: this.pois,
            heightMap: this.heightMap,
            moistureMap: this.moistureMap,
            temperatureMap: this.temperatureMap
        };
    }

    // Method to regenerate world with new seed
    regenerate(newSeed = null) {
        this.seed = newSeed || Math.random();
        this.generateWorld();
    }
}
