import { useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../serverHelper";
import TextInput from "../shared/TextInput";

const Addtoplaylist = ({ closeModal, addsongToplaylist }) => {

  const [data, setdata] = useState([]);
  const fetchData = async () => {
    const response = await makeAuthenticatedGETRequest("/get/me");
    if (response) {

      
      setdata(response.data);
      
    } else {
      alert("no data present");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="text-white absolute w-screen flex justify-center items-center h-screen bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="flex flex-col bg-app-black text-black w-1/3 rounded-ml p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-white flex justify-center items-center font-bold text-lg">
          Select Playlist
        </div>

        <div className="flex flex-col justify-center items-center mt-4">
          {data && data.map((item) => {
            return (
              <PlaylistlistComponent
                info={item}
                addsongToplaylist={addsongToplaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const PlaylistlistComponent = ({ info,addsongToplaylist }) => {
  return (
    <div
      className="w-full hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer text-white items-center space-x-4 p-4 rounded-lg bg-app-black flex"
      onClick={() => {
        addsongToplaylist(info._id);
      }}
    >
      <div>
        <img src={info.thumbnail} className="h-10 w-10 " />
      </div>
      <div className="font-bold text-sm">
        <span>{info.name}</span>
      </div>
    </div>
  );
};

export default Addtoplaylist;
