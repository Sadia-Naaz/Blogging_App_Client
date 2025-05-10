import React from 'react'

const FormContainer = ({Title,children,onSubmit}) => {
  return (
<>
<div className='flex justify-center items-center min-h-screen px-4 bg-gray-100'>
<div className='flex flex-col justify-center items-center w-full max-w-md rounded-lg shadow-2xl border border-gray-200 bg-white p-6'>
<h2 className='font-bold text-gray-500 text-center text-2xl mb-6' >{Title}</h2>
<form onSubmit={onSubmit} className='flex flex-col justify-center items-center w-full gap-6 bg-white'>
{children}
</form>
</div>
</div>




</>
  )
}

export default FormContainer