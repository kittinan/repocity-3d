import React from 'react';
import { theme } from '../styles/theme';

/**
 * HUDMockup - Concept Component for RepoCity 3D
 * 
 * DESIGN INTENT:
 * This component appears as a "Holographic Overlay" near the cursor 
 * or attached to the 3D building mesh when hovered.
 * 
 * STYLE GUIDE:
 * - Glassmorphism background to retain 3D context
 * - Monospace fonts for data-heavy feel
 * - Neon borders indicating health status (Green/Lime = Good, Pink/Red = Bad)
 */

const HUDMockup = ({ data = MOCK_DATA }) => {
  // Dynamic border color based on health
  const statusColor = data.health > 80 ? theme.colors.neon.lime : theme.colors.neon.pink;

  const styles = {
    container: {
      ...theme.effects.glass,
      position: 'absolute', // In real app, this would track 3D coords projected to 2D
      top: '20%',
      left: '20%',
      width: '300px',
      padding: '1.5rem',
      color: theme.colors.text.primary,
      fontFamily: theme.fonts.code,
      borderLeft: `4px solid ${statusColor}`,
      boxShadow: theme.effects.glow.cyan,
      clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)', // Cyberpunk angled corner
    },
    header: {
      fontFamily: theme.fonts.display,
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      color: theme.colors.neon.cyan,
      borderBottom: `1px solid ${theme.colors.neon.cyan}`,
      paddingBottom: '0.25rem',
      display: 'flex',
      justifyContent: 'space-between'
    },
    statRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.25rem',
      fontSize: '0.9rem',
    },
    label: {
      color: theme.colors.text.muted,
    },
    value: {
      color: theme.colors.text.secondary,
      fontWeight: 'bold',
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: theme.colors.base.metalMid,
      marginTop: '1rem',
      position: 'relative',
    },
    progressFill: {
      width: `${data.health}%`,
      height: '100%',
      backgroundColor: statusColor,
      boxShadow: `0 0 8px ${statusColor}`,
    },
    meta: {
      fontSize: '0.7rem',
      color: theme.colors.text.muted,
      marginTop: '1rem',
      textAlign: 'right',
      opacity: 0.7,
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative scanline effect */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        pointerEvents: 'none',
        zIndex: -1
      }} />

      <div style={styles.header}>
        <span>{data.name}</span>
        <span style={{fontSize: '0.8em'}}>v{data.version}</span>
      </div>

      <div style={styles.statRow}>
        <span style={styles.label}>:: LANGUAGE</span>
        <span style={styles.value}>{data.language}</span>
      </div>
      
      <div style={styles.statRow}>
        <span style={styles.label}>:: FILES</span>
        <span style={styles.value}>{data.fileCount}</span>
      </div>

      <div style={styles.statRow}>
        <span style={styles.label}>:: COMPLEXITY</span>
        <span style={styles.value}>{data.complexity}</span>
      </div>

      {/* Health Bar Visualization */}
      <div style={styles.progressBar}>
        <div style={styles.progressFill} />
      </div>
      <div style={{...styles.statRow, marginTop: '4px'}}>
        <span style={{...styles.label, fontSize: '0.7rem'}}>SYSTEM INTEGRITY</span>
        <span style={{color: statusColor}}>{data.health}%</span>
      </div>

      <div style={styles.meta}>
        ID: {data.id} // LAST_UPDATED: {data.lastUpdated}
      </div>
    </div>
  );
};

// Mock data for visualization
const MOCK_DATA = {
  id: '0x1A4F',
  name: 'auth-service',
  version: '2.4.0',
  language: 'TypeScript',
  fileCount: 42,
  complexity: 'HIGH',
  health: 92,
  lastUpdated: '14m ago'
};

export default HUDMockup;
