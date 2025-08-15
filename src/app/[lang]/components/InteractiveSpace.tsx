'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [clicked, setClicked] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
        }
    });

    const handleClick = () => {
        setClicked(true);
        onClick();
        setTimeout(() => setClicked(false), 500);
    };

    return (
        <mesh ref={meshRef} position={position} onClick={handleClick} scale={clicked ? 1.5 : 1}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={clicked ? 'yellow' : 'cyan'} emissive="blue" emissiveIntensity={0.5} />
        </mesh>
    );
}

function Scene({ onCubeClick }: { onCubeClick: () => void }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <FloatingCube position={[-1, 0, 0]} onClick={onCubeClick} />
            <FloatingCube position={[1, 0, 0]} onClick={onCubeClick} />
            <FloatingCube position={[0, 1, 0]} onClick={onCubeClick} />
            <FloatingCube position={[0, -1, 0]} onClick={onCubeClick} />
            <OrbitControls enableZoom={false} />
        </>
    );
}

export default function InteractiveSpace() {
    const [score, setScore] = useState(0);

    const handleCubeClick = () => {
        setScore((prev) => prev + 1);
    };

    return (
        <div className="relative w-full h-full">
            <Canvas>
                <Scene onCubeClick={handleCubeClick} />
            </Canvas>
            <div className="absolute top-4 right-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Score: {score}
            </div>
        </div>
    );
}