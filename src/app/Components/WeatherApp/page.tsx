'use client'
import React from 'react'
import logo from '@/app/assets/Consulting.png'
import pin from '@/app/assets/MapPin.png'
import Image from 'next/image'

const WeatherApp = () => {
  return (
    <div>
        {/* Navbar */}
        <div className='flex justify-between bg-[#212A79] h-24 w-full border-b-[#CAE8FF] border-b-[1px]'>
            <Image src={logo} alt='Cloud Weather App Logo' className='w-20 h-20 my-auto ml-6'></Image>
            <div className='my-auto mr-6 flex'>
                <Image src={pin} alt='Map Pin Icon' className='mr-2 w-8 h-8'></Image>
                <input type='search' placeholder='Enter City Name...' className='rounded-2xl w-60 h-7'></input>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp