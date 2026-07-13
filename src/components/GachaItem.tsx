import { useGLTF } from "@react-three/drei";
import { assetPath } from "../utils/assetPath";

export default function GachaItem({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(assetPath(modelPath));

  return <primitive object={scene} />;
}
