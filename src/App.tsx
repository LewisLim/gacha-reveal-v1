import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import GachaItem from "./components/GachaItem";

function RevealPrize({ isRevealing }: { isRevealing: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!isRevealing) {
      groupRef.current.visible = false;
      startTimeRef.current = null;
      return;
    }

    groupRef.current.visible = true;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const duration = 3;
    const progress = Math.min(elapsed / duration, 1);
    const totalRotation = Math.PI * 2 * 1.5;
    const scale = THREE.MathUtils.lerp(0.1, 1, progress);

    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.y = progress * totalRotation;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <GachaItem modelPath="/prizes/a/onigiri-gold-trophy.glb" />
      </Suspense>
    </group>
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
          <RevealPrize isRevealing={isRevealing} />
          <GachaEgg isRevealing={isRevealing} />
        </Canvas>
      </div>
      <button onClick={() => setIsRevealing(true)}>Open Gacha</button>
      <button onClick={() => setIsRevealing(false)}>Reset</button>
    </>
  );
}
