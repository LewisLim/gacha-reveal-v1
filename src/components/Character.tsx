import { useGLTF } from '@react-three/drei'
import { assetPath } from '../utils/assetPath'

interface Props {
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export function Character({ modelPath, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: Props) {
  const { scene } = useGLTF(assetPath(modelPath))
  
  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}