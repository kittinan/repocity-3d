import React from 'react';
import { Environment, Stars } from '@react-three/drei';
import { theme } from '../styles/theme';

export const CityEnvironment = () => {
  return (
    <>
      {/* Dark background base */}
      <color attach="background" args={[theme.colors.base.void]} />
      
      {/* Fog for depth and mood - matches base void color, starting at 5 units, ending at 40 */}
      <fog attach="fog" args={[theme.colors.base.metalDark, 5, 40]} />
      
      {/* Night preset for reflections */}
      <Environment preset="night" />
      
      {/* Starfield */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      {/* Ambient light for base visibility - low intensity to keep it dark */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light to simulate moon/city glow */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5} 
        color={theme.colors.neon.cyan} 
      />
       {/* Secondary light for contrast */}
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme.colors.neon.pink} />
      
      {/* Ground plane grid for reference */}
      <gridHelper args={[100, 100, theme.colors.atmosphere.grid, theme.colors.atmosphere.grid]} position={[0, -0.01, 0]} />
    </>
  );
};
