import React from "react";
import IconText from "../shared/IconText";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../serverHelper";

import styled from "styled-components";

const LeftPanel = ({ onClick }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div>
          <Link to="/home">
            <img
              className="mt-4 p-2 img-fluid"
              alt="logo"
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              width={140}
            />
          </Link>

          <Link to="/home">
            <IconText
              logo={
                <Icon
                  icon="material-symbols-light:home"
                  color="white"
                  width={"50"}
                  active={pathname ? "/home" : null}
                />
              }
              text={"Home"}
            />
          </Link>
          <Link to="/search">
            <IconText
              logo={<Icon icon="ion:search" color={"white"} width={"50"} />}
              text={"Search"}
            />
          </Link>
          <Link to="/library">
            <IconText
              logo={
                <Icon icon="clarity:library-solid" color="white" width={"50"} />
              }
              text={"Library"}
            />
          </Link>
          <Link to="/mymusic">
            <IconText
              className="pt-4"
              logo={
                <Icon
                  icon="icomoon-free:music"
                  color="white"
                  width={"50"}
                  active={pathname ? "/mymusic" : null}
                />
              }
              text={"My music"}
            />
          </Link>
        </div>
        <div className="mt-12 h-full">
          <IconText
            logo={
              <Icon icon="icon-park-solid:add" color="white" width={"50"} />
            }
            text={"Create Playlist"}
            onClick={onClick}
          />

          <Link to="/liked">
            <IconText
              className="pt-2"
              logo={<Icon icon="zondicons:heart" color="white" width={"50"} />}
              text={"Liked songs"}
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-start">
        <button className="my-4 font-bold border border-4 focus:outline-none  focus:ring  transition-transform duration-300 hover:scale-105 border-gray-200 p-4 rounded-full flex items-center w-100">
          <Icon icon="bi:globe" color="white" width="20" className="mr-2" />
          English
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
