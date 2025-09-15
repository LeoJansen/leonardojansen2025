"use client";

import { Canvas } from '@react-three/fiber'

import { Button } from '../../components/ui/button';
import { CanvasComponent } from './comp/CanvasComponent';
import { useCallback, useState } from 'react';

export default function Hero() {
  const [spotsOn, setSpotsOn] = useState(true)
  const handlePointerDown = useCallback((e) => {
    // Left button only
    if (e.button === 0) {
      setSpotsOn((v) => !v)
    }
  }, [])

  return (
    <section id="home" className='relative w-screen h-screen overflow-hidden'>
      <div className="absolute inset-0">
        <Canvas
          shadows
          className="!w-full !h-full"
          gl={{ alpha: false, physicallyCorrectLights: true }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 13], fov: 15 }}
          onPointerDown={handlePointerDown}
        >
          <CanvasComponent spotsOn={spotsOn} />
        </Canvas>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        {/* <a href="#about" className="w-fit">
          <Button className="sm:w-fit w-full sm:min-w-96">Let's work together</Button>
        </a> */}
      </div>
    </section>
  )
}






