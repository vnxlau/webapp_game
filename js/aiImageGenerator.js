// AI Image Generation Service Integration
// This module can integrate with various AI services when API keys are provided

class AIImageGenerator {
    constructor() {
        this.services = {
            openai: {
                name: 'OpenAI DALL-E',
                endpoint: 'https://api.openai.com/v1/images/generations',
                apiKey: null,
                available: false
            },
            stability: {
                name: 'Stability AI',
                endpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
                apiKey: null,
                available: false
            },
            replicate: {
                name: 'Replicate',
                endpoint: 'https://api.replicate.com/v1/predictions',
                apiKey: null,
                available: false
            }
        };
        
        this.prompts = this.getGamePrompts();
    }

    // Set API keys (call this with your actual keys)
    setAPIKey(service, apiKey) {
        if (this.services[service]) {
            this.services[service].apiKey = apiKey;
            this.services[service].available = true;
            console.log(`${this.services[service].name} API key set successfully`);
        } else {
            console.error(`Unknown service: ${service}`);
        }
    }

    // Generate image using OpenAI DALL-E
    async generateWithDALLE(prompt, size = '512x512') {
        if (!this.services.openai.available) {
            throw new Error('OpenAI API key not set. Call setAPIKey("openai", "your-api-key") first');
        }

        const response = await fetch(this.services.openai.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.services.openai.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: size,
                response_format: 'url'
            })
        });

        if (!response.ok) {
            throw new Error(`DALL-E API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data[0].url;
    }

    // Generate image using Stability AI
    async generateWithStability(prompt) {
        if (!this.services.stability.available) {
            throw new Error('Stability AI API key not set. Call setAPIKey("stability", "your-api-key") first');
        }

        const formData = new FormData();
        formData.append('text_prompts[0][text]', prompt);
        formData.append('text_prompts[0][weight]', '1');
        formData.append('cfg_scale', '7');
        formData.append('height', '512');
        formData.append('width', '512');
        formData.append('samples', '1');
        formData.append('steps', '30');

        const response = await fetch(this.services.stability.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.services.stability.apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Stability AI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return `data:image/png;base64,${data.artifacts[0].base64}`;
    }

    // Generate all game assets
    async generateAllAssets(service = 'openai', onProgress = null) {
        const results = {
            creatures: {},
            characters: {},
            buildings: {},
            errors: []
        };

        const totalAssets = Object.keys(this.prompts.creatures).length + 
                           Object.keys(this.prompts.characters).length + 
                           Object.keys(this.prompts.buildings).length;
        
        let completed = 0;

        // Generate creatures
        for (const [name, prompt] of Object.entries(this.prompts.creatures)) {
            try {
                if (onProgress) onProgress(`Generating ${name}...`, completed, totalAssets);
                
                const imageUrl = await this.generateImage(prompt, service);
                results.creatures[name] = imageUrl;
                
                completed++;
                if (onProgress) onProgress(`Generated ${name}`, completed, totalAssets);
                
                // Add delay to respect rate limits
                await this.delay(1000);
                
            } catch (error) {
                console.error(`Failed to generate ${name}:`, error);
                results.errors.push(`${name}: ${error.message}`);
            }
        }

        // Generate characters
        for (const [name, prompt] of Object.entries(this.prompts.characters)) {
            try {
                if (onProgress) onProgress(`Generating ${name}...`, completed, totalAssets);
                
                const imageUrl = await this.generateImage(prompt, service);
                results.characters[name] = imageUrl;
                
                completed++;
                if (onProgress) onProgress(`Generated ${name}`, completed, totalAssets);
                await this.delay(1000);
                
            } catch (error) {
                console.error(`Failed to generate ${name}:`, error);
                results.errors.push(`${name}: ${error.message}`);
            }
        }

        // Generate buildings
        for (const [name, prompt] of Object.entries(this.prompts.buildings)) {
            try {
                if (onProgress) onProgress(`Generating ${name}...`, completed, totalAssets);
                
                const imageUrl = await this.generateImage(prompt, service);
                results.buildings[name] = imageUrl;
                
                completed++;
                if (onProgress) onProgress(`Generated ${name}`, completed, totalAssets);
                await this.delay(1000);
                
            } catch (error) {
                console.error(`Failed to generate ${name}:`, error);
                results.errors.push(`${name}: ${error.message}`);
            }
        }

        return results;
    }

    // Generate single image
    async generateImage(prompt, service = 'openai') {
        switch (service) {
            case 'openai':
                return await this.generateWithDALLE(prompt);
            case 'stability':
                return await this.generateWithStability(prompt);
            default:
                throw new Error(`Unsupported service: ${service}`);
        }
    }

    // Helper method for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get all prompts for the game
    getGamePrompts() {
        return {
            creatures: {
                kitsune: "64x64 pixel art sprite, cute Japanese kitsune fox spirit, orange and red fur, multiple tails with white tips, Studio Ghibli style, kawaii, fire element markings, front-facing view, transparent background, game sprite",
                tanuki: "64x64 pixel art sprite, adorable Japanese tanuki raccoon dog, brown fur with dark face mask, round belly, striped tail, Studio Ghibli style, kawaii, mischievous expression, front-facing view, transparent background, game sprite",
                kodama: "64x64 pixel art sprite, mystical Japanese kodama tree spirit, pale white body, wooden texture, simple dot eyes, peaceful expression, grass element, Studio Ghibli style, kawaii, front-facing view, transparent background, game sprite",
                neko: "64x64 pixel art sprite, cute Japanese spirit cat, fluffy fur, large green eyes, pointed ears, graceful posture, Studio Ghibli style, kawaii, magical aura, front-facing view, transparent background, game sprite",
                karasu: "64x64 pixel art sprite, mystical Japanese karasu crow, black feathers with blue sheen, red glowing eyes, spread wings, dark element, Studio Ghibli style, kawaii but mysterious, front-facing view, transparent background, game sprite",
                ryu: "64x64 pixel art sprite, majestic Japanese ryu dragon, serpentine body, scales, small wings, horns, wise expression, dragon element, Studio Ghibli style, kawaii but powerful, front-facing view, transparent background, game sprite",
                oni: "64x64 pixel art sprite, cute Japanese oni demon, red or blue skin, small horns, fangs, muscular but kawaii, club weapon, dark element, Studio Ghibli style, friendly despite appearance, front-facing view, transparent background, game sprite",
                yukiOnna: "64x64 pixel art sprite, ethereal Japanese yuki-onna snow woman, pale white skin, long black hair, flowing white kimono, ice element, Studio Ghibli style, kawaii but mysterious, front-facing view, transparent background, game sprite",
                phoenix: "64x64 pixel art sprite, majestic Japanese phoenix, brilliant red and gold feathers, fire crest, spread wings, fire element, Studio Ghibli style, kawaii but noble, front-facing view, transparent background, game sprite",
                leviathan: "64x64 pixel art sprite, Japanese sea dragon leviathan, blue scales, aquatic fins, serpentine body, water element, Studio Ghibli style, kawaii but powerful, front-facing view, transparent background, game sprite"
            },
            characters: {
                player: "64x64 pixel art sprite, young Pokemon trainer, anime style, Japanese character, red jacket, blue shirt, determined expression, backpack, Pokeball on belt, Studio Ghibli style, kawaii, front-facing view, transparent background, game sprite",
                elder: "64x64 pixel art sprite, wise Japanese village elder, long white beard, purple robes, wooden staff with golden ornament, kind expression, Studio Ghibli style, kawaii, front-facing view, transparent background, game sprite",
                merchant: "64x64 pixel art sprite, friendly Japanese merchant, green hat, golden vest, money pouch, mustache, cheerful expression, Studio Ghibli style, kawaii, front-facing view, transparent background, game sprite",
                healer: "64x64 pixel art sprite, kind Japanese healer, white uniform with red cross, pink hair, caring expression, medical bag, Studio Ghibli style, kawaii, front-facing view, transparent background, game sprite"
            },
            buildings: {
                shrine: "64x64 pixel art sprite, traditional Japanese shrine, red curved roof, wooden pillars, stone base, torii gate elements, Studio Ghibli style, detailed architecture, top-down view, transparent background, game building sprite",
                dojo: "64x64 pixel art sprite, traditional Japanese dojo training hall, wooden structure, paper windows, training sign, martial arts building, Studio Ghibli style, detailed architecture, top-down view, transparent background, game building sprite",
                house: "64x64 pixel art sprite, traditional Japanese house, thatched or tile roof, wooden walls, paper windows, garden elements, Studio Ghibli style, cozy home, top-down view, transparent background, game building sprite",
                shop: "64x64 pixel art sprite, traditional Japanese shop, colorful awning, display windows, merchant sign, market stall elements, Studio Ghibli style, busy commercial building, top-down view, transparent background, game building sprite",
                temple: "64x64 pixel art sprite, grand Japanese temple, multiple tiers, ornate roof, large pillars, ceremonial architecture, Studio Ghibli style, majestic religious building, top-down view, transparent background, game building sprite",
                pagoda: "64x64 pixel art sprite, traditional Japanese pagoda, multiple story tower, curved roofs, wooden spire, Buddhist architecture, Studio Ghibli style, detailed tower, top-down view, transparent background, game building sprite"
            }
        };
    }

    // Create a download function for generated images
    async downloadImage(url, filename) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }

    // Replace game assets with generated images
    replaceGameAssets(generatedAssets) {
        // This would replace the current StaticAssets with AI-generated ones
        if (window.StaticAssets) {
            Object.assign(window.StaticAssets.creatures, generatedAssets.creatures);
            Object.assign(window.StaticAssets.npcs, generatedAssets.characters);
            Object.assign(window.StaticAssets.buildings, generatedAssets.buildings);
            
            console.log('Game assets replaced with AI-generated images!');
            
            // Trigger game refresh if needed
            if (window.gameEngine && window.gameEngine.renderer) {
                window.gameEngine.renderer.invalidateCache();
            }
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIImageGenerator;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.AIImageGenerator = AIImageGenerator;
}
