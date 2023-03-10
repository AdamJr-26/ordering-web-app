import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

const customStyles = {
  content: {
    top: "15%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -15%)",
  },
};
Modal.setAppElement("#root");

function SearchModal({ address }) {
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

  return (
    <div className="text-[24px] sm:text-[32px] flex flex-grow gap-2 items-center hover:text-aqua-marine hover:cursor-pointer">
      <div className={`flex-row gap-2`}>
        <button className="text-[24px] font-bold text-teal flex flex-row gap-2 items-center justify-center">
          <Icon icon="material-symbols:location-on" />{" "}
          <span className="text-[16px]">{address?.municipal_city}</span>
        </button>
      </div>
      <input
        onClick={openModal}
        type="text"
        placeholder="Find water refilling station."
        className={` ${
          modalIsOpen
            ? "absolute top-3 left-0 w-full z-50 flex "
            : "relative hidden"
        }  w-full sm:flex border-[1px] px-5 text-[16px] text-teal border-dim-blue rounded-full h-[45px] focus:outline-none focus:border-[1px]`}
      />

      <Icon onClick={openModal} icon="ic:baseline-search" />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Search"
      >
        <div>
          <div>
            <p className="font-bold text-[16px]">
              Nearby Water Refilling Stations
            </p>
            <p>You can adjust radius to find more water refilling station.</p>
          </div>
          <div className="py-5 flex flex-col gap-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex flex-row gap-3 hover:bg-dark-grey"
              >
                <div className="h-[80px] w-[80px] bg-teal  rounded-xl"></div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold ">Vince's Juice</p>
                  <p className="font-400 text-[14px] text-ship-gray-400">
                    Manatal, Pandi
                  </p>
                  <p className="font-400 text-[14px] text-ship-gray-400">
                    25 KM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SearchModal;
