import React, { useState, useEffect } from 'react'
import ImgUploadIcon from '../assets/upload-image-icon.png'

const ImgUpload = () => {
    const [isWarnaOn, setWarnaOn] = useState(true)
    const [searchImgUrl, setSearchImgUrl] = useState(null)

    
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
          const formData = new FormData(e.target)
          const response = await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            body: formData,
          })
    
          const data = await response.json()
          setSearchImgUrl(data.imageUrl) 
        } catch (error) {
          console.error('Error submitting form:', error)
        }
      }



  return (
    <div className='w-full bg-[#faeee7] py-20 px-4'>
        <h1 className='md:text-4xl sm:text-2xl w-full text-2xl text-center text-[#0d0d0d] font-bold my-4 py-4'>Content-Based Image Retrieval</h1>
        <div className='grid max-w-[1240px] mx-auto md:grid-cols-2 justify-between gap-3'>
            {/* ganti dgn upload box*/} 
            <div className='w-[500px] bg-[#fffffe] my-2 py-16 px-4 hover:bg-[#ff8ba7]'>
                {searchImgUrl ? (
                <img className='w-full h-auto mx-auto my-2' src={searchImgUrl} alt='Search Image' />
                ) : (
                <img className='w-[100px] mx-auto my-2' src={ImgUploadIcon} alt='Default Image' />
                )}
            </div>
            
            <div className='flex flex-col justify-center'>
                <form onSubmit={handleSubmit}  enctype="multipart/form-data"> 
                    <p className='font-bold mx-auto md:mx-0 my-0 py-3 px-5 text-[#33272a]'>IMAGE INPUT</p>
                    <input type="file" name="searchImg" onChange={(e) => {setSearchImgUrl(URL.createObjectURL(e.target.files[0]))}}/> 
                    <input type="file" name="dbImgs" multiple /> 
                    <button type="submit" className='mx-auto font-bold bg-[#ffc6c7] border-2 border-[#eff0f3] w-[150px] rounded-xl md:mx-0 my-5 py-2 hover:bg-[#ff8ba7] hover:text-[#33272a] '>Search</button>

                </form>

                {/* <button onClick={()=> setWarnaOn(true)} className='mx-auto bg-[#ff8ba7] text-[#eff0f3] rounded-full p-2 '>Color</button>
                <button onClick={()=> setWarnaOn(false)} className='mx-auto bg-[#eff0f3] text-[#ff8ba7] rounded-full p-2 '>Texture</button> */}
            
            </div>
        </div>
    </div>
  )
}

export default ImgUpload
//<div className='flex mx-auto bg-[#eff0f3] w-[100px] rounded-full p-1 text-[12px]'>
//<img className='w-full max-h-[100px] mx-auto my-2' src={ImgUploadIcon} alt="/" />