import React from "react";
import LeftPanel from "../parts/LeftPanel";
import ButtonwithHover from "../shared/Buttonwithhover";
import LoginHover from "../shared/LoginHover";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import LoggedIncontainer from "../LoggedIncontainer";
import { makeAuthenticatedGETRequest } from "../serverHelper";
import SingleSongCard from "../shared/SingleSongCard";

const Search = () => {
  const [isFocus, setisFocus] = useState(false);
  const [search, setsearch] = useState("");
  const [songData, setsongData] = useState([]);

  const handleInput = (e) => {
    setsearch(e.target.value);
  };
  const SearchSong = async () => {
    try {
      console.log(search);
      const response = await makeAuthenticatedGETRequest("/get/song/" + search);
      setsongData(response);

      console.log("songData:", songData);
    } catch (error) {
      console.error("Error in SearchSong:", error);
    }
  };

  const SearchSongEnter = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      SearchSong();
    }
  };

  return (
    <LoggedIncontainer>
      <div>
        <div className="flex p-8 py-4 text-white w-full px-4 space-x-3 justify-start items-center">
          <div
            className={`w-1/3 flex items-center rounded-full p-4 text-sm bg-gray-800 text-white items-center ${
              isFocus ? "border border-white" : "border-none"
            }`}
          >
            <div>
              <Icon icon="tabler:search" width="30" />
            </div>
            <input
              placeholder="Search Songs"
              className="text-white w-full ml-4 bg-gray-800 border-none outline-none"
              type="text"
              onFocus={() => setisFocus(true)}
              onBlur={() => setisFocus(false)}
              onChange={handleInput}
              onKeyDown={SearchSongEnter}
            />
          </div>
          <div>
            <button
              className="bg-white p-4 rounded-full text-black font-bold"
              onClick={SearchSong}
            >
              Search
            </button>
          </div>
        </div>
        <div className="p-4">
          {search && songData.length > 0 ? `Search result for ${search}` : null}
        </div>
        <div className="p-4">
          {songData && songData.length > 0 ? (
            songData.map((item) => <SingleSongCard key={item.id} info={item} />)
          ) : (
            <span className="font-bold text-lg">Nothing to show</span>
          )}
        </div>
      </div>
    </LoggedIncontainer>
  );
};
export default Search;
