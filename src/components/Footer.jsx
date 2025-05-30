import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-20' width={50} src={assets.medco} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'> Medco is a modern hospital management system designed to simplify healthcare administration while ensuring the highest level of data security through blockchain technology. With a user-friendly interface and seamless functionality, Medco empowers both patients and healthcare providers to manage records and services with confidence and ease.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+20- 010 9138 5334</li>
            <li>medco@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Medco.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
