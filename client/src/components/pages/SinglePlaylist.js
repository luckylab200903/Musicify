import { useParams } from "react-router-dom";
import LoggedIncontainer from "../LoggedIncontainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../serverHelper";
import SingleSongCard from "../shared/SingleSongCard"; // Import the SingleSongCard component

const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        "/get/playlist/" + playlistId
      );

      if (response) {
        setPlaylistDetails(response); // Assuming the data is in a 'data' property
      } else {
        alert("No songs in playlist");
      }
    } catch (error) {
      console.error("Error fetching playlist details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  console.log(playlistDetails);

  return (
    <LoggedIncontainer>
      <div className="text-xl p-4 flex font-bold">{playlistDetails.name}</div>
      {playlistDetails.songs && playlistDetails.songs.length > 0 ? (
        playlistDetails.songs.map((item) => (
          <SingleSongCard key={item.id} info={item} />
        ))
      ) : (
        <p className="p-4 font-bold text-lg">No songs in this playlist.</p>
      )}
    </LoggedIncontainer>
  );
};

export default SinglePlaylist;
