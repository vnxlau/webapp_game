// Ultra-Enhanced Asset Generator - Professional quality pixel art

class UltraAssetGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 128; // Higher resolution for better detail
        this.canvas.height = 128;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
    }

    // Professional Kitsune with Studio Ghibli inspiration
    createProfessionalKitsune() {
        this.ctx.clearRect(0, 0, 128, 128);
        
        // Background glow effect
        const gradient = this.ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
        gradient.addColorStop(0, 'rgba(255, 107, 53, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 128, 128);
        
        // Main body (fox orange)
        this.drawSmoothShape([
            [48, 80], [80, 80], [84, 76], [84, 96], [80, 100], [48, 100], [44, 96], [44, 76]
        ], '#FF6B35');
        
        // Chest/belly (cream white)
        this.drawSmoothShape([
            [52, 84], [76, 84], [78, 86], [78, 96], [76, 98], [52, 98], [50, 96], [50, 86]
        ], '#FFF5E6');
        
        // Head (main fox color)
        this.drawSmoothEllipse(64, 48, 24, 20, '#FF6B35');
        
        // Head markings (cream)
        this.drawSmoothEllipse(64, 52, 16, 14, '#FFF5E6');
        
        // Ears (pointed fox ears)
        this.drawSmoothShape([
            [45, 32], [55, 28], [58, 40], [48, 44]
        ], '#FF6B35');
        this.drawSmoothShape([
            [70, 40], [73, 28], [83, 32], [80, 44]
        ], '#FF6B35');
        
        // Inner ears
        this.drawSmoothShape([
            [48, 35], [54, 32], [56, 38], [50, 40]
        ], '#FFB3A0');
        this.drawSmoothShape([
            [72, 38], [74, 32], [80, 35], [78, 40]
        ], '#FFB3A0');
        
        // Multiple tails (signature kitsune feature)
        // Tail 1 (left)
        this.drawCurvedTail(32, 88, 20, 40, '#FF6B35', '#FFF5E6');
        // Tail 2 (right)
        this.drawCurvedTail(96, 88, -20, 40, '#FF6B35', '#FFF5E6');
        // Tail 3 (center back)
        this.drawCurvedTail(64, 100, 0, 35, '#FF6B35', '#FFF5E6');
        
        // Eyes (expressive anime-style)
        this.drawAnimeEye(54, 44, '#4A90E2', true);
        this.drawAnimeEye(74, 44, '#4A90E2', false);
        
        // Nose (small triangle)
        this.drawSmoothShape([
            [62, 56], [66, 56], [64, 60]
        ], '#FF4444');
        
        // Mouth (subtle smile)
        this.ctx.strokeStyle = '#CC5533';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(64, 62, 4, 0.2, Math.PI - 0.2);
        this.ctx.stroke();
        
        // Paws (detailed)
        this.drawDetailedPaw(52, 100, '#FF6B35');
        this.drawDetailedPaw(72, 100, '#FF6B35');
        
        // Fire aura effects
        this.addFireAura();
        
        return this.canvas.toDataURL();
    }

    createProfessionalTanuki() {
        this.ctx.clearRect(0, 0, 128, 128);
        
        // Main body (chubby tanuki)
        this.drawSmoothEllipse(64, 78, 28, 24, '#8B4513');
        
        // Belly (lighter brown)
        this.drawSmoothEllipse(64, 84, 20, 18, '#D2B48C');
        
        // Head
        this.drawSmoothEllipse(64, 44, 26, 22, '#8B4513');
        
        // Characteristic face mask (dark around eyes)
        this.drawSmoothEllipse(64, 40, 30, 16, '#2F2F2F');
        
        // Eyes (large and expressive)
        this.drawAnimeEye(52, 40, '#333333', true);
        this.drawAnimeEye(76, 40, '#333333', false);
        
        // Eye whites (visible around mask)
        this.drawSmoothEllipse(52, 38, 8, 6, '#FFFFFF');
        this.drawSmoothEllipse(76, 38, 8, 6, '#FFFFFF');
        
        // Pupils
        this.drawSmoothEllipse(52, 40, 4, 4, '#000000');
        this.drawSmoothEllipse(76, 40, 4, 4, '#000000');
        
        // Nose
        this.drawSmoothEllipse(64, 52, 3, 2, '#000000');
        
        // Ears (round)
        this.drawSmoothEllipse(48, 28, 8, 10, '#8B4513');
        this.drawSmoothEllipse(80, 28, 8, 10, '#8B4513');
        this.drawSmoothEllipse(48, 30, 4, 6, '#FFB6C1');
        this.drawSmoothEllipse(80, 30, 4, 6, '#FFB6C1');
        
        // Striped tail (iconic tanuki feature)
        this.drawStripedTail(100, 70, '#8B4513', '#2F2F2F');
        
        // Paws
        this.drawDetailedPaw(48, 100, '#8B4513');
        this.drawDetailedPaw(80, 100, '#8B4513');
        
        // Add some leaves around (nature theme)
        this.addNatureElements();
        
        return this.canvas.toDataURL();
    }

    createProfessionalPlayer() {
        this.ctx.clearRect(0, 0, 128, 128);
        
        // Body (red jacket)
        this.drawSmoothShape([
            [44, 56], [84, 56], [88, 60], [88, 88], [84, 92], [44, 92], [40, 88], [40, 60]
        ], '#DC143C');
        
        // Shirt underneath (blue)
        this.drawSmoothShape([
            [48, 60], [80, 60], [82, 62], [82, 84], [80, 86], [48, 86], [46, 84], [46, 62]
        ], '#4169E1');
        
        // Head (anime skin tone)
        this.drawSmoothEllipse(64, 36, 18, 16, '#FFDBAC');
        
        // Hair (brown, spiky anime style)
        this.drawSpikeyHair(64, 24, '#8B4513');
        
        // Eyes (determined expression)
        this.drawAnimeEye(56, 32, '#4A4A4A', true);
        this.drawAnimeEye(72, 32, '#4A4A4A', false);
        
        // Mouth (confident smile)
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(64, 40, 6, 0.3, Math.PI - 0.3);
        this.ctx.stroke();
        
        // Arms
        this.drawSmoothEllipse(28, 68, 8, 16, '#FFDBAC'); // Left arm
        this.drawSmoothEllipse(100, 68, 8, 16, '#FFDBAC'); // Right arm
        
        // Jacket sleeves
        this.drawSmoothEllipse(28, 76, 10, 8, '#DC143C');
        this.drawSmoothEllipse(100, 76, 10, 8, '#DC143C');
        
        // Pants (dark)
        this.drawSmoothShape([
            [48, 92], [80, 92], [82, 96], [82, 116], [78, 120], [50, 120], [46, 116], [46, 96]
        ], '#2F4F4F');
        
        // Shoes
        this.drawSmoothEllipse(56, 120, 12, 6, '#654321');
        this.drawSmoothEllipse(72, 120, 12, 6, '#654321');
        
        // Pokeball on belt (iconic detail)
        this.drawPokeball(68, 90);
        
        // Backpack straps
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(52, 58);
        this.ctx.lineTo(48, 72);
        this.ctx.moveTo(76, 58);
        this.ctx.lineTo(80, 72);
        this.ctx.stroke();
        
        return this.canvas.toDataURL();
    }

    // Helper methods for professional effects
    drawSmoothShape(points, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0][0], points[0][1]);
        
        for (let i = 1; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const cp1x = current[0];
            const cp1y = current[1];
            const cp2x = (current[0] + next[0]) / 2;
            const cp2y = (current[1] + next[1]) / 2;
            this.ctx.quadraticCurveTo(cp1x, cp1y, cp2x, cp2y);
        }
        
        this.ctx.closePath();
        this.ctx.fill();
        
        // Add subtle outline
        this.ctx.strokeStyle = this.darkenColor(color, 0.3);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    drawSmoothEllipse(x, y, radiusX, radiusY, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add subtle outline
        this.ctx.strokeStyle = this.darkenColor(color, 0.3);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    drawAnimeEye(x, y, color, isLeft) {
        // Outer eye shape
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 8, 6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Iris
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pupil
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 2, 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Highlight
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.ellipse(x - 1, y - 1, 1.5, 1.5, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyelashes (anime style)
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        if (isLeft) {
            this.ctx.moveTo(x - 8, y - 4);
            this.ctx.lineTo(x - 10, y - 6);
            this.ctx.moveTo(x - 6, y - 6);
            this.ctx.lineTo(x - 7, y - 8);
        } else {
            this.ctx.moveTo(x + 8, y - 4);
            this.ctx.lineTo(x + 10, y - 6);
            this.ctx.moveTo(x + 6, y - 6);
            this.ctx.lineTo(x + 7, y - 8);
        }
        this.ctx.stroke();
    }

    drawCurvedTail(startX, startY, curveX, length, mainColor, tipColor) {
        // Main tail body
        this.ctx.fillStyle = mainColor;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.quadraticCurveTo(startX + curveX, startY - length/2, startX + curveX/2, startY - length);
        this.ctx.quadraticCurveTo(startX + curveX + 8, startY - length, startX + curveX + 4, startY - length/2);
        this.ctx.quadraticCurveTo(startX + 8, startY, startX, startY);
        this.ctx.fill();
        
        // Tail tip (white)
        this.ctx.fillStyle = tipColor;
        this.ctx.beginPath();
        this.ctx.ellipse(startX + curveX/2, startY - length, 6, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawStripedTail(x, y, baseColor, stripeColor) {
        // Main tail
        this.ctx.fillStyle = baseColor;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 12, 28, Math.PI / 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Stripes
        this.ctx.fillStyle = stripeColor;
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            this.ctx.ellipse(x - 2, y - 20 + i * 8, 10, 3, Math.PI / 6, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawDetailedPaw(x, y, color) {
        // Main paw
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 8, 6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Paw pads
        this.ctx.fillStyle = this.darkenColor(color, 0.4);
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 2, 4, 3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Toe pads
        this.ctx.beginPath();
        this.ctx.ellipse(x - 4, y, 2, 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.ellipse(x + 4, y, 2, 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSpikeyHair(x, y, color) {
        this.ctx.fillStyle = color;
        
        // Main hair mass
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 20, 12, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Spikes
        const spikes = [
            [x - 15, y - 8], [x - 8, y - 12], [x, y - 14], [x + 8, y - 12], [x + 15, y - 8]
        ];
        
        spikes.forEach(spike => {
            this.ctx.beginPath();
            this.ctx.moveTo(spike[0], spike[1] + 8);
            this.ctx.lineTo(spike[0] - 4, spike[1]);
            this.ctx.lineTo(spike[0] + 4, spike[1]);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    drawPokeball(x, y) {
        // Red top
        this.ctx.fillStyle = '#FF0000';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, Math.PI, 0, false);
        this.ctx.fill();
        
        // White bottom
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, Math.PI, false);
        this.ctx.fill();
        
        // Center line
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x - 8, y);
        this.ctx.lineTo(x + 8, y);
        this.ctx.stroke();
        
        // Center button
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    addFireAura() {
        // Fire particles
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 45 + Math.random() * 10;
            const x = 64 + Math.cos(angle) * distance;
            const y = 64 + Math.sin(angle) * distance;
            
            const size = 3 + Math.random() * 4;
            const alpha = 0.3 + Math.random() * 0.4;
            
            this.ctx.fillStyle = `rgba(255, 107, 53, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    addNatureElements() {
        // Small leaves
        const leaves = [
            [20, 30], [108, 35], [15, 80], [110, 85]
        ];
        
        leaves.forEach(leaf => {
            this.ctx.fillStyle = '#228B22';
            this.ctx.beginPath();
            this.ctx.ellipse(leaf[0], leaf[1], 4, 6, Math.PI / 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    darkenColor(color, factor) {
        // Simple color darkening
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * (1 - factor));
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * (1 - factor));
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * (1 - factor));
        
        return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    }
}

// Generate ultra-high quality assets
const UltraAssets = {
    creatures: {},
    characters: {},
    
    init() {
        const generator = new UltraAssetGenerator();
        
        // Generate professional quality sprites
        this.creatures.kitsune = generator.createProfessionalKitsune();
        this.creatures.tanuki = generator.createProfessionalTanuki();
        this.characters.player = generator.createProfessionalPlayer();
        
        console.log('Ultra-high quality assets generated!');
    }
};

// Initialize
if (typeof document !== 'undefined') {
    UltraAssets.init();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UltraAssets, UltraAssetGenerator };
}
