import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import axios from "../../axios";
import { useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
const Header = ({setCurrentTab}) => {
  const [value, setValue] = useState(""); // Initialize active tab state

  const isLogin  = useSelector((state)=>state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/read-blogs") {
      setCurrentTab("public");
    } else if (location.pathname === "/read-my-blogs") {
      setCurrentTab("personal");
    }
  }, [location.pathname]);

  const handleLogOut = async()=>{
    dispatch(authActions.logout());
    try{
       const{data} = await axios.post("/auth/logout",{});
       if(data.success){
        alert("sign-out successfully!");
        navigate("/");
       }
       }
    catch(error){
     console.log(error);
    }  
  }
  return (
    <>
        <nav className='flex justify-between align-center p-4 bg-gray-600 shadow-lg sticky top-0'>
          <h2 className='font-bold text-2xl text-white'>BlogVerse</h2>
         {isLogin &&  (
          <ul className='flex justify-center align-center gap-8'>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='search blog'
            />
              <li className='text-white hover:bg-white hover:text-gray-600 transition:smooth rounded-lg p-x-4' ><Link to="/read-blogs" >Blogs</Link></li>
              <li  className='text-white hover:bg-white hover:text-gray-600 transition:smooth rounded-lg p-x-4'><Link to="/read-my-blogs">My Blogs</Link></li>
              <li className='text-white hover:bg-white hover:text-gray-600 transition:smooth rounded-lg p-x-4'><Link to="/create-blog">Create-Blogs</Link></li>
            </ul>
        )}
         {!isLogin &&(  
          <div className='flex justify-center align-center gap-8'>

           <Link to='/login'><Button>Login</Button></Link>  
          </div>
            
          )}
          {
            isLogin && (
              <div className='flex justify-center align-center gap-8'>

                <Link to="/trash-blogs"><ButtonComponent text="Trash Bin"/></Link>
                <Link to="/user-info"><ButtonComponent text="Profile"/></Link>
                <ButtonComponent text="Log-Out"  onClick={handleLogOut}/>
              </div>
            )
           }
       
      </nav>
    </>
  );
};

export default Header;
