import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginHover = ({ text }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["cookie"]);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row pt-2 items-center justify-end p-4 pl-8">
      <button className=" overflow-hidden bg-white text-black border rounded-full p-3 hover:text-black hover:text-green-950 transition-transform duration-300 transform hover:scale-105">
        {text}
      </button>
    </div>
  );
};

export default LoginHover;
