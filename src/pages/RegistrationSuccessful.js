import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationSuccessful = () => {
  return (
    <section className='font-roboto bg-gradient-to-r from-gray-300 to-white-500 h-screen w-screen flex items-center'>
      <div className='flex gap-2 flex-col'>
        <h1 className='text-4xl font-bold text-center'>Registration Successful</h1>
        <p className='text-center text-gray-600'>You have successfully created an account with VATO Bank. You can now log in using your email and password.</p>
      </div>
    </section>
  )
}

export default RegistrationSuccessful
