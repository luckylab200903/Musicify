import React from "react";
import LeftPanel from "../parts/LeftPanel";
import RightPanel from "../parts/RightPanel";
import ButtonwithHover from "../shared/Buttonwithhover";
import LoginHover from "../shared/LoginHover";
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


const Home = () => {
  return (
    <div className="h-full w-full flex  text-white bg-black">
      <div className="h-full w-1/5 flex flex-col justify-between">
        <LeftPanel />
      </div>
      <div className="h-full w-4/5 bg-app-black">
        <div className="bg-black h-1/10 opacity-30 flex items-center justify-end">
          <ButtonwithHover className="pl-4" text={"Premium"} />
          <ButtonwithHover className="pl-4" text={"Support"} />
          <ButtonwithHover className="pl-4" text={"Download"} />
          <ButtonwithHover className="pl-8" text={"Sign up"} />
          <LoginHover text={"Login"} />
        </div>
        <div className="bg-app-black h-9/10 overflow-auto">
          <PlaylistView PlaylistHeading={"Focus"} />
          <PlaylistView PlaylistHeading={"Songs"} />
          <PlaylistView PlaylistHeading="Training" />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ PlaylistHeading }) => {
  return (
    <div className="p-8 overflow-auto">
      <div className="text-2xl font-semibold mb-5">{PlaylistHeading}</div>
      <div className="font-semibold w-full flex justify-between">
        {CardexportData.map((item) => (
          <PlaylistCard
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

const PlaylistCard = ({ title, desc, img }) => {
  return (
    <div className="bg-black bg-opacity-90 w-1/6 p-4 gap-4 rounded-lg mx-2">
      <div>
        <img className="rounded-lg w-full py-4 h-52" src={img} alt="logos" />
      </div>
      <div className="text-white">{title}</div>
      <div className="text-gray-500 text-sm">{desc}</div>
    </div>
  );
};

export default Home;
