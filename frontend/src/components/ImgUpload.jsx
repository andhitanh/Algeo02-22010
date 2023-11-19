import React, { useState, useEffect } from 'react'
import ImgUploadIcon from '../assets/upload-image-icon.png'

const ImgUpload = () => {
    const [isWarnaOn, setWarnaOn] = useState(true)

  return (
    <div className='w-full bg-[#faeee7] py-20 px-4'>
        <h1 className='md:text-4xl sm:text-2xl w-full text-2xl text-center text-[#0d0d0d] font-bold my-4 py-4'>Content-Based Image Retrieval</h1>
        <div className='grid max-w-[1240px] mx-auto md:grid-cols-2 justify-between gap-3'>
            {/* ganti dgn upload box*/} 
            <div className='w-[500px] bg-[#fffffe] my-2 py-16 px-4 hover:bg-[#ff8ba7]'>
                <img className='w-[100px] mx-auto my-2' src={ImgUploadIcon} alt="/" />
            </div>
            
            <div className='flex flex-col justify-center'>
                <form action = "/" method="POST" enctype="multipart/form-data"> 
                    <p className='font-bold mx-auto md:mx-0 my-0 py-3 px-5 text-[#33272a]'>IMAGE INPUT</p>
                    <input type="file" name="searchImg" /> 
                    <input type="file" name="dbImgs" multiple /> 
                    <button className='mx-auto font-bold bg-[#ffc6c7] border-2 border-[#eff0f3] w-[150px] rounded-xl md:mx-0 my-5 py-2 hover:bg-[#ff8ba7] hover:text-[#33272a] '>Search</button>

                {/*<div className='flex items-center bg-[#eff0f3] w-[100px] rounded-full p-1 text-[12px]'>
                    <button className='mx-auto bg-[#0d0d0d] text-[#eff0f3] rounded-full p-1 ' >Color</button>
                    <button className='mx-auto bg-[#eff0f3] text-[#0d0d0d] rounded-full p-1 '>Texture</button>
                </div>*/}
                </form>
                <div className='flex items-center bg-[#eff0f3] w-[130px] rounded-full p-1 text-[14px]'>
                <button onClick={()=> setWarnaOn(true)} className='mx-auto bg-[#ff8ba7] text-[#eff0f3] rounded-full p-2 '>Color</button>
                <button onClick={()=> setWarnaOn(false)} className='mx-auto bg-[#eff0f3] text-[#ff8ba7] rounded-full p-2 '>Texture</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ImgUpload
//<div className='flex mx-auto bg-[#eff0f3] w-[100px] rounded-full p-1 text-[12px]'>
//<img className='w-full max-h-[100px] mx-auto my-2' src={ImgUploadIcon} alt="/" />