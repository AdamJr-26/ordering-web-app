import React, { useState } from "react";
import { Icon } from "@iconify/react";
import UpdateAddess from "./modal/UpdateAddess";

function DropdownMenu({ profile, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="relative inline-block ">
      <button
        className="text-[24px] sm:text-[32px]  cursor-pointer  hover:cursor-pointer"
        onClick={toggleMenu}
      >
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
      </button>
      {isOpen && (
        <div className=" absolute w-fit right-0 mt-2 py-2 bg-white rounded-md shadow-xl z-40 overflow-hidden">
          <div className="flex flex-col gap-2 p-5">
            <div className="flex flex-row gap-2 items-center">
              <div className="min-h-[50px] min-w-[50px] rounded-full bg-ship-gray-300 ">
                <img
                  className="h-full w-auto rounded-full min-h-[50px] min-w-[50px]"
                  src={profile?.display_photo}
                  alt=""
                />
              </div>
              <div>
                <p className="font-bold nowrap">
                  {profile?.firstname + " " + profile.lastname}
                </p>
                <p className="text-ship-gray-500">{profile.gmail}</p>
              </div>
            </div>
            <div className="py-2 ">
              <p className="text-[14px]">More Options</p>
              <div className="py-2">
                <button
                  onClick={logout}
                  className="font-bold p-2 hover:bg-ship-gray-100 rounded-xl w-full"
                >
                  Logout
                </button>
                <UpdateAddess dropDownSetIsOpen={setIsOpen} dropDownIsOpen={isOpen} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
