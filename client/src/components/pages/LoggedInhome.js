import React from "react";
import LeftPanel from "../parts/LeftPanel";
import ButtonwithHover from "../shared/Buttonwithhover";
import LoginHover from "../shared/LoginHover";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import LoggedIncontainer from "../LoggedIncontainer";
const CardexportData = [
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://rollingstoneindia.com/wp-content/uploads/2020/08/Anuv-Jain-scaled.jpg",
  },
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://a10.gaanacdn.com/gn_img/artists/Dk9KNk23Bx/k9KNqJJbBx/size_xl_1638898900.webp",
  },
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Shreya_Ghoshal_at_Filmfare_Awards_South.jpg/220px-Shreya_Ghoshal_at_Filmfare_Awards_South.jpg",
  },
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://wallpapers.com/images/hd/alluring-ed-sheeran-hd-y9deb32b7kfiob0h.jpg",
  },
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://m.media-amazon.com/images/M/MV5BOWRiMzRlZGUtNjA1Zi00OGJlLTg3Y2QtYjQ3MDNhOTQ1OWVjXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "title no 1",
    desc: "this is the description that the song have",
    img: "https://upload.wikimedia.org/wikipedia/en/1/17/Ellie_Goulding_-_Love_Me_Like_You_Do.png",
  },
];
const LoggedInhome = () => {
  
  return (
    <LoggedIncontainer>
      <PlaylistView PlaylistHeading={"Focus"} />
      <PlaylistView PlaylistHeading={"Songs"} />
      <PlaylistView PlaylistHeading="Training" />
    </LoggedIncontainer>
  );
};
const PlaylistView = ({ PlaylistHeading }) => {
  return (
    <div className="p-8 overflow-auto">
      <div className="text-2xl font-semibold mb-5">{PlaylistHeading}</div>
      <div className="font-semibold w-full flex justify-between">
        {CardexportData.map((item) => (
          <Card
            title={item.title}
            desc={item.desc}
            img={item.img}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, desc, img }) => {
  return (
    <div className="bg-black bg-opacity-90 w-1/6 p-4 gap-4 rounded-lg mx-2">
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

export default LoggedInhome;
