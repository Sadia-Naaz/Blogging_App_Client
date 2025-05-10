import React from 'react'

const InputComponent = ({name,type,value,placeholder,onChange}) => {
  return (<>
  
  <input 
  name={name}
  type={type}
  value={value}
  placeholder={placeholder}
  onChange={onChange}
  className='rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:outline-none border border:gray-600 px-4 py-2 transition-all'
/>
</>
    
  )
}

export default InputComponent