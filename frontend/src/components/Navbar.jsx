import React, {useState} from 'react'
//import FaBars
//import hamburger logo

const Navbar = () => {
  const {nav, setNav} = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#eff0f3] text-[#2a2a2a]">
        {/* navbar menu */}
        <div className="flex">
          <ul className="flex" >
            <li>Overview</li>
            <li>How to Use</li>
            <li>About Us</li>
          </ul>
        </div>
        
        {/* hamburger */}
        {/*<div onClick={handleClick} className="md:hidden z-10" >
            <FaBars/>
        </div>*/}

        {/* mobile menu */}
        {/*<ul className={!nav? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#eff0f3] flex flex-col justify-center items-center'}>
            <li className="py-6 text-4xl">Overview</li>
            <li className="py-6 text-4xl">How to Use</li>
            <li className="py-6 text-4xl">About Us</li>
        </ul>*/}
    </div>
  )
}

export default Navbar
//    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#fffffe] text-[#2a2a2a] border-b-4 border-[#2a2a2a]">
