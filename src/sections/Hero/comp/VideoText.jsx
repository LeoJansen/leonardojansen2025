"use client";
import { Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DissolveMaterial } from "./materials/DissolveMaterial";

const TEXT_APPEAR_DELAY_MS = 520;

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
  const secondaryTextRef = useRef(null);
  const primaryMaterialRef = useRef(null);
  const secondaryMaterialRef = useRef(null);
  const initialVisible = !lightOn;
  const primaryProgressRef = useRef(initialVisible ? 1.2 : -0.2);
  const secondaryProgressRef = useRef(initialVisible ? 1.2 : -0.2);
  const [videoTexture, setVideoTexture] = useState(null);
  const [shouldShow, setShouldShow] = useState(initialVisible);
  const previousLightOnRef = useRef(lightOn);

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

  useEffect(() => {
    if (!ready) {
      setVideoTexture((current) => {
        if (current) {
          current.dispose();
        }
        return null;
      });
      return;
    }

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    setVideoTexture((current) => {
      if (current) {
        current.dispose();
      }
      return texture;
    });

    return () => {
      texture.dispose();
    };
  }, [ready, video]);

  useEffect(() => {
    let timer;

    if (lightOn) {
      setShouldShow(false);
    } else {
      if (previousLightOnRef.current) {
        timer = window.setTimeout(() => setShouldShow(true), TEXT_APPEAR_DELAY_MS);
      } else {
        setShouldShow(true);
      }
    }

    previousLightOnRef.current = lightOn;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [lightOn]);

  useFrame((_, delta) => {
    const target = shouldShow ? 1.2 : -0.2;

    primaryProgressRef.current = THREE.MathUtils.damp(
      primaryProgressRef.current,
      target,
      4,
      delta
    );

    secondaryProgressRef.current = THREE.MathUtils.damp(
      secondaryProgressRef.current,
      target,
      4,
      delta
    );

    if (primaryMaterialRef.current) {
      primaryMaterialRef.current.uniforms.uProgress.value = primaryProgressRef.current;
    }

    if (secondaryMaterialRef.current) {
      secondaryMaterialRef.current.uniforms.uProgress.value = secondaryProgressRef.current;
    }

    if (primaryTextRef.current) {
      primaryTextRef.current.visible = primaryProgressRef.current > -0.05;
    }

    if (secondaryTextRef.current) {
      secondaryTextRef.current.visible = secondaryProgressRef.current > -0.05;
    }

    if (videoTexture) {
      videoTexture.needsUpdate = true;
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
        scale={baseScale1}
      >
        Hello, I&apos;m
        <DissolveMaterial
          ref={primaryMaterialRef}
          color="#ffffff"
          edgeColor="#d7a5ff"
          progress={primaryProgressRef.current}
          map={ready ? videoTexture : null}
        />
      </Text>
      <Text
        ref={secondaryTextRef}
        font="/Inter-Bold.woff"
        fontSize={fontSize2}
        letterSpacing={-0.03}
        {...props}
        position={position2}
        scale={baseScale2}
      >
        leo
        <DissolveMaterial
          ref={secondaryMaterialRef}
          color="#ffffff"
          edgeColor="#d7a5ff"
          progress={secondaryProgressRef.current}
          map={ready ? videoTexture : null}
        />
      </Text>
    </>
  );
}