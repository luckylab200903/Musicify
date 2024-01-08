import { useEffect, useState } from "react";
import LoggedInContainer from "../LoggedIncontainer";
import { makeAuthenticatedGETRequest } from "../serverHelper";
import SingleSongCard from "../shared/SingleSongCard";
import { useNavigate } from "react-router-dom";

const Card = ({ title, desc, img, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-90 w-full p-4 p-2 rounded-lg mx-2"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
    >
      <div>
        <img
          className="rounded-lg w-full py-4 h-52"
          src={img}
          alt="card logo"
        />
      </div>
      <div className="text-white">{title}</div>
      <div className="text-gray-500 text-sm">{desc}</div>
    </div>
  );
};

const Library = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/get/me");
      if (response && response.data) {
        console.log(response);
        setDetails(response.data);
      } else {
        // alert("no data present");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LoggedInContainer>
      <div className="text-xl p-4 flex font-bold text-lg">My playlist</div>

      {loading ? (
        <p>Loading...</p>
      ) : details.length === 0 ? (
        <p className="p-4 font-bold text-lg">No playlists found.</p>
      ) : (
        <div className="overflow-x-hidden py-5 grid gap-5 grid-cols-5">
          {details.map((playlist) => (
            <Card
              key={playlist._id}
              desc=""
              img={playlist.thumbnail}
              playlistId={playlist._id}
              title={playlist.name}
            />
          ))}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default Library;
