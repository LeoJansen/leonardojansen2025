"use client";

import { Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DissolveMaterial } from "./materials/DissolveMaterial";

const SPOTLIGHT_APPEAR_DELAY_MS = 520;

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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [video, setVideo] = useState(null);

  const [ready, setReady] = useState(false);
  const textRef = useRef(null);
  const materialRef = useRef(null);
  const initialActive = Boolean(active && message);
  const progressRef = useRef(initialActive ? 1.2 : -0.2);
  const [videoTexture, setVideoTexture] = useState(null);
  const [internalActive, setInternalActive] = useState(initialActive);
  const previousActiveRef = useRef(initialActive);

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.visible = progressRef.current > -0.05;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let idleId;
    let timeoutId;
    const schedule = () => setShouldLoadVideo(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(schedule, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(schedule, 800);
    }

    return () => {
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return undefined;

    const vid = document.createElement("video");
    Object.assign(vid, {
      src: videoSrc || "/assets/drei.mp4",
      crossOrigin: "anonymous",
      loop: true,
      muted: true,
      playsInline: true,
      preload: "metadata",
    });
    setVideo(vid);

    return () => {
      vid.pause();
      vid.removeAttribute("src");
      vid.load();
    };
  }, [shouldLoadVideo, videoSrc]);

  useEffect(() => {
    if (!video) {
      setReady(false);
      return;
    }

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

    if (!message) {
      setInternalActive(false);
      previousActiveRef.current = false;
      if (textRef.current) {
        textRef.current.visible = false;
      }
      return () => {};
    }

    if (active) {
      if (!previousActiveRef.current) {
        timer = window.setTimeout(() => setInternalActive(true), SPOTLIGHT_APPEAR_DELAY_MS);
      } else {
        setInternalActive(true);
      }
    } else {
      setInternalActive(false);
    }

    previousActiveRef.current = active;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, message]);

  useFrame((_, delta) => {
    if (!textRef.current) return;

    const target = internalActive && message ? 1.2 : -0.2;
    progressRef.current = THREE.MathUtils.damp(
      progressRef.current,
      target,
      transitionSpeed,
      delta
    );

    textRef.current.visible = progressRef.current > -0.05;

    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressRef.current;
    }

    if (videoTexture) {
      videoTexture.needsUpdate = true;
    }
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
      scale={finalScale}
      {...props}
    >
      {message}
      <DissolveMaterial
        ref={materialRef}
        color={color}
        edgeColor="#d7a5ff"
        progress={progressRef.current}
        map={ready ? videoTexture : null}
      />
    </Text>
  );
}
