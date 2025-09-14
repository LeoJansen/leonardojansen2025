"use client";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from "react";
import { SpotLight as VolumetricSpotLight, ContactShadows } from "@react-three/drei";
import { Chair } from "./Chair";
import { Model as Avatar } from "./Avatar";
import { Ground } from "./Ground";
import { VideoText } from "./VideoText";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "./sizes";
import CanvasLoader from "../../../components/CanvasLoader";





export const CanvasComponent = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isPC = useMediaQuery({ minWidth: 1024, maxWidth: 1440 });
  const isXL = useMediaQuery({ minWidth: 1440 });
  const { avatar, videoText, chair} = calculateSizes(isSmall, isMobile, isTablet, isPC, isXL);
  const ref = useRef();
  const spotRef = useRef();

  // Keep the spotlight aimed at the ground beneath the avatar
  useEffect(() => {
    if (!spotRef.current) return
    const target = spotRef.current.target
    target.position.set(avatar.position[0], -2, avatar.position[2])
    target.updateMatrixWorld()
  }, [avatar.position])

  return (
    <>
      <Suspense fallback={<CanvasLoader/>}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
  {/* Low ambient to leave stage in penumbra */}
  <ambientLight intensity={0.76412} />
  {/* optional fill; keep low or remove if too bright */}
  <directionalLight position={[-2, 5, -8]} intensity={0.8415}     color="#6C0EBF" />

        {/* Top-down spotlight to form a circular pool on the ground under the avatar */}
        <spotLight
          ref={spotRef}
          castShadow
          position={[5, 2, 1]}
          angle={0.192}
          penumbra={0.6}
          intensity={1.0}
          distance={12}
          decay={2}
          shadow-bias={-0.0005}
          shadow-normalBias={0.02}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
     
        >
          {/* Volumetric beam visual (does not cast light, just visuals). Must be a child of a SpotLight light. */}
          <VolumetricSpotLight

            distance={10}
            angle={0.161820178919228}
            attenuation={100}
            anglePower={2}
            color="#AE7FD8"
            opacity={0.102595049}
          />
        </spotLight>

        <group ref={ref}>
          <Chair scale={chair.scale} position={chair.position} rotation={chair.rotation} />

          <Avatar position={avatar.position} scale={avatar.scale} rotation={avatar.rotation} animation="sitting" />

          <Ground position={[0, -2, 0]} />
          {/* Subtle contact shadow pool to ground the character */}
          <ContactShadows
            position={[0, -2.001, 0]}
            opacity={0.6}
            scale={20}
            blur={2.5}
            far={10}
            resolution={1024}
            color="#000000"
          />
          {/* To enable the video texture, put a compatible video under /public and pass videoSrc (e.g., videoSrc="/intro.mp4") */}
          <VideoText position1={videoText.text1.position} rotation1={videoText.text1.rotation}  scale1={videoText.text1.scale} position2={videoText.text2.position} rotation2={videoText.text2.rotation}  scale2={videoText.text2.scale}
          fontSize1={videoText.text1.fontSize}  fontSize2={videoText.text2.fontSize} />


        </group>
        <Intro />
      </Suspense>
    </>
  );
};


function Intro() {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.pointer.x * 5, 3 + state.pointer.y * 2, 13), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}