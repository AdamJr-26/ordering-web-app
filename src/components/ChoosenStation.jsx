import React from "react";
import { Icon } from "@iconify/react";

function ChoosenStation() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-[80px] w-[80px] rounded-full bg-teal"></div>
      <p className="font-bold">Vince's Juice</p>
      <p className="text-[14px] font-medium text-ship-gray-500 ">
        Manatal, Pandi, Bulacan
      </p>
      <div className="flex flex-row gap-5 sm:gap-10">
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="ic:sharp-star-border" />
          <p className="font-medium text-ship-gray-500 text-[14px]">4.5</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <p className="font-medium text-ship-gray-500 text-[14px]">200 Subscribed</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="material-symbols:location-on" />
          <p className="font-medium text-ship-gray-500 text-[14px]">25 KM</p>
        </div>
      </div>
      <div>
        <button className="px-5 py-3 text-white font-medium bg-aqua-marine rounded-full">Subscribe</button>
      </div>
    </div>
  );
}

export default ChoosenStation;
