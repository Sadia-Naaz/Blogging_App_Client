// import axios from '../../axios';
import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import BlogContainer from '../components/BlogContainer';
import BlogCardComponent from '../components/BlogCardComponent';
import ButtonComponent from '../components/ButtonComponent';

const Blogs = ({currentTab}) => {
   
  
  const[blogs,setBlogs] = useState([]);
  const[skip,setSkip] = useState(0);
  const[moreBlogs,setMoreBlogs] = useState(true);
  const[following,setFollowing] =useState([]);
 
//now we will make a function to fetch blogs 
  const fetchAllBlogs = async(skipParam=0)=>{
//in order to fetch userDetails 
try
 { 
  //after making the entire app I will optimize it.
  //  const dispatch = useDispatch();
  // const {list:blogs,loading,error} = useSelector(state=>state.blogs);
  // useEffect(()=>{
  //  if(blogs.length===0){
  //   dispatch(FetchBlogs())//fetch is not fetched already
  //  };
  // },[dispatch,blogs.length])
  // if(loading)return<p>...loading</p>
  // if(error)return<p>Error:{error}</p>
  const blogData = await axios.get(`/blog/read-blogs?skip=${skipParam}`,{withCredentials:true});
  const newBlogs = blogData.data.data
  console.log('newBlogs',blogData)
  console.log(`message : ${blogData.data.message}  status : ${blogData.data.status}`);
  console.log(newBlogs);
 if(!newBlogs || newBlogs.length === 0){
  setMoreBlogs(false);
  alert(`no data to show`);
 }
 else{
  
  setBlogs((prevBlogs)=>[...prevBlogs,...newBlogs]);
  console.log("blogs",blogs)
  setSkip(skipParam + newBlogs.length);
 }
}
catch(error){
  console.log("error",error);
  setMoreBlogs(false);
}
}

useEffect(()=>{
  fetchAllBlogs();
  fetchFollowing();
  
  },[])

     
  
  
  const handleFollow = async (userID) => {
    console.log("handle Follow called")
    try {
        if (following[userID]) {
            // Unfollow
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/unfollow-user`, { unfollowUserID: userID },{withCredentials:true});
            console.log(response.data.message)
        } else {
            // Follow
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/follow-user`, { followingUserId: userID },{withCredentials:true});
        }
        setFollowing((prevFollowing) => ({
            ...prevFollowing,
            [userID]: !prevFollowing[userID]
        }));
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.log("Error response data:", error.response.data);  // This will log the message returned by your API
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
    } else if (error.request) {
        // The request was made, but no response was received
        console.log("Error request:", error.request);
    } else {
        // Something else happened during the setup of the request
        console.log("Error message:", error.message);
    }
    }
};


    const fetchFollowing=async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follow/following-list`,{withCredentials:true});
        console.log("following-List",response.data.followingListDB);
         const newFollowings = response.data.followingListDB;
         console.log('newFollowings',newFollowings);
         if(newFollowings){
          
          setFollowing((prevFollowings) => [
            ...prevFollowings.filter(following => newFollowings && !newFollowings.some(newFollowing => newFollowing.following._id === following.following._id)),
            ...newFollowings
        ]);
         }
        
        
       
      }
      catch(error){
      console.log("error",error)
      }
    }
    


  return (
  <>
 
  <BlogContainer>
    {blogs && blogs.map((blog)=>(
  <BlogCardComponent
       key={blog._id}
       title={blog.title}
       textBody={blog.textBody}
       username={blog.userID.username}
       src={`${import.meta.env.VITE_BACKEND_URL}${blog.image}`} 
       currentTab={currentTab}
       blogID={blog._id}
       handleFollow={handleFollow}
       userID={blog.userID._id}
       /> 
  ))}
{ moreBlogs &&  <ButtonComponent text="Show More" onClick={()=>fetchAllBlogs(skip)}/>}
</BlogContainer>
</>
)
}
export default Blogs;