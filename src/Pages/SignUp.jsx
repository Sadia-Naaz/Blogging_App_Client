import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import InputComponent from "../components/InputComponent";
import  ButtonComponent  from "../components/ButtonComponent";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post("http://localhost:8000/auth/register", {
        name: inputs.name,
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
  
      if (data.success) {
        alert(data.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <>
    <FormContainer Title="Sign Up" onSubmit={handleSubmit}>
         <InputComponent
            name="name"
            placeholder="name"
            type="text"
            required
            value={inputs.name}
            onChange={handleChange}
            className="w-full px-4 py-2  border-gray-200 rounded-md  border focus:ring focus:ring-blue-300 "
          />
          <InputComponent
            name="username"
            placeholder="username"
            type="text"
           className="w-full px-4 py-2  border border-gray-200 rounded-md focus:ring focus:ring-blue-300"
            required
            value={inputs.username}
            onChange={handleChange}
          />
          <InputComponent
            name="email"
            placeholder="email"
            type="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
          <InputComponent
            name="password"
            placeholder="password"
            type="password"
            required
            value={inputs.password}
            onChange={handleChange}
          />
         <ButtonComponent text="Submit" type="submit"/>
          <p
            onClick={() => navigate("/login")}
            className="text-center mb-6 text-blue-400 hover:text-blue-600 rounded-md cursor-pointer"
          >
            Already signed-up? login here...
          </p>
          </FormContainer>
    
    </>
  );
};

export default SignUp;
