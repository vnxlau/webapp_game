// Advanced Asset Creator - Creates detailed pixel-art style sprites

class SimpleAssetCreator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
        
        // Disable anti-aliasing for pixel-perfect sprites
        this.ctx.imageSmoothingEnabled = false;
    }

    createCreatureSprite(name, elementType) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(name.toLowerCase()) {
            case 'kitsune':
                return this.drawKitsune(elementType);
            case 'tanuki':
                return this.drawTanuki(elementType);
            case 'kodama':
                return this.drawKodama(elementType);
            case 'neko':
                return this.drawNeko(elementType);
            case 'karasu':
                return this.drawKarasu(elementType);
            case 'ryu':
                return this.drawRyu(elementType);
            case 'oni':
                return this.drawOni(elementType);
            case 'yuki-onna':
                return this.drawYukiOnna(elementType);
            case 'phoenix':
                return this.drawPhoenix(elementType);
            case 'leviathan':
                return this.drawLeviathan(elementType);
            case 'raiju':
                return this.drawRaiju(elementType);
            case 'tengu':
                return this.drawTengu(elementType);
            case 'bakeneko':
                return this.drawBakeneko(elementType);
            case 'shiranui':
                return this.drawShiranui(elementType);
            case 'yukiko':
                return this.drawYukiko(elementType);
            case 'hinata':
                return this.drawHinata(elementType);
            case 'akira':
                return this.drawAkira(elementType);
            case 'mizuki':
                return this.drawMizuki(elementType);
            case 'hayato':
                return this.drawHayato(elementType);
            case 'sakura':
                return this.drawSakura(elementType);
            case 'takeshi':
                return this.drawTakeshi(elementType);
            case 'yuki':
                return this.drawYuki(elementType);
            default:
                return this.drawGenericCreature(elementType);
        }
    }

    drawKitsune(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Body (fox-like)
        this.drawPixelRect(24, 40, 16, 20, colors.primary);
        
        // Head
        this.drawPixelRect(22, 20, 20, 16, colors.primary);
        
        // Ears (pointy fox ears)
        this.drawPixelRect(20, 12, 6, 12, colors.primary);
        this.drawPixelRect(38, 12, 6, 12, colors.primary);
        this.drawPixelRect(22, 14, 2, 8, colors.secondary);
        this.drawPixelRect(40, 14, 2, 8, colors.secondary);
        
        // Multiple tails
        this.drawPixelRect(12, 44, 8, 16, colors.primary);
        this.drawPixelRect(44, 44, 8, 16, colors.primary);
        this.drawPixelRect(28, 48, 8, 12, colors.primary);
        
        // Tail tips (white/secondary color)
        this.drawPixelRect(14, 56, 4, 4, colors.secondary);
        this.drawPixelRect(46, 56, 4, 4, colors.secondary);
        this.drawPixelRect(30, 56, 4, 4, colors.secondary);
        
        // Face markings
        this.drawPixelRect(26, 32, 12, 4, colors.secondary);
        
        // Eyes (fox-like)
        this.drawPixelRect(26, 24, 2, 4, '#000000');
        this.drawPixelRect(36, 24, 2, 4, '#000000');
        this.drawPixelRect(26, 24, 1, 2, '#FF6B6B');
        this.drawPixelRect(36, 24, 1, 2, '#FF6B6B');
        
        // Nose
        this.drawPixelRect(31, 30, 2, 2, '#000000');
        
        // Legs
        this.drawPixelRect(26, 56, 4, 6, colors.primary);
        this.drawPixelRect(34, 56, 4, 6, colors.primary);
        
        return this.canvas.toDataURL();
    }

    drawTanuki(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Round body
        this.drawPixelEllipse(32, 44, 18, 16, colors.primary);
        
        // Head
        this.drawPixelEllipse(32, 24, 16, 14, colors.primary);
        
        // Belly marking
        this.drawPixelEllipse(32, 48, 12, 10, colors.secondary);
        
        // Face mask (dark around eyes)
        this.drawPixelRect(20, 18, 24, 8, '#4A4A4A');
        this.drawPixelRect(24, 16, 16, 4, '#4A4A4A');
        
        // Eyes (large and round)
        this.drawPixelRect(26, 20, 4, 4, '#FFFFFF');
        this.drawPixelRect(34, 20, 4, 4, '#FFFFFF');
        this.drawPixelRect(27, 21, 2, 2, '#000000');
        this.drawPixelRect(35, 21, 2, 2, '#000000');
        
        // Ears
        this.drawPixelRect(22, 12, 6, 8, colors.primary);
        this.drawPixelRect(36, 12, 6, 8, colors.primary);
        this.drawPixelRect(24, 14, 2, 4, '#FFB6C1');
        this.drawPixelRect(38, 14, 2, 4, '#FFB6C1');
        
        // Nose
        this.drawPixelRect(31, 26, 2, 2, '#000000');
        
        // Tail (striped)
        this.drawPixelRect(48, 36, 12, 20, colors.primary);
        this.drawPixelRect(50, 38, 8, 2, '#4A4A4A');
        this.drawPixelRect(50, 42, 8, 2, '#4A4A4A');
        this.drawPixelRect(50, 46, 8, 2, '#4A4A4A');
        this.drawPixelRect(50, 50, 8, 2, '#4A4A4A');
        
        // Paws
        this.drawPixelRect(24, 58, 4, 4, colors.primary);
        this.drawPixelRect(36, 58, 4, 4, colors.primary);
        
        return this.canvas.toDataURL();
    }

    drawKodama(elementType) {
        const colors = { primary: '#E8F5E8', secondary: '#C8E6C9', accent: '#81C784' };
        
        // Tree-spirit body (white/pale green)
        this.drawPixelEllipse(32, 40, 14, 20, colors.primary);
        
        // Head (larger, rounded)
        this.drawPixelEllipse(32, 22, 18, 16, colors.primary);
        
        // Simple dot eyes
        this.drawPixelRect(26, 20, 2, 2, '#000000');
        this.drawPixelRect(36, 20, 2, 2, '#000000');
        
        // Small mouth
        this.drawPixelRect(31, 26, 2, 1, '#000000');
        
        // Wooden texture lines
        this.drawPixelRect(20, 24, 24, 1, colors.secondary);
        this.drawPixelRect(22, 32, 20, 1, colors.secondary);
        this.drawPixelRect(24, 44, 16, 1, colors.secondary);
        
        // Small branch-like arms
        this.drawPixelRect(18, 32, 6, 2, colors.accent);
        this.drawPixelRect(40, 32, 6, 2, colors.accent);
        
        // Root-like base
        this.drawPixelRect(28, 58, 8, 4, colors.accent);
        this.drawPixelRect(24, 60, 4, 2, colors.accent);
        this.drawPixelRect(36, 60, 4, 2, colors.accent);
        
        return this.canvas.toDataURL();
    }

    drawNeko(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Cat body
        this.drawPixelEllipse(32, 44, 16, 18, colors.primary);
        
        // Head
        this.drawPixelEllipse(32, 24, 14, 12, colors.primary);
        
        // Cat ears (triangular)
        this.drawPixelRect(24, 12, 4, 8, colors.primary);
        this.drawPixelRect(36, 12, 4, 8, colors.primary);
        this.drawPixelRect(25, 14, 2, 4, '#FFB6C1');
        this.drawPixelRect(37, 14, 2, 4, '#FFB6C1');
        
        // Stripes (if not solid color)
        if (elementType !== 'normal') {
            this.drawPixelRect(28, 38, 8, 2, colors.secondary);
            this.drawPixelRect(28, 46, 8, 2, colors.secondary);
            this.drawPixelRect(28, 54, 8, 2, colors.secondary);
        }
        
        // Eyes (cat-like, almond shaped)
        this.drawPixelRect(26, 20, 3, 4, '#4CAF50');
        this.drawPixelRect(35, 20, 3, 4, '#4CAF50');
        this.drawPixelRect(27, 21, 1, 2, '#000000');
        this.drawPixelRect(36, 21, 1, 2, '#000000');
        
        // Nose (small triangle)
        this.drawPixelRect(31, 26, 2, 1, '#FFB6C1');
        this.drawPixelRect(31, 27, 2, 1, '#FFB6C1');
        
        // Whiskers
        this.drawPixelRect(20, 26, 6, 1, '#000000');
        this.drawPixelRect(38, 26, 6, 1, '#000000');
        
        // Tail (curved)
        this.drawPixelRect(48, 30, 4, 16, colors.primary);
        this.drawPixelRect(50, 26, 4, 8, colors.primary);
        this.drawPixelRect(48, 22, 4, 8, colors.primary);
        
        // Paws
        this.drawPixelRect(26, 58, 4, 4, colors.primary);
        this.drawPixelRect(34, 58, 4, 4, colors.primary);
        
        return this.canvas.toDataURL();
        this.ctx.arc(centerX + 6, 17, 1, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Nose
        this.ctx.fillStyle = '#FF69B4';
        this.ctx.beginPath();
        this.ctx.arc(centerX, 22, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        return this.canvas.toDataURL();
    }

    createBuildingSprite(type) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(type) {
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
                this.drawHouse();
        }
        
        return this.canvas.toDataURL();
    }

    getElementColors(elementType) {
        const colorMap = {
            FIRE: { primary: '#FF6347', secondary: '#FFB6C1' },
            WATER: { primary: '#4682B4', secondary: '#87CEEB' },
            GRASS: { primary: '#32CD32', secondary: '#90EE90' },
            ELECTRIC: { primary: '#FFD700', secondary: '#FFFF99' },
            ICE: { primary: '#87CEEB', secondary: '#E0FFFF' },
            PSYCHIC: { primary: '#DDA0DD', secondary: '#E6E6FA' },
            DARK: { primary: '#696969', secondary: '#A9A9A9' },
            FAIRY: { primary: '#FFB6C1', secondary: '#FFC0CB' },
            ROCK: { primary: '#CD853F', secondary: '#DEB887' },
            NORMAL: { primary: '#D3D3D3', secondary: '#F5F5F5' },
            FLYING: { primary: '#DDA0DD', secondary: '#E6E6FA' }
        };
        return colorMap[elementType] || colorMap.NORMAL;
    }

    drawHouse() {
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
        this.drawHouse();
        // Add lanterns
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(20, 30, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(44, 30, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawShop() {
        this.drawHouse();
        // Add awning
        this.ctx.fillStyle = '#FF6347';
        this.ctx.fillRect(12, 38, 40, 4);
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
        
        // Base
        this.ctx.fillStyle = '#F5DEB3';
        this.ctx.fillRect(16, 40, 32, 20);
        
        // Pillars
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(20, 40, 4, 20);
        this.ctx.fillRect(40, 40, 4, 20);
    }

    drawTower() {
        // Tower
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
    }
}

// Generate and store assets as data URLs
const assetCreator = new SimpleAssetCreator();

const StaticAssets = {
    creatures: {},
    buildings: {}
};

// Generate creature sprites
const creatures = [
    { name: 'kitsune_sprout', type: 'GRASS' },
    { name: 'kitsune_sage', type: 'GRASS' },
    { name: 'tanuki_pup', type: 'NORMAL' },
    { name: 'tanuki_trickster', type: 'NORMAL' },
    { name: 'kodama_spirit', type: 'FAIRY' },
    { name: 'kodama_guardian', type: 'FAIRY' },
    { name: 'kappa_warrior', type: 'WATER' },
    { name: 'kappa_master', type: 'WATER' },
    { name: 'oni_child', type: 'DARK' },
    { name: 'oni_warrior', type: 'DARK' },
    { name: 'tengu_chick', type: 'FLYING' },
    { name: 'tengu_master', type: 'FLYING' },
    { name: 'shiba_inu', type: 'NORMAL' },
    { name: 'nekomata', type: 'PSYCHIC' },
    { name: 'flamewyrm', type: 'FIRE' },
    { name: 'aquafin', type: 'WATER' },
    { name: 'leafsprout', type: 'GRASS' },
    { name: 'sparkbolt', type: 'ELECTRIC' },
    { name: 'frostcub', type: 'ICE' },
    { name: 'rockshell', type: 'ROCK' }
];

creatures.forEach(creature => {
    StaticAssets.creatures[creature.name] = assetCreator.createCreatureSprite(creature.name, creature.type);
});

// Generate building sprites
const buildings = [
    'house', 'inn', 'shop', 'temple', 'tower', 'windmill',
    'lighthouse', 'dojo', 'garden', 'bridge', 'dungeon',
    'shrine', 'cave', 'ruins'
];

buildings.forEach(building => {
    StaticAssets.buildings[building] = assetCreator.createBuildingSprite(building);
});

console.log('Static assets generated and cached!');
