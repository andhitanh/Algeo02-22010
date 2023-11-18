import React, {useState} from 'react'
import logo from '../logo/bro.png'
import logo2 from '../logo/sis.png'
//import FaBars
//import hamburger logo

const Navbar = () => {
  const {nav, setNav} = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#33272a] text-[#ffc6c7]">
        {/* navbar menu */}
        <div className="flex">
          <ul className="font-bold flex" >
            <li>Upload Your Pic!</li>
            <li>How to Use</li>
            <li><Link to ="/about">About Us</Link></li>
            
          </ul>

          <img src={logo} alt="Logo" className="w-9 h-9 absolute right-10"/>
          <img src={logo2} alt="Logo" className="w-11 h-10 absolute right-20"/>
          
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
