import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import SongContext from "./components/contexts/songContext";
import Signup from "./components/pages/Signup";
import { useCookies } from "react-cookie";
import Uploadsong from "./components/pages/Uploadsong";
import LoggedInhome from "./components/pages/LoggedInhome";
import Mymusic from "./components/pages/Mymusic ";

import { useState } from "react";
import Search from "./components/pages/Search";
import CreatePlaylist from "./components/pages/CreatePlaylist";
import Library from "./components/pages/Library";
import SinglePlaylist from "./components/pages/SinglePlaylist";
import LikedSongs from "./components/pages/LikedSongs";
function App() {
  const [currentSong, setcurrentSong] = useState(null);
  const [soundPlay, setsoundPlay] = useState(null);
  const [ispaused, setispaused] = useState(true);
  const [user,setuser]=useState(null)

  const [cookie, setCookie] = useCookies(["cookie"]);

  return (
    <div className="w-screen h-screen">
      <SongContext.Provider
        value={{
          soundPlay,
          setsoundPlay,
          ispaused,
          setispaused,
          currentSong,
          setcurrentSong,
          user,setuser
        }}
      >
        <Routes>
          <Route
            path="/home"
            element={cookie.token ? <LoggedInhome /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={cookie.token ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={cookie.token ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/uploadsong"
            element={cookie.token ? <Uploadsong /> : <Login />}
          />
          <Route
            path="/mymusic"
            element={cookie.token ? <Mymusic /> : <Login />}
          />
          <Route
            path="/search"
            element={cookie.token ? <Search /> : <Login />}
          />
          <Route
            path="/library"
            element={cookie.token ? <Library /> : <Login />}
          />
          <Route
            path="/playlist/:playlistId"
            element={cookie.token ? <SinglePlaylist /> : <Login />}
          />
           <Route
            path="/liked"
            element={cookie.token ? <LikedSongs /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </SongContext.Provider>
    </div>
  );
}

export default App;
