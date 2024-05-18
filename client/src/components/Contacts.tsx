import React from "react";
import AppIcon from "./AppIcon";

const Contacts = () => {
  return (
    <div className="w-1/3 bg-back rounded-xl p-4 hidden md:block">
      <div>
        <AppIcon />
      </div>
      {/* Users List */}
      <div className="rounded-xl  bg-front p-4 overflow-y-auto h-[350px] scrollbar scrollbar-thumb-rose-500 scrollbar-track-slate-700">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7,
          8, 9, 10, 11, 12, 13, 14, 15, 16,
        ].map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 rounded-lg my-2 py-2 bg-back justify-center items-center"
            >
              <div>Image: {item}</div>
              <div>name: {item}</div>
            </div>
          );
        })}
      </div>
      {/* Curret user */}
      <div className="flex items-center justify-start px-2 gap-4 my-4">
        <div className="rounded-full border-2 border-blue-500">user</div>
        <div>Image: name</div>
      </div>
    </div>
  );
};

export default Contacts;
