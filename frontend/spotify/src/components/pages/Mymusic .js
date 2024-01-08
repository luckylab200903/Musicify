import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../serverHelper";
import { Link } from "react-router-dom";
import SingleSongCard from "../shared/SingleSongCard";
import { Howl, Howler } from "howler";
import LoggedIncontainer from "../LoggedIncontainer";

const Mymusic = () => {
  const [songData, setsongData] = useState([]);
  const [playsound, setplaysound] = useState(null);

  const playSound = (songSrc) => {
    if (playsound) {
      playsound.stop();
    }
    var sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setplaysound(sound);
    sound.play();
  };

  const fetchData = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/get/mysongs");
      setsongData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LoggedIncontainer>
      <div className="p-8 overflow-auto">
        <div className="text-white text-lg font-bold pb-4 pl-2">My songs</div>
        <div className="space-y-5">
          {songData.length === 0 ? (
            <p className="text-white p-4 font-bold text-lg">No music found. Add music to see here.</p>
          ) : (
            songData.map((card) => (
              <SingleSongCard key={card._id} info={card} playSound={playSound} />
            ))
          )}
        </div>
      </div>
    </LoggedIncontainer>
  );
};

export default Mymusic;
