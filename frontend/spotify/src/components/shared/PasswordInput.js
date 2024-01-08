import React from "react";

const PasswordInput = ({ label, placeholder,value,setValue }) => {
  return (
    <div className="flex flex-col p-4 w-full">
      <label className="font-bold mb-2">{label}</label>
      <input
        className="rounded-md p-4 border border-gray-400"
        placeholder={placeholder}
        type="password"
        value={value}
        onChange={(e)=>{
          setValue(e.target.value)
        }}

      />
    </div>
  );
};

export default PasswordInput;
