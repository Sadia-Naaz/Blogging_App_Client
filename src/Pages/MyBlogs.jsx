import React, { useEffect, useState } from 'react'
import axios from '../../axios';

import ButtonComponent from '../components/ButtonComponent';
import FormContainer from '../components/FormContainer';
import BlogCardComponent from '../components/BlogCardComponent';
import BlogContainer from '../components/BlogContainer';
const MyBlogs = () => {

const[blogs,setBlogs] = useState([]);
const[skip,setSkip] = useState(0);
const[hasMore,setHasMore] = useState(true);
const[isEditing,setIsEditing] = useState(false);
const[currentBlog,setCurrentBlog] = useState({title:"",textBody:"",_id:""});
const[user,setUser] = useState([]);
async function fetchMyBlogs (skipParam = 0){

try{
      const userDetails =  await axios.get('/user/user-info');
       console.log(userDetails.data.UserInfo)
       setUser(userDetails.data.UserInfo);
       
       const response = await axios.get(`/blog/read-my-blogs?skip=${skipParam}` );
       const newBlogs =  response.data.data;
       console.log(newBlogs)
       if(!newBlogs || newBlogs.length===0){
        setHasMore(false);
       }
       else{
        setBlogs((prevBlogs)=>[...prevBlogs,...newBlogs]);
        setSkip(skipParam + newBlogs.length);
       }
}
catch(error)
{
  alert(`no more blogs to fetch!`);
  setHasMore(false);
console.error(error);
}
}
async function deleteBlog(blogID){
  try
  {
       const response = await axios.post(`/blog/delete-blogs`,{blogID});
       console.log(response.data);
       setBlogs((prevBlogs)=>prevBlogs.filter(blog=>blogID!==blog._id));
  }
  catch(error){
  console.log("Error deleting blog!:",error);
  }
  }
  async function openEditForm(blog) {
    setIsEditing(true);
    setCurrentBlog(blog);
  }
  async function EditBlog(e){
     e.preventDefault();
     try {
  
      const response = await axios.post('/blog/edit-blogs', { 
          blogID: currentBlog._id, 
          title: currentBlog.title, 
          textBody: currentBlog.textBody 
      });
      setBlogs((prevBlogs) => prevBlogs.map(blog => blog._id === currentBlog._id ? { ...blog, title: currentBlog.title, textBody: currentBlog.textBody } : blog));
      setIsEditing(false);
  } 
  catch (error) {
      console.log("Error editing blog: ", error);
  }
  }
  async function confirmDelete (blogID){
      if(window.confirm('Are you sure you want to delete the current blog?')){
        deleteBlog(blogID);
      }
  }
useEffect(()=>{
  fetchMyBlogs();

},[]);

  return (
    <>
  
  <BlogContainer>
  {blogs && blogs.map((blog) => (
    <div key={blog._id}>
      <BlogCardComponent
        title={blog.title}
        textBody={blog.textBody}
        username={user.username}
        src={`${import.meta.env.VITE_BACKEND_URL}${blog.image}`} 
        confirmDelete={() => confirmDelete(blog._id)}
        openEditForm={() => openEditForm(blog)}
      />

      {/* Inline edit form only for this blog */}
      {isEditing && currentBlog._id === blog._id && (
        <FormContainer onSubmit={EditBlog}>
          <h4 className='text-2xl font-semibold text-gray-500 text-center m-6'>Edit Blog</h4>
          <input 
            type="text" 
            value={currentBlog.title} 
            onChange={(e) => setCurrentBlog({...currentBlog, title: e.target.value })} 
            required 
            className='w-full rounded-md py-2 px-4 focus:ring focus:ring-blue-300 border border-gray-200'
          />
          <textarea 
            value={currentBlog.textBody} 
            onChange={(e) => setCurrentBlog({...currentBlog, textBody: e.target.value })} 
            required 
            className='w-full rounded-md py-2 px-4 focus:ring focus:ring-blue-300 border border-gray-200'
          />
          <div className='flex flex-row gap-5 mt-2'>
            <ButtonComponent type="submit" text="Submit" />
            <ButtonComponent type="button" onClick={() => setIsEditing(false)} text="Cancel" />
          </div>
        </FormContainer>
      )}
    </div>
  ))}
</BlogContainer>

{/* ✅ Show More button stays outside the container */}
{hasMore && (
  <div className='flex justify-center items-center mt-6'>
    <ButtonComponent text="Show More" onClick={() => fetchMyBlogs(skip)} />
  </div>
)}

  </>


  )
}


export default MyBlogs;