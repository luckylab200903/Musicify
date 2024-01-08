import React from "react";

const TextInput = ({ label, placeholder, className, value, setValue }) => {
  return (
    <div className="flex flex-col p-4 w-full">
      <label className="font-bold mb-2">{label}</label>
      <input
        className={`rounded-md p-4 border border-gray-400 ${className}`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
