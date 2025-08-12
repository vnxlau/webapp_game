# Pokemon RPG: Web Edition

A web-based Pokemon-inspired RPG featuring procedural world generation, creature collection, and turn-based battles.

## 🎮 Features

### 🌍 **Procedural World Generation**
- **Dynamic Biomes**: Forest, Grassland, Desert, Mountain, Water, Volcanic, Ice, Jungle, Swamp, Tundra
- **Height-based Terrain**: Mountains, valleys, and water bodies
- **Climate System**: Temperature and moisture affect biome distribution
- **Points of Interest**: Towns, dungeons, shrines, caves, and ruins
- **Infinite Exploration**: 100x100 tile world with varied landscapes

### 🐾 **Creature Collection System**
- **30+ Unique Creatures** across 12 element types
- **Evolution System**: Creatures evolve at specific levels
- **Type Effectiveness**: Strategic combat with strengths/weaknesses
- **Rarity System**: Common, Uncommon, Rare creatures
- **Habitat-based Spawning**: Different creatures in different biomes

### ⚔️ **Battle System**
- **Turn-based Combat** with speed-based turn order
- **Type Advantage System** (Fire > Grass > Water > Fire, etc.)
- **Capture Mechanics**: Lower health = higher capture chance
- **Experience & Leveling**: Both player and creatures gain XP
- **Strategic Depth**: Attack, Capture, Switch, or Run

### 📊 **Progression Systems**
- **Player Levels**: Gain experience through battles and exploration
- **Collector Ranks**: Novice → Master based on unique captures
- **Statistics Tracking**: Steps, battles, captures, play time
- **Achievement System**: Progress tracking for various milestones

### 🎨 **Visual Features**
- **HTML5 Canvas Rendering** with smooth animations
- **Animated Biomes**: Water waves, volcanic bubbles, grass movement
- **Mini-map**: Real-time world overview
- **Responsive UI**: Works on desktop and mobile devices
- **Type-colored Creatures**: Visual type identification

## 🕹️ **Controls**

### **Movement**
- **WASD** or **Arrow Keys**: Move player
- **Mouse**: Click movement buttons

### **Actions**
- **Space/Enter**: Explore current location
- **C**: Open creature collection
- **M**: Open world map
- **Escape**: Close modals

### **Battle**
- **Click buttons** or use interface for battle actions
- Attack, Capture, Switch, Run options available

## 🚀 **Quick Start**

1. **Open `index.html`** in a modern web browser
2. **Wait for world generation** (2-3 seconds)
3. **Start exploring** with your starter creature
4. **Battle wild creatures** to gain experience
5. **Capture creatures** to build your collection
6. **Visit towns** to heal your team
7. **Explore dungeons** for rare encounters

## 🏗️ **Technical Details**

### **Architecture**
- **Modular Design**: Separate systems for world, creatures, battles, rendering
- **Event-driven**: Responsive UI with real-time updates
- **Save System**: Local storage for game persistence
- **Performance Optimized**: Efficient rendering and memory management

### **File Structure**
```
├── index.html              # Main game page
├── css/
│   └── styles.css          # Complete game styling
└── js/
    ├── utils.js            # Utility functions and helpers
    ├── worldGenerator.js   # Procedural world generation
    ├── gameData.js         # Game configuration and data
    ├── creatures.js        # Creature system and collection
    ├── player.js           # Player management and inventory
    ├── battle.js           # Turn-based battle system
    ├── worldRenderer.js    # Canvas rendering engine
    ├── gameEngine.js       # Main game coordination
    └── main.js             # Game initialization
```

### **Technologies Used**
- **HTML5 Canvas**: 2D graphics rendering
- **Vanilla JavaScript**: No external dependencies
- **CSS3**: Modern styling with animations
- **Local Storage**: Game save persistence
- **Web APIs**: RequestAnimationFrame, etc.

## 🎯 **Game Mechanics**

### **Element Types & Effectiveness**
| Type | Strong Against | Weak Against |
|------|---------------|--------------|
| 🔥 Fire | Grass, Ice | Water, Ground, Rock |
| 💧 Water | Fire, Ground, Rock | Grass, Electric |
| 🌿 Grass | Water, Ground, Rock | Fire, Ice, Poison, Flying |
| ⚡ Electric | Water, Flying | Ground |
| ❄️ Ice | Grass, Ground, Flying | Fire, Fighting, Rock |
| 🌍 Ground | Fire, Electric, Poison, Rock | Water, Grass, Ice |
| 🗿 Rock | Fire, Ice, Flying | Water, Grass, Fighting, Ground |
| 🦅 Flying | Grass, Fighting | Electric, Ice, Rock |
| ☠️ Poison | Grass | Ground, Psychic |
| 🔮 Psychic | Fighting, Poison | - |
| 👊 Fighting | Normal, Rock, Ice | Flying, Psychic |
| ⚪ Normal | - | Fighting |

### **Biome-Creature Relationships**
- **Forest**: Grass, Normal, Poison types
- **Desert**: Ground, Fire, Normal types
- **Water**: Water types
- **Mountain**: Rock, Ground, Fighting types
- **Volcanic**: Fire, Rock types
- **Ice/Tundra**: Ice, Normal types
- **Jungle**: Grass, Poison, Flying types
- **Swamp**: Poison, Water, Grass types

### **Progression Milestones**
- **Level 10**: Access to evolved creatures
- **25 Unique Species**: Collector rank
- **50 Unique Species**: Advanced Collector
- **75 Unique Species**: Expert Collector
- **100 Unique Species**: Master Collector

## 🔧 **Customization**

### **Easy Modifications**
- **World Size**: Change in `GameData.config.worldSize`
- **Encounter Rates**: Modify `baseEncounterRate`
- **New Creatures**: Add to `GameData.creatureTemplates`
- **Biome Colors**: Update in world generator
- **UI Themes**: Modify CSS variables

### **Adding Content**
1. **New Creatures**: Define in `gameData.js`
2. **New Biomes**: Add to world generator
3. **New Features**: Extend game engine
4. **Visual Assets**: Replace emoji with sprites

## 💾 **Save System**

- **Auto-save**: Every 30 seconds
- **Manual Save**: On page close
- **Save Data**: Player progress, world state, creature collection
- **Cross-session**: Resume exactly where you left off

## 🐛 **Browser Compatibility**

- **Chrome**: ✅ Fully supported
- **Firefox**: ✅ Fully supported
- **Safari**: ✅ Supported
- **Edge**: ✅ Supported
- **Mobile**: ✅ Touch-friendly interface

## 🎓 **Learning Features**

This project demonstrates:
- **Procedural Generation**: Noise-based terrain generation
- **Game State Management**: Complex state transitions
- **Canvas Rendering**: Efficient 2D graphics
- **Data Structures**: Object-oriented game design
- **Algorithm Implementation**: Pathfinding, probability, etc.

## 🔮 **Future Enhancements**

- **Multiplayer**: Online battles and trading
- **Sound System**: Music and effects
- **Sprite Graphics**: Replace emoji with pixel art
- **Quest System**: Structured objectives
- **Day/Night Cycle**: Time-based gameplay
- **Weather System**: Dynamic environmental effects
- **Breeding System**: Creature genetics
- **Items & Equipment**: Battle enhancements

## 🏆 **Credits**

Inspired by the Pokemon series by Nintendo/Game Freak.
Built with love for web gaming and procedural generation.

---

**Ready to become the ultimate creature collector? Start your adventure now!** 🚀
