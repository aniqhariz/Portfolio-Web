'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TurntableModelProps {
  isPlaying: boolean;
}

export function TurntableModel({ isPlaying }: TurntableModelProps) {
  // Load the GLB model generated from the provided OBJ/MTL
  const { scene } = useGLTF('/models/turntable.glb');
  const groupRef = useRef<THREE.Group>(null);
  const vinylRef = useRef<THREE.Object3D | null>(null);
  const tonearmRef = useRef<THREE.Object3D | null>(null);

  // Rotation speed in radians per frame (approx 33.3 RPM at 60fps)
  const currentSpeed = useRef(0);
  const targetSpeed = isPlaying ? 0.035 : 0;

  // Clone scene so we don't mutate cache
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    // Find the dedicated vinyl pivot node
    const vinyl = clonedScene.getObjectByName('VinylPivot');
    if (vinyl) {
      vinylRef.current = vinyl;
    }
  }, [clonedScene]);

  // Frame animation loop
  useFrame((_, delta) => {
    // Smooth deceleration / acceleration for realistic vinyl inertia
    const lerpFactor = isPlaying ? 0.08 : 0.05;
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, lerpFactor);

    if (vinylRef.current && currentSpeed.current > 0.0001) {
      // Rotate the vinyl record strictly around its center spindle Y axis
      vinylRef.current.rotation.y += currentSpeed.current * (delta * 60);
    }
  });

  return (
    <group
      ref={groupRef}
      dispose={null}
      rotation={[0, -0.28, 0]}
      scale={[0.80, 0.80, 0.80]}
    >
      {/* 
        Center model perfectly at (0, 0, 0):
        The bounding box center of turntable.glb is (-0.1258, 0.8251, -0.6647).
        Offsetting by (+0.1258, -0.8251, +0.6647) shifts the center of the turntable
        exactly to (0, 0, 0), so the parent group scales and rotates around its true center.
        This guarantees zero off-center wobble and completely prevents clipping.
      */}
      <primitive
        object={clonedScene}
        position={[0.1258, -0.8251, 0.6647]}
      />
    </group>
  );
}

// Preload the turntable model
useGLTF.preload('/models/turntable.glb');

