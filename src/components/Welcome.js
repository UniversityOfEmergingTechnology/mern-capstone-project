import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  // Effect for setting current user
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, [navigate]);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212; /* black background */
  color: #E0E0E0; /* Light text for visibility */
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); /* More pronounced shadow for depth */
  text-align: center;

  img {
    height: 20rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem; /* Larger font for the welcome message */
    color: #7B68EE; /* Unique color for the heading */
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem; /* Slightly larger font for instructions */
    color: #C0C0C0; /* Lighter grey for less important text */
  }

  span {
    color: #00FFFF; /* Cyan for username */
    font-weight: bold; /* Bold username */
  }
`;
