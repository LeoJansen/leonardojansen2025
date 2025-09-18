import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section id="about" className='flex w-full h-full'>
      <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-10'>
        <div className='w-full md:w-1/2  flex flex-col p-20'>
        <h3 className='text-[40px] font-extralight text-[#808080] text-right'>“Programming is not just a vocation for me. It's what I was <strong className='font-regular text-[#87659e]'>born to do</strong>. Every time I get involved in a project and start coding, I feel that my purpose in life is to be in contact with algorithms.”</h3>

        </div>
        <div className='w-full md:w-1/2 flex'>
          {/* Outer wrapper creates the colored/gradient "border" */}
          <div className='relative w-full rounded-l-[350px] p-[7px] pr-0 bg-gradient-to-l from-[hsl(0,0%,5%)] via-[hsl(0,0%,9%)] to-[hsl(0,0%,5%)]'>
            {/* Inner wrapper holds the image and clips it so the padding shows as a border */}
            <div className='w-full h-full rounded-l-[340px] overflow-hidden bg-[#050505] shadow-lg'>
              <Image
                src='/assets/leoPic.png'
                alt='About Me'
                width={928}
                height={1120}
                quality={100}
                className='w-full h-full object-cover'
                priority
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default About