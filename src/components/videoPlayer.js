import React from "react";
import "./MovieRow.css"
import ReactPlayer from 'react-player/youtube';

const Player = ({ url }) => {
  return (
    <ReactPlayer
      classname='teste'
      url={url}
      width='100%'
      height='55vh'
      config={{
        youtube: {
          playerVars: {controls: 1, autoplay: true, fs:0,iv_load_policy:3,modestbranding:1,rel:0}
        }
      }}
    />
  );
};

export default Player;
