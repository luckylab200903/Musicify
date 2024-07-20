import React, { useState } from "react";
import LeftPanel from "../parts/LeftPanel";
import RightPanel from "../parts/RightPanel";
import ButtonwithHover from "../shared/Buttonwithhover";
import LoginHover from "../shared/LoginHover";
import TextInput from "../shared/TextInput";
import CloudinaryUpload from "../../utils/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../serverHelper";
import { useNavigate } from "react-router-dom";
const Uploadsong = () => {
  //console.log(window.cloudinary);
  const [nameofsong, setnameofsong] = useState("");
  const [thumbnail, setthumbnail] = useState("");
  const [playlisturl, setplaylisturl] = useState("");
  const [songname, setsongname] = useState("");
  const navigate=useNavigate()
  const handlepostrequest = async (e) => {
    e.preventDefault();
    
    const data={name:nameofsong,thumbnail,track:playlisturl}
    const response=await makeAuthenticatedPOSTRequest("/create",data)
   
    if(response)
    {
      alert("sucessfully uploaded")
    }
    else{
      alert("upload failed")
    }
    navigate("/home")
  };
  return (
    <div className="h-full w-full flex  text-white bg-black">
      <div className="h-full w-1/5 flex flex-col justify-between">
        <LeftPanel />
      </div>
      <div className="h-full w-4/5 bg-app-black">
        <div className="bg-black h-1/10 opacity-30 flex items-center justify-end">
          <ButtonwithHover className="pl-4" text={"Premium"} />
          <ButtonwithHover className="pl-4" text={"Support"} />
          <ButtonwithHover className="pl-4" text={"Download"} />
          <ButtonwithHover className="pl-8" text={"Upload songs"} />
          <LoginHover text={"KC"} />
        </div>
        <div className="p-8 font-bold text-2xl overflow-auto">
          Upload your music
        </div>
        <div className="w-full flex">
          <div className="w-1/3 text-gray-400">
            <TextInput
              value={nameofsong}
              setValue={setnameofsong}
              label={"Name of song"}
              placeholder={"please enter the name of song"}
              className={"text-black"}
            />
          </div>
          <div className="w-1/3 ">
            <TextInput
              value={thumbnail}
              setValue={setthumbnail}
              label={"Thumbnail"}
              placeholder={"Thumbnail of song"}
              className={"text-black"}
            />
          </div>
        </div>
        <div className="pl-4 py-5">
          {songname ? (
            <div className="bg-white text-black w-1/3 rounded-full p-3">
              {songname.substring(0, 20)}...
            </div>
          ) : (
            <CloudinaryUpload
              setUrl={setplaylisturl}
              setSongName={setsongname}
            />
          )}
        </div>

        <div className="pl-4">
          <button
            className=" rounded-full w-1/4 text-black font-bold bg-white p-3"
            onClick={handlepostrequest}
          >
            Submit song
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uploadsong;
