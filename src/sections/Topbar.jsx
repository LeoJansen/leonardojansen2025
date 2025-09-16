"use client"
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'

const Topbar = () => {
  const items = [
    'Home',
    'Services',
    'About Me',
    'Projects',
    'Skills',
    'Testimonials',
    'Contact',
  ]

  const containerRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      // Create a timeline to control the blinking sequence
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power1.inOut' } })

      // Step 1: fade slightly and scale down, with stagger from edges
      tl.to('.topbar-btn', {
        autoAlpha: 0.86,
        scale: 0.998,
        opacity: 0.86,
        duration: 0.7895,
        stagger: { each: 0.7891},
      })
      // Step 2: return to full visibility/scale
        .to('.topbar-btn', {
          autoAlpha: 1,
          opacity: 1,
          scale: 1,
          duration: 0.7895,
          stagger: { each: 0.7891 },
        })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav ref={containerRef} className='absolute flex w-full h-16 items-center justify-center z-20 '>
      <div className='fixed flex items-center gap-8 bg-[#0000002a] rounded-[20px] h-10 px-8 py-0 hover:backdrop-blur-[1px] transition-all transition- transition-discrete hover:bg-[#080808]'>
        {items.map((label) => (
          <Button key={label} variant='ghost' size='sm' className='topbar-btn text-[#746A76] tracking-widest'>
            {label}
          </Button>
        ))} 

      </div>
    </nav>
  )
}

export default Topbar