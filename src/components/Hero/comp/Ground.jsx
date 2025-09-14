import { MeshReflectorMaterial } from "@react-three/drei"


export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        // Reflection quality
        blur={[400, 100]}
        resolution={512}
        mixBlur={6}
        mixContrast={1}
        mixStrength={111.5}
        mirror={0.19}

        // Look & feel
        color="rgb(80,30,120)"
        metalness={0.9}
        roughness={0.6}
      />
    </mesh>
  )
}