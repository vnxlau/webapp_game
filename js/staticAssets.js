// Simple Asset Creator - Creates basic placeholder images as data URLs

class SimpleAssetCreator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
    }

    createCreatureSprite(name, elementType) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        const colors = this.getElementColors(elementType);
        const centerX = 32;
        const centerY = 36;
        
        // Body
        this.ctx.fillStyle = colors.primary;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, 18, 22, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Belly
        this.ctx.fillStyle = colors.secondary;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY + 5, 12, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Head
        this.ctx.fillStyle = colors.primary;
        this.ctx.beginPath();
        this.ctx.arc(centerX, 20, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyes
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(centerX - 5, 18, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(centerX + 5, 18, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye highlights
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(centerX - 4, 17, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
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
