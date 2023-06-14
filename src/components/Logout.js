import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import {toast} from 'react-toastify'

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem("chat-app-user"))._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.removeItem('chat-app-user')
        navigate("/login");
        toast.success("Logged out")
      }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #121212; /* using black for button background */
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #212121; /* lighter black for hover state */
  }
  svg {
    font-size: 1.3rem;
    color: #00BCD4; /* using cyan for icon color */
  }
`;