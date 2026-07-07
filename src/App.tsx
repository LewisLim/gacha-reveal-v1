import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GachaConfetti } from "./components/effects/GachaConfetti";
import { CombiniScene } from "./components/scenes/CombiniScene";
import { StreetScene } from "./components/scenes/StreetScene";
import SceneControls from "./components/ui/SceneControls";
import SceneToggle, { type Scene } from "./components/ui/SceneToggle";

export default function App() {
  const [scene, setScene] = useState<Scene>("combini");
  const [isRevealing, setIsRevealing] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div id="canvas-container" className="h-[700px]">
        <Canvas>
          {scene === "combini" && <CombiniScene isRevealing={isRevealing} />}
          {scene === "street" && <StreetScene />}
        </Canvas>
        <GachaConfetti
          isRevealing={scene === "combini" && isRevealing}
          tier="S"
        />
        <SceneToggle scene={scene} setScene={setScene} />
        <SceneControls scene={scene} setIsRevealing={setIsRevealing} />
      </div>
    </div>
  );
}
