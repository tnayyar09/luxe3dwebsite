import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars, Instance, Instances, useTexture } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// --- Shared Components ---

function ScrollRotator({ children, speed = 0.5, axis = 'y' }: { children: React.ReactNode, speed?: number, axis?: 'x' | 'y' | 'z' }) {
    const group = useRef<THREE.Group>(null);
    useFrame(() => {
        if (group.current) {
            const scrollY = window.scrollY;
            if (axis === 'y') group.current.rotation.y = scrollY * 0.0005 * speed;
            if (axis === 'x') group.current.rotation.x = scrollY * 0.0005 * speed;
            if (axis === 'z') group.current.rotation.z = scrollY * 0.0005 * speed;
        }
    });
    return <group ref={group}>{children}</group>;
}

// --- Procedural Building Generation ---

const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
buildingGeometry.translate(0, 0.5, 0); // Pivot at bottom

function createWindowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, 64, 64);
    context.fillStyle = '#ffcc66'; // Warm light color
    // Randomly light up windows
    if (Math.random() > 0.5) {
        context.fillRect(8, 8, 48, 48);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

function RealisticBuilding({ position, scale, color = "#1a1a1a" }: { position: [number, number, number], scale: [number, number, number], color?: string }) {
    // Simple procedural windows using a grid material shader approach or just basic geometry
    // For performance, we'll use a simple material with a grid pattern for windows
    
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#111'; // Building color
            ctx.fillRect(0, 0, 32, 64);
            ctx.fillStyle = '#555'; // Window color (off)
            // Draw grid of windows
            for(let y=0; y<64; y+=4) {
                for(let x=0; x<32; x+=8) {
                    if (Math.random() > 0.3) { // Randomly lit
                         ctx.fillStyle = Math.random() > 0.9 ? '#FDFBD3' : '#2a2a2a'; // Occasional light
                         ctx.fillRect(x+1, y+1, 6, 2);
                    }
                }
            }
        }
        const t = new THREE.CanvasTexture(canvas);
        t.wrapS = THREE.RepeatWrapping;
        t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(1, scale[1]/10); // Repeat vertically based on height
        return t;
    }, [scale]);

    return (
        <mesh position={position} scale={scale} geometry={buildingGeometry}>
            <meshStandardMaterial 
                map={texture} 
                color={color}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
}

function CityScape({ count = 20, range = 20, minHeight = 5, maxHeight = 15 }) {
    const buildings = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * range;
            const z = (Math.random() - 0.5) * range;
            const y = 0; // Ground level
            const width = 1 + Math.random() * 2;
            const depth = 1 + Math.random() * 2;
            const height = minHeight + Math.random() * (maxHeight - minHeight);
            temp.push({ position: [x, y, z] as [number, number, number], scale: [width, height, depth] as [number, number, number] });
        }
        return temp;
    }, [count, range, minHeight, maxHeight]);

    return (
        <group>
            {buildings.map((b, i) => (
                <RealisticBuilding key={i} position={b.position} scale={b.scale} />
            ))}
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

// --- Hero Section: Immersive City View ---

function CameraRig() {
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Smooth flyover effect
        // Move camera along Z axis
        const zPos = 20 - (t * 1.5) % 30; 
        state.camera.position.z = zPos;
        state.camera.position.x = Math.sin(t * 0.2) * 5;
        state.camera.position.y = 6 + Math.cos(t * 0.3) * 2;
        
        // Look slightly ahead
        state.camera.lookAt(0, 2, zPos - 10);
    });
    return null;
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={60} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 20, 10]} intensity={1} color="#ffaa00" />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00aaff" />
        
        <fog attach="fog" args={['#050505', 5, 35]} />
        
        <CameraRig />

        {/* Multiple city chunks for infinite feel */}
        <group position={[0, -5, 0]}>
            <CityScape count={30} range={30} minHeight={8} maxHeight={25} />
        </group>
        <group position={[0, -5, -30]}>
            <CityScape count={30} range={30} minHeight={8} maxHeight={25} />
        </group>
         <group position={[0, -5, 30]}>
            <CityScape count={30} range={30} minHeight={8} maxHeight={25} />
        </group>
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

// --- Features Section: Looking Up View ---

export function Features3D() {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, -5, 5]} rotation={[0.5, 0, 0]} fov={75} />
                <ambientLight intensity={0.3} />
                <fog attach="fog" args={['#000', 5, 30]} />
                
                <ScrollRotator speed={0.5} axis="y">
                    <group position={[0, -10, -10]}>
                        <CityScape count={30} range={40} minHeight={10} maxHeight={30} />
                    </group>
                </ScrollRotator>
                
                <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}

// --- Projects Section: Blueprint/Wireframe City ---

function WireframeCity() {
    const buildings = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 20; i++) {
            const x = (Math.random() - 0.5) * 30;
            const z = (Math.random() - 0.5) * 20 - 10;
            const height = 5 + Math.random() * 15;
            temp.push({ position: [x, height/2, z] as [number, number, number], args: [2, height, 2] as [number, number, number] });
        }
        return temp;
    }, []);

    return (
        <group>
            {buildings.map((b, i) => (
                <mesh key={i} position={b.position}>
                    <boxGeometry args={b.args} />
                    <meshBasicMaterial color="#333" wireframe />
                </mesh>
            ))}
             {/* Highlighted Building */}
             <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[5, 8, -5]}>
                <mesh>
                    <boxGeometry args={[3, 12, 3]} />
                    <meshStandardMaterial color="#D4AF37" wireframe emissive="#D4AF37" emissiveIntensity={0.2} />
                </mesh>
             </Float>
        </group>
    )
}

export function Projects3D() {
    return (
        <div className="absolute inset-0 -z-10 opacity-40">
            <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <ScrollRotator speed={0.3} axis="y">
                    <WireframeCity />
                </ScrollRotator>
                <gridHelper args={[50, 50, 0x444444, 0x111111]} position={[0, -2, 0]} />
            </Canvas>
        </div>
    )
}

// --- Testimonials Section: Distant Skyline ---

export function Testimonials3D() {
    return (
        <div className="absolute inset-0 -z-10 opacity-50">
            <Canvas camera={{ position: [0, 2, 20], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <fog attach="fog" args={['#000', 15, 40]} />
                
                <ScrollRotator speed={0.2} axis="y">
                    <group position={[0, -5, -10]}>
                        <CityScape count={50} range={60} minHeight={5} maxHeight={15} />
                    </group>
                </ScrollRotator>
                
                {/* Floating particles representing city lights/energy */}
                <Stars radius={50} depth={20} count={1000} factor={6} saturation={1} fade speed={2} />
            </Canvas>
        </div>
    )
}

// --- Other Sections (About, Team, Contact) ---

export function About3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ScrollRotator speed={1} axis="y">
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <RealisticBuilding position={[0, -2, 0]} scale={[2, 6, 2]} color="#D4AF37" />
            </Float>
        </ScrollRotator>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export function Team3D() {
    return (
        <div className="h-[300px] w-full absolute top-0 left-0 -z-10 opacity-30">
             <Canvas camera={{ position: [0, 5, 10] }}>
                <ambientLight intensity={0.5} />
                <ScrollRotator speed={0.5} axis="y">
                    <group rotation={[0, 0, 0.2]}>
                        <CityScape count={15} range={20} minHeight={3} maxHeight={8} />
                    </group>
                </ScrollRotator>
             </Canvas>
        </div>
    )
}

export function Contact3D() {
    return (
        <div className="h-full w-full absolute inset-0 -z-10 opacity-50">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#D4AF37" />
                <ScrollRotator speed={0.8} axis="y">
                    <group>
                        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                            <RealisticBuilding position={[2, -3, -2]} scale={[1.5, 5, 1.5]} color="#333" />
                        </Float>
                        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[-2, 1, -4]}>
                            <RealisticBuilding position={[0, -2, 0]} scale={[1, 4, 1]} color="#555" />
                        </Float>
                    </group>
                </ScrollRotator>
                <Environment preset="night" />
            </Canvas>
        </div>
    )
}


