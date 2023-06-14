import React, { useState, useEffect , useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  { allUsersRoute, host }  from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #696969; /* Light grey background */

  .container {
    height: 100vh;
    width: 100vw;
    background-color: #ffffff; /* White background for container */
    display: grid;
    grid-template-columns: 30% 70%;
    /* border: 1px solid #6db3f2; */
    border-radius: 15px; /* Added border-radius for softer edges */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const Chat = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  // Effect for setting current user
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, [navigate]);

  // Effect for fetching users
  useEffect(() => {
    const getAllUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(response.data.users);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getAllUsers();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  const socket = useRef();
  return (
    
    <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
          <ChatContainer currentChat={currentChat} socket={socket} /> 

          )}
        </div>
    </Container>
  );
};

export default Chat;
