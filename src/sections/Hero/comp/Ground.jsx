import { MeshReflectorMaterial } from "@react-three/drei"


export function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        // Reflection quality
        blur={[20, 10]}
        resolution={1024}
        mixBlur={3}
        mixContrast={1}
        mixStrength={11.5}
        mirror={0.19}

        // Look & feel
        color="rgb(152,155,155)"
        metalness={0.79}
        roughness={0.19}
      />
    </mesh>
  )
}