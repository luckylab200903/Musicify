import React from "react";

const ButtonwithHover = ({ text }) => {
  return (
    <div className=" flex flex-row pt-2 font-bold text=xl items-center justify-end p-4 hover:text-white transition-transform duration-300 transform hover:scale-105">
      <button className=" text-white">{text}</button>
    </div>
  );
};

export default ButtonwithHover;



