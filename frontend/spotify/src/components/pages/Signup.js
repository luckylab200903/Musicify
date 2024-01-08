import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../serverHelper";
import { useCookies } from "react-cookie";
import navigate from "react-router-dom";

const Signup = () => {
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [cemail, setcemail] = useState("");
  const [username, setusername] = useState("");
  const [cookies, setcookies] = useCookies(["cookie"]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== cemail) {
      alert("email and confirm email dont match please check");
      return;
    }
    const data = { email, firstname, lastname, password, username };
    //console.log(data);
    const response = await makeUnauthenticatedPOSTRequest("/register", data);
    if (response) {
      console.log("response from signup", response);
      const token = response.token;
      console.log(token);
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setcookies("token", token, { path: "/", expires: date });
      setcookies("cookie", { token });
      navigate("/home");
    } else {
      alert("api failure");
    }
  };
  return (
    <div className="w-full shadow-lg h-full flex flex-col items-center overflow-auto">
      <div className="p-4 border-b w-full flex justify-center border-solid  border-gray-200">
        <Icon icon="logos:spotify" width="200" height="100" />
      </div>
      <div className="form flex flex-col w-1/3 py-10">
        <div className="text-3xl">
          <p className="mb-5 font-bold flex flex-col items-center justify-center">
            Signup for free to start listening
          </p>
        </div>
        <TextInput
          label={"what is your email"}
          placeholder={"Enter email"}
          value={email}
          setValue={setemail}
        />
        <TextInput
          label={"Confirm your Email"}
          placeholder={"Enter your email again"}
          value={cemail}
          setValue={setcemail}
        />
        <TextInput
          label={"Username"}
          placeholder={"Enter your Username"}
          value={username}
          setValue={setusername}
        />
        <PasswordInput
          label={"Create a password"}
          placeholder={"Create a password"}
          value={password}
          setValue={setpassword}
        />
        <div className="w-full flex justify-center items-center">
          <TextInput
            label={"Firstname"}
            placeholder={"Enter first name"}
            value={firstname}
            setValue={setfirstname}
          />
          <TextInput
            label={"Lastname"}
            placeholder={"Enter Last name"}
            value={lastname}
            setValue={setlastname}
          />
        </div>
        <div className="flex items-center justify-center w-full ">
          <button
            onClick={handleSubmit}
            className="rounded-full  font-semibold bg-green-500 border-black w-1/4 p-4"
          >
            Signup
          </button>
        </div>
        <div className="w-full border  border-gray-300 mt-10"></div>
        <div className="font-bold my-6  text-lg flex justify-center">
          Already have an account? Login
        </div>
        <div className="border w-full  rounded-full font-bold flex  border-gray-500">
          <button onClick={handleClick} className="mx-auto p-5">
            Login Instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
