export interface Creature {
  id: string;
  name: string;
  type: 'fish' | 'mammal' | 'cephalopod' | 'crustacean' | 'cnidarian' | 'other';
  size: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  minDepth: number;
  maxDepth: number;
  hasBioluminescence: boolean;
  hasEyes: boolean;
  hasTentacles: boolean;
  tentacleCount?: number;
  behavior: string;
}

export interface OceanZone {
  id: string;
  name: string;
  depthStart: number;
  depthEnd: number;
  description: string;
  lightLevel: string;
  pressure: string;
  backgroundColor: string;
  creatures: Creature[];
}

export const oceanZones: OceanZone[] = [
  {
    id: 'sunlight',
    name: 'Sunlight Zone',
    depthStart: 0,
    depthEnd: 200,
    description: 'Bright, warm waters where most marine life thrives',
    lightLevel: '100% sunlight',
    pressure: '1-20 ATM',
    backgroundColor: 'from-sky-300 via-blue-400 to-blue-600',
    creatures: [
      {
        id: 'dolphin',
        name: 'Bottlenose Dolphin',
        type: 'mammal',
        size: 'large',
        minDepth: 0,
        maxDepth: 200,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Playful swimming and jumping'
      },
      {
        id: 'clownfish',
        name: 'Clownfish',
        type: 'fish',
        size: 'small',
        minDepth: 0,
        maxDepth: 50,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Darting between coral'
      },
      {
        id: 'sea-turtle',
        name: 'Green Sea Turtle',
        type: 'other',
        size: 'large',
        minDepth: 0,
        maxDepth: 150,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Graceful gliding'
      },
      {
        id: 'jellyfish-surface',
        name: 'Moon Jellyfish',
        type: 'cnidarian',
        size: 'medium',
        minDepth: 0,
        maxDepth: 100,
        hasBioluminescence: false,
        hasEyes: false,
        hasTentacles: true,
        tentacleCount: 4,
        behavior: 'Pulsing movement'
      }
    ]
  },
  {
    id: 'twilight',
    name: 'Twilight Zone',
    depthStart: 200,
    depthEnd: 1000,
    description: 'Dimly lit waters where bioluminescence begins',
    lightLevel: '1% sunlight',
    pressure: '20-100 ATM',
    backgroundColor: 'from-blue-600 via-blue-800 to-gray-900',
    creatures: [
      {
        id: 'lanternfish',
        name: 'Lanternfish',
        type: 'fish',
        size: 'small',
        minDepth: 200,
        maxDepth: 800,
        hasBioluminescence: true,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Schooling with light patterns'
      },
      {
        id: 'vampire-squid',
        name: 'Vampire Squid',
        type: 'cephalopod',
        size: 'medium',
        minDepth: 300,
        maxDepth: 900,
        hasBioluminescence: true,
        hasEyes: true,
        hasTentacles: true,
        tentacleCount: 8,
        behavior: 'Slow, graceful movement'
      },
      {
        id: 'hatchetfish',
        name: 'Hatchetfish',
        type: 'fish',
        size: 'small',
        minDepth: 200,
        maxDepth: 1000,
        hasBioluminescence: true,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Counter-illumination camouflage'
      }
    ]
  },
  {
    id: 'midnight',
    name: 'Midnight Zone',
    depthStart: 1000,
    depthEnd: 4000,
    description: 'Complete darkness with extreme pressure',
    lightLevel: '0% sunlight',
    pressure: '100-400 ATM',
    backgroundColor: 'from-gray-900 via-black to-black',
    creatures: [
      {
        id: 'anglerfish',
        name: 'Deep Sea Anglerfish',
        type: 'fish',
        size: 'medium',
        minDepth: 1000,
        maxDepth: 3000,
        hasBioluminescence: true,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Ambush predator with lure'
      },
      {
        id: 'giant-isopod',
        name: 'Giant Isopod',
        type: 'crustacean',
        size: 'large',
        minDepth: 500,
        maxDepth: 2000,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Slow scavenging'
      },
      {
        id: 'gulper-eel',
        name: 'Gulper Eel',
        type: 'fish',
        size: 'large',
        minDepth: 1500,
        maxDepth: 3500,
        hasBioluminescence: true,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Expanding jaw to catch prey'
      }
    ]
  },
  {
    id: 'abyssal',
    name: 'Abyssal Zone',
    depthStart: 4000,
    depthEnd: 6000,
    description: 'Near-freezing waters of the deep ocean floor',
    lightLevel: 'Only bioluminescence',
    pressure: '400-600 ATM',
    backgroundColor: 'from-black via-gray-900 to-black',
    creatures: [
      {
        id: 'dumbo-octopus',
        name: 'Dumbo Octopus',
        type: 'cephalopod',
        size: 'medium',
        minDepth: 3000,
        maxDepth: 6000,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: true,
        tentacleCount: 8,
        behavior: 'Ear-like fin flapping'
      },
      {
        id: 'sea-pig',
        name: 'Sea Pig',
        type: 'other',
        size: 'small',
        minDepth: 4000,
        maxDepth: 6000,
        hasBioluminescence: false,
        hasEyes: false,
        hasTentacles: false,
        behavior: 'Walking on seafloor in herds'
      },
      {
        id: 'tripod-fish',
        name: 'Tripod Fish',
        type: 'fish',
        size: 'medium',
        minDepth: 4500,
        maxDepth: 6000,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Standing on elongated fins'
      }
    ]
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    depthStart: 6000,
    depthEnd: 11000,
    description: 'The deepest ocean trenches where life barely exists',
    lightLevel: 'Complete darkness',
    pressure: '600-1100 ATM',
    backgroundColor: 'from-black via-purple-900 to-black',
    creatures: [
      {
        id: 'hadal-snailfish',
        name: 'Hadal Snailfish',
        type: 'fish',
        size: 'small',
        minDepth: 6000,
        maxDepth: 8200,
        hasBioluminescence: false,
        hasEyes: true,
        hasTentacles: false,
        behavior: 'Slow, energy-conserving movement'
      },
      {
        id: 'amphipod',
        name: 'Hirondellea Amphipod',
        type: 'crustacean',
        size: 'tiny',
        minDepth: 6000,
        maxDepth: 11000,
        hasBioluminescence: false,
        hasEyes: false,
        hasTentacles: false,
        behavior: 'Scavenging in trenches'
      },
      {
        id: 'xenophyophore',
        name: 'Xenophyophore',
        type: 'other',
        size: 'large',
        minDepth: 4000,
        maxDepth: 10500,
        hasBioluminescence: false,
        hasEyes: false,
        hasTentacles: false,
        behavior: 'Stationary filter feeding'
      }
    ]
  }
];