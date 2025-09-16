"use client";

import { Canvas } from '@react-three/fiber'

import { Button } from '../../components/ui/button';
import { CanvasComponent } from './comp/CanvasComponent';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap'
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Hero() {
  const [spotsOn, setSpotsOn] = useState(false)
  // Avoid SSR/client hydration mismatch for Radix Tooltip by rendering it only on the client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Ref to the purple circular switch button to animate with GSAP
  const switchRef = useRef(null)

  useEffect(() => {
    // Only run when the tooltip/button has mounted in the DOM
    if (!mounted || !switchRef.current) return

    // Respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // Subtle blinking via opacity (autoAlpha) and a small scale pulse
    const tween = gsap.to(switchRef.current, {
      autoAlpha: 0.6,
      opacity: 0.6,
      duration: 1.7,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [mounted])

  return (
    <section id="home" className='relative w-screen h-screen overflow-hidden'>
      <div className="absolute inset-0">
        <Canvas
          shadows
          className="!w-full !h-full"
          gl={{ alpha: false, physicallyCorrectLights: true }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 14], fov: 15 }}

        >
          <CanvasComponent spotsOn={spotsOn} />
        </Canvas>
      </div>
      <div onClick={() => setSpotsOn((v) => !v)}>
        {mounted && (
          <Tooltip defaultOpen={true}>
            <TooltipTrigger asChild>
              <div ref={switchRef} className='bg-[#7F0098] absolute flex justify-center items-center bottom-50 right-20 w-10 h-10 z-10 cursor-pointer select-none rounded-full '>
                <Image
                  src="/assets/switch.svg"
                  alt="Switch"
                  width={40}
                  height={40}
                  className="bottom-50 right-20 w-10 h-9 z-9 cursor-pointer select-none"
                />
              </div>

            </TooltipTrigger>
            <TooltipContent>
              <p>Turn on the lights</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        {/* <a href="#about" className="w-fit">
          <Button className="sm:w-fit w-full sm:min-w-96">Let's work together</Button>
        </a> */}
      </div>
    </section>
  )
}






