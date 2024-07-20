import React from "react";

const IconText = ({ logo, text, active, onClick }) => {
  return (
    <div className="text-white flex pt-2 items-center justify-start cursor-pointer" onClick={onClick}>
      <div className="pr-4 pl-4 font-bold">
        {/* Use max-w-full and h-auto for responsive image */}
        <div className="max-w-full h-auto">
          {logo}
        </div>
      </div>
      <div className="font-semibold sm:">{text}</div>
    </div>
  );
};

export default IconText;
