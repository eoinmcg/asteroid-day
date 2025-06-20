import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StarField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 75 }}
      style={{ background: '#000' }}
    >
      <MovingStars />
    </Canvas>
  );
}

// Create a circular texture for the stars
function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 32;
  canvas.height = 32;

  const center = 16;
  const radius = 16;

  if (context) {
    context.beginPath();
    context.arc(center, center, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function MovingStars() {
  const meshRef = useRef<THREE.Points>(null);
  const speed = 1.5;
  
  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      // Distribute stars in a large cube around the camera
      positions[i * 3] = (Math.random() - 0.5) * 600;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600; // y
      positions[i * 3 + 2] = Math.random() * 800 - 400;   // z (from -400 to 400)
    }
    return positions;
  }, []);

  useFrame(() => {
    if (meshRef.current && meshRef.current.geometry.attributes.position) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      // Move each star towards the camera
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += speed; // Move in positive z direction (towards camera)
        
        // Reset star position if it passes the camera (much further ahead)
        if (positions[i + 2] > 100) {
          positions[i + 2] = -500;
          // Randomize x and y position for variety
          positions[i] = (Math.random() - 0.5) * 600;
          positions[i + 1] = (Math.random() - 0.5) * 600;
        }
      }
      
      // Mark the position attribute as needing an update
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={0.8}
        sizeAttenuation={true}
        transparent={true}
        alphaTest={0.5}
        map={createCircleTexture()}
      />
    </points>
  );
}
