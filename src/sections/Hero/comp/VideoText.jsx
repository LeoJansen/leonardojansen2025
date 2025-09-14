"use client";
import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
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

  return (
    <>
      <Text
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