import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      const setContact = async () => {
        const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUserName(data.userName);
        setCurrentUserImage(data.avatarImage);
      };
      setContact();
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h3>UET CHAT APP</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${btoa(
                        contact.avatarImage
                      )}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.userName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${btoa(currentUserImage)}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 75% 10%;
  overflow: hidden;
  background-color: #121212; /* black background */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #00bfff; /* unique blue text */
      text-transform: uppercase;
      font-size: 24px;
      font-weight: bolder;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #cfcfcf; /* grey scrollbar */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #212121; /* dark grey background for contacts */
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #1a1a1a; /* darker grey for hover */
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #696969; /* cyan text */
        }
      }
    }
    .selected {
      background-color: #1a1a1a;
      .username {
        h3 {
          color: #ffff00;
        }
      }
    }
  }

  .current-user {
    background-color: #1a1a1a; /* dark grey for current user background */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #f47670; /* pink color for current user's name */
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
