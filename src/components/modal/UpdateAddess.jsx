import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../general/TextInput";
import axiosAPI from "../../services/api.axios";
import { useAuth } from "../../hooks/auth";
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

function UpdateAddess({ dropDownSetIsOpen, dropDownIsOpen }) {
  const { profile } = useAuth();
  const address = profile?.data?.data.address;
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
  const initialVavalue = {
    province: "",
    municipal_city: "",
    barangay: "",
    street: "",
  };
  const validationSchema = Yup.object().shape({
    province: Yup.string(),
    municipal_city: Yup.string().required("Barangay is Municipality/City."),
    barangay: Yup.string().required("Barangay is required."),
    street: Yup.string(),
  });
  async function onSubmit(values) {
    try {
      const res = await axiosAPI().put("api/customer/address", values);
      if (res.data) {
        profile.mutate();
        window.location.reload();
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
  function handleOpen() {
    // dropDownSetIsOpen(!dropDownIsOpen);
    openModal();
  }
  return (
    <div className="">
      <button
        onClick={handleOpen}
        className="font-bold p-2 text-[16px] hover:bg-ship-gray-100 rounded-xl w-full"
      >
        Update Address
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="fixed w-[450px] z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border-[2px] border-dark-grey px-10 py-5 rounded-xl shadow-dark-grey shadow-lg"
        contentLabel="Example Modal"
      >
        <div className="">
          <p className="text-[24px] font-bold text">Update Address</p>
          <div>
            <p className="py-1">Your Current Addres:</p>
            {address ? (
              <p className="font-bold p-2 bg-dim-blue rounded-lg bg-opacity-50 ">{`${
                address?.street || ""
              } ${address?.barangay || ""} ${address?.municipal_city || ""} ${
                address?.province || ""
              }`}</p>
            ) : (
              <p className="font-bold p-2 bg-dim-blue rounded-lg bg-opacity-50 ">
                Not been set
              </p>
            )}
          </div>
        </div>
        <Formik
          initialValues={initialVavalue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          className=""
        >
          <Form>
            <div className="">
              <TextInput
                label="Province"
                name="province"
                placeholder="Province"
              />
              <TextInput
                label="Municipal/City"
                name="municipal_city"
                placeholder="Municipal"
              />
              <TextInput
                label="Barangay"
                name="barangay"
                placeholder="Barangay"
              />
              <TextInput
                label="Street"
                name="street"
                placeholder="Bdg, Street"
              />
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="flex-1 flex-shrink-0 text-teal px-5 py-2 rounded-full  mt-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="hover:opacity-50 flex-1 flex-shrink-0 bg-aqua-marine text-white px-5 py-2 rounded-full  mt-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default UpdateAddess;
