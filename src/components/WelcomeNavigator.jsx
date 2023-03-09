import React from "react";

function WelcomeNavigator() {
  return (
    <div className="flex flex-row justify-between items-center w-full p-2 ">
      <div className="flex flex-grow ">Neptune</div>
      <div className="flex flex-grow justify-end flex-row gap-4">
        <button className="bg-aqua-marine px-5 py-2 rounded-full text-white font-medium">Login</button>
        <button className=" px-5 py-2 rounded-full font-medium">Sign in</button>
      </div>
    </div>
  );
}

export default WelcomeNavigator;
