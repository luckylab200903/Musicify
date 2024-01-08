import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../serverHelper";
import TextInput from "../shared/TextInput";

const CreatePlaylist = ({ closeModal }) => {
  const [palylisname, setplaylistname] = useState("");
  const [thumbnail, setthumbnail] = useState("");

  const handleCreateplaylist = async (e) => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: palylisname,
      thumbnail: thumbnail,
      songs: [],
    });
    if (response) {
      alert("sucess");
      console.log(response);
      closeModal();
    } else {
      alert("failed");
    }
  };
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
          Create Playlist
        </div>
        <div className="text-white">
          <TextInput
            label={"Name of Playlist"}
            placeholder={"Please enter the name of the playlist"}
            className={"text-black"}
            value={palylisname}
            setValue={setplaylistname}
          />
          <TextInput
            label={"Thumbnai of the song url"}
            placeholder={"Thumbnail"}
            className={"text-black"}
            value={thumbnail}
            setValue={setthumbnail}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {" "}
          {/* Added styling here */}
          <button
            className="bg-white rounded-full p-4 font-bold"
            onClick={handleCreateplaylist}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
