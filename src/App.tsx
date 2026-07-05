import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import GachaItem from "./components/GachaItem";
import { Environment } from "@react-three/drei";
import { GachaConfetti } from "./special-effects/GachaConfetti";
import { CombiniScene } from "./components/SceneBackground";
import { FluorescentLight } from "./components/FluorescentLight";
import { Character } from "./components/Character";

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
    const duration = 1;
    const progress = Math.min(elapsed / duration, 1);
    const totalRotation = Math.PI * 2 * 0.5;
    const scale = THREE.MathUtils.lerp(0.4, 0.4, progress);

    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.y = progress * totalRotation;
  });

  return (
    <group ref={groupRef} position={[0.4, -0.5, 3]} rotation={[0.3, 0, 0]}>
      <Suspense fallback={null}>
        <GachaItem modelPath="/prizes/a/onigiri-gold-trophy.glb" />
      </Suspense>
    </group>
  );
}

export default function App() {
  const [isRevealing, setIsRevealing] = useState(false);
  const deg = (d: number) => (d * Math.PI) / 180;

  return (
    <>
      <div id="canvas-container" className="h-[700px]">
        <Canvas>
          <Environment preset="lobby" />
          <FluorescentLight />
          <CombiniScene />
          <Character
            modelPath="/people/worker-1.glb"
            position={[-0.8, -1, 2.7]}
            rotation={[0, deg(90), 0]}
          />
          <Character
            modelPath="/people/player-male.glb"
            position={[1, -1, 2.7]}
            rotation={[0, deg(-90), 0]}
          />
          <Character
            modelPath="/people/cat-1.glb"
            position={[-1.6, -1, 3.3]}
            rotation={[0, deg(240), 0]}
            scale={0.4}
          />

          <RevealPrize isRevealing={isRevealing} />
        </Canvas>
        <GachaConfetti isRevealing={isRevealing} tier={"S"} />
      </div>
      <div className="w-full flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setIsRevealing(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium py-2 px-4 rounded-full"
        >
          Open Gacha
        </button>
        <button
          onClick={() => setIsRevealing(false)}
          className="bg-transparent hover:bg-blue-500 text-blue-400 text-sm font-medium hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Reset
        </button>
      </div>
    </>
  );
}
