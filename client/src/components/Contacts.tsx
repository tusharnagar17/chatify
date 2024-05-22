import { useState, useEffect } from "react";
import AppIcon from "./AppIcon";
import { UserProps } from "../types/interface";

const Contacts = ({
  contacts,
  changeChat,
}: {
  contacts: UserProps[];
  changeChat: (chat: UserProps) => void;
}) => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState<number | undefined>(
    undefined
  );

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

  const changeCurrentChat = (index: number, item: UserProps) => {
    setSelectedChat(index);
    changeChat(item);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <div className="md:w-1/4 p-4 flex flex-col h-full bg-first rounded-xl ">
          <div className="text-4xl mx-auto py-2 h-[15%]">
            <AppIcon />
          </div>
          {/* Users List */}
          <div className="rounded-xl flex-1  bg-second p-4 overflow-y-auto scrollbar scrollbar-thumb-rose-500 scrollbar-track-slate-700">
            {contacts.map((item: UserProps, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex gap-2 md:gap-4 rounded-xl my-2 py-2 px-4 justify-start items-center ${
                    selectedChat == index ? "bg-gray-700" : "bg-gray-900"
                  }`}
                  onClick={() => changeCurrentChat(index, item)}
                >
                  {/* Image */}
                  <div className="rounded-full">
                    <img
                      src={`data:image/svg+xml;base64,${item?.avatarImage}`}
                      className="w-10 h-10 lg:w-14 lg:h-14 rounded-full "
                    />
                  </div>
                  {/* Name */}
                  <div className="text-md font-bold">{item?.username}</div>
                </div>
              );
            })}
          </div>
          {/* Curret user */}
          <div className="h-[4%] flex items-center justify-center  px-2 gap-4 my-4">
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
