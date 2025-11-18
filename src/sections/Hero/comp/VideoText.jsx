"use client";
import { Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
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
  lightOn = false,
  videoSrc, // optional: e.g. "/intro.mp4" placed under /public
  ...props
}) {
  // Create the video element lazily on the client and handle unsupported/missing sources gracefully
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
  const primaryTextRef = useRef(null);
  const primaryScaleRef = useRef(lightOn ? 0 : 1);
  const secondaryTextRef = useRef(null);
  const secondaryScaleRef = useRef(lightOn ? 0 : 1);

  const baseScale1 = useMemo(() => {
    if (Array.isArray(scale1)) return scale1;
    if (typeof scale1 === "number") return [scale1, scale1, scale1];
    return [1, 1, 1];
  }, [scale1]);

  const baseScale2 = useMemo(() => {
    if (Array.isArray(scale2)) return scale2;
    if (typeof scale2 === "number") return [scale2, scale2, scale2];
    return [1, 1, 1];
  }, [scale2]);

  useEffect(() => {
    if (!primaryTextRef.current) return;
    const initial = Math.max(primaryScaleRef.current, 0.001);
    primaryTextRef.current.visible = primaryScaleRef.current > 0.001;
    primaryTextRef.current.scale.set(
      baseScale1[0] * initial,
      baseScale1[1] * initial,
      baseScale1[2] * initial
    );
  }, [baseScale1]);

  useEffect(() => {
    if (!secondaryTextRef.current) return;
    const initial = Math.max(secondaryScaleRef.current, 0.001);
    secondaryTextRef.current.visible = secondaryScaleRef.current > 0.001;
    secondaryTextRef.current.scale.set(
      baseScale2[0] * initial,
      baseScale2[1] * initial,
      baseScale2[2] * initial
    );
  }, [baseScale2]);

  useEffect(() => {
    if (!video) return;

    const onCanPlay = () => {
      setReady(true);
      video.play().catch(() => setReady(false));
    };
    const onError = () => setReady(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    if (video.readyState >= 2) onCanPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [video]);

  useFrame((_, delta) => {
    if (primaryTextRef.current) {
      primaryScaleRef.current = THREE.MathUtils.damp(
        primaryScaleRef.current,
        lightOn ? 0 : 1,
        4,
        delta
      );

      const scaleValue = Math.max(primaryScaleRef.current, 0.001);
      primaryTextRef.current.visible = primaryScaleRef.current > 0.05;
      primaryTextRef.current.scale.set(
        baseScale1[0] * scaleValue,
        baseScale1[1] * scaleValue,
        baseScale1[2] * scaleValue
      );
    }

    if (secondaryTextRef.current) {
      secondaryScaleRef.current = THREE.MathUtils.damp(
        secondaryScaleRef.current,
        lightOn ? 0 : 1,
        4,
        delta
      );

      const secondaryScaleValue = Math.max(secondaryScaleRef.current, 0.001);
      secondaryTextRef.current.visible = secondaryScaleRef.current > 0.05;
      secondaryTextRef.current.scale.set(
        baseScale2[0] * secondaryScaleValue,
        baseScale2[1] * secondaryScaleValue,
        baseScale2[2] * secondaryScaleValue
      );
    }
  });

  return (
    <>
      <Text
        ref={primaryTextRef}
        font="/Inter-Bold.woff"
        fontSize={fontSize1}
        letterSpacing={-0.03}
        {...props}
        position={position1}
        rotation={rotation1}
        color={"#ffffff"}
        className="bright-text"
      >
        Hello, I&apos;m
        {ready && video ? (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} className="bright-text" fog={false}>
            <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
          </meshBasicMaterial>
        ) : (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} className="bright-text" fog={false} />
        )}
      </Text>
      <Text
        ref={secondaryTextRef}
        font="/Inter-Bold.woff"
        fontSize={fontSize2}
        letterSpacing={-0.03}
        {...props}
        position={position2}
      >
        leo
        {ready && video ? (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} fog={false}>
            <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
          </meshBasicMaterial>
        ) : (
          <meshBasicMaterial toneMapped={false} color={"#ffffff"} fog={false} />
        )}
      </Text>
    </>
  );
}