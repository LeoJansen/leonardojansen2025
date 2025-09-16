import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section className='flex w-full h-full'>
      <div className='grid grid-cols-2 w-full h-full text-[#979797] mt-20'>
        <div className='flex flex-col justify-center items-center p-10  '>
          <div className='flex border-4 rounded-lg border-[#ac7bb6] mb-4'>
            <Image src='/assets/services1.png' alt='About Me' width={500} height={500} className='rounded-lg shadow-md w-80 h-80' />
          </div> 

          <h1 className='text-2xl font-semibold mt-4'>Web Application Development</h1>
          <p className='text-lg text-gray-600 mt-6'>I build robust and scalable applications from the ground up, leveraging the power of Next.js and React to deliver high-performance solutions.</p>

        </div>
        <div className='flex flex-col justify-center items-center p-10'>
          <div className='flex border-4 rounded-lg border-[#ac7bb6] mb-4'>
            <Image src='/assets/services2.png' alt='My Journey' width={500} height={500} className='rounded-lg shadow-md w-80 h-80' />
          </div>
          <h2 className='text-2xl font-semibold mb-4'>Technical Consulting</h2>
          <p className='text-lg text-gray-600 mb-6'>I offer technical consulting to help you optimize, refactor, or plan your project. I assist in finding the best solutions and implementing efficient practices.</p>

        </div>
        <div className='flex flex-col justify-center items-center p-10'>
          <div className='flex border-4 rounded-lg border-[#ac7bb6] mb-4'>
            <Image src='/assets/services3.png' alt='Skills & Expertise' width={500} height={500} className='rounded-lg shadow-md w-80 h-80' />
          </div>
          <h2 className='text-2xl font-semibold mb-4'>Performance Optimization & SEO</h2>
          <p className='text-lg text-gray-600 mb-6'>I transform the user experience by ensuring a fast website with high scores in Core Web Vitals, which improves your ranking on search engines.</p>

        </div>
        <div className='flex flex-col justify-center items-center p-10'>
          <div className='flex border-4 rounded-lg border-[#ac7bb6] mb-4'>
            <Image src='/assets/services4.png' alt='Get in Touch' width={500} height={500} className='rounded-lg shadow-md w-80 h-80' />
          </div>
          <h2 className='text-2xl font-semibold mb-4'>CMS Integration</h2>
          <p className='text-lg text-gray-600 mb-6'>I integrate Content Management Systems like Contentful, Sanity, or Strapi, giving you the power to easily manage and update your website's content.</p>

        </div>

      </div>
    </section>
  )
}

export default About