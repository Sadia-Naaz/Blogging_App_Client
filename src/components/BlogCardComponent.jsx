import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import axios from '../../axios';
import { useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
 
const BlogCardComponent = ({title, textBody, username, src, confirmDelete, openEditForm, currentTab, blogID, userID,handleFollow}) => {
 
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showComments,setShowComments] = useState(false);
  const [hasFetchedComments,setHasFetchedComments] =useState(false); 

  const handleLike = async (blogID) => {
    try {
      const response = await axios.post(`/blog/like`, {blogID});
      if (response.data.success) {
        setLikes(response.data.likes);
        setLiked(response.data.liked);
      }
    }
    catch(error) {
      console.log(`Error liking the blog: ${error}`);
    }
  };
 
  const handleComment = async (blogID) => {
    if (!text.trim()) return;
    try {
      const response = await axios.post(`/blog/comment`, {blogID, text});  
      if (response.data.success) {
        setComments([...comments, {text}]);
        setText(""); // Clear the input after posting
      }
    }
    catch(error) {
      console.log(`Cannot add comment due to: ${error}`);
    }
  }
 
  const handleShare = async () => {
    const blogURL = `/blog/${blogID}`;
    navigator.clipboard.writeText(blogURL)
    .then(() => {
      alert('Link copied to clipboard');
    }).catch((error) => {
      console.log(error);
    })
  }
  const fetchComments =async(blogID)=>{
    try{
       const response = await axios.get(`/blog/readComments/${blogID}`);
       const commentData = response.data.data;
       console.log(commentData,"commentData");
       return commentData;
    }
    catch(error){
     console.log("error in fetching comments",error.toString());
     return [];
    }
  }
  const toggleComments = async()=>{
    if(!showComments){
      if(!hasFetchedComments){
        const fetchedComments = await fetchComments(blogID);
        setComments(fetchedComments);
        setHasFetchedComments(true);
      }
      setShowComments(true);
    }
   else{
    setShowComments(false);
   }
  }
 
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/blog/${blogID}`);
        if (response.data.success) {
          setLikes(response.data.likes || 0);
          setLiked(response.data.likedByUser || false);
          setComments(response.data.blog?.comments || []);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
 
    if (blogID) {
      fetchBlogDetails();
    }
  }, [blogID]);
 
  return (
    <>
    <div>
       <div className='flex flex-col flex-wrap justify-center items-center w-96 max-w-sm rounded-md p-8 shadow-2xl bg-white scroll-smooth'>
 
       <div className='mb-4'>
        <h2 className='text-gray-600 font-semibold text-2xl text-center mb-2'>
          {title}
         </h2>
         <span className='text-left text-xs block overflow-hidden line-clamp-3'>
          {textBody}
         </span>
         <h6 className='text-xs text-gray-500'>
         <sup>By: {username}</sup>
         </h6>
       </div>
       <div className='mb-6'>
        <img 
         alt="Post"
         className='h-80 w-full object-cover'
         src={src}/>
         </div>
         {currentTab === "public" ? (
           <>
           <div className='flex gap-4 mt-4'>
            <button 
              className={`px-4 py-2 rounded-md ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`} 
              onClick={() => handleLike(blogID)}
            >
              ❤️: {likes}
            </button>
            <button className='px-4 py-2 rounded-md bg-blue-500 text-white' onClick={handleShare}>
              🖇️ Share
            </button>
            <button className='px-4 py-2 rounded-md bg-green-500 text-white' onClick={()=>handleFollow(userID)}>
              Follow
            </button>
           </div>
 
          <div className='mt-4 w-full'>
            <input
              type='text'
              placeholder='Add a comment...'
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="w-full border p-2 rounded-md mb-2"
            />
            <button 
              className='px-4 py-2 rounded-md bg-blue-500 text-white w-full' 
              onClick={() => handleComment(blogID)}
            >
              Comment
            </button>
          </div>
        <ButtonComponent onClick={toggleComments} text={showComments ? "Hide Comments":"Show Comments"}/>
      {  showComments &&    
          <div className='flex flex-col mt-4 w-full'>
            <h3 className='font-medium mb-2'>Comments</h3>
            {comments.length === 0 ? 
              <p className="text-gray-500 text-sm">No comments yet</p> : 
              comments.map((comment, idx) => (
                <div key={idx} className="border-b pb-2 mb-2">
                  <p>{comment.text}</p>
                </div>
              ))
            }
          </div>   }
           </>    
        ) : ( 
          <div className='flex justify-items-center gap-x-8 p-6'>
            <button className='text-red-500 text-xl' onClick={confirmDelete}>
              <MdDelete />
            </button>
            <button className='text-blue-500 text-xl' onClick={openEditForm}>
              <FaEdit />
            </button>
          </div>
        )}
       </div>
      </div>
    </>
  )
}
 
export default BlogCardComponent