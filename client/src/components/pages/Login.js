import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";

import { makeUnauthenticatedPOSTRequest } from "../serverHelper";
import { useCookies } from "react-cookie";
const Login = () => {
  const [cookies, setcookies] = useCookies(["cookie"]);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const response = await makeUnauthenticatedPOSTRequest("/login", data);
    if (response) {
      
      const token = response.token;
      
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setcookies("token", token, { path: "/", expires: date });
      setcookies("cookie", { token });
      navigate("/home");
    } else {
      console.log("Login failed. Please check your credentials.");
      alert("Login failed. Please check your credentials.");
    }
    
  };
  
  return (
    <div className="w-full shadow-lg h-full flex flex-col items-center">
      <div className="p-4 border-b w-full flex justify-center border-solid  border-gray-200">
        <Icon icon="logos:spotify" width="200" height="100" />
      </div>
      <div className="form flex flex-col w-1/3 py-10">
        <div>
          <p className="mb-5 font-bold flex flex-col items-center justify-center">
            To Continue login to spotify
          </p>
        </div>
        <TextInput
          label={"Enter Email or username"}
          placeholder={"Enter email or username"}
          value={email}
          setValue={setemail}
        />
        <PasswordInput
          className=""
          label={"Enter password"}
          placeholder={"Enter Password"}
          value={password}
          setValue={setpassword}
        />
        <div className="flex items-center justify-end w-full ">
          <button
            className="rounded-full  font-semibold bg-green-500 border-black w-1/4 p-4"
            onClick={handlesubmit}
          >
            Log In
          </button>
        </div>
        <div className="w-full border boder-solid border-gray-300 mt-10"></div>
        <div className="font-bold my-6  text-lg flex justify-center">
          Don't have an account?
        </div>
        <div className="border  text-gray-500 w-full  justify-center  items-center rounded-full font-bold flex  border-gray-500">
          <button className="mx-auto p-5" onClick={handleClick}>
            SIGNUP FOR SPOTIFY
          </button>
          {/* <Link to="/signup">Signup for spotify</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
