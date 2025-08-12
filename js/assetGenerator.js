// Asset Generator - Creates cute Ghibli-style visual assets

class AssetGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
        
        // Cache for generated assets
        this.assetCache = new Map();
        
        // Ghibli-inspired color palettes
        this.colorPalettes = {
            forest: ['#4A7C59', '#8FBC8F', '#98FB98', '#228B22'],
            water: ['#4682B4', '#87CEEB', '#B0E0E6', '#1E90FF'],
            fire: ['#FF6347', '#FF4500', '#FFB6C1', '#DC143C'],
            grass: ['#9ACD32', '#ADFF2F', '#7CFC00', '#32CD32'],
            electric: ['#FFD700', '#FFFF00', '#FFA500', '#FF8C00'],
            ice: ['#E0FFFF', '#B0E0E6', '#87CEEB', '#4682B4'],
            psychic: ['#DDA0DD', '#DA70D6', '#BA55D3', '#8B008B'],
            dark: ['#2F4F4F', '#696969', '#708090', '#4B0082'],
            fairy: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493'],
            rock: ['#CD853F', '#D2691E', '#8B4513', '#A0522D'],
            ground: ['#F4A460', '#DEB887', '#D2B48C', '#BC8F8F'],
            flying: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#9370DB']
        };
        
        // Japanese-inspired creature patterns
        this.creaturePatterns = {
            kitsune: { ears: 'pointed', tail: 'fluffy', colors: ['#FF6347', '#FFB6C1'] },
            tanuki: { ears: 'round', tail: 'striped', colors: ['#8B4513', '#F4A460'] },
            kodama: { body: 'round', features: 'simple', colors: ['#98FB98', '#FFFFFF'] },
            oni: { horns: true, fierce: true, colors: ['#FF4500', '#8B0000'] },
            kappa: { shell: true, water: true, colors: ['#32CD32', '#228B22'] },
            tengu: { wings: true, beak: true, colors: ['#DC143C', '#8B4513'] }
        };
    }

    // Generate a cute creature sprite
    generateCreatureSprite(creatureData) {
        const cacheKey = `creature_${creatureData.name}_${creatureData.elementType}`;
        if (this.assetCache.has(cacheKey)) {
            return this.assetCache.get(cacheKey);
        }

        this.ctx.clearRect(0, 0, 64, 64);
        this.ctx.save();

        // Get color palette based on element type
        const colors = this.colorPalettes[creatureData.elementType.toLowerCase()] || this.colorPalettes.grass;
        
        // Determine creature pattern based on name
        const pattern = this.getCreaturePattern(creatureData.name);
        
        // Draw base body (Ghibli-style rounded)
        this.drawCreatureBody(colors, pattern);
        
        // Add facial features (kawaii style)
        this.drawCreatureFace(pattern);
        
        // Add element-specific details
        this.addElementDetails(creatureData.elementType, colors);
        
        this.ctx.restore();
        
        // Convert to image data and cache
        const imageData = this.ctx.getImageData(0, 0, 64, 64);
        this.assetCache.set(cacheKey, imageData);
        
        return imageData;
    }

    getCreaturePattern(name) {
        const lowername = name.toLowerCase();
        
        // Match Japanese creature types
        if (lowername.includes('fox') || lowername.includes('kitsune')) return this.creaturePatterns.kitsune;
        if (lowername.includes('raccoon') || lowername.includes('tanuki')) return this.creaturePatterns.tanuki;
        if (lowername.includes('spirit') || lowername.includes('ghost')) return this.creaturePatterns.kodama;
        if (lowername.includes('demon') || lowername.includes('oni')) return this.creaturePatterns.oni;
        if (lowername.includes('turtle') || lowername.includes('kappa')) return this.creaturePatterns.kappa;
        if (lowername.includes('bird') || lowername.includes('tengu')) return this.creaturePatterns.tengu;
        
        // Default cute pattern
        return { ears: 'round', tail: 'short', colors: ['#FFB6C1', '#FFFFFF'] };
    }

    drawCreatureBody(colors, pattern) {
        const centerX = 32;
        const centerY = 36;
        
        // Main body (oval)
        this.ctx.fillStyle = colors[0];
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, 18, 22, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Belly highlight
        this.ctx.fillStyle = colors[1] || '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY + 5, 12, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Head
        this.ctx.fillStyle = colors[0];
        this.ctx.beginPath();
        this.ctx.arc(centerX, 20, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ears
        if (pattern.ears === 'pointed') {
            this.drawPointedEars(centerX, 20, colors[0]);
        } else {
            this.drawRoundEars(centerX, 20, colors[0]);
        }
        
        // Tail
        if (pattern.tail === 'fluffy') {
            this.drawFluffyTail(centerX + 16, centerY, colors);
        } else if (pattern.tail === 'striped') {
            this.drawStripedTail(centerX + 16, centerY, colors);
        }
    }

    drawPointedEars(centerX, centerY, color) {
        this.ctx.fillStyle = color;
        // Left ear
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 8, centerY - 8);
        this.ctx.lineTo(centerX - 12, centerY - 18);
        this.ctx.lineTo(centerX - 4, centerY - 12);
        this.ctx.fill();
        
        // Right ear
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 8, centerY - 8);
        this.ctx.lineTo(centerX + 12, centerY - 18);
        this.ctx.lineTo(centerX + 4, centerY - 12);
        this.ctx.fill();
    }

    drawRoundEars(centerX, centerY, color) {
        this.ctx.fillStyle = color;
        // Left ear
        this.ctx.beginPath();
        this.ctx.arc(centerX - 10, centerY - 10, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Right ear
        this.ctx.beginPath();
        this.ctx.arc(centerX + 10, centerY - 10, 6, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawFluffyTail(x, y, colors) {
        // Multiple overlapping circles for fluffy effect
        this.ctx.fillStyle = colors[0];
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(x + i * 3, y - i * 2, 8 - i, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawStripedTail(x, y, colors) {
        this.ctx.fillStyle = colors[0];
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 6, 12, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Stripes
        this.ctx.strokeStyle = colors[2] || '#000000';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(x, y - 4 + i * 4, 6, 0, Math.PI);
            this.ctx.stroke();
        }
    }

    drawCreatureFace(pattern) {
        const centerX = 32;
        const centerY = 20;
        
        // Eyes (kawaii style)
        this.ctx.fillStyle = '#000000';
        
        if (pattern.fierce) {
            // Fierce eyes
            this.drawFierceEyes(centerX, centerY);
        } else {
            // Cute round eyes
            this.ctx.beginPath();
            this.ctx.arc(centerX - 5, centerY - 2, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(centerX + 5, centerY - 2, 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Eye highlights
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.beginPath();
            this.ctx.arc(centerX - 4, centerY - 3, 1, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(centerX + 6, centerY - 3, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Nose
        this.ctx.fillStyle = '#FF69B4';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY + 2, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Mouth (simple curve)
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY + 4, 3, 0, Math.PI);
        this.ctx.stroke();
    }

    drawFierceEyes(centerX, centerY) {
        this.ctx.fillStyle = '#FF0000';
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 8, centerY - 4);
        this.ctx.lineTo(centerX - 2, centerY - 2);
        this.ctx.lineTo(centerX - 8, centerY);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 8, centerY - 4);
        this.ctx.lineTo(centerX + 2, centerY - 2);
        this.ctx.lineTo(centerX + 8, centerY);
        this.ctx.fill();
    }

    addElementDetails(elementType, colors) {
        const centerX = 32;
        const centerY = 36;
        
        switch(elementType.toLowerCase()) {
            case 'fire':
                this.drawFlameDetails(centerX, centerY - 25);
                break;
            case 'water':
                this.drawWaterDroplets(centerX, centerY);
                break;
            case 'electric':
                this.drawLightningBolt(centerX + 15, centerY - 10);
                break;
            case 'grass':
                this.drawLeafPattern(centerX, centerY - 20);
                break;
            case 'ice':
                this.drawIceCrystals(centerX, centerY);
                break;
            case 'psychic':
                this.drawPsychicAura(centerX, centerY);
                break;
        }
    }

    drawFlameDetails(x, y) {
        this.ctx.fillStyle = '#FF4500';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x - 3, y + 8);
        this.ctx.lineTo(x + 3, y + 8);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 2);
        this.ctx.lineTo(x - 1, y + 6);
        this.ctx.lineTo(x + 1, y + 6);
        this.ctx.fill();
    }

    drawWaterDroplets(x, y) {
        this.ctx.fillStyle = '#4682B4';
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(x - 8 + i * 8, y + 15, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawLightningBolt(x, y) {
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 3, y + 5);
        this.ctx.lineTo(x - 1, y + 5);
        this.ctx.lineTo(x + 2, y + 10);
        this.ctx.stroke();
    }

    drawLeafPattern(x, y) {
        this.ctx.fillStyle = '#32CD32';
        this.ctx.beginPath();
        this.ctx.ellipse(x - 2, y, 3, 6, -Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.ellipse(x + 2, y, 3, 6, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawIceCrystals(x, y) {
        this.ctx.strokeStyle = '#87CEEB';
        this.ctx.lineWidth = 2;
        
        // Simple crystal shape
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - 5);
        this.ctx.lineTo(x + 4, y + 5);
        this.ctx.lineTo(x - 4, y + 5);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawPsychicAura(x, y) {
        this.ctx.strokeStyle = '#DDA0DD';
        this.ctx.lineWidth = 1;
        
        // Wavy aura lines
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20 + i * 3, 0, Math.PI * 2);
            this.ctx.setLineDash([2, 4]);
            this.ctx.stroke();
        }
        this.ctx.setLineDash([]);
    }

    // Generate building sprites
    generateBuildingSprite(buildingType) {
        const cacheKey = `building_${buildingType}`;
        if (this.assetCache.has(cacheKey)) {
            return this.assetCache.get(cacheKey);
        }

        this.ctx.clearRect(0, 0, 64, 64);
        this.ctx.save();

        switch(buildingType) {
            case 'house':
                this.drawHouse();
                break;
            case 'inn':
                this.drawInn();
                break;
            case 'shop':
                this.drawShop();
                break;
            case 'temple':
                this.drawTemple();
                break;
            case 'tower':
                this.drawTower();
                break;
            case 'windmill':
                this.drawWindmill();
                break;
            case 'lighthouse':
                this.drawLighthouse();
                break;
            default:
                this.drawGenericBuilding();
        }

        this.ctx.restore();
        
        const imageData = this.ctx.getImageData(0, 0, 64, 64);
        this.assetCache.set(cacheKey, imageData);
        
        return imageData;
    }

    drawHouse() {
        // Traditional Japanese house
        // Roof
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.moveTo(10, 35);
        this.ctx.lineTo(32, 15);
        this.ctx.lineTo(54, 35);
        this.ctx.lineTo(10, 35);
        this.ctx.fill();
        
        // Walls
        this.ctx.fillStyle = '#F5DEB3';
        this.ctx.fillRect(15, 35, 34, 25);
        
        // Door
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(28, 45, 8, 15);
        
        // Windows
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(18, 40, 6, 6);
        this.ctx.fillRect(40, 40, 6, 6);
    }

    drawInn() {
        // Larger building with lanterns
        this.drawHouse();
        
        // Add lanterns
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(20, 30, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(44, 30, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sign
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(25, 25, 14, 6);
    }

    drawShop() {
        this.drawHouse();
        
        // Add awning
        this.ctx.fillStyle = '#FF6347';
        this.ctx.fillRect(12, 38, 40, 4);
        
        // Shop sign
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(20, 20, 24, 8);
    }

    drawTemple() {
        // Multi-tiered roof
        this.ctx.fillStyle = '#8B0000';
        this.ctx.beginPath();
        this.ctx.moveTo(8, 40);
        this.ctx.lineTo(32, 20);
        this.ctx.lineTo(56, 40);
        this.ctx.lineTo(8, 40);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(12, 45);
        this.ctx.lineTo(32, 30);
        this.ctx.lineTo(52, 45);
        this.ctx.lineTo(12, 45);
        this.ctx.fill();
        
        // Base
        this.ctx.fillStyle = '#F5DEB3';
        this.ctx.fillRect(16, 45, 32, 15);
        
        // Pillars
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(20, 45, 4, 15);
        this.ctx.fillRect(40, 45, 4, 15);
    }

    drawTower() {
        // Tall tower
        this.ctx.fillStyle = '#708090';
        this.ctx.fillRect(24, 10, 16, 50);
        
        // Roof
        this.ctx.fillStyle = '#8B0000';
        this.ctx.beginPath();
        this.ctx.moveTo(20, 15);
        this.ctx.lineTo(32, 5);
        this.ctx.lineTo(44, 15);
        this.ctx.lineTo(20, 15);
        this.ctx.fill();
        
        // Windows
        this.ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 4; i++) {
            this.ctx.fillRect(28, 20 + i * 8, 8, 6);
        }
    }

    drawWindmill() {
        // Base
        this.ctx.fillStyle = '#F5DEB3';
        this.ctx.beginPath();
        this.ctx.moveTo(28, 60);
        this.ctx.lineTo(32, 25);
        this.ctx.lineTo(36, 60);
        this.ctx.lineTo(28, 60);
        this.ctx.fill();
        
        // Blades
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(32, 25);
        this.ctx.lineTo(45, 15);
        this.ctx.moveTo(32, 25);
        this.ctx.lineTo(45, 35);
        this.ctx.moveTo(32, 25);
        this.ctx.lineTo(19, 15);
        this.ctx.moveTo(32, 25);
        this.ctx.lineTo(19, 35);
        this.ctx.stroke();
    }

    drawLighthouse() {
        // Tower
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(26, 15, 12, 45);
        
        // Stripes
        this.ctx.fillStyle = '#FF0000';
        for (let i = 0; i < 3; i++) {
            this.ctx.fillRect(26, 25 + i * 10, 12, 4);
        }
        
        // Light
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(24, 10, 16, 8);
        
        // Light rays
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            this.ctx.beginPath();
            this.ctx.moveTo(32, 14);
            this.ctx.lineTo(32 + Math.cos(angle) * 15, 14 + Math.sin(angle) * 15);
            this.ctx.stroke();
        }
    }

    drawGenericBuilding() {
        this.drawHouse();
    }

    // Convert ImageData to usable image
    imageDataToCanvas(imageData) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }
}
