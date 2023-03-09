import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

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
          <div className="flex flex-col gap-2">
            {[1, 2].map((item) => (
              <div key={item}>
                <div key={item} className="flex flex-row gap-4 items-center">
                  <input
                    className="h-[24px] w-[24px] rounded-full"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <div className="h-[50px] w-[50px] rounded-full items-center justify-center">
                    <img
                      className="h-full w-auto "
                      src="https://www.delpermarketing.com/uploads/7/3/5/9/7359498/uniplus-slim-galon-blue.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-bold">Round</p>
                    <p>25 Liter(s)</p>
                  </div>
                </div>
                <div className="h-[1px] bg-ship-gray-200"></div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-5 items-center justify-center mt-2">
            <p className="font-bold h-[30px] w-[30px] flex items-center justify-center bg-dim-blue ">
              2
            </p>
            <button className="px-4 py-2e font-bold rounded-full ">
              Remove
            </button>
            <button className="px-4 py-2 bg-aqua-marine font-bold rounded-full text-white">
              Checkout
            </button>
          </div>
        </div>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </div>
  );
}

export default CartModal;
