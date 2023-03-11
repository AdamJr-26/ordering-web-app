import React from "react";
import { Icon } from "@iconify/react";
import axiosAPI from "../services/api.axios";
import { useAuth } from "../hooks/auth";
function ChoosenStation({ station, setStation }) {
  const address = station?.address;
  async function handleSubscribe() {
    if (!station) return;
    try {
      const res = await axiosAPI().put("/api/customer/subscribe", {
        admin: station._id,
      });
      if (res.data) {
        console.log("res.data", res.data);
        profile.mutate();
      }
    } catch (error) {
      console.log("errr");
    }
  }
  const { profile } = useAuth();
  console.log(
    "station._id === profile?.data?.admin",
    station._id,
    profile?.data.data.admin
  );

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
        {station._id === profile?.data?.data?.admin ? (
          <button className="flex flex-row gap-2 items-center px-5 py-3  font-medium bg-dark-grey rounded-full">
            <span>Subscribed</span>
            <span className="text-[24px]">
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            className="px-5 py-3 text-white font-medium bg-aqua-marine rounded-full"
          >
            Subscribe
          </button>
        )}
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
