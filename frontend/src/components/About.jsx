import React from 'react'
import fotbar from '../logo/816564.jpg'

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#faeee7] text-[#594a4e]'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full px-4 gap-8'>
                <div className='sm:text-right pb-8'>
                <h1 className='font-bold text-6xl text-center text-[#33272a]'>About Us</h1>
                </div>
            </div>
            <div className='max-w-[1000px] w-full px-4 gap-8'>
                <img src={fotbar} alt="Logo" className="mx-auto w-35 h-32"/>
            </div>
            <div className='max-w-[1000px] w-full py-5 gap-8 mx-auto'>
                <p className='text-xl text-center text-[#33272a]'>CBIR Color-Based and CBIR Texture-Based website created by Maju Jalan Team.</p>
                <p className='text-xl text-center text-[#33272a]'>Maju Jalan Team consists of Kayla, Flora, and Dhita</p>
            </div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default About
