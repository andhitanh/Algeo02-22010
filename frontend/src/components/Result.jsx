import React, { useState, useEffect} from 'react'
import axios from "axios";
import {data} from '../images/images.js'
import Data from '../test.json'

const Result = () => {
    const [imgs, setImages] = useState(data)
    const [imgs2, setImages2] = useState([]);

    //first render
    const fetchImage = async () => {
        const url = "http://127.0.0.1:5000/images";
        const { data } = await axios.get(url);
        setImages2(data);
        console.log(data);
    }

    useEffect(() => {
        fetchImage();
    }, []);
    
    const handleClick = () => {
        fetchImage();
    }

    //Filter warna
    const filterColor = () => {
        setImages(
            data.filter((item) => {
                return item.colorSimilarity >= 60;
            })
            );
    };
    //Filter tekstur
    const filterTexture = () => {
        setImages(
            data.filter((item) => {
                return item.textureSimilarity >= 60;
            })
            );
    };
            
    return (
        <div className='max-w-[1240px] m-auto px-4 py-10 '>
            {/* Filter*/}
            <div className='flex items-center bg-[#eff0f3] w-[130px] rounded-full p-1 text-[14px]'>
                <button onClick={()=> filterColor()} className='mx-auto bg-[#0d0d0d] text-[#eff0f3] rounded-full p-2 '>Color</button>
                <button onClick={()=> filterTexture()} className='mx-auto bg-[#eff0f3] text-[#0d0d0d] rounded-full p-2 '>Texture</button>
            </div>

            <h1 className='font-bold text-2xl text-center'>Result</h1>

            {/* Display Result Images*/}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 '>
                {imgs.map((item,index) => (
                    <div key={index} className='border shadow-lg-2xl rounded-lg'>
                        <img src={item.image} alt={item.name}
                        className='w-full h-[200px] object-cover rounded-t-lg'/>
                        <div className='flex justify-between px-2 py-3'>
                            <p className='font-bold'>{item.name}</p>
                            <p>
                                <span className='bg-[#0d0d0d] text-[14px] text-[#eff0f3] font-semibold rounded-full p-1'>{item.colorSimilarity}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <button className='mx-auto font-bold bg-[#fffffe] border-2 border-[#2a2a2a] w-[150px] rounded-xl md:mx-0 my-0 py-2 hover:bg-[#2a2a2a] hover:text-[#fffffe]' onClick={handleClick}>Get image now!</button>
                <h3 className='font-bold text-2xl text-center'>Results : {Data.length}</h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 '>
                    {Data.map((Data,index) => (
                        <div key={index} className='border shadow-lg-2xl rounded-lg'>
                            <img src={"http://127.0.0.1:5000/../frontend/src/img/" + Data.path} alt=".."
                            className='w-full h-[200px] object-cover rounded-t-lg'/>
                            <div className='flex justify-between px-2 py-3'>
                                <p className='font-bold'>{Data.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
        </div>
    )
}

export default Result
// setClickedWarna((prevFilter) => !prevFilter);
// const getPercentage = (data) => {
//     return clickedWarna ? data.colorSimilarity : data.textureSimilarity;
// };                <img src="{}" alt="" />
// {profileData && <div>
//     <p>Image id: {imgs2.img_id}</p></div>
// }
// function getImages() {
//     axios.get("http://127.0.0.1:5000/images")
//     .then((respongse) => {
//         setImages2(response)})
//     .catch((error) => {
//         if (error.response) {
//             console.log(error.response)
//             console.log(error.response.status)
//             console.log(error.response.headers)
//         }
//     })
// } "../img/{item.img}" `${../img/}/${Data.path}`
// function getImages() {
//     axios.post("http://127.0.0.1:5000/uploads", {
        
//     })
//     .then((response) => {
//         setImages2(response.data)})
//     .catch((error) => {
//         if (error.response) {
//             console.log(error.response)
//             console.log(error.response.status)
//             console.log(error.response.headers)
//         }
//     })
// } /Users/usagitsukino/Desktop/cbir-frontend/Algeo02-22010/frontend/src/img/beach-sunset.jpg