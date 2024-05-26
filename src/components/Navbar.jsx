import React from 'react'

function Navbar() {
  return (
    <>
      <nav className='w-auto bg-gradient-to-r from-[#e371d6] via-purple-500 to-pink-500 radial h-[6vh] flex justify-between px-[5vh] items-center m-0 drop-shadow-[0_12px_12px_rgba(0,0,0,0.2)] border-none rounded-[50px] mt-2 mx-2'>
        <div className='roboto-bold text-2xl hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] cursor-pointer'>
          PassWood
        </div>
        <ul>
          {/* <li className='flex space-x-[1vh] hover:cursor-pointer'>
            <a className='text-xl hover:text-white m-0 p-0 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]'>Home</a>
            <a className='text-xl hover:text-white m-0 p-0 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]'>Products</a>
            <a className='text-xl hover:text-white m-0 p-0 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]'>About</a>
            <a className='text-xl hover:text-white m-0 p-0 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]'>Contact</a>
          </li> */}
        </ul>
      </nav>
    </>
  )
}

export default Navbar