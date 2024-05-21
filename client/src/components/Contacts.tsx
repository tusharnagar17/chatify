import React, { useState, useEffect } from "react";
import AppIcon from "./AppIcon";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState(undefined);

  useEffect(() => {
    const saveData = async () => {
      const currentUser = await JSON.parse(
        localStorage.getItem("chat-app-user") || ""
      );

      setCurrentUserImage(currentUser?.avatarImage);
      setCurrentUsername(currentUser?.username);
    };
    saveData();
  }, []);

  const changeCurrentChat = (index, item) => {
    setSelectedChat(index);
    changeChat(item);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <div className=" bg-back rounded-xl p-4 hidden md:block">
          <div>
            <AppIcon />
          </div>
          {/* Users List */}
          <div className="rounded-xl  bg-front p-4 overflow-y-auto h-[350px] scrollbar scrollbar-thumb-rose-500 scrollbar-track-slate-700">
            {contacts.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex gap-4 rounded-xl my-2 py-2 justify-start px-4 items-center ${
                    selectedChat == index ? "bg-sky-950" : "bg-back"
                  }`}
                  onClick={() => changeCurrentChat(index, item)}
                >
                  <div className="rounded-full">
                    <img
                      src={`data:image/svg+xml;base64,${item?.avatarImage}`}
                      className="w-14 h-14 rounded-full "
                    />
                  </div>
                  <div className="text-lg font-bold">{item?.username}</div>
                </div>
              );
            })}
          </div>
          {/* Curret user */}
          <div className="flex items-center justify-start px-2 gap-4 my-4">
            <div className="">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                className="w-14 h-14 rounded-full "
              />
            </div>
            <div className="text-lg font-bold">{currentUsername}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
