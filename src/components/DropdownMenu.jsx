import React, { useState } from "react";
import { Icon } from "@iconify/react";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <div className=" relative inline-block">
      <button
        className="text-[24px] sm:text-[32px]  cursor-pointer  hover:cursor-pointer"
        onClick={toggleMenu}
      >
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 bg-white rounded-md shadow-xl z-10">
          <div className="flex flex-col gap-2 p-5">
            <div className="flex flex-row gap-2">
                <div className="h-[50px] w-[50px] rounded-full bg-ship-gray-300 ">
                </div>
                <div>
                    <p className="font-bold">Juan Dela Cruz</p>
                    <p className="text-ship-gray-500">juandc@gmail.com</p>
                </div>
            </div>
            <div className="py-2">
              <p className="text-[14px]">More Options</p>
              <div className="py-2">
              <button className="font-bold p-2 hover:bg-ship-gray-100 rounded-xl w-full">Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
