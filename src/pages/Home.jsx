import React, { useEffect, useState } from "react";
import ChoosenStation from "../components/ChoosenStation";
import NearbyWRSMap from "../components/modal/map/NearbyWRSMap";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import axiosAPI from "../services/api.axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [station, setStation] = useState(null);
  const [products, setProducts] = useState([]);
  // station then fetch products
  useEffect(() => {
    async function getProducts() {
      try {
        if (!station) return;
        const res = await axiosAPI().get(
          `/api/products/from-customer/${station._id}`
        );
        if (res.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log("errr", error);
      }
    }
    getProducts();
  }, [station]);

  return (
    <div className=" flex flex-col gap-2 ">
      <div className="z-40 flex flex-row w-full justify-end items-end">
        <Navigation />
      </div>
      <div
        className={` w-full transition-all duration-500 ${
          station ? "h-[400px]" : "h-screen fixed"
        }`}
      >
        {station ? (
          <div className=" py-2 w-full h-[400px] overflow-hidden z-0">
            <ChoosenStation station={station} setStation={setStation} />
          </div>
        ) : (
          <div className={`w-full overflow-hidden z-0 h-full `}>
            <NearbyWRSMap station={station} setStation={setStation} />
          </div>
        )}
      </div>

      <div className="h-[1px] bg-ship-gray-200"></div>

      {station ? (
        <div className="flex flex-col gap-5 p-2 ">
          <p className="text-[24px] font-bold text-teal">
            {station.wrs_name} Products
          </p>
          <div className="flex flex-row flex-wrap gap-5 px-5">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
