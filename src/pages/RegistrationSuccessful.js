import React from 'react'
import { Link } from 'react-router-dom'
// import PinPage from './PinPage'

const RegistrationSuccessful = () => {
  return (
    <section className='font-roboto bg-gradient-to-r from-gray-300 to-white-500 h-screen w-screen flex items-center justify-center'>
      <div className='flex gap-2 flex-col items-centers'>
        <h1 className='text-4xl font-bold text-center'>Registration Successful</h1>
        <p className='text-center text-gray-600'>You have successfully created an account with VATO Bank. <a href='/login' className='underline text-blue-500'> Click here to login </a></p>
      </div>
    </section>
  )
}

export default RegistrationSuccessful
