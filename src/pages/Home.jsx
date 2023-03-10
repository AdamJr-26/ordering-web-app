import React, { useEffect, useState } from "react";
import ChoosenStation from "../components/ChoosenStation";
import NearbyWRSMap from "../components/modal/map/NearbyWRSMap";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";

function Home() {
  const [station, setStation] = useState(null);
  console.log("choosen station", station);
  // station then fetch products
  useEffect(() => {
    async function getProducts() {
      try {
        if (!station) return;
        // fetch
      } catch (error) {
        console.log("errr", error);
      }
    }
    getProducts();
  }, [station]);
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="z-40 flex flex-row w-full justify-end items-end">
        <Navigation />
      </div>
      {station ? (
        <div className=" py-2 w-full h-[400px] overflow-hidden z-0">
          <ChoosenStation station={station} setStation={setStation} />
        </div>
      ) : (
        <div className="w-full h-[400px] overflow-hidden z-0 ">
          <NearbyWRSMap station={station} setStation={setStation} />
        </div>
      )}

      <div className="h-[1px] bg-ship-gray-200"></div>
      <div className="flex flex-col gap-5 p-2 ">
        <p className="text-[24px] font-bold text-teal">
          Vince's Juice Products:
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          {[1, 2].map((item) => (
            <ProductCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
