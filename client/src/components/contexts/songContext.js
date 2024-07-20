import { createContext } from "react";

const SongContext = createContext({
  currentSong: null,
  setcurrentSong: (currentSong) => {},
  soundPlay:null,
  setsoundPlay:()=>{},
  ispaused:null,
  setispaused:()=>{},
  user:null,
  setuser:()=>{}
});

export default SongContext;
