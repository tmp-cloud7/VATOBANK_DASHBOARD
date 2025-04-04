import React from 'react'

const InputComponent = ({ inputProp }) => {
  return (
    <div className='flex flex-col gap-1 flex-1 w-full mt-2'>
        <label htmlFor={inputProp.field} className='block'>{inputProp.label}</label>
        <input
            placeholder={inputProp.placeholder}
            type={inputProp.type} id={inputProp.field}
            className='flex w-full border border-blue p-3 rounded-md focus:border-yellow-400 leading-none'
            name={inputProp.field}
            value={inputProp.value} 
            onChange={inputProp.onChange} 
            required
        />
    </div>
  )
}

export default InputComponent
