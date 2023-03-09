import React from "react";
import { Icon } from "@iconify/react";
function ProductCard() {
  return (
    <div className="flex-1 p-0 flex-shrink-0 min-h-[300px] max-w-[200px] bg-teal rounded-[30px] ">
      <div className="flex items-center overflow-hidden justify-center bg-dark-grey rounded-[30px] p-2 relative h-[150px]">
        <img
          src="https://www.delpermarketing.com/uploads/7/3/5/9/7359498/uniplus-slim-galon-blue.jpg"
          alt=""
          className="h-full w-auto"
        />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-white font-bold">Round</p>
          <p className="text-white text-[14px]">25 Liter(s)</p>
          <p className="text-white text-[14px]">325 Available</p>
        </div>
        <div className="flex flex-row justify-around">
          <button className="bg-aqua-marine p-3 text-[24px] rounded-full text-white">
            <Icon icon="mdi:cart-arrow-down" />
          </button>
          <button className="bg-aqua-marine p-3 text-[24px] rounded-full text-white">
            <Icon icon="ic:sharp-shopping-cart-checkout" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
