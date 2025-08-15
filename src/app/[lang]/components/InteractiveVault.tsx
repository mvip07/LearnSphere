'use client';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function LockedCube() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [attempts, setAttempts] = useState(0);
    const [unlocked, setUnlocked] = useState(false);

    useFrame(() => {
        if (meshRef.current && !unlocked) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    const handleClick = () => {
        setAttempts((prev) => prev + 1);
        if (attempts + 1 >= 3) {
            setUnlocked(true);
            alert('Vault Unlocked! But still forbidden... 😎');
        }
    };

    return (
        <mesh ref={meshRef} onClick={handleClick} scale={unlocked ? 0 : 1} >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={unlocked ? 'green' : 'red'} wireframe={!unlocked} />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="red" />
            <LockedCube />
            <OrbitControls />
        </>
    );
}

export default function InteractiveVault() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}