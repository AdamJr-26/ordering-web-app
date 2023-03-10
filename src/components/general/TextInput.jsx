import React from "react";
import { useField, ErrorMessage } from "formik";

function TextInput({ label, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col">
      <label className="pl-1 font-bold" htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`relative p-2 rounded-xl h-[45px] focus:outline-none focus:border-[2px] border-[1px] border-teal ${
          meta.touched && meta.error ? "border-[2px] border-[#ff0f0f]  " : ""
        }`}
        autoComplete="off"
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        className="text-[#ff0f0f] text-[12px] font-bold pl-2"
        name={field.name}
      />
    </div>
  );
}

export default TextInput;
