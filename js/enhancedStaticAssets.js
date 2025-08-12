// Enhanced Static Assets - Pre-generated detailed pixel art sprites

class SimpleAssetCreator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
    }

    createCreatureSprite(name, elementType) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(name.toLowerCase()) {
            case 'kitsune': return this.drawKitsune(elementType);
            case 'tanuki': return this.drawTanuki(elementType);
            case 'kodama': return this.drawKodama(elementType);
            case 'neko': return this.drawNeko(elementType);
            case 'karasu': return this.drawKarasu(elementType);
            case 'ryu': return this.drawRyu(elementType);
            case 'oni': return this.drawOni(elementType);
            case 'yuki-onna': return this.drawYukiOnna(elementType);
            case 'phoenix': return this.drawPhoenix(elementType);
            case 'leviathan': return this.drawLeviathan(elementType);
            default: return this.drawGenericCreature(elementType);
        }
    }

    drawKitsune(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Fox body
        this.drawPixelRect(24, 40, 16, 20, colors.primary);
        this.drawPixelRect(22, 20, 20, 16, colors.primary);
        
        // Multiple tails (kitsune feature)
        this.drawPixelRect(12, 44, 8, 16, colors.primary);
        this.drawPixelRect(44, 44, 8, 16, colors.primary);
        this.drawPixelRect(28, 48, 8, 12, colors.primary);
        
        // Ears
        this.drawPixelRect(20, 12, 6, 12, colors.primary);
        this.drawPixelRect(38, 12, 6, 12, colors.primary);
        this.drawPixelRect(22, 14, 2, 8, colors.secondary);
        this.drawPixelRect(40, 14, 2, 8, colors.secondary);
        
        // Face markings
        this.drawPixelRect(26, 32, 12, 4, colors.secondary);
        
        // Eyes
        this.drawPixelRect(26, 24, 2, 4, '#000000');
        this.drawPixelRect(36, 24, 2, 4, '#000000');
        this.drawPixelRect(26, 24, 1, 2, '#FF6B6B');
        this.drawPixelRect(36, 24, 1, 2, '#FF6B6B');
        
        return this.canvas.toDataURL();
    }

    drawTanuki(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Round tanuki body
        this.drawPixelEllipse(32, 44, 18, 16, colors.primary);
        this.drawPixelEllipse(32, 24, 16, 14, colors.primary);
        this.drawPixelEllipse(32, 48, 12, 10, colors.secondary);
        
        // Characteristic face mask
        this.drawPixelRect(20, 18, 24, 8, '#4A4A4A');
        this.drawPixelRect(24, 16, 16, 4, '#4A4A4A');
        
        // Large round eyes
        this.drawPixelRect(26, 20, 4, 4, '#FFFFFF');
        this.drawPixelRect(34, 20, 4, 4, '#FFFFFF');
        this.drawPixelRect(27, 21, 2, 2, '#000000');
        this.drawPixelRect(35, 21, 2, 2, '#000000');
        
        // Striped tail
        this.drawPixelRect(48, 36, 12, 20, colors.primary);
        this.drawPixelRect(50, 38, 8, 2, '#4A4A4A');
        this.drawPixelRect(50, 46, 8, 2, '#4A4A4A');
        
        return this.canvas.toDataURL();
    }

    drawKodama(elementType) {
        const colors = { primary: '#E8F5E8', secondary: '#C8E6C9', accent: '#81C784' };
        
        // Tree spirit body
        this.drawPixelEllipse(32, 40, 14, 20, colors.primary);
        this.drawPixelEllipse(32, 22, 18, 16, colors.primary);
        
        // Simple spirit eyes
        this.drawPixelRect(26, 20, 2, 2, '#000000');
        this.drawPixelRect(36, 20, 2, 2, '#000000');
        this.drawPixelRect(31, 26, 2, 1, '#000000');
        
        // Wood texture
        this.drawPixelRect(20, 24, 24, 1, colors.secondary);
        this.drawPixelRect(22, 32, 20, 1, colors.secondary);
        this.drawPixelRect(24, 44, 16, 1, colors.secondary);
        
        // Branch arms
        this.drawPixelRect(18, 32, 6, 2, colors.accent);
        this.drawPixelRect(40, 32, 6, 2, colors.accent);
        
        return this.canvas.toDataURL();
    }

    drawNeko(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Cat body
        this.drawPixelEllipse(32, 44, 16, 18, colors.primary);
        this.drawPixelEllipse(32, 24, 14, 12, colors.primary);
        
        // Cat ears
        this.drawPixelRect(24, 12, 4, 8, colors.primary);
        this.drawPixelRect(36, 12, 4, 8, colors.primary);
        this.drawPixelRect(25, 14, 2, 4, '#FFB6C1');
        this.drawPixelRect(37, 14, 2, 4, '#FFB6C1');
        
        // Cat eyes
        this.drawPixelRect(26, 20, 3, 4, '#4CAF50');
        this.drawPixelRect(35, 20, 3, 4, '#4CAF50');
        this.drawPixelRect(27, 21, 1, 2, '#000000');
        this.drawPixelRect(36, 21, 1, 2, '#000000');
        
        // Curved tail
        this.drawPixelRect(48, 30, 4, 16, colors.primary);
        this.drawPixelRect(50, 26, 4, 8, colors.primary);
        
        return this.canvas.toDataURL();
    }

    drawKarasu(elementType) {
        const colors = { primary: '#2C2C2C', secondary: '#1A1A1A', accent: '#4A4A4A' };
        
        // Crow body and head
        this.drawPixelEllipse(32, 42, 12, 16, colors.primary);
        this.drawPixelEllipse(32, 26, 10, 10, colors.primary);
        
        // Pointed beak
        this.drawPixelRect(38, 24, 6, 2, '#FFA500');
        this.drawPixelRect(40, 22, 4, 2, '#FFA500');
        
        // Red eyes
        this.drawPixelRect(28, 22, 2, 2, '#FF0000');
        this.drawPixelRect(34, 22, 2, 2, '#FF0000');
        
        // Spread wings
        this.drawPixelRect(12, 36, 12, 8, colors.primary);
        this.drawPixelRect(40, 36, 12, 8, colors.primary);
        
        return this.canvas.toDataURL();
    }

    drawRyu(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Dragon serpentine body
        this.drawPixelRect(20, 40, 24, 8, colors.primary);
        this.drawPixelRect(16, 36, 32, 4, colors.primary);
        this.drawPixelRect(40, 20, 16, 12, colors.primary);
        
        // Dragon horns
        this.drawPixelRect(46, 8, 2, 8, colors.secondary);
        this.drawPixelRect(50, 8, 2, 8, colors.secondary);
        
        // Fierce eyes
        this.drawPixelRect(46, 20, 2, 4, '#FF4444');
        this.drawPixelRect(50, 20, 2, 4, '#FF4444');
        
        // Wings
        this.drawPixelRect(8, 24, 12, 16, colors.accent || colors.secondary);
        
        return this.canvas.toDataURL();
    }

    drawOni(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Large oni body
        this.drawPixelRect(20, 40, 24, 20, colors.primary);
        this.drawPixelRect(22, 16, 20, 20, colors.primary);
        
        // Demon horns
        this.drawPixelRect(24, 8, 4, 12, '#8B0000');
        this.drawPixelRect(36, 8, 4, 12, '#8B0000');
        
        // Glowing eyes
        this.drawPixelRect(26, 22, 4, 4, '#FF0000');
        this.drawPixelRect(34, 22, 4, 4, '#FF0000');
        
        // Fangs
        this.drawPixelRect(28, 30, 2, 4, '#FFFFFF');
        this.drawPixelRect(34, 30, 2, 4, '#FFFFFF');
        
        // Club weapon
        this.drawPixelRect(8, 20, 4, 20, '#8B4513');
        
        return this.canvas.toDataURL();
    }

    drawYukiOnna(elementType) {
        const colors = { primary: '#F0F8FF', secondary: '#E6F3FF', accent: '#87CEEB' };
        
        // Flowing kimono
        this.drawPixelRect(18, 36, 28, 24, colors.primary);
        this.drawPixelRect(26, 12, 12, 16, colors.primary);
        
        // Long black hair
        this.drawPixelRect(20, 8, 24, 12, '#000000');
        this.drawPixelRect(18, 16, 28, 8, '#000000');
        
        // Cold blue eyes
        this.drawPixelRect(28, 18, 2, 3, '#87CEEB');
        this.drawPixelRect(34, 18, 2, 3, '#87CEEB');
        
        // Ice crystals around her
        this.drawPixelRect(12, 24, 2, 2, colors.accent);
        this.drawPixelRect(50, 28, 2, 2, colors.accent);
        
        return this.canvas.toDataURL();
    }

    drawPhoenix(elementType) {
        const colors = { primary: '#FF4500', secondary: '#FFD700', accent: '#FF6347' };
        
        // Majestic bird body
        this.drawPixelEllipse(32, 40, 14, 16, colors.primary);
        this.drawPixelEllipse(32, 22, 12, 10, colors.primary);
        
        // Fire crest
        this.drawPixelRect(28, 8, 8, 8, colors.secondary);
        this.drawPixelRect(30, 6, 4, 6, '#FF0000');
        
        // Golden beak
        this.drawPixelRect(38, 20, 4, 3, '#FFD700');
        
        // Fiery eyes
        this.drawPixelRect(28, 18, 3, 3, '#FFD700');
        this.drawPixelRect(29, 19, 1, 1, '#FF0000');
        
        // Grand wings
        this.drawPixelRect(8, 32, 16, 12, colors.secondary);
        this.drawPixelRect(40, 32, 16, 12, colors.secondary);
        
        // Fire trail tail
        this.drawPixelRect(24, 52, 16, 8, colors.primary);
        this.drawPixelRect(20, 56, 24, 4, colors.secondary);
        
        return this.canvas.toDataURL();
    }

    drawLeviathan(elementType) {
        const colors = { primary: '#1E3A8A', secondary: '#3B82F6', accent: '#60A5FA' };
        
        // Sea serpent body
        this.drawPixelRect(16, 40, 32, 8, colors.primary);
        this.drawPixelRect(12, 36, 24, 4, colors.primary);
        this.drawPixelRect(40, 20, 18, 16, colors.primary);
        
        // Aquatic fins
        this.drawPixelRect(44, 8, 2, 12, colors.secondary);
        this.drawPixelRect(48, 10, 2, 10, colors.secondary);
        
        // Deep sea eyes
        this.drawPixelRect(46, 24, 3, 4, colors.accent);
        this.drawPixelRect(47, 25, 1, 2, '#FFFFFF');
        
        // Scale pattern
        for (let y = 36; y < 48; y += 4) {
            for (let x = 16; x < 40; x += 6) {
                this.drawPixelRect(x, y, 2, 2, colors.secondary);
            }
        }
        
        return this.canvas.toDataURL();
    }

    drawGenericCreature(elementType) {
        const colors = this.getElementColors(elementType);
        
        // Basic appealing creature
        this.drawPixelEllipse(32, 44, 16, 18, colors.primary);
        this.drawPixelEllipse(32, 24, 14, 12, colors.primary);
        this.drawPixelEllipse(32, 48, 10, 12, colors.secondary);
        
        // Eyes
        this.drawPixelRect(26, 20, 4, 4, '#000000');
        this.drawPixelRect(34, 20, 4, 4, '#000000');
        this.drawPixelRect(27, 21, 2, 2, '#FFFFFF');
        this.drawPixelRect(35, 21, 2, 2, '#FFFFFF');
        
        return this.canvas.toDataURL();
    }

    // Player sprite
    createPlayerSprite() {
        this.ctx.clearRect(0, 0, 64, 64);
        
        // Young trainer
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC'); // Head
        this.drawPixelRect(24, 8, 16, 8, '#8B4513'); // Hair
        this.drawPixelRect(28, 16, 2, 2, '#4A4A4A'); // Eyes
        this.drawPixelRect(34, 16, 2, 2, '#4A4A4A');
        this.drawPixelRect(24, 24, 16, 20, '#FF6B6B'); // Red jacket
        this.drawPixelRect(26, 26, 12, 16, '#4169E1'); // Blue shirt
        this.drawPixelRect(26, 44, 12, 16, '#2F4F4F'); // Pants
        this.drawPixelRect(24, 58, 16, 4, '#8B4513'); // Shoes
        
        // Pokeball on belt
        this.drawPixelRect(34, 42, 4, 4, '#FF0000');
        this.drawPixelRect(34, 44, 4, 2, '#FFFFFF');
        
        return this.canvas.toDataURL();
    }

    // NPC sprites
    createNPCSprite(type) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(type) {
            case 'elder': return this.drawElder();
            case 'merchant': return this.drawMerchant();
            case 'trainer': return this.drawTrainer();
            case 'healer': return this.drawHealer();
            default: return this.drawGenericNPC();
        }
    }

    drawElder() {
        // Wise elder with robes
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC'); // Head
        this.drawPixelRect(24, 22, 16, 8, '#E0E0E0'); // Beard
        this.drawPixelRect(20, 32, 24, 28, '#8A2BE2'); // Purple robes
        this.drawPixelRect(12, 8, 2, 40, '#8B4513'); // Staff
        this.drawPixelRect(10, 8, 6, 4, '#FFD700'); // Golden top
        
        return this.canvas.toDataURL();
    }

    drawMerchant() {
        // Friendly trader
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC'); // Head
        this.drawPixelRect(22, 6, 20, 8, '#228B22'); // Hat
        this.drawPixelRect(22, 24, 20, 24, '#DAA520'); // Golden vest
        this.drawPixelRect(40, 36, 6, 8, '#8B4513'); // Money pouch
        
        return this.canvas.toDataURL();
    }

    drawTrainer() {
        // Another trainer similar to player
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC');
        this.drawPixelRect(24, 8, 16, 8, '#4B0082'); // Purple hair
        this.drawPixelRect(24, 24, 16, 20, '#32CD32'); // Green jacket
        this.drawPixelRect(26, 44, 12, 16, '#000080'); // Navy pants
        
        return this.canvas.toDataURL();
    }

    drawHealer() {
        // Nurse/healer character
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC');
        this.drawPixelRect(24, 8, 16, 8, '#FFB6C1'); // Pink hair
        this.drawPixelRect(22, 24, 20, 24, '#FFFFFF'); // White uniform
        this.drawPixelRect(30, 30, 4, 8, '#FF0000'); // Red cross
        
        return this.canvas.toDataURL();
    }

    drawGenericNPC() {
        this.drawPixelRect(26, 12, 12, 12, '#FFDBAC');
        this.drawPixelRect(24, 8, 16, 8, '#654321');
        this.drawPixelRect(22, 24, 20, 24, '#8FBC8F');
        
        return this.canvas.toDataURL();
    }

    // Building sprites
    createBuildingSprite(type) {
        this.ctx.clearRect(0, 0, 64, 64);
        
        switch(type) {
            case 'shrine': return this.drawShrine();
            case 'dojo': return this.drawDojo();
            case 'house': return this.drawHouse();
            case 'shop': return this.drawShop();
            case 'temple': return this.drawTemple();
            case 'inn': return this.drawInn();
            case 'library': return this.drawLibrary();
            case 'tower': return this.drawTower();
            case 'garden': return this.drawGarden();
            case 'bridge': return this.drawBridge();
            case 'gate': return this.drawGate();
            case 'well': return this.drawWell();
            case 'statue': return this.drawStatue();
            case 'pagoda': return this.drawPagoda();
            default: return this.drawGenericBuilding();
        }
    }

    drawShrine() {
        // Traditional Japanese shrine
        this.drawPixelRect(16, 48, 32, 12, '#8B4513'); // Base
        this.drawPixelRect(20, 32, 24, 16, '#D2691E'); // Structure
        this.drawPixelRect(12, 24, 40, 8, '#B22222'); // Roof
        this.drawPixelRect(14, 20, 36, 4, '#B22222');
        this.drawPixelRect(22, 32, 4, 16, '#8B4513'); // Pillars
        this.drawPixelRect(38, 32, 4, 16, '#8B4513');
        this.drawPixelRect(28, 40, 8, 8, '#000000'); // Entrance
        
        return this.canvas.toDataURL();
    }

    drawDojo() {
        // Training hall
        this.drawPixelRect(12, 40, 40, 20, '#654321'); // Base
        this.drawPixelRect(14, 24, 36, 16, '#D2B48C'); // Walls
        this.drawPixelRect(8, 16, 48, 8, '#2F4F4F'); // Roof
        this.drawPixelRect(28, 32, 8, 8, '#8B4513'); // Door
        this.drawPixelRect(18, 28, 6, 6, '#87CEEB'); // Windows
        this.drawPixelRect(40, 28, 6, 6, '#87CEEB');
        
        return this.canvas.toDataURL();
    }

    drawHouse() {
        // Simple house
        this.drawPixelRect(16, 32, 32, 28, '#DEB887'); // Walls
        this.drawPixelRect(12, 20, 40, 12, '#8B4513'); // Roof
        this.drawPixelRect(28, 40, 8, 12, '#654321'); // Door
        this.drawPixelRect(20, 36, 6, 6, '#87CEEB'); // Window
        this.drawPixelRect(38, 36, 6, 6, '#87CEEB');
        
        return this.canvas.toDataURL();
    }

    drawShop() {
        // Market/shop
        this.drawPixelRect(14, 36, 36, 24, '#F4A460'); // Building
        this.drawPixelRect(10, 24, 44, 12, '#B22222'); // Roof
        this.drawPixelRect(26, 44, 12, 12, '#654321'); // Door
        this.drawPixelRect(16, 40, 8, 8, '#87CEEB'); // Display window
        this.drawPixelRect(40, 40, 8, 8, '#87CEEB');
        this.drawPixelRect(30, 16, 8, 8, '#FFD700'); // Sign
        
        return this.canvas.toDataURL();
    }

    drawTemple() {
        // Large temple
        this.drawPixelRect(8, 44, 48, 16, '#D2691E'); // Base
        this.drawPixelRect(12, 28, 40, 16, '#CD853F'); // Main structure
        this.drawPixelRect(4, 16, 56, 12, '#8B0000'); // Roof
        this.drawPixelRect(28, 36, 8, 12, '#000000'); // Entrance
        this.drawPixelRect(16, 32, 4, 12, '#8B4513'); // Pillars
        this.drawPixelRect(44, 32, 4, 12, '#8B4513');
        
        return this.canvas.toDataURL();
    }

    drawInn() {
        // Two-story inn
        this.drawPixelRect(14, 44, 36, 16, '#DEB887'); // First floor
        this.drawPixelRect(16, 28, 32, 16, '#D2B48C'); // Second floor
        this.drawPixelRect(10, 16, 44, 12, '#654321'); // Roof
        this.drawPixelRect(28, 48, 8, 8, '#8B4513'); // Door
        this.drawPixelRect(20, 36, 6, 6, '#FFFF00'); // Lit windows
        this.drawPixelRect(38, 36, 6, 6, '#FFFF00');
        
        return this.canvas.toDataURL();
    }

    drawLibrary() {
        this.drawPixelRect(16, 36, 32, 24, '#708090'); // Stone building
        this.drawPixelRect(12, 24, 40, 12, '#2F4F4F'); // Roof
        this.drawPixelRect(28, 44, 8, 12, '#654321'); // Door
        this.drawPixelRect(20, 40, 6, 8, '#87CEEB'); // Tall windows
        this.drawPixelRect(38, 40, 6, 8, '#87CEEB');
        
        return this.canvas.toDataURL();
    }

    drawTower() {
        // Tall tower
        this.drawPixelRect(24, 8, 16, 52, '#708090'); // Tower body
        this.drawPixelRect(20, 4, 24, 8, '#2F4F4F'); // Roof
        this.drawPixelRect(28, 20, 8, 8, '#654321'); // Door
        this.drawPixelRect(26, 32, 4, 4, '#87CEEB'); // Windows
        this.drawPixelRect(34, 32, 4, 4, '#87CEEB');
        this.drawPixelRect(26, 44, 4, 4, '#87CEEB');
        this.drawPixelRect(34, 44, 4, 4, '#87CEEB');
        
        return this.canvas.toDataURL();
    }

    drawGarden() {
        // Zen garden
        this.drawPixelRect(8, 40, 48, 20, '#F5DEB3'); // Sand base
        this.drawPixelRect(16, 32, 8, 8, '#228B22'); // Tree
        this.drawPixelRect(40, 36, 6, 6, '#696969'); // Rock
        this.drawPixelRect(24, 52, 16, 2, '#8B4513'); // Rake lines
        this.drawPixelRect(12, 48, 2, 8, '#8B4513'); // Bamboo fence
        this.drawPixelRect(50, 48, 2, 8, '#8B4513');
        
        return this.canvas.toDataURL();
    }

    drawBridge() {
        // Traditional bridge
        this.drawPixelRect(8, 48, 48, 8, '#8B4513'); // Bridge deck
        this.drawPixelRect(12, 44, 40, 4, '#654321'); // Bridge structure
        this.drawPixelRect(16, 40, 4, 8, '#8B4513'); // Posts
        this.drawPixelRect(44, 40, 4, 8, '#8B4513');
        this.drawPixelRect(0, 56, 64, 4, '#4682B4'); // Water underneath
        
        return this.canvas.toDataURL();
    }

    drawGate() {
        // Torii gate
        this.drawPixelRect(12, 16, 40, 4, '#8B0000'); // Top beam
        this.drawPixelRect(8, 20, 48, 4, '#B22222'); // Lower beam
        this.drawPixelRect(18, 24, 6, 36, '#8B0000'); // Left pillar
        this.drawPixelRect(40, 24, 6, 36, '#8B0000'); // Right pillar
        
        return this.canvas.toDataURL();
    }

    drawWell() {
        // Traditional well
        this.drawPixelRect(20, 44, 24, 16, '#696969'); // Well base
        this.drawPixelRect(24, 40, 16, 4, '#8B4513'); // Well rim
        this.drawPixelRect(28, 36, 8, 4, '#000000'); // Well opening
        this.drawPixelRect(16, 24, 4, 20, '#8B4513'); // Support posts
        this.drawPixelRect(44, 24, 4, 20, '#8B4513');
        this.drawPixelRect(18, 20, 28, 4, '#654321'); // Roof
        this.drawPixelRect(30, 32, 4, 8, '#654321'); // Bucket rope
        
        return this.canvas.toDataURL();
    }

    drawStatue() {
        // Guardian statue
        this.drawPixelRect(16, 52, 32, 8, '#8B4513'); // Base
        this.drawPixelRect(24, 24, 16, 28, '#696969'); // Statue body
        this.drawPixelRect(26, 16, 12, 12, '#696969'); // Head
        this.drawPixelRect(20, 32, 6, 12, '#696969'); // Left arm
        this.drawPixelRect(38, 32, 6, 12, '#696969'); // Right arm
        this.drawPixelRect(28, 18, 2, 2, '#FF0000'); // Glowing eyes
        this.drawPixelRect(34, 18, 2, 2, '#FF0000');
        
        return this.canvas.toDataURL();
    }

    drawPagoda() {
        // Multi-tier pagoda
        this.drawPixelRect(20, 48, 24, 12, '#D2691E'); // Base level
        this.drawPixelRect(22, 36, 20, 12, '#CD853F'); // Second level
        this.drawPixelRect(24, 24, 16, 12, '#DEB887'); // Third level
        this.drawPixelRect(18, 44, 28, 4, '#8B0000'); // Roof 1
        this.drawPixelRect(20, 32, 24, 4, '#8B0000'); // Roof 2
        this.drawPixelRect(22, 20, 20, 4, '#8B0000'); // Roof 3
        this.drawPixelRect(30, 12, 4, 12, '#8B4513'); // Spire
        
        return this.canvas.toDataURL();
    }

    drawGenericBuilding() {
        // Default building
        this.drawPixelRect(16, 36, 32, 24, '#DEB887');
        this.drawPixelRect(12, 24, 40, 12, '#8B4513');
        this.drawPixelRect(28, 44, 8, 12, '#654321');
        this.drawPixelRect(20, 40, 6, 6, '#87CEEB');
        
        return this.canvas.toDataURL();
    }

    // Utility functions
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

// Static assets object with pre-generated sprites
const StaticAssets = {
    creatures: {},
    buildings: {},
    npcs: {},
    player: null,
    
    init() {
        const generator = new SimpleAssetCreator();
        
        // Generate all creature sprites
        const creatures = [
            { name: 'Kitsune', element: 'fire' },
            { name: 'Tanuki', element: 'normal' },
            { name: 'Kodama', element: 'grass' },
            { name: 'Neko', element: 'normal' },
            { name: 'Karasu', element: 'dark' },
            { name: 'Ryu', element: 'dragon' },
            { name: 'Oni', element: 'dark' },
            { name: 'Yuki-Onna', element: 'ice' },
            { name: 'Phoenix', element: 'fire' },
            { name: 'Leviathan', element: 'water' }
        ];
        
        creatures.forEach(creature => {
            this.creatures[creature.name.toLowerCase()] = generator.createCreatureSprite(creature.name, creature.element);
        });
        
        // Generate building sprites
        const buildings = ['shrine', 'dojo', 'house', 'shop', 'temple', 'inn', 'library', 'tower', 'garden', 'bridge', 'gate', 'well', 'statue', 'pagoda'];
        buildings.forEach(building => {
            this.buildings[building] = generator.createBuildingSprite(building);
        });
        
        // Generate NPC sprites
        const npcs = ['elder', 'merchant', 'trainer', 'healer'];
        npcs.forEach(npc => {
            this.npcs[npc] = generator.createNPCSprite(npc);
        });
        
        // Generate player sprite
        this.player = generator.createPlayerSprite();
        
        console.log('Enhanced static assets generated with detailed pixel art!');
    }
};

// Initialize when loaded
if (typeof document !== 'undefined') {
    StaticAssets.init();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StaticAssets, SimpleAssetCreator };
}
