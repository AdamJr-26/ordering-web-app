import React from "react";
import { Icon } from "@iconify/react";
import axiosAPI from "../services/api.axios";
import { ToastContainer, toast } from "react-toastify";
import errorExtractor from "../utils/response.error.extractor";
function ProductCard({ product }) {
  // add to cart
  async function addToCart() {
    try {
      const payload = {
        admin: product.admin,
        gallon: product.gallon[0]._id,
      };
      const res = await axiosAPI().post("/api/cart", payload);
      if (res.data.code === 200) {
        toast.success("Added to cart", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      if (
        ["DuplicateError", "NotAllowed"].includes(
          errorExtractor(error).fullError
        )
      ) {
        toast.warning(errorExtractor(error).message, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(errorExtractor(error).message, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }
  return (
    <div className="flex-1 p-0 flex-shrink-0 min-h-[300px] min-w-[120px] max-w-[200px] bg-teal rounded-[30px] ">
      <div className="flex items-center overflow-hidden justify-center bg-dark-grey rounded-[30px] p-2 relative h-[150px]">
        <img
          src={product.gallon[0].gallon_image}
          alt=""
          className="h-full w-auto"
        />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-white font-bold">Round</p>
          <p className="text-white text-[14px]">
            {product.gallon[0].liter} Liter(s)
          </p>
          <p className="text-white text-[14px]">₱ {product.price}</p>
        </div>
        <div className="flex flex-row justify-around">
          <button
            onClick={addToCart}
            className="hover:bg-opacity-50 bg-aqua-marine p-3 text-[24px] rounded-full text-white"
          >
            <Icon icon="mdi:cart-arrow-down" />
          </button>
          <button className="hover:bg-opacity-50 bg-aqua-marine p-3 text-[24px] rounded-full text-white">
            <Icon icon="ic:sharp-shopping-cart-checkout" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
