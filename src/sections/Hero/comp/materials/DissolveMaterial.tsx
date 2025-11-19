"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import * as THREE from "three";
import type { ColorRepresentation } from "three";

const DissolveMaterialImpl = shaderMaterial(
  {
    uProgress: 0,
    uEdgeWidth: 0.12,
    uNoiseScale: 5,
    uColor: new THREE.Color(0xffffff),
    uEdgeColor: new THREE.Color(0xf7d4ff),
    uMap: null,
    uUseMap: 0,
    uOpacity: 1,
  },
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vWorldPos;

    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    uniform float uProgress;
    uniform float uEdgeWidth;
    uniform float uNoiseScale;
    uniform vec3 uColor;
    uniform vec3 uEdgeColor;
    uniform sampler2D uMap;
    uniform float uUseMap;
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vWorldPos;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float n000 = hash(i + vec3(0.0, 0.0, 0.0));
      float n100 = hash(i + vec3(1.0, 0.0, 0.0));
      float n010 = hash(i + vec3(0.0, 1.0, 0.0));
      float n110 = hash(i + vec3(1.0, 1.0, 0.0));
      float n001 = hash(i + vec3(0.0, 0.0, 1.0));
      float n101 = hash(i + vec3(1.0, 0.0, 1.0));
      float n011 = hash(i + vec3(0.0, 1.0, 1.0));
      float n111 = hash(i + vec3(1.0, 1.0, 1.0));

      float nx00 = mix(n000, n100, f.x);
      float nx10 = mix(n010, n110, f.x);
      float nx01 = mix(n001, n101, f.x);
      float nx11 = mix(n011, n111, f.x);

      float nxy0 = mix(nx00, nx10, f.y);
      float nxy1 = mix(nx01, nx11, f.y);

      return mix(nxy0, nxy1, f.z);
    }

    void main() {
      float threshold = clamp(uProgress, -0.25, 1.25);
      float dissolveNoise = noise(vWorldPos * uNoiseScale);
      float visibility = 1.0 - smoothstep(threshold - uEdgeWidth, threshold + uEdgeWidth, dissolveNoise);
      visibility = clamp(visibility, 0.0, 1.0);

      vec3 baseColor = uColor;
      if (uUseMap > 0.5) {
        vec4 mapColor = texture(uMap, vUv);
        baseColor *= mapColor.rgb;
      }

      vec3 finalColor = mix(uEdgeColor, baseColor, visibility);
      gl_FragColor = vec4(finalColor, visibility * uOpacity);
    }
  `
);

extend({ DissolveMaterialImpl });

type DissolveMaterialProps = {
  color?: ColorRepresentation;
  edgeColor?: ColorRepresentation;
  progress?: number;
  edgeWidth?: number;
  noiseScale?: number;
  map?: THREE.Texture | null;
  opacity?: number;
};

export const DissolveMaterial = forwardRef<THREE.ShaderMaterial, DissolveMaterialProps>(
  (
    {
      color = "#ffffff",
      edgeColor = "#f7d4ff",
      progress = 0,
      edgeWidth = 0.12,
      noiseScale = 5,
      map = null,
      opacity = 1,
    },
    ref
  ) => {
    const material = useMemo(() => {
      const mat = new DissolveMaterialImpl();
      mat.transparent = true;
      mat.depthWrite = false;
      return mat;
    }, []);

    useImperativeHandle(ref, () => material, [material]);

    useEffect(() => {
      material.uniforms.uColor.value.set(color);
    }, [color, material]);

    useEffect(() => {
      material.uniforms.uEdgeColor.value.set(edgeColor);
    }, [edgeColor, material]);

    useEffect(() => {
      material.uniforms.uEdgeWidth.value = edgeWidth;
    }, [edgeWidth, material]);

    useEffect(() => {
      material.uniforms.uNoiseScale.value = noiseScale;
    }, [noiseScale, material]);

    useEffect(() => {
      material.uniforms.uOpacity.value = opacity;
    }, [opacity, material]);

    useEffect(() => {
      material.uniforms.uMap.value = map;
      material.uniforms.uUseMap.value = map ? 1 : 0;
      if (map) {
        map.needsUpdate = true;
      }
    }, [map, material]);

    useEffect(() => {
      material.uniforms.uProgress.value = progress;
    }, [progress, material]);

    return <primitive object={material} attach="material" />;
  }
);

DissolveMaterial.displayName = "DissolveMaterial";
