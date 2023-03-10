import React from "react";

function WelcomeNavigator({ signIn }) {

  function googleSignIn() {
    console.log("am i clicking..");
    window.location.href = "http://localhost:4000/auth/google";
  }
  return (
    <div className="flex flex-row justify-between items-center w-full p-2 ">
      <div className="flex flex-grow ">Neptune</div>
      <div className="flex flex-grow justify-end flex-row gap-4">
        <button
          onClick={googleSignIn}
          className="bg-aqua-marine px-5 py-2 rounded-full text-white font-medium"
        >
          Sign in
        </button>
        {/* <button className=" px-5 py-2 rounded-full font-medium">Sign in</button> */}
      </div>
    </div>
  );
}

export default WelcomeNavigator;
