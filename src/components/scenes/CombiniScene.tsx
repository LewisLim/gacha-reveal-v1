import * as THREE from "three";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import GachaItem from "../GachaItem";
import { FluorescentLight } from "../FluorescentLight";
import { Character } from "../Character";
import { SceneItem } from "./SceneItem";

const deg = (d: number) => (d * Math.PI) / 180;

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
    const progress = Math.min(elapsed / 1, 1);
    const scale = 0.4;

    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.y = progress * (Math.PI * 2 * 0.5);
  });

  return (
    <group ref={groupRef} position={[0.4, -0.5, 3]} rotation={[0.3, 0, 0]}>
      <Suspense fallback={null}>
        <GachaItem modelPath="/prizes/a/onigiri-gold-trophy.glb" />
      </Suspense>
    </group>
  );
}

interface Props {
  isRevealing: boolean;
}

export function CombiniScene({ isRevealing }: Props) {
  const { scene } = useGLTF("/scene/combini-scene.glb");

  return (
    <>
      <Environment preset="lobby" />
      <FluorescentLight />
      <primitive
        object={scene}
        scale={2.5}
        position={[3, -1, 0]}
        rotation={[0.05, 0, 0]}
      />
      <SceneItem
        modelPath="/scene/lottery-wheel.glb"
        position={[-0.25, -0.6, 2.6]}
        rotation={[0, deg(65), 0]}
        scale={0.5}
      />
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
    </>
  );
}
