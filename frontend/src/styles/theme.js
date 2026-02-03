// RepoCity 3D - Cyberpunk Design System
// Designer: Khun Art

export const theme = {
  colors: {
    // High-energy accents for interaction and status
    neon: {
      pink: '#FF2A6D', // Main accent / Critical errors / "Hot" repos
      cyan: '#05D9E8', // Info / Active states / Tech overlays
      lime: '#39FF14', // Success / Stable builds / High health
      yellow: '#FAFF00', // Warnings / Notices
    },
    
    // Base structural colors (Metals & Concrete)
    base: {
      void: '#000000',      // Deepest background
      metalDark: '#0B0C10', // Main background / Floor
      metalMid: '#1F2833',  // Panels / Secondary containers
      metalLight: '#C5C6C7', // Text / Inactive elements
    },
    
    // Atmospheric effects
    atmosphere: {
      fog: 'rgba(5, 217, 232, 0.15)', // Cyan tint fog
      grid: 'rgba(255, 42, 109, 0.2)', // Pink grid lines
      shadow: 'rgba(0, 0, 0, 0.8)',
    },

    // Semantic mappings
    text: {
      primary: '#FFFFFF',
      secondary: '#66FCF1', // Cyan-tinted white
      muted: '#45A29E',
    }
  },

  fonts: {
    display: '"Orbitron", "Rajdhani", sans-serif', // Futuristic headers
    code: '"Fira Code", "JetBrains Mono", monospace', // Data readouts
    body: '"Exo 2", sans-serif',
  },

  effects: {
    glass: {
      background: 'rgba(11, 12, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(5, 217, 232, 0.3)',
    },
    glow: {
      cyan: '0 0 10px #05D9E8, 0 0 20px rgba(5, 217, 232, 0.5)',
      pink: '0 0 10px #FF2A6D, 0 0 20px rgba(255, 42, 109, 0.5)',
    }
  }
};

export default theme;
