'use client';

import React, { Suspense, Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { TurntableModel } from './TurntableModel';
import { TurntableFallback } from './TurntableFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / Three.js rendering failure caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * CameraRig dynamically frames the 3D turntable to maximize visible size
 * (filling ~92% of the viewport) while mathematically guaranteeing it NEVER clips
 * at any 360-degree rotation angle or screen aspect ratio.
 */
function CameraRig({ scale = 0.80 }: { scale?: number }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);

    // Half-extents with 8% breathing room margin
    const reqHalfWidth = 2.386 * scale * 1.08;
    const reqHalfHeight = 2.00 * scale * 1.08;

    const fov = 32;
    const tanFov = Math.tan((fov * Math.PI) / 360);

    const dForHeight = reqHalfHeight / tanFov;
    const dForWidth = reqHalfWidth / (tanFov * aspect);

    // Pick the safe distance that accommodates both width and height
    const targetDist = Math.max(dForHeight, dForWidth);

    camera.position.setLength(targetDist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, scale]);

  return null;
}

interface TurntableSceneProps {
  isPlaying: boolean;
}

// Exactly 1.186 radians (~68 degrees from vertical) matching the reference view
const LOCKED_POLAR_ANGLE = 1.186;

export function TurntableScene({ isPlaying }: TurntableSceneProps) {
  return (
    <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[660px] xl:h-[720px] flex items-center justify-center select-none">
      <ThreeErrorBoundary fallback={<TurntableFallback isPlaying={isPlaying} message="WebGL unavailable on this device." />}>
        <Suspense fallback={<TurntableFallback isPlaying={isPlaying} message="Loading 3D turntable..." />}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [1.16, 2.26, 5.46], fov: 32 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Dynamic camera rig framing the enlarged turntable */}
            <CameraRig scale={0.80} />

            {/* White studio lighting */}
            <ambientLight intensity={0.9} />
            <hemisphereLight args={['#ffffff', '#e8e8e8', 0.65]} />
            <directionalLight
              position={[5, 9, 6]}
              intensity={1.6}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-near={1}
              shadow-camera-far={25}
              shadow-camera-top={5}
              shadow-camera-bottom={-5}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-4, 4, -2]} intensity={0.5} color="#ffffff" />
            <directionalLight position={[0, -2, 4]} intensity={0.25} color="#f0f0f0" />

            {/* Turntable 3D Model centered at (0,0,0) */}
            <TurntableModel isPlaying={isPlaying} />

            {/* Ground contact shadow precisely placed under turntable feet */}
            <ContactShadows
              position={[0, -0.96, 0]}
              opacity={0.35}
              scale={6.5}
              blur={2.0}
              far={3.0}
            />

            {/* Locked vertical tilt: Rotates smoothly horizontally (left and right) only */}
            <OrbitControls
              target={[0, 0, 0]}
              enablePan={false}
              enableZoom={false}
              minPolarAngle={LOCKED_POLAR_ANGLE}
              maxPolarAngle={LOCKED_POLAR_ANGLE}
              dampingFactor={0.06}
              rotateSpeed={0.7}
            />
          </Canvas>
        </Suspense>
      </ThreeErrorBoundary>
    </div>
  );
}

