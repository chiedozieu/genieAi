import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url("/gradientBackground.png")] min-h-[100vh]' >
    <div className="text-center mb-6">
        <h1 className='text-3xl sm:text-5xl font-semibold mx-auto md:text-6xl 2xl:text-7xl leading-[1.2]'>Harness the power of <span className='text-[#12B7AC] font-extrabold'>AI</span> to create stunning content</h1>
        <p className='mt-4 max-w-xs sm:max-w-lg mx-auto 2xl:max-w-xl max:sm:text-xs text-gray-600'>Create, innovate, and thrive with our comprehensive AI toolset. Articles, images, and beyond.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button onClick={() => navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-full cursor-pointer hover:bg-secondary'>Start Creating</button>
        <button className='bg-primary text-white px-10 py-3 rounded-full cursor-pointer hover:bg-secondary'>Watch Demo</button>
    </div>
    <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600 ">
        <img src={assets.user_group} alt="" className='h-8' /> Trusted by 1000+ users
    </div>
    
    </div>
  )
}

export default Hero

//