import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingBuilding({ position, color, scale }: { position: [number, number, number], color: string, scale: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position} 
        scale={scale}
        rotation={[0, Math.random() * Math.PI, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <FloatingBuilding position={[-4, 2, -5]} color="#D4AF37" scale={[1, 4, 1]} />
        <FloatingBuilding position={[4, -1, -3]} color="#C0C0C0" scale={[1.5, 3, 1.5]} />
        <FloatingBuilding position={[0, -3, -8]} color="#CD7F32" scale={[2, 5, 2]} />
        <FloatingBuilding position={[-6, -2, -10]} color="#555555" scale={[1, 6, 1]} />
        <FloatingBuilding position={[6, 3, -12]} color="#888888" scale={[2, 4, 2]} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
