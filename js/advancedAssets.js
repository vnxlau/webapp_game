// Advanced Asset Generator - Creates detailed pixel-art style sprites

class AdvancedAssetGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
        
        // Disable anti-aliasing for pixel-perfect sprites
        this.ctx.imageSmoothingEnabled = false;
    }

    // Enhanced creature sprites with detailed pixel art
    createDetailedCreatureSprite(name, elementType) {
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
        this.drawPixelRect name="36" 21, 1, 2, '#000000');
        
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
    }

    drawKarasu(elementType) {
        const colors = { primary: '#2C2C2C', secondary: '#1A1A1A', accent: '#4A4A4A' };
        
        // Crow body
        this.drawPixelEllipse(32, 42, 12, 16, colors.primary);
        
        // Head
        this.drawPixelEllipse(32, 26, 10, 10, colors.primary);
        
        // Beak (long and pointed)
        this.drawPixelRect(38, 24, 6, 2, '#FFA500');
        this.drawPixelRect(40, 22, 4, 2, '#FFA500');
        this.drawPixelRect(42, 26, 2, 2, '#FFA500');
        
        // Eyes
        this.drawPixelRect(28, 22, 2, 2, '#FF0000');
        this.drawPixelRect(34, 22, 2, 2, '#FF0000');
        
        // Wings (spread out)
        this.drawPixelRect(12, 36, 12, 8, colors.primary);
        this.drawPixelRect(40, 36, 12, 8, colors.primary);
        this.drawPixelRect(10, 40, 8, 4, colors.primary);
        this.drawPixelRect(46, 40, 8, 4, colors.primary);
        
        // Wing details (feathers)
        this.drawPixelRect(14, 38, 2, 2, colors.secondary);
        this.drawPixelRect(18, 38, 2, 2, colors.secondary);
        this.drawPixelRect(44, 38, 2, 2, colors.secondary);
        this.drawPixelRect(48, 38, 2, 2, colors.secondary);
        
        // Tail feathers
        this.drawPixelRect(28, 56, 8, 6, colors.primary);
        this.drawPixelRect(30, 60, 4, 2, colors.primary);
        
        // Legs/talons
        this.drawPixelRect(28, 54, 2, 6, '#FFA500');
        this.drawPixelRect(34, 54, 2, 6, '#FFA500');
        
        return this.canvas.toDataURL();
    }

    drawRyu(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Dragon body (serpentine)
        this.drawPixelRect(20, 40, 24, 8, colors.primary);
        this.drawPixelRect(16, 36, 32, 4, colors.primary);
        this.drawPixelRect(18, 44, 28, 4, colors.primary);
        
        // Head (dragon-like)
        this.drawPixelRect(40, 20, 16, 12, colors.primary);
        this.drawPixelRect(44, 16, 8, 8, colors.primary);
        
        // Horns
        this.drawPixelRect(46, 8, 2, 8, colors.secondary);
        this.drawPixelRect(50, 8, 2, 8, colors.secondary);
        
        // Eyes (fierce)
        this.drawPixelRect(46, 20, 2, 4, '#FF4444');
        this.drawPixelRect(50, 20, 2, 4, '#FF4444');
        
        // Nostrils
        this.drawPixelRect(54, 24, 1, 2, '#000000');
        this.drawPixelRect(54, 27, 1, 2, '#000000');
        
        // Scales pattern
        for (let y = 36; y < 48; y += 4) {
            for (let x = 18; x < 44; x += 6) {
                this.drawPixelRect(x, y, 2, 2, colors.secondary);
            }
        }
        
        // Wings
        this.drawPixelRect(8, 24, 12, 16, colors.accent || colors.secondary);
        this.drawPixelRect(4, 28, 8, 8, colors.accent || colors.secondary);
        
        // Tail
        this.drawPixelRect(12, 48, 16, 6, colors.primary);
        this.drawPixelRect(8, 52, 12, 4, colors.primary);
        this.drawPixelRect(4, 54, 8, 2, colors.primary);
        
        return this.canvas.toDataURL();
    }

    // Player character sprite
    createPlayerSprite() {
        this.ctx.clearRect(0, 0, 64, 64);
        
        // Young trainer character
        // Head
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC'); // Skin tone
        
        // Hair
        this.drawPixelRect(24, 8, 16, 8, '#8B4513'); // Brown hair
        this.drawPixelRect(22, 10, 4, 6, '#8B4513');
        this.drawPixelRect(38, 10, 4, 6, '#8B4513');
        
        // Eyes
        this.drawPixelRect(28, 16, 2, 2, '#4A4A4A');
        this.drawPixelRect(34, 16, 2, 2, '#4A4A4A');
        this.drawPixelRect(28, 16, 1, 1, '#FFFFFF');
        this.drawPixelRect(34, 16, 1, 1, '#FFFFFF');
        
        // Mouth
        this.drawPixelRect(31, 20, 2, 1, '#8B4513');
        
        // Body (trainer outfit)
        this.drawPixelRect(24, 24, 16, 20, '#FF6B6B'); // Red jacket
        this.drawPixelRect(26, 26, 12, 16, '#4169E1'); // Blue shirt
        
        // Arms
        this.drawPixelRect(18, 28, 6, 12, '#FFDBAC'); // Left arm
        this.drawPixelRect(40, 28, 6, 12, '#FFDBAC'); // Right arm
        this.drawPixelRect(18, 38, 6, 4, '#FF6B6B'); // Sleeve
        this.drawPixelRect(40, 38, 6, 4, '#FF6B6B'); // Sleeve
        
        // Legs
        this.drawPixelRect(26, 44, 6, 16, '#2F4F4F'); // Left leg (pants)
        this.drawPixelRect(32, 44, 6, 16, '#2F4F4F'); // Right leg (pants)
        
        // Shoes
        this.drawPixelRect(24, 58, 8, 4, '#8B4513');
        this.drawPixelRect(32, 58, 8, 4, '#8B4513');
        
        // Backpack
        this.drawPixelRect(20, 26, 4, 8, '#4A4A4A');
        this.drawPixelRect(40, 26, 4, 8, '#4A4A4A');
        
        // Pokeball on belt
        this.drawPixelRect(34, 42, 4, 4, '#FF0000');
        this.drawPixelRect(34, 44, 4, 2, '#FFFFFF');
        this.drawPixelRect(36, 43, 1, 1, '#000000');
        
        return this.canvas.toDataURL();
    }

    // NPC sprites
    createNPCSprite(type) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(type) {
            case 'elder':
                return this.drawElder();
            case 'merchant':
                return this.drawMerchant();
            case 'trainer':
                return this.drawTrainer();
            case 'healer':
                return this.drawHealer();
            default:
                return this.drawGenericNPC();
        }
    }

    drawElder() {
        // Wise old character
        // Head
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC');
        
        // Long beard
        this.drawPixelRect(24, 22, 16, 8, '#E0E0E0');
        this.drawPixelRect(26, 30, 12, 6, '#E0E0E0');
        
        // Hair (balding)
        this.drawPixelRect(24, 8, 4, 6, '#E0E0E0');
        this.drawPixelRect(36, 8, 4, 6, '#E0E0E0');
        
        // Eyes (wise)
        this.drawPixelRect(28, 16, 2, 2, '#4A4A4A');
        this.drawPixelRect(34, 16, 2, 2, '#4A4A4A');
        
        // Robes
        this.drawPixelRect(20, 32, 24, 28, '#8A2BE2'); // Purple robes
        this.drawPixelRect(22, 34, 20, 24, '#9932CC');
        
        // Staff
        this.drawPixelRect(12, 8, 2, 40, '#8B4513');
        this.drawPixelRect(10, 8, 6, 4, '#FFD700'); // Golden top
        
        return this.canvas.toDataURL();
    }

    drawMerchant() {
        // Friendly trader
        // Head
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC');
        
        // Hat
        this.drawPixelRect(22, 6, 20, 8, '#228B22');
        this.drawPixelRect(20, 8, 24, 4, '#228B22');
        
        // Eyes
        this.drawPixelRect(28, 16, 2, 2, '#4A4A4A');
        this.drawPixelRect(34, 16, 2, 2, '#4A4A4A');
        
        // Mustache
        this.drawPixelRect(26, 20, 12, 2, '#8B4513');
        
        // Merchant clothes
        this.drawPixelRect(22, 24, 20, 24, '#DAA520'); // Golden vest
        this.drawPixelRect(24, 26, 16, 20, '#F0E68C');
        
        // Money pouch
        this.drawPixelRect(40, 36, 6, 8, '#8B4513');
        this.drawPixelRect(42, 38, 2, 4, '#FFD700');
        
        return this.canvas.toDataURL();
    }

    // Building sprites
    createBuildingSprite(type) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(type) {
            case 'shrine':
                return this.drawShrine();
            case 'dojo':
                return this.drawDojo();
            case 'house':
                return this.drawHouse();
            case 'shop':
                return this.drawShop();
            case 'temple':
                return this.drawTemple();
            default:
                return this.drawGenericBuilding();
        }
    }

    drawShrine() {
        // Traditional Japanese shrine
        // Base
        this.drawPixelRect(16, 48, 32, 12, '#8B4513');
        
        // Main structure
        this.drawPixelRect(20, 32, 24, 16, '#D2691E');
        
        // Roof (curved)
        this.drawPixelRect(12, 24, 40, 8, '#B22222');
        this.drawPixelRect(14, 20, 36, 4, '#B22222');
        this.drawPixelRect(18, 16, 28, 4, '#8B0000');
        
        // Pillars
        this.drawPixelRect(22, 32, 4, 16, '#8B4513');
        this.drawPixelRect(38, 32, 4, 16, '#8B4513');
        
        // Entrance
        this.drawPixelRect(28, 40, 8, 8, '#000000');
        
        // Torii gate elements
        this.drawPixelRect(24, 12, 16, 2, '#8B0000');
        this.drawPixelRect(22, 14, 20, 2, '#8B0000');
        
        return this.canvas.toDataURL();
    }

    drawDojo() {
        // Training hall
        // Base
        this.drawPixelRect(12, 40, 40, 20, '#654321');
        
        // Walls
        this.drawPixelRect(14, 24, 36, 16, '#D2B48C');
        
        // Roof
        this.drawPixelRect(8, 16, 48, 8, '#2F4F4F');
        this.drawPixelRect(10, 12, 44, 4, '#2F4F4F');
        
        // Door
        this.drawPixelRect(28, 32, 8, 8, '#8B4513');
        this.drawPixelRect(30, 34, 4, 6, '#000000');
        
        // Windows
        this.drawPixelRect(18, 28, 6, 6, '#87CEEB');
        this.drawPixelRect(40, 28, 6, 6, '#87CEEB');
        
        // Sign
        this.drawPixelRect(26, 20, 12, 4, '#F5DEB3');
        this.drawPixelRect(28, 21, 2, 2, '#000000');
        this.drawPixelRect(34, 21, 2, 2, '#000000');
        
        return this.canvas.toDataURL();
    }

    // Utility functions for pixel-perfect drawing
    drawPixelRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawPixelEllipse(centerX, centerY, radiusX, radiusY, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    getElementColors(elementType) {
        const colorMap = {
            fire: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFE66D' },
            water: { primary: '#4ECDC4', secondary: '#44A08D', accent: '#C7FFED' },
            grass: { primary: '#6BCF7F', secondary: '#4D7C0F', accent: '#A7E66F' },
            electric: { primary: '#FFE66D', secondary: '#F7931E', accent: '#FFF3C4' },
            psychic: { primary: '#FF6B9D', secondary: '#C44569', accent: '#FFE4E6' },
            ice: { primary: '#A8E6CF', secondary: '#7FDBFF', accent: '#E8F8F5' },
            dragon: { primary: '#7209B7', secondary: '#4A0E4E', accent: '#C77DFF' },
            dark: { primary: '#2D3436', secondary: '#636E72', accent: '#B2BEC3' },
            fairy: { primary: '#FFB3DE', secondary: '#FF8CC8', accent: '#FFE4E6' },
            normal: { primary: '#DDD6FE', secondary: '#A78BFA', accent: '#F3F4F6' }
        };
        
        return colorMap[elementType] || colorMap.normal;
    }
}

// Export the class for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedAssetGenerator;
}
