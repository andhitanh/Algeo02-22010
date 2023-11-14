import React from 'react'

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#eff0f3] text-[#2a2a2a]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8'>
                <div className='sm:text-right pb-8 pl-4'>
                    <p className='text-2xl font-bold inline border-b-4 border-[#2a2a2a]'>About Us</p>
                </div>
            </div>
            <div className='max-w-[1000px] w-full px-4 grid grid-cols-2 gap-8'>
                <p className='sm:text-right pb-8 pl-4'>Ini tubes algeo majujalan. Ada Kayla, Flora, dan Dhita.</p>
            </div>
        </div>
    </div>
  )
}

export default About
