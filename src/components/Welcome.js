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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f0f0; /* Light grey background */
  color: #383838; /* Dark grey text */
  padding: 2rem; /* Padding all around */
  border-radius: 15px; /* Soft rounded corners */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  text-align: center; /* Center text */

  img {
    height: 20rem;
    margin-bottom: 2rem; /* Add some space below the image */
  }

  h1 {
    font-size: 2rem; /* Larger font for the welcome message */
    margin-bottom: 1rem; /* Add some space below the heading */
  }

  h3 {
    font-size: 1.25rem; /* Slightly larger font for instructions */
    color: #888888; /* Grey for less important text */
  }

  span {
    color: #6db3f2; /* Light blue for username */
  }
`;
