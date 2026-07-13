import * as THREE from "three";
import { useGLTF, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import GachaItem from "../GachaItem";
import { FluorescentLight } from "../FluorescentLight";
import { Character } from "../Character";
import { SceneItem } from "./SceneItem";
import type { Prize } from "../../data/prizes";
import { DEFAULT_PRIZE_TRANSFORM } from "../../data/prizes";

const deg = (d: number) => (d * Math.PI) / 180;

function RevealPrize({
  isRevealing,
  prize,
}: {
  isRevealing: boolean;
  prize: Prize;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);

  const position = prize.transform?.position ?? DEFAULT_PRIZE_TRANSFORM.position;
  const rotation = prize.transform?.rotation ?? DEFAULT_PRIZE_TRANSFORM.rotation;
  const scale = prize.transform?.scale ?? DEFAULT_PRIZE_TRANSFORM.scale;

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

    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.set(
      rotation[0],
      rotation[1] + progress * (Math.PI * 2 * 0.5),
      rotation[2],
    );
  });

  return (
    <group ref={groupRef} position={position}>
      <Suspense fallback={null}>
        <GachaItem modelPath={prize.modelPath} />
      </Suspense>
    </group>
  );
}

interface Props {
  isRevealing: boolean;
  prize: Prize;
}

export function CombiniScene({ isRevealing, prize }: Props) {
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
      <RevealPrize isRevealing={isRevealing} prize={prize} />
    </>
  );
}
