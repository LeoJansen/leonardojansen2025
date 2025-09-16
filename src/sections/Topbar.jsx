import React from 'react'
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

  return (
    <nav className='absolute flex w-full h-16 items-center justify-center z-20'>
      <div className='fixed flex items-center gap-8 bg-[#0000002a] rounded-[20px] h-10 px-8 py-0 hover:backdrop-blur-[1px] transition transition-discrete hover:bg-[#0000003a]'>
        {items.map((label) => (
          <Button key={label} variant='ghost' size='sm' className='text-[#746A76] tracking-widest'>
            {label}
          </Button>
        ))} 

      </div>
    </nav>
  )
}

export default Topbar