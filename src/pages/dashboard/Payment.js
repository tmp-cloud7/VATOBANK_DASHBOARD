import React from 'react'
import { FaCreditCard, FaFileInvoiceDollar, FaMoneyBill } from 'react-icons/fa6'
import SectionContainer from '../../component/SectionContainer'
const Payment = () => {
  return (
    <SectionContainer>
      <p className='font-bold text-gray-600'>Quick Payments</p>
      <div className='flex flex-col sm:flex-row gap-6 '>
        <div className='bg-gray-100  flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded:lg hover:bg-blue-100 transition-all '>
          <FaMoneyBill color='blue' size = {50}/>
          <p>Bills Payment</p>
          <div className='flex flex-1 w-full justify-between text-sm'>
            <p>Pay your bills, subscriptions, utility bills & more</p>
          </div>
        </div>
        <div className='bg-gray-100  flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded:lg hover:bg-blue-100 transition-all '>
        <FaFileInvoiceDollar color='blue' size = {50}/>
          <p>Invoice</p>
          <div className='flex flex-1 w-full justify-between text-sm'>
            <p>Pay your bills, subscriptions, utility bills & more</p>
          </div>
        </div>
        <div className='bg-gray-100  flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded:lg hover:bg-blue-100 transition-all '>
        <FaCreditCard color='blue' size = {50}/>
          <p>Invoice</p>
          <div className='flex flex-1 w-full justify-between text-sm'>
            <p>Make payments across all platforms using our card</p>
          </div>
        </div>
      </div>
      
    </SectionContainer>
  )
}

export default Payment
