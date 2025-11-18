"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from 'three'
import { Suspense, useRef } from "react";
import { SpotLight, ContactShadows, useDepthBuffer } from "@react-three/drei";
import { Chair } from "./Chair";
import { Model as Avatar } from "./Avatar";
import { Ground } from "./Ground";
import { VideoText } from "./VideoText";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "./sizes";
import { SpotlightText } from "./SpotlightText";
// Removed CanvasLoader from Suspense fallback to avoid setState during render warnings

export const CanvasComponent = ({ spotsOn = true, lightMessage }) => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isPC = useMediaQuery({ minWidth: 1024, maxWidth: 1440 });
  const isXL = useMediaQuery({ minWidth: 1440 });
  const { avatar, videoText, chair, lightText } = calculateSizes(isSmall, isMobile, isTablet, isPC, isXL);
  const ref = useRef();
  const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <>
  <Suspense fallback={null}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
  {/* Low ambient to leave stage in penumbra */}
  <ambientLight intensity={0.176412} />
  {/* optional fill; keep low or remove if too bright */}
  <directionalLight position={[-2, 5, -8]} intensity={0.18415}     color="#6C0EBF" />

        {/* MovingSpot lights like in the provided example; toggle with left-click */}
        <MovingSpot
          depthBuffer={depthBuffer}
          color="rgb(105, 152, 255)"
          opacity={spotsOn ? 0.85 : 0}
          position={[1, 2, -1]}
          enabled={spotsOn}
        />
        <MovingSpot
          depthBuffer={depthBuffer}
          color="rgb(150, 51, 250)"
          opacity={spotsOn ? 0.85 : 0}
          position={[-1, 2, 0.91]}
          enabled={spotsOn}
        />

        <group ref={ref}>
          <Chair scale={chair.scale} position={chair.position} rotation={chair.rotation} />

          <Avatar position={avatar.position} scale={avatar.scale} rotation={avatar.rotation} animation="sitting" />

          <Ground position={[0, -2, 0]} />
          {/* Subtle contact shadow pool to ground the character */}
          <ContactShadows
            position={[0, -2.001, 0]}
            opacity={0.35}
            scale={20}
            blur={2.5}
            far={10}
            resolution={1024}
            color="#000000"
          />
          {/* To enable the video texture, put a compatible video under /public and pass videoSrc (e.g., videoSrc="/intro.mp4") */}
          <VideoText position1={videoText.text1.position} rotation1={videoText.text1.rotation}  scale1={videoText.text1.scale} position2={videoText.text2.position} rotation2={videoText.text2.rotation}  scale2={videoText.text2.scale}
          fontSize1={videoText.text1.fontSize}  fontSize2={videoText.text2.fontSize} lightOn={spotsOn} />
          {lightText && (
            <SpotlightText
              active={spotsOn}
              message={lightMessage}
              position={lightText.position}
              rotation={lightText.rotation}
              fontSize={lightText.fontSize}
              maxWidth={lightText.maxWidth}
              lineHeight={lightText.lineHeight}
              letterSpacing={lightText.letterSpacing}
              videoSrc={lightText.videoSrc}
              color={lightText.color}
              finalScale={lightText.finalScale}
              anchorX={lightText.anchorX}
              anchorY={lightText.anchorY}
            />
          )}

        </group>
        {/* Two interactive SpotLights following the mouse (viewport-scaled) */}
      </Suspense>
    </>
  );
};

function MovingSpot({ vec = new Vector3(), enabled = true, ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    if (!light.current) return
    if (!enabled) return
    light.current.target.position.lerp(
      vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0),
      0.1
    )
    light.current.target.updateMatrixWorld()
  })
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={16}
      angle={0.554579135}
      attenuation={5}
      anglePower={4}
      intensity={enabled ? 1122 : 0}
      // Improve shadow quality for moving spotlights
      shadow-bias={-0.0005}
      shadow-normalBias={0.02}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-radius={32}
      {...props}
    />
  )
}
