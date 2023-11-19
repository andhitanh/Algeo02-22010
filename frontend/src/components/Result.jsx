import React, { useState, useEffect } from 'react'
import {data} from '../images/images.js'
import Pagination from './Pagination'

const Result = ({ currentPage, setCurrentPage, imagesPerPage }) => {
    const [imgs, setImages] = useState(data)
    const [isWarnaOn, setWarnaOn] = useState(true)
    
    useEffect(() => {
    //     // Calculate the index range for the current page
    //     const startIndex = (currentPage - 1) * imagesPerPage;
    //     const endIndex = startIndex + imagesPerPage;
    
    //     // Slice the data array to get only the images for the current page
    //     const displayedImages = data.slice(startIndex, endIndex);
    
    //     setImages(displayedImages);
    // }, [currentPage, imagesPerPage, isWarnaOn]);
        if (isWarnaOn){
            fetch('/searchWarna')
                .then((res) => res.json())
                .then(data => {
                setImages(data);
            })
        }
        else{
            fetch('/searchTekstur')
                .then((res) => res.json())
                .then(data => {
                setImages(data);
                console.log(data);
            })
        }
    }, [currentPage, imagesPerPage, isWarnaOn]);

    // //Filter warna
    //     const filterColor = () => {
    //     setWarnaOn(true)
    //     // setImages(
    //     //     data.filter((item) => {
    //     //         return item.colorSimilarity >= 60;
    //     //     })
    //     //     );
    //     setCurrentPage(1);
    //     };
    //     //Filter tekstur
    //     const filterTexture = () => {
    //     setWarnaOn(false)
    //     // setImages(
    //     //         data.filter((item) => {
    //     //             return item.textureSimilarity >= 60;
    //     //         })
    //     //         );
    //     setCurrentPage(1);
    //     };
            
            
//             return (
//                 <div className='max-w-[1240px] m-auto px-4 py-10 '>
//             {/* Filter*/}
//             <div className='flex items-center bg-[#eff0f3] w-[130px] rounded-full p-1 text-[14px]'>
//                 <button onClick={()=> filterColor()} className='mx-auto bg-[#0d0d0d] text-[#eff0f3] rounded-full p-2 '>Color</button>
//                 <button onClick={()=> filterTexture()} className='mx-auto bg-[#eff0f3] text-[#0d0d0d] rounded-full p-2 '>Texture</button>
//             </div>

//             <h1 className='font-bold text-2xl text-center'>Result</h1>

//             {/* Display Result Images*/}
//             <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 '>
//                 {imgs.map((item,index) => (
//                     <div key={index} className='border shadow-lg-2xl rounded-lg'>
//                         <img src={item.image} alt={item.name}
//                         className='w-full h-[200px] object-cover rounded-t-lg'/>
//                         <div className='flex justify-between px-2 py-3'>
//                             <p className='font-bold'>{item.name}</p>
//                             <p>
//                                 <span className='bg-[#0d0d0d] text-[14px] text-[#eff0f3] font-semibold rounded-full p-1'>{item.colorSimilarity}</span>
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//   )

    return (
        <div className='max-w-[1240px] bg-[#fffffe] m-auto px-10 py-10 '>
            {/* Filter*/}
            <div className='flex items-center bg-[#eff0f3] w-[130px] rounded-full p-1 text-[14px]'>
                <button onClick={()=> setWarnaOn(true)} className='mx-auto bg-[#ff8ba7] text-[#eff0f3] rounded-full p-2 '>Color</button>
                <button onClick={()=> setWarnaOn(false)} className='mx-auto bg-[#eff0f3] text-[#ff8ba7] rounded-full p-2 '>Texture</button>
            </div>

            <h1 className='font-bold text-6xl text-center text-[#33272a]'>Result</h1>

            {/* Display Result Images*/}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 '>
                {imgs.map((item, index) => (
                <div key={index} className='border shadow-lg-2xl rounded-lg'>
                    <img src={require(`${item.path}`)} alt={item.name} className='w-full h-[200px] object-cover rounded-t-lg'/>
                    <div className='flex justify-between px-2 py-3 text-[#33272a]'>
                        <p className='font-bold '>{item.name}</p>
                        <p>
                        <span className='bg-[#33272a] text-[14px] text-[#eff0f3] font-semibold rounded-full p-1'>
                        {item.val}
                        </span>
                        </p>
                    </div>
                </div>
                ))}
            </div>

        </div>
    )
}

export default Result
// setClickedWarna((prevFilter) => !prevFilter);
// const getPercentage = (data) => {
//     return clickedWarna ? data.colorSimilarity : data.textureSimilarity;
// };