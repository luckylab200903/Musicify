import React from "react";
import { openUploadWidget } from "./Cloudinary"; // Make sure the path is correct

const CloudinaryUpload = ({ setUrl, setSongName }) => {
  const uploadSongWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dtekkvnmz", // Replace with your Cloudinary cloud name
        uploadPreset: "spotify-clone", // Replace with your Cloudinary upload preset
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          console.log(result.info);
          setUrl(result.info.secure_url);
          setSongName(result.info.original_filename); // Update to setSongName
        } else {
          console.log(error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white font-bold text-black p-4 ml-4 rounded-full"
      onClick={uploadSongWidget}
    >
      Select track
    </button>
  );
};

export default CloudinaryUpload;
