const createLightText = (textConfig, overrides = {}) => {
  if (!textConfig || !Array.isArray(textConfig.position)) {
    return null;
  }

  const position = textConfig.position ?? [0, 0, 0];
  const rotation = textConfig.rotation ?? [0, 0, 0];
  const fontSize = textConfig.fontSize ?? 0.6;
  const { offset = [0, -1.18, -0.01], ...rest } = overrides;

  const baseFontSize = rest.fontSize ?? fontSize;
  const baseRotation = rest.rotation ?? rotation;

  const base = {
    position: [
      (position[0] ?? 0) + (offset[0] ?? 0),
      (position[1] ?? 0) + (offset[1] ?? 0),
      (position[2] ?? 0) + (offset[2] ?? -0.01),
    ],
    rotation: baseRotation,
    fontSize: baseFontSize,
    maxWidth: rest.maxWidth ?? Math.max(baseFontSize * 10, 2.4),
    lineHeight: rest.lineHeight ?? 1.1,
    letterSpacing: rest.letterSpacing ?? -0.03,
    anchorX: rest.anchorX ?? "center",
    anchorY: rest.anchorY ?? "middle",
    finalScale: rest.finalScale ?? 1,
  };

  return { ...base, ...rest };
};

export const calculateSizes = (isSmall, isMobile, isTablet, isPC, isXL) => {
  if (isSmall) {
    const config = {
      avatar: {
        position: [-0.5, -2, -1],
        rotation: [55, 0, 1],
        scale: 1,
      },
      videoText: {
        text1: {
          position: [-0.16782, -0.2589, -5],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 0.4,
        },
        text2: {
          position: [0, -1, -5],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 1.5,
        },
      },
      chair: {
        position: [-0.5, -2, -1],
        scale: 0.01,
        rotation: [0, 1, 0],
      },
    };

    return {
      ...config,
      lightText: createLightText(config.videoText.text1),
    };
  }

  if (isMobile) {
    const config = {
      avatar: {
        position: [-0.71, -2, -1],
        rotation: [55, 0, 1],
        scale: 1,
      },
      videoText: {
        text1: {
          position: [-0.2125, 0.05, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 0.5,
        },
        text2: {
          position: [0.2, -0.981, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 2,
        },
      },
      chair: {
        position: [-0.71, -2, -1],
        scale: 0.01,
        rotation: [0, 1, 0],
      },
    };

    return {
      ...config,
      lightText: createLightText(config.videoText.text1),
    };
  }

  if (isTablet) {
    const config = {
      avatar: {
        position: [-1.7, -2, -2],
        rotation: [55, 0, 1],
      },
      videoText: {
        text1: {
          position: [-0.61, 0.5, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 0.6,
        },
        text2: {
          position: [0, -0.81, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 2.8,
        },
      },
      chair: {
        position: [-1.7, -2, -2],
        scale: 0.01,
        rotation: [0, 1, 0],
      },
    };

    return {
      ...config,
      lightText: createLightText(config.videoText.text1),
    };
  }

  if (isPC) {
    const config = {
      avatar: {
        position: [-2.4, -2, -2],
        rotation: [55, 0, 1],
      },
      videoText: {
        text1: {
          position: [-0.61, 0.5, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 0.6,
        },
        text2: {
          position: [0, -0.81, -4],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 2.8,
        },
      },
      chair: {
        position: [-2.4, -2, -2],
        scale: 0.01,
        rotation: [0, 1, 0],
      },
    };

    return {
      ...config,
      lightText: createLightText(config.videoText.text1),
    };
  }

  if (isXL) {
    const config = {
      avatar: {
        position: [-3, -2, -2],
        rotation: [55, 0, 1],
      },
      videoText: {
        text1: {
          position: [-0.5495681, 0.6, -7],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 0.7,
        },
        text2: {
          position: [0, -0.81, -7],
          rotation: [0, 0, 0],
          scale: 1,
          fontSize: 3,
        },
      },
      chair: {
        position: [-3, -2, -2],
        scale: 0.01,
        rotation: [0, 1, 0],
      },
    };

    return {
      ...config,
      lightText: createLightText(config.videoText.text1),
    };
  }

  return {
    avatar: {
      position: [-2.4, -2, -2],
      rotation: [55, 0, 1],
    },
    videoText: {
      text1: {
        position: [-0.61, 0.5, -4],
        rotation: [0, 0, 0],
        scale: 1,
        fontSize: 0.6,
      },
      text2: {
        position: [0, -0.81, -4],
        rotation: [0, 0, 0],
        scale: 1,
        fontSize: 2.8,
      },
    },
    chair: {
      position: [-2.4, -2, -2],
      scale: 0.01,
      rotation: [0, 1, 0],
    },
    lightText: createLightText({
      position: [-0.61, 0.5, -4],
      rotation: [0, 0, 0],
      fontSize: 0.6,
    }),
  };
};
