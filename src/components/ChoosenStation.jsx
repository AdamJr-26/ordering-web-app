import React from "react";
import { Icon } from "@iconify/react";

function ChoosenStation({ station, setStation }) {
  const address = station?.address;
  return (
    <div className="relative h-full flex flex-col items-center justify-center gap-2">
      <div className="h-[80px] w-[80px] rounded-full bg-teal"></div>
      <p className="font-bold">{station?.wrs_name}</p>
      <p className="text-[14px] font-medium text-ship-gray-500 ">
        {`${address.street_building || ""}, ${address.barangay || ""}, ${
          address.city
        } ${address.province || ""}`}
      </p>
      <div className="flex flex-row gap-5 sm:gap-10">
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="ic:sharp-star-border" />
          <p className="font-medium text-ship-gray-500 text-[14px]">4.5</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <p className="font-medium text-ship-gray-500 text-[14px]">
            200 Subscribed
          </p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="material-symbols:location-on" />
          <p className="font-medium text-ship-gray-500 text-[14px]">
            {(station?.dist?.calculated / 1000).toFixed(1)} KM
          </p>
        </div>
      </div>
      <div>
        <button className="px-5 py-3 text-white font-medium bg-aqua-marine rounded-full">
          Subscribe
        </button>
      </div>
      <button
        onClick={() => setStation(null)}
        className="absolute top-0 right-5 text-[32px] "
      >
        <Icon icon="material-symbols:close" />
      </button>
    </div>
  );
}

export default ChoosenStation;
