import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StarField() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    // Convert to normalized coordinates (-1 to 1)
    const x = ((clientX / innerWidth) * 2 - 1) * 2;
    const y = -((clientY / innerHeight) * 2 + 1) * 2;
    
    setMousePosition({ x, y });
  }, []);

  return (
    <div onMouseMove={handleMouseMove} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        style={{ background: '#000' }}
      >
        <MovingStars mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}


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

function MovingStars({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Points>(null);
  const speed = 1.5;
  const mouseSensitivity = 15; // How much the stars react to mouse movement
  
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
      
      // Calculate mouse offset for parallax effect
      const mouseOffsetX = mousePosition.x * mouseSensitivity;
      const mouseOffsetY = mousePosition.y * mouseSensitivity;
      
      // Move each star towards the camera
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += speed; // Move in positive z direction (towards camera)
        
        // Apply subtle parallax effect based on mouse position and star distance
        const starZ = positions[i + 2];
        const depthFactor = Math.max(0.1, Math.min(1, (starZ + 400) / 500)); // Closer stars move more
        
        // Store original positions if not already stored
        if (!meshRef.current.userData.originalPositions) {
          meshRef.current.userData.originalPositions = new Float32Array(positions);
        }
        
        const originalX = meshRef.current.userData.originalPositions[i];
        const originalY = meshRef.current.userData.originalPositions[i + 1];
        
        // Apply mouse-based offset with depth factor
        positions[i] = originalX + mouseOffsetX * depthFactor;
        positions[i + 1] = originalY + mouseOffsetY * depthFactor;
        
        // Reset star position if it passes the camera (much further ahead)
        if (positions[i + 2] > 100) {
          positions[i + 2] = -500;
          // Randomize x and y position for variety
          const newX = (Math.random() - 0.5) * 600;
          const newY = (Math.random() - 0.5) * 600;
          positions[i] = newX;
          positions[i + 1] = newY;
          // Update stored original positions
          meshRef.current.userData.originalPositions[i] = newX;
          meshRef.current.userData.originalPositions[i + 1] = newY;
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
