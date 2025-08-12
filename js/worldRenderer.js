// World renderer - handles drawing the game world

class WorldRenderer {
    constructor(canvas, world) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.world = world;
        this.tileSize = 16; // Higher resolution - smaller tiles
        this.viewWidth = Math.ceil(canvas.width / this.tileSize);
        this.viewHeight = Math.ceil(canvas.height / this.tileSize);
        
        // Cache for rendered tiles
        this.tileCache = new Map();
        
        // Creature encounter visual effects
        this.encounterEffects = [];
        this.sparkleParticles = [];
        
        // Smooth camera for less laggy movement
        this.camera = { x: 0, y: 0 };
        this.targetCamera = { x: 0, y: 0 };
        this.cameraLerpSpeed = 0.1;
        
        this.animationTime = 0;
        
        // Load static assets instead of runtime generation
        this.loadedImages = new Map();
        this.loadAssets();
    }

    async loadAssets() {
        // Load building sprites from static assets
        const buildings = ['house', 'inn', 'shop', 'temple', 'tower', 'windmill', 'lighthouse', 'dojo', 'garden', 'bridge', 'dungeon', 'shrine', 'cave', 'ruins'];
        
        for (const building of buildings) {
            const img = new Image();
            img.onload = () => {
                this.loadedImages.set(`building_${building}`, img);
            };
            if (StaticAssets && StaticAssets.buildings && StaticAssets.buildings[building]) {
                img.src = StaticAssets.buildings[building];
            }
        }
    }

    render(world, player, deltaTime) {
        this.animationTime += deltaTime;
        
        // Update smooth camera
        this.updateCamera(player);
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Test pattern to ensure canvas is working
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(0, 0, 50, 50);
        
        // Center camera on player
        this.centerCameraOnPlayer(player, world);
        
        // Render world tiles
        this.renderWorld(world);
        
        // Render POIs
        this.renderPOIs(world);
        
        // Render player
        this.renderPlayer(player);
        
        // Render UI overlays
        this.renderMiniMap(world, player);
        
        // Render encounter effects and particles
        this.renderEncounterEffects(deltaTime);
        this.renderSparkleParticles(deltaTime);
    }

    updateCamera(player) {
        // Set target camera position
        this.targetCamera.x = player.worldX * this.tileSize - this.canvas.width / 2;
        this.targetCamera.y = player.worldY * this.tileSize - this.canvas.height / 2;
        
        // Smooth camera interpolation for less laggy movement
        this.camera.x += (this.targetCamera.x - this.camera.x) * this.cameraLerpSpeed;
        this.camera.y += (this.targetCamera.y - this.camera.y) * this.cameraLerpSpeed;
    }

    centerCameraOnPlayer(player, world) {
        // Use smooth camera positions with bounds checking
        this.cameraX = Utils.clamp(
            Math.floor(this.camera.x / this.tileSize),
            0,
            Math.max(0, world.width - this.viewWidth)
        );
        
        this.cameraY = Utils.clamp(
            Math.floor(this.camera.y / this.tileSize),
            0,
            Math.max(0, world.height - this.viewHeight)
        );
    }

    renderWorld(world) {
        const startX = this.cameraX;
        const startY = this.cameraY;
        const endX = Math.min(startX + this.viewWidth, world.width);
        const endY = Math.min(startY + this.viewHeight, world.height);
        
        for (let worldY = startY; worldY < endY; worldY++) {
            for (let worldX = startX; worldX < endX; worldX++) {
                const screenX = (worldX - this.cameraX) * this.tileSize;
                const screenY = (worldY - this.cameraY) * this.tileSize;
                
                const biome = world.getBiomeAt(worldX, worldY);
                if (biome) {
                    this.renderTile(screenX, screenY, biome, worldX, worldY);
                } else {
                    // Fallback for missing biome
                    this.ctx.fillStyle = '#9ACD32'; // Grassland green
                    this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                }
            }
        }
    }

    renderTile(x, y, biome, worldX, worldY) {
        // Base tile color
        this.ctx.fillStyle = biome.color;
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        
        // Add texture/pattern based on biome type
        this.addBiomeTexture(x, y, biome, worldX, worldY);
        
        // Add border for some biomes
        if (biome.type === 'water' || biome.type === 'mountain') {
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
        }
    }

    addBiomeTexture(x, y, biome, worldX, worldY) {
        const centerX = x + this.tileSize / 2;
        const centerY = y + this.tileSize / 2;
        
        this.ctx.save();
        
        switch (biome.type) {
            case 'forest':
                this.renderForestTexture(x, y, worldX, worldY);
                break;
            case 'jungle':
                this.renderJungleTexture(x, y, worldX, worldY);
                break;
            case 'desert':
                this.renderDesertTexture(x, y, worldX, worldY);
                break;
            case 'mountain':
                this.renderMountainTexture(x, y, worldX, worldY);
                break;
            case 'water':
                this.renderWaterTexture(x, y, worldX, worldY);
                break;
            case 'volcanic':
                this.renderVolcanicTexture(x, y, worldX, worldY);
                break;
            case 'ice':
                this.renderIceTexture(x, y, worldX, worldY);
                break;
            case 'grassland':
                this.renderGrasslandTexture(x, y, worldX, worldY);
                break;
            case 'swamp':
                this.renderSwampTexture(x, y, worldX, worldY);
                break;
            case 'tundra':
                this.renderTundraTexture(x, y, worldX, worldY);
                break;
        }
        
        this.ctx.restore();
    }

    renderForestTexture(x, y, worldX, worldY) {
        // Random trees
        if ((worldX + worldY) % 3 === 0) {
            this.ctx.fillStyle = '#1a5c1a';
            this.ctx.beginPath();
            this.ctx.arc(x + this.tileSize * 0.3, y + this.tileSize * 0.3, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
        if ((worldX * 2 + worldY) % 4 === 0) {
            this.ctx.fillStyle = '#0d4d0d';
            this.ctx.beginPath();
            this.ctx.arc(x + this.tileSize * 0.7, y + this.tileSize * 0.6, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderJungleTexture(x, y, worldX, worldY) {
        // Dense vegetation
        this.ctx.fillStyle = 'rgba(0, 80, 0, 0.6)';
        for (let i = 0; i < 3; i++) {
            const px = x + (worldX * i * 7) % this.tileSize;
            const py = y + (worldY * i * 11) % this.tileSize;
            this.ctx.fillRect(px, py, 2, 2);
        }
    }

    renderDesertTexture(x, y, worldX, worldY) {
        // Sand dunes pattern
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        const waveY = Math.sin((worldX + this.animationTime * 0.001) * 0.5) * 2;
        this.ctx.fillRect(x, y + this.tileSize / 2 + waveY, this.tileSize, 2);
    }

    renderMountainTexture(x, y, worldX, worldY) {
        // Rocky texture
        this.ctx.fillStyle = 'rgba(105, 105, 105, 0.8)';
        if ((worldX + worldY) % 2 === 0) {
            this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        }
    }

    renderWaterTexture(x, y, worldX, worldY) {
        // Animated water waves
        const time = this.animationTime * 0.002;
        const wave1 = Math.sin(worldX * 0.3 + time) * 0.2;
        const wave2 = Math.sin(worldY * 0.4 + time * 1.3) * 0.2;
        
        this.ctx.fillStyle = `rgba(70, 130, 180, ${0.3 + wave1 + wave2})`;
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }

    renderVolcanicTexture(x, y, worldX, worldY) {
        // Lava bubbles
        const time = this.animationTime * 0.003;
        if (Math.sin(worldX * worldY + time) > 0.8) {
            this.ctx.fillStyle = '#FF4500';
            this.ctx.beginPath();
            this.ctx.arc(x + this.tileSize / 2, y + this.tileSize / 2, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderIceTexture(x, y, worldX, worldY) {
        // Ice crystals
        this.ctx.strokeStyle = 'rgba(173, 216, 230, 0.8)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.tileSize * 0.2, y + this.tileSize * 0.2);
        this.ctx.lineTo(x + this.tileSize * 0.8, y + this.tileSize * 0.8);
        this.ctx.moveTo(x + this.tileSize * 0.8, y + this.tileSize * 0.2);
        this.ctx.lineTo(x + this.tileSize * 0.2, y + this.tileSize * 0.8);
        this.ctx.stroke();
    }

    renderGrasslandTexture(x, y, worldX, worldY) {
        // Grass blades
        this.ctx.strokeStyle = 'rgba(50, 150, 50, 0.6)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 2; i++) {
            const gx = x + (worldX * i * 13) % this.tileSize;
            const gy = y + this.tileSize - 2;
            this.ctx.beginPath();
            this.ctx.moveTo(gx, gy);
            this.ctx.lineTo(gx, gy - 4);
            this.ctx.stroke();
        }
    }

    renderSwampTexture(x, y, worldX, worldY) {
        // Murky water with bubbles
        this.ctx.fillStyle = 'rgba(85, 107, 47, 0.7)';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
        
        if ((worldX + worldY) % 5 === 0) {
            this.ctx.fillStyle = 'rgba(0, 100, 0, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(x + this.tileSize * 0.6, y + this.tileSize * 0.4, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderTundraTexture(x, y, worldX, worldY) {
        // Snow patches
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        if ((worldX * 3 + worldY * 2) % 4 === 0) {
            this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
        }
    }

    renderPOIs(world) {
        for (const poi of world.pois) {
            const screenX = (poi.x - this.cameraX) * this.tileSize;
            const screenY = (poi.y - this.cameraY) * this.tileSize;
            
            // Only render if in viewport
            if (screenX >= -this.tileSize && screenX < this.canvas.width &&
                screenY >= -this.tileSize && screenY < this.canvas.height) {
                this.renderPOI(screenX, screenY, poi);
            }
        }
    }

    renderPOI(x, y, poi) {
        const centerX = x + this.tileSize / 2;
        const centerY = y + this.tileSize / 2;
        
        this.ctx.save();
        
        // Try to use loaded static image first
        const buildingImg = this.loadedImages.get(`building_${poi.type}`);
        if (buildingImg && buildingImg.complete) {
            // Scale the 64x64 sprite to fit the tile
            this.ctx.drawImage(
                buildingImg, 
                x - this.tileSize, 
                y - this.tileSize * 2, 
                this.tileSize * 3, 
                this.tileSize * 3
            );
        } else {
            // Fallback to emoji icons
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fillRect(x + 2, y + 2, this.tileSize - 4, this.tileSize - 4);
            
            this.ctx.fillStyle = '#333';
            this.ctx.font = `${this.tileSize - 4}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const icons = {
                'town': '🏘️',
                'dungeon': '🏰',
                'shrine': '⛩️',
                'cave': '🕳️',
                'ruins': '🏛️',
                'house': '🏠',
                'inn': '🏨',
                'shop': '🏪',
                'temple': '⛩️',
                'tower': '🗼',
                'windmill': '🏭',
                'lighthouse': '🗼',
                'dojo': '🥋',
                'garden': '🌸',
                'bridge': '🌉'
            };
            
            const icon = icons[poi.type] || '❓';
            this.ctx.fillText(icon, centerX, centerY);
        }
        
        this.ctx.restore();
    }

    renderPlayer(player) {
        const screenX = (player.worldX - this.cameraX) * this.tileSize;
        const screenY = (player.worldY - this.cameraY) * this.tileSize;
        const centerX = screenX + this.tileSize / 2;
        const centerY = screenY + this.tileSize / 2;
        
        this.ctx.save();
        
        // Player shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY + this.tileSize * 0.3, this.tileSize * 0.3, this.tileSize * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Player character (simple animated sprite)
        const bobOffset = Math.sin(this.animationTime * 0.005) * 2;
        
        // Body
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.fillRect(centerX - 6, centerY - 8 + bobOffset, 12, 16);
        
        // Head
        this.ctx.fillStyle = '#F5C6A0';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - 12 + bobOffset, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Hat
        this.ctx.fillStyle = '#E74C3C';
        this.ctx.fillRect(centerX - 8, centerY - 18 + bobOffset, 16, 6);
        
        this.ctx.restore();
    }

    renderMiniMap(world, player) {
        const miniMapSize = 120;
        const miniMapX = this.canvas.width - miniMapSize - 10;
        const miniMapY = 10;
        
        this.ctx.save();
        
        // Mini map background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(miniMapX, miniMapY, miniMapSize, miniMapSize);
        
        // Mini map border
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(miniMapX, miniMapY, miniMapSize, miniMapSize);
        
        // Calculate scale
        const scale = miniMapSize / Math.max(world.width, world.height);
        
        // Render world overview
        const pixelSize = Math.max(1, scale);
        for (let y = 0; y < world.height; y += 2) {
            for (let x = 0; x < world.width; x += 2) {
                const biome = world.getBiomeAt(x, y);
                if (biome) {
                    this.ctx.fillStyle = biome.color;
                    this.ctx.fillRect(
                        miniMapX + x * scale,
                        miniMapY + y * scale,
                        pixelSize,
                        pixelSize
                    );
                }
            }
        }
        
        // Player position
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(
            miniMapX + player.worldX * scale,
            miniMapY + player.worldY * scale,
            3,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.restore();
    }

    // Convert screen coordinates to world coordinates
    screenToWorld(screenX, screenY) {
        const worldX = Math.floor(screenX / this.tileSize) + this.cameraX;
        const worldY = Math.floor(screenY / this.tileSize) + this.cameraY;
        return { x: worldX, y: worldY };
    }

    // Convert world coordinates to screen coordinates
    worldToScreen(worldX, worldY) {
        const screenX = (worldX - this.cameraX) * this.tileSize;
        const screenY = (worldY - this.cameraY) * this.tileSize;
        return { x: screenX, y: screenY };
    }

    // Creature encounter visual effects
    triggerCreatureEncounter(worldX, worldY) {
        const screenPos = this.worldToScreen(worldX, worldY);
        
        // Add sparkle effect at encounter location
        for (let i = 0; i < 10; i++) {
            this.sparkleParticles.push({
                x: screenPos.x + this.tileSize / 2 + (Math.random() - 0.5) * this.tileSize,
                y: screenPos.y + this.tileSize / 2 + (Math.random() - 0.5) * this.tileSize,
                life: 1.0,
                maxLife: 1.0,
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 60 + 40}, 80%, 70%)`
            });
        }

        // Add encounter ring effect
        this.encounterEffects.push({
            x: screenPos.x + this.tileSize / 2,
            y: screenPos.y + this.tileSize / 2,
            radius: 0,
            maxRadius: this.tileSize * 2,
            life: 1.0,
            maxLife: 1.0
        });
    }

    renderEncounterEffects(deltaTime) {
        this.ctx.save();
        
        for (let i = this.encounterEffects.length - 1; i >= 0; i--) {
            const effect = this.encounterEffects[i];
            
            effect.life -= deltaTime * 2; // Effect lasts 0.5 seconds
            effect.radius = (1 - effect.life / effect.maxLife) * effect.maxRadius;
            
            if (effect.life <= 0) {
                this.encounterEffects.splice(i, 1);
                continue;
            }
            
            // Draw pulsing ring
            const alpha = effect.life / effect.maxLife;
            this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.8})`;
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
        
        this.ctx.restore();
    }

    renderSparkleParticles(deltaTime) {
        this.ctx.save();
        
        for (let i = this.sparkleParticles.length - 1; i >= 0; i--) {
            const particle = this.sparkleParticles[i];
            
            particle.life -= deltaTime * 2;
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.velocity.y += 0.1; // Gravity
            
            if (particle.life <= 0) {
                this.sparkleParticles.splice(i, 1);
                continue;
            }
            
            // Draw sparkle
            const alpha = particle.life / particle.maxLife;
            const size = particle.size * alpha;
            
            this.ctx.fillStyle = particle.color.replace('70%', `${70 * alpha}%`);
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add sparkle cross
            this.ctx.strokeStyle = particle.color.replace('70%', `${90 * alpha}%`);
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x - size, particle.y);
            this.ctx.lineTo(particle.x + size, particle.y);
            this.ctx.moveTo(particle.x, particle.y - size);
            this.ctx.lineTo(particle.x, particle.y + size);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
}
