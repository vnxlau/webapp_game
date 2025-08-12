// Static Asset Manager - loads pre-generated images instead of runtime generation

class StaticAssetManager {
    constructor() {
        this.creatureSprites = new Map();
        this.buildingSprites = new Map();
        this.loadingPromises = [];
        this.isLoaded = false;
    }

    async initialize() {
        console.log('Loading static assets...');
        
        // Load creature sprites
        const creatures = [
            'kitsune_sprout', 'kitsune_sage', 'tanuki_pup', 'tanuki_trickster',
            'kodama_spirit', 'kodama_guardian', 'kappa_warrior', 'kappa_master',
            'oni_child', 'oni_warrior', 'tengu_chick', 'tengu_master',
            'shiba_inu', 'nekomata', 'flamewyrm', 'aquafin', 'leafsprout',
            'sparkbolt', 'frostcub', 'rockshell'
        ];

        const buildings = [
            'house', 'inn', 'shop', 'temple', 'tower', 'windmill',
            'lighthouse', 'dojo', 'garden', 'bridge', 'dungeon',
            'shrine', 'cave', 'ruins'
        ];

        // Load creature images
        for (const creature of creatures) {
            this.loadingPromises.push(this.loadImage(`assets/creatures/${creature}.png`, this.creatureSprites, creature));
        }

        // Load building images
        for (const building of buildings) {
            this.loadingPromises.push(this.loadImage(`assets/buildings/${building}.png`, this.buildingSprites, building));
        }

        try {
            await Promise.all(this.loadingPromises);
            this.isLoaded = true;
            console.log('All assets loaded successfully!');
        } catch (error) {
            console.warn('Some assets failed to load, falling back to runtime generation:', error);
            this.isLoaded = false;
        }
    }

    async loadImage(src, map, key) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                map.set(key, img);
                resolve();
            };
            img.onerror = () => {
                console.warn(`Failed to load ${src}`);
                resolve(); // Don't reject, just continue without this asset
            };
            img.src = src;
        });
    }

    getCreatureSprite(creatureName) {
        if (!this.isLoaded) return null;
        
        const key = creatureName.toLowerCase().replace(/\s+/g, '_');
        return this.creatureSprites.get(key) || null;
    }

    getBuildingSprite(buildingType) {
        if (!this.isLoaded) return null;
        
        return this.buildingSprites.get(buildingType) || null;
    }

    // Fallback function that creates a simple colored rectangle if no sprite is available
    createFallbackSprite(width, height, color, text) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, width/2, height/2);
        
        return canvas;
    }
}
