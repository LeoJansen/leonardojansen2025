"use client";

import { Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SpotlightText({
  message,
  active = false,
  position,
  rotation,
  fontSize,
  maxWidth = 4,
  lineHeight = 1.1,
  letterSpacing = -0.025,
  videoSrc,
  color = "#ffffff",
  transitionSpeed = 4,
  finalScale = 1,
  anchorX,
  anchorY,
  ...props
}) {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    Object.assign(vid, {
      src: videoSrc || "/assets/drei.mp4",
      crossOrigin: "anonymous",
      loop: true,
      muted: true,
      playsInline: true,
      preload: "auto",
    });
    return vid;
  });

  const [ready, setReady] = useState(false);
  const textRef = useRef(null);
  const scaleRef = useRef(active ? 1 : 0);

  useEffect(() => {
    if (!textRef.current) return;
    const safe = Math.max(scaleRef.current, 0.001);
    textRef.current.visible = scaleRef.current > 0.001;
    textRef.current.scale.set(
      finalScale * safe,
      finalScale * safe,
      finalScale * safe
    );
  }, [finalScale]);

  useEffect(() => {
    if (!video) return;

    const handleCanPlay = () => {
      setReady(true);
      video.play().catch(() => {
        setReady(false);
      });
    };

    const handleError = () => {
      setReady(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    if (video.readyState >= 2) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [video]);

  useFrame((_, delta) => {
    if (!textRef.current) return;

    const target = active && message ? 1 : 0;
    scaleRef.current = THREE.MathUtils.damp(
      scaleRef.current,
      target,
      transitionSpeed,
      delta
    );

    const scaleValue = Math.max(scaleRef.current, 0.001);

    textRef.current.visible = scaleRef.current > 0.001;
    textRef.current.scale.set(
      finalScale * scaleValue,
      finalScale * scaleValue,
      finalScale * scaleValue
    );
  });

  if (!message) {
    return null;
  }

  return (
    <Text
      ref={textRef}
      font="/Inter-Bold.woff"
      fontSize={fontSize}
      maxWidth={maxWidth}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      position={position}
      rotation={rotation}
      anchorX={anchorX}
      anchorY={anchorY}
      {...props}
    >
      {message}
      {ready && video ? (
        <meshBasicMaterial toneMapped={false} color={color} fog={false}>
          <videoTexture
            attach="map"
            args={[video]}
            colorSpace={THREE.SRGBColorSpace}
          />
        </meshBasicMaterial>
      ) : (
        <meshBasicMaterial toneMapped={false} color={color} fog={false} />
      )}
    </Text>
  );
}
