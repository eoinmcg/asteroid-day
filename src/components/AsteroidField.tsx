import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function AsteroidField() {

  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.2,
        rotationSpeed: Math.random() * 0.005 + 0.001
      });
    }
    return temp;
  }, []);

  return (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
        >
      
      <ambientLight intensity={6} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffdd88"
        castShadow
      />
      <pointLight 
        position={[15, 10, 10]} 
        intensity={2} 
        color="#ff8844"
        distance={50}
        decay={1}
      />
      <pointLight 
        position={[-10, -5, 8]} 
        intensity={1.2} 
        color="#4488ff"
        distance={40}
        decay={1}
      />
      <spotLight
        position={[0, 20, 15]}
        target-position={[0, 0, 0]}
        intensity={1.8}
        angle={Math.PI / 4}
        penumbra={0.3}
        color="#ffaa44"
        distance={60}
        decay={1}
      />
      
      {asteroids.map((asteroid, index) => (
        <Asteroid
          key={index}
          position={asteroid.position}
          scale={asteroid.scale}
          rotationSpeed={asteroid.rotationSpeed}
        />
      ))}
    <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}

interface AsteroidProps {
  position: number[];
  scale: number;
  rotationSpeed: number;
};
function Asteroid({ position, scale, rotationSpeed }: AsteroidProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorMap = useLoader(THREE.TextureLoader, 'texture.webp');
  const geometry = useMemo(() => {
    const geo = new THREE.TetrahedronGeometry(1, Math.ceil(Math.random() * 2) + 1);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position as [number, number, number]} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        map={colorMap}
      />
    </mesh>
  );
}
