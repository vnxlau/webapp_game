// Utility functions for the game

class Utils {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }

    static getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Noise function for world generation
    static noise(x, y) {
        let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        return (n - Math.floor(n));
    }

    // Perlin-like noise for more natural terrain
    static perlinNoise(x, y, scale = 1) {
        x *= scale;
        y *= scale;
        
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = x - xi;
        const yf = y - yi;
        
        const a = this.noise(xi, yi);
        const b = this.noise(xi + 1, yi);
        const c = this.noise(xi, yi + 1);
        const d = this.noise(xi + 1, yi + 1);
        
        const u = this.smoothstep(xf);
        const v = this.smoothstep(yf);
        
        return this.lerp(
            this.lerp(a, b, u),
            this.lerp(c, d, u),
            v
        );
    }

    static smoothstep(t) {
        return t * t * (3 - 2 * t);
    }

    // Generate height map for terrain
    static generateHeightMap(width, height, octaves = 4) {
        const heightMap = [];
        
        for (let y = 0; y < height; y++) {
            heightMap[y] = [];
            for (let x = 0; x < width; x++) {
                let value = 0;
                let amplitude = 1;
                let frequency = 0.01;
                
                for (let i = 0; i < octaves; i++) {
                    value += this.perlinNoise(x, y, frequency) * amplitude;
                    amplitude *= 0.5;
                    frequency *= 2;
                }
                
                heightMap[y][x] = this.clamp(value, 0, 1);
            }
        }
        
        return heightMap;
    }

    // Color interpolation
    static interpolateColor(color1, color2, factor) {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        const r = Math.round(this.lerp(r1, r2, factor));
        const g = Math.round(this.lerp(g1, g2, factor));
        const b = Math.round(this.lerp(b1, b2, factor));
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Local storage helpers
    static saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            return false;
        }
    }

    static loadFromStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            return defaultValue;
        }
    }

    static removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
            return false;
        }
    }

    // Event helpers
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}
