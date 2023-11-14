import React from 'react'
import ImgUploadIcon from '../assets/upload-image-icon.png'

const ImgUpload = () => {
  return (
    <div className='w-full bg-[#fffffe] py-16 px-4'>
        <h1 className='md:text-4xl sm:text-2xl w-full text-2xl text-center text-[#0d0d0d] font-bold my-4 py-4'>Content-Based Image Retrieval</h1>
        <div className='grid max-w-[1240px] mx-auto md:grid-cols-2 justify-between gap-3'>
            {/* ganti dgn upload box*/} 
            <div className='w-[500px] bg-[#eff0f3] my-2 py-16 px-4'>
                <img className='w-[100px] mx-auto my-2' src={ImgUploadIcon} alt="/" />
            </div>
            
            <div className='flex flex-col justify-center'>
                {/* FORM*/}
                <p className='mx-auto md:mx-0 my-0 py-2 px-2'>Image Input</p>
                <button className='mx-auto font-bold bg-[#fffffe] border-2 border-[#2a2a2a] w-[150px] rounded-xl md:mx-0 my-0 py-2 hover:bg-[#2a2a2a] hover:text-[#fffffe] '>Insert an Image</button>
                <button className='mx-auto font-bold bg-[#fffffe] border-2 border-[#2a2a2a] w-[150px] rounded-xl md:mx-0 my-5 py-2 hover:bg-[#2a2a2a] hover:text-[#fffffe] '>Search</button>

                {/*<div className='flex items-center bg-[#eff0f3] w-[100px] rounded-full p-1 text-[12px]'>
                    <button className='mx-auto bg-[#0d0d0d] text-[#eff0f3] rounded-full p-1 ' >Color</button>
                    <button className='mx-auto bg-[#eff0f3] text-[#0d0d0d] rounded-full p-1 '>Texture</button>
                </div>*/}
            </div>
        </div>
    </div>
  )
}

export default ImgUpload
//<div className='flex mx-auto bg-[#eff0f3] w-[100px] rounded-full p-1 text-[12px]'>
//<img className='w-full max-h-[100px] mx-auto my-2' src={ImgUploadIcon} alt="/" />