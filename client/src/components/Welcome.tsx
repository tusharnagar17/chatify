import React from "react";

const Welcome = () => {
  return (
    <>
      <img src="/assets/robot.gif" className="" />
      <div className="text-3xl text-center">
        Welcome ,<span className="text-sky-600 font-bold"> $User !</span>
      </div>
      <div className="text-xl text-center  px-2 w-ful">
        Please select a chat to Start Messaging.
      </div>
    </>
  );
};

export default Welcome;
