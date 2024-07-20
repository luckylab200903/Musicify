import React, { useEffect, useState } from "react";
import LoggedIncontainer from "../LoggedIncontainer";
import { makeAuthenticatedGETRequest } from "../serverHelper";
import SingleSongCard from "../shared/SingleSongCard";

const LikedSongs = () => {
  const [songdata, setsongdata] = useState([]);

  const getLikedSongs = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/liked/songs");
      if (response) {
        console.log(response);
        setsongdata(response.songs);
      } else {
        console.log("no liked songs");
      }
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  return (
    <LoggedIncontainer>
      <div className="">
        <div className="p-4 font-bold text-lg">Liked Songs</div>
        <div className="p-4">
          {songdata.length > 0 ? (
            songdata.map((item) => (
              <SingleSongCard key={item._id} info={item} id={item._id} />
            ))
          ) : (
            <p className="p-4 font-bold">No liked songs found press the heart button and come back here.</p>
          )}
        </div>
      </div>
    </LoggedIncontainer>
  );
};

export default LikedSongs;
