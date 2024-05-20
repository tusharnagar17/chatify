import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { AllUsersRoute, Host } from "../utils/ApiRoute";
import { io } from "socket.io-client";

const ChatPage = () => {
  const socketRef = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // socetRef --> attribute
  useEffect(() => {
    if (currentUser) {
      // Initialize the socket connection with auth data
      socketRef.current = io(Host);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userString = localStorage.getItem("chat-app-user");

      if (!userString) {
        navigate("/login");
      } else {
        const user = await JSON.parse(userString);
        setCurrentUser(user);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const CheckAvatar = async () => {
      console.log("currentUser", currentUser);

      if (currentUser) {
        if (currentUser?.isAvatarImageSet) {
          const response = await axios.get(
            `${AllUsersRoute}/${currentUser?._id}`
          );

          setContacts(response.data.user);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    CheckAvatar();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex justify-center items-center  h-screen bg-back">
      <div className="flex items-center justify-start gap-10 text-white  m-2 rounded-3xl p-1 md:p-10 md:w-11/12 bg-front">
        {/* Sidebar */}
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {/* Chat Bar */}
        <div className=" rounded-xl">
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socketRef={socketRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
