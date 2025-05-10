
import React, { useState } from 'react'
import axios from '../../axios';
import FormContainer from '../components/FormContainer';
const CreateBlog = () => {

  const [title,setTitle] = useState("");
  const [textBody,setTextBody]=useState("");
  const[image,setImage]= useState(null);
  
  async function handleSubmit(e){
    e.preventDefault();
     const formData = new FormData();
     formData.append("title",title);
     formData.append("textBody",textBody);
     if(image){
      formData.append("image",image);
     }
     for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try{
     const response = await axios.post("/blog/create-blog",formData);
     console.log(response);
     if(response.data.status!==201){
     alert(response.data.error);
     }
     else{
      alert("new blog has been posted!");
      setTitle("");
      setTextBody("");
      setImage(null);
     }
    }
    catch(error){
     console.log("Error creating blog!", error);
    }

  }




  return (<>
 <FormContainer onSubmit={handleSubmit}>
 <span className='m-4 text-center font-semibold text-gray-500 text-2xl'>Create Your Blog</span>
 <input placeholder='Title' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} 
 className='w-full rounded-md py-2 px-4  focus:ring focus:ring-blue-300 border border-gray-200 outline-none'
 />
 <input placeholder='Description' type='text' value={textBody} onChange={(e)=>{setTextBody(e.target.value)}}
 className='w-full rounded-md py-2 px-4  focus:ring focus:ring-blue-300 border border-gray-200 outline-none'
 />
 <input placeholder='Image' type='file' id='image' accept='image/*' onChange={(e)=>setImage(e.target.files[0])}
 className='w-full rounded-md py-2 px-4  focus:ring focus:ring-blue-300 border border-gray-200 outline-none'
 />
 <button type='submit' className='px-5 py-2 bg-blue-500 hover:bg-blue-600  text-white rounded-md'>Create Post</button>
 </FormContainer>
   </> 
  )
}

export default CreateBlog;