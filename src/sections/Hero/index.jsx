"use client";

import { Canvas } from '@react-three/fiber'

import { Button } from '../../components/ui/button';
import { CanvasComponent } from './comp/CanvasComponent';
import { useCallback, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [spotsOn, setSpotsOn] = useState(true)

  return (
    <section id="home" className='relative w-screen h-screen overflow-hidden'>
      <div className="absolute inset-0">
        <Canvas
          shadows
          className="!w-full !h-full"
          gl={{ alpha: false, physicallyCorrectLights: true }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 13], fov: 15 }}
         
        >
          <CanvasComponent spotsOn={spotsOn} />
        </Canvas>
      </div>
      <div  onClick={() => setSpotsOn((v) => !v)}>
      <Image
        src="/assets/switch.svg"
        alt="Switch"
        width={40}
        height={40}
        className="absolute bottom-50 right-20 w-10 h-10 z-10 cursor-pointer select-none"
       
      />
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        {/* <a href="#about" className="w-fit">
          <Button className="sm:w-fit w-full sm:min-w-96">Let's work together</Button>
        </a> */}
      </div>
    </section>
  )
}






