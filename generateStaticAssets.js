// Asset Generator Script - Creates static PNG files for all creatures and buildings
// Run with: node generateStaticAssets.js

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Simple implementation for Node.js environment
class NodeAssetGenerator {
    constructor() {
        this.colorPalettes = {
            fire: ['#FF6347', '#FF4500', '#FFB6C1', '#DC143C'],
            water: ['#4682B4', '#87CEEB', '#B0E0E6', '#1E90FF'],
            grass: ['#9ACD32', '#ADFF2F', '#7CFC00', '#32CD32'],
            electric: ['#FFD700', '#FFFF00', '#FFA500', '#FF8C00'],
            ice: ['#E0FFFF', '#B0E0E6', '#87CEEB', '#4682B4'],
            psychic: ['#DDA0DD', '#DA70D6', '#BA55D3', '#8B008B'],
            dark: ['#2F4F4F', '#696969', '#708090', '#4B0082'],
            fairy: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493'],
            rock: ['#CD853F', '#D2691E', '#8B4513', '#A0522D'],
            normal: ['#F5F5DC', '#DCDCDC', '#D3D3D3', '#C0C0C0'],
            flying: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#9370DB']
        };
    }

    generateCreatureSprite(canvas, creatureData) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 64, 64);
        
        const colors = this.colorPalettes[creatureData.elementType.toLowerCase()] || this.colorPalettes.normal;
        
        // Simple creature design
        const centerX = 32;
        const centerY = 36;
        
        // Body
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 18, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Belly
        ctx.fillStyle = colors[1];
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 5, 12, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.arc(centerX, 20, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(centerX - 5, 18, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 5, 18, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye highlights
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX - 4, 17, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 6, 17, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Nose
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(centerX, 22, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Element indicator
        this.addElementDetails(ctx, creatureData.elementType, centerX, centerY);
    }

    addElementDetails(ctx, elementType, centerX, centerY) {
        switch(elementType.toLowerCase()) {
            case 'fire':
                ctx.fillStyle = '#FF4500';
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - 25);
                ctx.lineTo(centerX - 3, centerY - 17);
                ctx.lineTo(centerX + 3, centerY - 17);
                ctx.fill();
                break;
            case 'water':
                ctx.fillStyle = '#4682B4';
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(centerX - 8 + i * 8, centerY + 15, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                break;
            case 'grass':
                ctx.fillStyle = '#32CD32';
                ctx.beginPath();
                ctx.ellipse(centerX - 2, centerY - 20, 3, 6, -Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(centerX + 2, centerY - 20, 3, 6, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    }

    generateBuildingSprite(canvas, buildingType) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 64, 64);
        
        switch(buildingType) {
            case 'house':
                this.drawHouse(ctx);
                break;
            case 'inn':
                this.drawInn(ctx);
                break;
            case 'shop':
                this.drawShop(ctx);
                break;
            case 'temple':
                this.drawTemple(ctx);
                break;
            case 'tower':
                this.drawTower(ctx);
                break;
            case 'windmill':
                this.drawWindmill(ctx);
                break;
            case 'lighthouse':
                this.drawLighthouse(ctx);
                break;
            default:
                this.drawHouse(ctx);
        }
    }

    drawHouse(ctx) {
        // Roof
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(10, 35);
        ctx.lineTo(32, 15);
        ctx.lineTo(54, 35);
        ctx.lineTo(10, 35);
        ctx.fill();
        
        // Walls
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(15, 35, 34, 25);
        
        // Door
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(28, 45, 8, 15);
        
        // Windows
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(18, 40, 6, 6);
        ctx.fillRect(40, 40, 6, 6);
    }

    drawInn(ctx) {
        this.drawHouse(ctx);
        // Add lanterns
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(20, 30, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(44, 30, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawShop(ctx) {
        this.drawHouse(ctx);
        // Add awning
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(12, 38, 40, 4);
    }

    drawTemple(ctx) {
        // Multi-tiered roof
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.moveTo(8, 40);
        ctx.lineTo(32, 20);
        ctx.lineTo(56, 40);
        ctx.lineTo(8, 40);
        ctx.fill();
        
        // Base
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(16, 40, 32, 20);
    }

    drawTower(ctx) {
        // Tower
        ctx.fillStyle = '#708090';
        ctx.fillRect(24, 10, 16, 50);
        
        // Roof
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.moveTo(20, 15);
        ctx.lineTo(32, 5);
        ctx.lineTo(44, 15);
        ctx.lineTo(20, 15);
        ctx.fill();
    }

    drawWindmill(ctx) {
        // Base
        ctx.fillStyle = '#F5DEB3';
        ctx.beginPath();
        ctx.moveTo(28, 60);
        ctx.lineTo(32, 25);
        ctx.lineTo(36, 60);
        ctx.lineTo(28, 60);
        ctx.fill();
        
        // Blades
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(32, 25);
        ctx.lineTo(45, 15);
        ctx.moveTo(32, 25);
        ctx.lineTo(45, 35);
        ctx.moveTo(32, 25);
        ctx.lineTo(19, 15);
        ctx.moveTo(32, 25);
        ctx.lineTo(19, 35);
        ctx.stroke();
    }

    drawLighthouse(ctx) {
        // Tower
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(26, 15, 12, 45);
        
        // Stripes
        ctx.fillStyle = '#FF0000';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(26, 25 + i * 10, 12, 4);
        }
        
        // Light
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(24, 10, 16, 8);
    }
}

// Main generation function
async function generateAllAssets() {
    const generator = new NodeAssetGenerator();
    
    // Ensure directories exist
    const creaturesDir = path.join(__dirname, 'assets', 'creatures');
    const buildingsDir = path.join(__dirname, 'assets', 'buildings');
    
    if (!fs.existsSync(creaturesDir)) {
        fs.mkdirSync(creaturesDir, { recursive: true });
    }
    if (!fs.existsSync(buildingsDir)) {
        fs.mkdirSync(buildingsDir, { recursive: true });
    }
    
    // Creature data
    const creatures = [
        { name: 'kitsune_sprout', elementType: 'GRASS' },
        { name: 'kitsune_sage', elementType: 'GRASS' },
        { name: 'tanuki_pup', elementType: 'NORMAL' },
        { name: 'tanuki_trickster', elementType: 'NORMAL' },
        { name: 'kodama_spirit', elementType: 'FAIRY' },
        { name: 'kodama_guardian', elementType: 'FAIRY' },
        { name: 'kappa_warrior', elementType: 'WATER' },
        { name: 'kappa_master', elementType: 'WATER' },
        { name: 'oni_child', elementType: 'DARK' },
        { name: 'oni_warrior', elementType: 'DARK' },
        { name: 'tengu_chick', elementType: 'FLYING' },
        { name: 'tengu_master', elementType: 'FLYING' },
        { name: 'shiba_inu', elementType: 'NORMAL' },
        { name: 'nekomata', elementType: 'PSYCHIC' },
        { name: 'flamewyrm', elementType: 'FIRE' },
        { name: 'aquafin', elementType: 'WATER' },
        { name: 'leafsprout', elementType: 'GRASS' },
        { name: 'sparkbolt', elementType: 'ELECTRIC' },
        { name: 'frostcub', elementType: 'ICE' },
        { name: 'rockshell', elementType: 'ROCK' }
    ];
    
    const buildings = [
        'house', 'inn', 'shop', 'temple', 'tower', 'windmill',
        'lighthouse', 'dojo', 'garden', 'bridge', 'dungeon',
        'shrine', 'cave', 'ruins'
    ];
    
    // Generate creature sprites
    console.log('Generating creature sprites...');
    for (const creature of creatures) {
        const canvas = createCanvas(64, 64);
        generator.generateCreatureSprite(canvas, creature);
        
        const buffer = canvas.toBuffer('image/png');
        const filepath = path.join(creaturesDir, `${creature.name}.png`);
        fs.writeFileSync(filepath, buffer);
        console.log(`Created: ${filepath}`);
    }
    
    // Generate building sprites
    console.log('Generating building sprites...');
    for (const building of buildings) {
        const canvas = createCanvas(64, 64);
        generator.generateBuildingSprite(canvas, building);
        
        const buffer = canvas.toBuffer('image/png');
        const filepath = path.join(buildingsDir, `${building}.png`);
        fs.writeFileSync(filepath, buffer);
        console.log(`Created: ${filepath}`);
    }
    
    console.log('All assets generated successfully!');
}

// Check if running in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    generateAllAssets().catch(console.error);
} else {
    console.log('This script should be run with Node.js');
}
