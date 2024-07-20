import React, { useContext } from "react";
import SongContext from "../contexts/songContext";

const SingleSongCard = ({ info }) => {
  const {currentSong,setcurrentSong}=useContext(SongContext)
  //console.log(info);
  return (
    <div
      className="p-2 rounded-sm text-white flex hover:bg-gray-400 hover:bg-opacity-20"
      onClick={() => {
        // playSound(info.track);
        setcurrentSong(info)
      }}
    >
      <div
        className=" h-12 w-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(${info.thumbnail})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex  w-5/6">
        <div className="flex justify-center items-center flex-col px-4 text-white">
          <div className="hover:underline cursor-pointer">{info.name}</div>
          <div className="text-xs text-gray-500 hover:underline cursor-pointer">
            {info?.artist?.firstname}
          </div>
        </div>
      </div>
      <div className="w-1/6 bg-green flex items-center justify-center text-gray-400">
        <div>2:55</div>
      </div>
    </div>
  );
};

export default SingleSongCard;
