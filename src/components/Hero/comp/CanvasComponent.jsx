"use client";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Suspense, useRef, useState } from "react";
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

  return (
    <>
      <Suspense fallback={<CanvasLoader/>}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <ambientLight intensity={0.46} />
        <spotLight position={[0, 10, -2]} intensity={0.96} />
        <directionalLight position={[-50, 0, -40]} intensity={0.8317} />

        <group ref={ref}>
          <Chair scale={chair.scale} position={chair.position} rotation={chair.rotation} />

          <Avatar position={avatar.position} scale={avatar.scale} rotation={avatar.rotation} animation="sitting" />

          <Ground position={[0, -2, 0]} />
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