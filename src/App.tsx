import "./App.css";
import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GachaConfetti } from "./components/effects/GachaConfetti";
import { CombiniScene } from "./components/scenes/CombiniScene";
import SceneControls from "./components/ui/SceneControls";
import { PRIZES, pickRandomPrize } from "./data/prizes";

useGLTF.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
);

// Camera stays put; aiming right of origin shifts the scene left in frame.
function CameraAim() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0.15, 0, 0);
  }, [camera]);
  return null;
}

export default function App() {
  const [scene, setScene] = useState<"combini">("combini");
  const [isRevealing, setIsRevealing] = useState(false);
  const [prize, setPrize] = useState(PRIZES[0]);
  const [revealKey, setRevealKey] = useState(0);

  const handleOpen = () => {
    setPrize(pickRandomPrize());
    setIsRevealing(true);
    setRevealKey((key) => key + 1);
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="canvas-container" className="min-h-[700px] h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 95 }}>
          <CameraAim />
          <CombiniScene
            isRevealing={isRevealing}
            prize={prize}
            revealKey={revealKey}
          />
        </Canvas>
        <GachaConfetti
          key={revealKey}
          isRevealing={scene === "combini" && isRevealing}
          tier={prize.tier}
        />
        <SceneControls scene={scene} onOpen={handleOpen} />
      </div>
    </div>
  );
}
