import React from "react";
import ReactPlayer from 'react-player';

const Player = ({ url }) => {
  return (
    <ReactPlayer
            url={url}
            playing = {true}
            controls={false}
            width= '100%'
            volume={0.5}
        />
  );
};

export default Player;
