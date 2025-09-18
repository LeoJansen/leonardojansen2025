import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section id="about" className='flex w-full h-full'>
      <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-10'>
        <div className='w-full md:w-1/2 p-5 flex flex-col gap-5'>

        </div>
        <Image
          src='/assets/leoPic.png'
          alt='About Me'
          width={928}
          height={1120}
          quality={100}
          className={`rounded-lg shadow-md w-[${928/2}px] h-[${1120/2}px]`} />
      </div>
    </section>
  )
}

export default About