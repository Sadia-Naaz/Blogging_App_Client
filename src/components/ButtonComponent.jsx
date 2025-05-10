import React from 'react'

const ButtonComponent = ({text,onClick,type='button'}) => {
  return (
   <>
   <button onClick={onClick} className='px-4 py-2 mt-2 max-w-xs w-auto rounded-md bg-blue-500  font-semibold text-white bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'>
    {text}
   </button>
   
   
   </>
  )
}

export default ButtonComponent