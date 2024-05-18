import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { AllUsersRoute } from "../utils/ApiRoute";

const ChatPage = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  const [currenctChat, setCurrectChat] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userString = localStorage.getItem("chat-app-user");

      if (!userString == true) {
        navigate("/login");
      } else {
        const user = JSON.parse(userString);
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-app-user") || "")
        );
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const CheckAvatar = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(
            `${AllUsersRoute}/${currenctChat._id}`
          );
          // setContact(response.data);
          console.log("response data");
        } else {
          navigate("/setAvatar");
        }
      }
    };
    CheckAvatar();
  }, [currentUser]);

  return (
    <div className="flex justify-center items-center  h-screen bg-back">
      <div className="flex items-center justify-start gap-10 text-white  m-2 rounded-3xl p-1 md:p-10 md:w-11/12 bg-front">
        {/* Sidebar */}
        <Contacts />
        {/* Chat Bar */}
        <div className="md:w-1/3 rounded-xl">
          {currenctChat === undefined ? <Welcome /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
