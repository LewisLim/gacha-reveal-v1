import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";

function RevealCube({ isRevealing }: { isRevealing: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (!isRevealing) {
      startTimeRef.current = null; // clear so next reveal starts fresh
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const duration = 3; // seconds, your call
    const progress = Math.min(elapsed / duration, 1); // 0 to 1, clamped
    const totalRotation = Math.PI * 2 * 1.5; // 540° in radians (1.5 full turns)

    const scale = THREE.MathUtils.lerp(0.1, 1, progress); // starts tiny, ends full size
    meshRef.current.scale.set(scale, scale, scale);

    meshRef.current.rotation.y = progress * totalRotation;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry />
      <meshStandardMaterial color="silver" />
    </mesh>
  );
}

function GachaEgg({ isRevealing }: { isRevealing: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.visible = !isRevealing;
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}

export default function App() {
  const [isRevealing, setIsRevealing] = useState(false);

  return (
    <>
      <h1 className="text-lg font-bold text-blue-500">Gacha Reveal</h1>
      <div id="canvas-container" className="h-[500px] bg-pink-100">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <RevealCube isRevealing={isRevealing} />
          <GachaEgg isRevealing={isRevealing} />
          {/* <Suspense fallback={null}> */}
          {/* <GachaItem modelPath="/models/figurine-a.glb" /> */}
          {/* </Suspense> */}
        </Canvas>
      </div>
      <button onClick={() => setIsRevealing(true)}>Open Gacha</button>
      <button onClick={() => setIsRevealing(false)}>Reset</button>
    </>
  );
}
