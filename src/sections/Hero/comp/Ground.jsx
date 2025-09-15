import { MeshReflectorMaterial } from "@react-three/drei"


export function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
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
        color="rgb(25,155,155)"
        metalness={0.8}
        roughness={0.7}
      />
    </mesh>
  )
}