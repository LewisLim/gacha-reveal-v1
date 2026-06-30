import { useGLTF } from "@react-three/drei";

export default function GachaItem({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} />;
}
