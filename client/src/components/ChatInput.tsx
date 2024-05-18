import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const ChatInput = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    let message = msg;
    console.log("emojiObject", emojiData?.emoji);
    message += emojiData?.emoji;
    setMsg(message);
  };
  const sendMessage = () => {
    console.log(msg);
    setMsg("");
  };
  return (
    <div className="relative flex justify-between gap-2 items-center w-100">
      <div>
        <BsEmojiSmileFill
          className="text-yellow-200"
          size={35}
          onClick={() => setShowPicker(!showPicker)}
        />
        <div className="absolute -top-[400px]">
          {showPicker == true ? (
            <EmojiPicker
              open={showPicker}
              onEmojiClick={handleEmojiClick}
              height={400}
            />
          ) : null}
        </div>
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Type your message here!"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="bg-back px-10 py-1 md:w-[48vw] rounded-full text-lg"
        />
      </div>
      <div className="bg-violet-500 px-6 py-2 rounded-full">
        <IoMdSend size={20} onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatInput;
