import React from 'react'

const BlogContainer = ({children}) => {
  return (
   <>
   <div className='w-full flex flex-col justify-center align-center'> 

   <div className='flex flex-col  justify-center items-center w-full max-w-5xl mx-auto bg-100 py-4 gap-6'>
    {children}
   </div>
   </div>
   
   
   </>
  )
}

export default BlogContainer