import React, { useState } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import CreateBlog from "./Pages/CreateBlog"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Header from "./components/Header"
import Blogs from "./Pages/Blogs"
import MyBlogs from "./Pages/MyBlogs"
import Trash from "./components/Trash"
import Profile from "./Pages/Profile"
function App() {
  const [currentTab,setCurrentTab] = useState("public");

  return (
    <BrowserRouter>
    {/* we have excluded our header so that it persists throughout routing  */}
    <Header currentTab={currentTab} setCurrentTab={setCurrentTab}/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/read-blogs" element={<Blogs currentTab={currentTab}/>}/>
    <Route path="/read-my-blogs" element ={<MyBlogs/>}/>
    <Route path="/create-blog" element={<CreateBlog/>}/>
    <Route path="/trash-blogs" element={<Trash/>}/>
    <Route path="/user-info" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
