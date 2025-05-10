import axios from '../../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import FormContainer from '../components/FormContainer';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
const Login = () => {
  const[inputs,setInputs] = useState({
    loginID:"",
    password:"",

  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange=(e)=>{
   setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    const {data} = await axios.post("/auth/login",{
      loginID:inputs.loginID,
      password:inputs.password,
    },
  {withCredentials:true}
  );
    if(data.success){
      alert(data.message)
      dispatch(authActions.login());
      navigate("/read-blogs");
    }
  }
  catch(error){
    console.log(error.message);
    alert(error.response?.data?.message || "Something went wrong");
  }
  }
  return (
 <>
 <FormContainer onSubmit={handleSubmit} Title="Login">
          <InputComponent
            name="loginID"
            placeholder="loginID"
            type="text"
            margin="normal"
            value={inputs.loginID}
            onChange={handleChange}
          />
          <InputComponent
            name="password"
            placeholder="password"
            type="password"
            required
            margin="normal"
            value={inputs.password}
            onChange={handleChange}
          />
          <ButtonComponent text='Submit' type='submit' />

          
    
           <p className='text-center  hover:text-blue-600 mb-6 text-blue-500 rounded-md cursor-pointer' 
           onClick={() => navigate("/register")}>Don't have an account ? Sign Up first</p>
      </FormContainer>
 </>
  )
}

export default Login