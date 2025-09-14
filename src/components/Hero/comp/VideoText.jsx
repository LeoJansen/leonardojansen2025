"use client";
import { Text, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function VideoText({
  position1,
  rotation1,
  scale1,
  fontSize1,
  position2,
  rotation2,
  scale2,
  fontSize2,
  videoSrc, // optional: e.g. "/intro.mp4" placed under /public
...props}) {



    // Create the video element lazily on the client and handle unsupported/missing sources gracefully
  const [video] = useState(() => {
    const vid = document.createElement('video')
    Object.assign(vid, {
      // Prefer explicit absolute path from /public when none is provided
      src: videoSrc || '/assets/drei.mp4',
      crossOrigin: 'anonymous',
      loop: true,
      muted: true,
      playsInline: true,
    })
    return vid
  })

    const [ready, setReady] = useState(false);

    useEffect(() => {
  if (!video) return;

      const onCanPlay = () => {
        setReady(true);
        // Try to play; if it fails (e.g., NotSupportedError), we keep the fallback material
        video.play().catch(() => {
          setReady(false);
        });
      };

      const onError = () => {
        setReady(false);
      };

      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);

      // In case the video is already buffered/ready
      if (video.readyState >= 2) onCanPlay();

      return () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };
    }, [video]);
    return (
      <>
   
  

        <Text font="/Inter-Bold.woff"  fontSize={fontSize1} letterSpacing={-0.03} {...props} position={position1} rotation={rotation1} color={"#ffffff"}
          className="bright-text" renderOrder={1000}>
    Hello, I&apos;m
        {ready && video ? (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} className="bright-text" depthTest={false} depthWrite={false} transparent fog={false}>
            {/* Video texture will only attach when the media is ready */}
            <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
          </meshBasicMaterial>
        ) : (
          // Fallback to plain bright text material if the video cannot be used
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} className="bright-text" depthTest={false} depthWrite={false} transparent fog={false} />
        )}
      </Text>
      <Text font="/Inter-Bold.woff" fontSize={fontSize2} letterSpacing={-0.03} {...props} position={position2} renderOrder={1000}>
        leo
        {ready && video ? (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} depthTest={false} depthWrite={false} transparent fog={false}>
            <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
          </meshBasicMaterial>
        ) : (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} depthTest={false} depthWrite={false} transparent fog={false} />
        )}
      </Text>
     
   
      </>
      
    )
  }