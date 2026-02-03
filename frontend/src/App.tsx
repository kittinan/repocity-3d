import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { fetchRepoTree } from './services/github';
import { LayoutEngine } from './core/LayoutEngine';
import { CityEntity } from './types/CitySchema';

// Recursive Component
const CityNode = ({ node }: { node: CityEntity }) => {
  const isBlock = node.type === 'block';
  
  return (
    <group position={[node.position.x, node.position.y, node.position.z]}>
      {/* The Node Geometry */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[node.dimensions.width, node.dimensions.height, node.dimensions.depth]} />
        <meshStandardMaterial 
          color={node.color} 
          transparent={isBlock}
          opacity={isBlock ? 0.8 : 1.0}
          roughness={0.2}
          metalness={isBlock ? 0.1 : 0.5}
        />
      </mesh>

      {/* Children */}
      {node.children?.map((child) => (
        <CityNode key={child.path} node={child} />
      ))}
    </group>
  );
};

export default function App() {
  const [cityData, setCityData] = useState<CityEntity | null>(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded demo for now
  const owner = "facebook";
  const repo = "react";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        console.log("Fetching...");
        const rawData = await fetchRepoTree(owner, repo);
        console.log("Calculating layout...");
        const layout = LayoutEngine.calculate(rawData);
        setCityData(layout);
      } catch (e) {
        console.error("Failed to load city", e);
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {loading && (
        <div className="absolute top-4 left-4 z-10 bg-black/50 p-4 rounded">
          Loading {owner}/{repo}...
        </div>
      )}
      
      {!loading && !cityData && (
        <div className="absolute top-4 left-4 z-10 bg-red-900/50 p-4 rounded">
          Failed to load or API rate limit.
        </div>
      )}

      <Canvas 
        shadows
        camera={{ position: [50, 50, 50], fov: 45 }}
      >
        <color attach="background" args={['#111']} />
        <fog attach="fog" args={['#111', 50, 200]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[100, 200, 100]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        
        <group position={[0, -10, 0]}>
           {cityData && <CityNode node={cityData} />}
        </group>

        <OrbitControls makeDefault />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
