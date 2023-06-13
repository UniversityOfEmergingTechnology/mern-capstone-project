import React , { useEffect, useState} from "react";
import styled from "styled-components";
import { Link  , useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('${process.env.PUBLIC_URL}/flower3.jpg');
  background-size: cover;
  background-position: center;
  .brand {
    display: flex;
    margin: 2rem auto;
    align-items: center;
    justify-content: center;
    img {
        height: 5rem;
    }
    h1 {
      color: #ff6347;
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    input {
      background-color: #fff;
      padding: 1rem;
      border: none;
      border-radius: 0.4rem;
      color: #2f3542;
      font-size: 1rem;
      margin-bottom: 1rem;
      border: 1px solid black;
      &:focus {
        border: none;
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
        outline: none;
      }
    }
    button {
      background-color: #ff6347;
      color: #ffffff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5 ease-in-out;
      &:hover {
        background-color: #ff7f50;
      }
    }
    span {
      margin: 1rem auto;
      color: #2f3542;
      text-transform: uppercase;
      a {
        color: #ff6347;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;


const Register = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[navigate])

  const [values , setValues] = useState({
    userName : "",
    email : "",
    password : "",
    confirmPassword : ""
  })  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(handleValidation()){
        const {password , userName , email}   = values;
        try {
            const response = await axios.post(registerRoute ,{
                password , 
                userName,
                email
            })
            if(response.data.success === false){
                toast.error("User Registration failed")
            }
            else{
                localStorage.setItem('chat-app-user' , JSON.stringify(response.data.newUserObject))
                toast.success("User Registered successfully")
                navigate('/')
            }
        } catch(err) {
            if(err.response && err.response.status === 404){
                toast.error(err.response.data.message)
            }
            else{
                toast.error("Registration failed. Please try again.")
            }
        }
    }
  };
  

  const handleValidation = () => {
    const {password , confirmPassword , userName , email}   = values;
    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return false;
    } 
    else if(userName.length < 3){
        toast.error("Username is too short")
        return false;
    }
    else if(password.length < 8){
        toast.error("Password should be greater than or equal to 8 characters")
        return false;
    }
    else if(email === ""){
        toast.error("Email is required")
        return false;
    }
    return true
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name] : e.target.value})
  };


  return (
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          {/* <img src={Logo} alt="logo" /> */}
          <h1>UET CHAT App</h1>
        </div>
        <input
          type="text"
          placeholder="User Name"
          name="userName"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </FormContainer>
  );
};

export default Register;
