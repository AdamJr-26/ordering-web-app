import React from "react";
import ChoosenStation from "../components/ChoosenStation";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex flex-row w-full justify-end items-end">
        <Navigation />
      </div>

      <div className="py-2">
        <ChoosenStation />
      </div>
      <div className="h-[1px] bg-ship-gray-200"></div>
      <div className="flex flex-col gap-5 p-2 ">
        <p className="text-[24px] font-bold text-teal">Vince's Juice Products:</p>
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
