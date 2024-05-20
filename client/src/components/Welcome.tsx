import React from "react";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center left-0 right-0 w-[55vw]">
      <div className="flex flex-col items-center justify-center">
        <img src="/assets/robot.gif" className="" />
        <div className="text-3xl text-center">
          Welcome ,<span className="text-sky-600 font-bold"> $User !</span>
        </div>
        <div className="text-xl text-center  px-2 w-ful">
          Please select a chat to Start Messaging.
        </div>
      </div>
    </div>
  );
};

export default Welcome;