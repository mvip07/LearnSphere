'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const QuizBox = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Box position={position} args={[0.5, 0.5, 0.5]} ref={meshRef}>
            <meshStandardMaterial color="#4f46e5" />
        </Box>
    );
};

const Particles = () => {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 100;

    useEffect(() => {
        if (particlesRef.current) {
            const positions = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }
            particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        }
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count * 3; i += 3) {
                positions[i + 1] -= 0.02;
                if (positions[i + 1] < -5) positions[i + 1] = 5;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry />
            <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
        </points>
    );
};

const Hero = () => {
    const ctaRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            );
        }

        if (scrollRef.current) {
            gsap.to(scrollRef.current, {
                y: 5,
                repeat: -1,
                yoyo: true,
                duration: 0.5,
                ease: 'power1.inOut',
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (ctaRef.current) {
                const rect = ctaRef.current.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;

                if (distance < maxDistance) {
                    gsap.to(ctaRef.current, {
                        x: (x / maxDistance) * 20,
                        y: (y / maxDistance) * 20,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                }
            }
        };

        const handleMouseLeave = () => {
            if (ctaRef.current) {
                gsap.to(ctaRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const ctaElement = ctaRef.current;

        window.addEventListener('mousemove', handleMouseMove);
        if (ctaElement) ctaElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (ctaElement) ctaElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
            <Canvas className="absolute inset-0 z-0">
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <QuizBox position={[-2, 1, 0]} />
                <QuizBox position={[2, -1, 0]} />
                <QuizBox position={[0, 0, -1]} />
                <Particles />
            </Canvas>
            <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">Master Your Knowledge</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">Engage with interactive quizzes and elevate your learning experience.</p>
                <button ref={ctaRef} className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-300">
                    Start Learning
                </button>
            </div>
            <div ref={scrollRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
};

export default Hero;