import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import axiosAPI from "../../services/api.axios";
import { ToastContainer, toast } from "react-toastify";
import errorExtractor from "../../utils/response.error.extractor";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
function CartModal() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  //   onClick={openModal}
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    async function getCart() {
      if (!modalIsOpen) {
        dispatchItems({ type: "reset", data: [] }); // reset selected items.
        return;
      }
      try {
        const res = await axiosAPI().get("/api/cart");
        if (res.data.code === 200) {
          setCarts(res.data.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    getCart();
  }, [modalIsOpen]);

  function selectedItemReducer(state, action) {
    switch (action.type) {
      case "add": {
        return [action.data, ...state];
      }
      case "reduce": {
        let updatedState = state.filter(
          (items) => items.gallon !== action.data.gallon
        );
        return updatedState;
      }
      case "update": {
        const isIndex = state.findIndex(
          (item) => item.gallon === action.data.gallon
        );
        console.log("isIndex", isIndex);
        if (isIndex !== -1) {
          state[isIndex].total = action.data.total;
        }
        return state;
      }
      case "reset": {
        return [];
      }
    }
  }

  // get total and to pay
  const [selectedItems, dispatchItems] = useReducer(selectedItemReducer, []);
  function handleCheckBoxOnItem(e) {
    const gallon = JSON.parse(e.target.value).gallon[0];
    const price = JSON.parse(e.target.value).price;
    const value = {
      gallon: gallon._id,
      total: 0,
      price: price,
    };

    if (e.target.checked) {
      dispatchItems({ type: "add", data: value });
    } else {
      dispatchItems({ type: "reduce", data: value });
    }
  }
  console.log("selectedItems", selectedItems);
  const [totalToPay, setTotalToPay] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  function handleTotalInputChange(e, gallon) {
    const value = {
      gallon: gallon,
      total: Number(e.target.value),
    };
    dispatchItems({ type: "update", data: value });
    setTotalItem(selectedItems.reduce((acc, obj) => acc + obj.total, 0));
    setTotalToPay(
      selectedItems.reduce((acc, obj) => acc + obj.price * obj.total, 0)
    );
  }
  const [schedule, setSchedule] = useState(false);
  function handleDate(e) {
    const schd = {
      unix_timestamp: Math.floor(new Date(e.target.value).valueOf() / 1000),
      utc_date: new Date(e.target.value),
    };
    setSchedule(schd);
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit() {
    // checking state.
    //create object for payload
    if (
      !schedule ||
      isSubmitting ||
      !selectedItems.length ||
      !selectedItems.reduce((acc, obj) => acc + obj.price * obj.total, 0) // check if inputs
    ) {
      toast.warning("Some fields are required.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      try {
        setIsSubmitting(true);
        const payload = {
          items: selectedItems,
          schedule: schedule,
        };
        // setTotalItem(selectedItems.reduce((acc, obj) => acc + obj.total, 0));
        const res = await axiosAPI().post("/api/schedle/by-customer", payload);
        if (res.data.code === 201) {
          setIsOpen(false);
          setIsSubmitting(false);
          toast.success("New schedule created successfully", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(errorExtractor(error).message, {
          position: "bottom-center",
          autoClose: 2000,
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
    <div>
      <button onClick={openModal}>
        <Icon icon="material-symbols:shopping-cart" />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <p className="text-[16px] font-bold">Your Cart</p>
          {carts.length ? (
            <>
              <div className="flex flex-col gap-2">
                {carts.map((cart, i) => (
                  <div key={i}>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row gap-4 items-center">
                        <input
                          className="h-[24px] w-[24px] rounded-full"
                          type="checkbox"
                          name=""
                          id=""
                          value={JSON.stringify(cart)} // gallon id
                          onClick={(e) => handleCheckBoxOnItem(e)}
                        />
                        <div className="h-[50px] w-[50px] rounded-full items-center justify-center">
                          <img
                            className="h-full w-auto "
                            src="https://www.delpermarketing.com/uploads/7/3/5/9/7359498/uniplus-slim-galon-blue.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="font-bold">{cart.gallon[0].name}</p>
                          <p>{cart.gallon[0].liter} Liter(s)</p>
                          <p>₱ {cart.price}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Count</p>
                        <input
                          className="h-[45px] font-bold text-[18px] max-w-[100px] rounded-lg border-[1px] border-ship-gray-200 focus:outline-none text-center"
                          type="number"
                          placeholder="0"
                          disabled={
                            !selectedItems.some(
                              (obj) => obj.gallon === cart.gallon[0]._id
                            )
                          }
                          onChange={(e) =>
                            handleTotalInputChange(e, cart.gallon[0]._id)
                          }
                        />
                      </div>
                    </div>
                    <div className="h-[1px] mt-2 bg-ship-gray-200"></div>
                  </div>
                ))}
              </div>
              <div className="">
                <p className="text-ship-gray-500 text-[14px] ">
                  Please be advised that the prices of some water refilling
                  stations may vary depending on the distance of the location.
                </p>
              </div>
              <div className="flex flex-wrap gap-5 items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2 ">
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <p>Item</p>
                    <p className="font-bold h-[30px] px-2 flex items-center bg-dim-blue justify-center ">
                      {selectedItems.length}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <p>Total</p>
                    <p className="font-bold h-[30px] px-2 flex items-center bg-dim-blue justify-center ">
                      {selectedItems.reduce((acc, obj) => acc + obj.total, 0)}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <p>To Pay</p>
                    <p className="font-bold h-[30px] px-2 flex items-center bg-dim-blue justify-center ">
                      ₱{" "}
                      {selectedItems.reduce(
                        (acc, obj) => acc + obj.price * obj.total,
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Set date</p>
                  <input
                    className="h-[45px] font-bold text-[16px] rounded-lg border-[1px] border-ship-gray-200 focus:outline-none text-center"
                    type="date"
                    onChange={(e) => handleDate(e)}
                  />
                </div>
                <div className="flex  flex-wrap gap-2 items-center justify-center">
                  <button className="px-4 py-2e font-bold rounded-full ">
                    Remove
                  </button>
                  <button
                    onClick={handleSubmit}
                    className={`px-4 py-2 hover:bg-opacity-50 bg-aqua-marine font-bold rounded-full text-white ${
                      isSubmitting ? "bg-opacity-50" : ""
                    }`}
                  >
                    Place order
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p>No Items in the cart</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CartModal;
