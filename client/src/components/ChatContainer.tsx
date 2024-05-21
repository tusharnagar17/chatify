import React, { RefObject, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { AllMessageRoute, SendMessageRoute } from "../utils/ApiRoute";

interface Message {
  fromSelf: boolean;
  message: string;
}

const ChatContainer = ({ currentChat, currentUser, socketRef }) => {
  const [message, setMessage] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef: RefObject<HTMLDivElement> = useRef();

  useEffect(() => {
    const FetchMessage = async () => {
      const response = await axios.post(AllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      // console.log("chatContainer fetchMessage", response.data.ProjectedMessage);
      setMessage(response.data.ProjectedMessage);
    };
    FetchMessage();
  }, [currentChat]);

  const handleMessageSend = async (chat: string) => {
    await axios.post(SendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: chat,
    });

    socketRef.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: chat,
    });

    const newMsgs: Message[] = [...message];
    newMsgs.push({ fromSelf: true, message: chat });
    setMessage(newMsgs);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off("msg-receive");
      }
    };
  }, []);

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  // autoscroll for new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="h-[85vh] w-[55vw] rounded-lg ">
      <div className="flex items-center justify-start bg-back gap-4 p-2">
        <div className="rounded-full">
          <img
            src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
            className="w-14 h-14 rounded-full "
          />
        </div>
        <div className="text-lg font-bold">{currentChat?.username}</div>
      </div>
      <div className="h-[70vh]  p-2 relative overflow-y-auto">
        {message.length < 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="font-bold text-2xl">No Message! Start typing</div>
          </div>
        ) : (
          message.map((ptr, index) => {
            // console.log("ptr console", ptr);
            return (
              <div
                key={index}
                className={`flex items-center ${
                  ptr?.fromSelf ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                <div
                  className={`bg-violet-900 rounded-xl px-4 py-1 ${
                    ptr?.fromSelf ? "my-[1px]" : "my-2"
                  }`}
                >
                  {ptr?.message}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="">
        <ChatInput sendMessage={handleMessageSend} />
      </div>
    </div>
  );
};

export default ChatContainer;
