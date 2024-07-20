import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import LeftPanel from "./parts/LeftPanel";
import ButtonwithHover from "./shared/Buttonwithhover";
import LoginHover from "./shared/LoginHover";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import SongContext from "./contexts/songContext";
import { useLocation } from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import Addtoplaylist from "./pages/Addtoplaylist";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "./serverHelper";
const LoggedIncontainer = ({ children }) => {
  const {
    currentSong,
    setcurrentSong,
    soundPlay,
    setsoundPlay,
    ispaused,
    setispaused,
    user,
    setuser,
  } = useContext(SongContext);

  const [createPlaylistModal, setcreatePlaylistModal] = useState(false);
  const [addPlaylistModal, setaddPlaylistModal] = useState(false);
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }

    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);
  const addsongToplaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest("/add/song", payload);
    if (response) {
      alert("success");
      setaddPlaylistModal(false);
    } else {
      alert("failed in adding song to playlist");
    }
  };
  const changeSong = (songSrc) => {
    if (soundPlay) {
      soundPlay.stop();
    }
    var sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setsoundPlay(sound);
    sound.play();
    setispaused(false);
  };

  const pauseSound = () => {
    soundPlay.pause();
  };

  const playSound = () => {
    if (!soundPlay) {
      return;
    }
    soundPlay.play();
  };
  const togglePlayPause = () => {
    if (ispaused) {
      playSound();
      setispaused(false);
    } else {
      pauseSound();
      setispaused(true);
    }
  };

  const addsongstoliked = async () => {
    try {
      const songId = currentSong._id;
      const response = await makeAuthenticatedPOSTRequest(`/liked/${songId}`, {
        songId,
      });

      if (response) {
        console.log(response);
      } else {
        alert("Empty response or unexpected format");
      }
    } catch (error) {
      console.error("Error in adding song:", error.message);
    }
  };

  const userfetch = async () => {
    const response = await makeAuthenticatedPOSTRequest("/login", user);
    console.log(response);
  };

  useEffect(() => {
    userfetch();
    addsongstoliked();
  }, []);

  return (
    <div className={`${currentSong ? "h-9/10" : "h-full"} w-full bg-black`}>
      {createPlaylistModal && (
        <CreatePlaylist
          closeModal={() => {
            setcreatePlaylistModal(false);
          }}
        />
      )}
      {addPlaylistModal && (
        <Addtoplaylist
          closeModal={() => {
            setaddPlaylistModal(false);
          }}
          addsongToplaylist={addsongToplaylist}
        />
      )}
      <div className="h-full w-full flex  text-white ">
        <div className="h-full w-1/5 flex flex-col justify-between">
          {/* <LeftPanel onClick={()=>setcreatePlaylistModal(true)}/> */}
          <LeftPanel onClick={() => setcreatePlaylistModal(true)} />
        </div>
        <div className="h-full w-4/5 bg-app-black">
          <div className="bg-black h-1/10 opacity-30 flex items-center justify-end">
            <ButtonwithHover className="pl-4" text={"Premium"} />
            <ButtonwithHover className="pl-4" text={"Support"} />
            <ButtonwithHover className="pl-4" text={"Download"} />
            <Link to="/uploadsong">
              <ButtonwithHover className="pl-8" text={"Upload songs"} />
            </Link>
            <LoginHover text={"KC"} />
          </div>
          <div className="bg-app-black h-9/10 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="h-1/10 w-full flex p-4 bg-black items-center">
          <div className="w-1/4 flex items-center">
            <img
              src={`${currentSong.thumbnail}`}
              alt="PLAYER IMAGE"
              className="h-10 w-10"
            />
            <div className="text-white flex flex-col pl-2">
              <div className="text-xm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs hover:underline cursor-pointer text-gray-400 ">
                {`${
                  currentSong.artist.firstname + currentSong.artist.lastname
                }`}
              </div>
            </div>
          </div>

          <div className="text-white w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex items-center justify-between w-1/2">
              <Icon
                icon="gravity-ui:shuffle"
                className="text-gray-500 hover:text-white cursor-pointer"
                fontSize={28}
              />
              <Icon
                icon="ant-design:step-backward-filled"
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={28}
              />
              <Icon
                icon={ispaused ? "mdi:play" : "mdi:pause"}
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={38}
                onClick={togglePlayPause}
              />
              <Icon
                icon="ant-design:step-forward-filled"
                className="text-gray-500 hover:text-white cursor-pointer"
                fontSize={28}
              />
              <Icon
                icon="ic:round-repeat"
                fontSize={28}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>progrees bar</div> */}
          </div>
          <div className="text-white w-1/4 pr-4 space-x-4  items-center flex justify-end p-4">
            <Icon
              icon="material-symbols:playlist-add"
              fontSize={28}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => setaddPlaylistModal(true)}
            />
            <Icon
              icon="ph:heart"
              fontSize={"35"}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={addsongstoliked}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedIncontainer;
