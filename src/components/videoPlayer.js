import React from "react";
import "./MovieRow.css";
import ReactPlayer from 'react-player/youtube';

const Player = ({ url }) => {
  return (
    <div className='video-container'>
      <ReactPlayer
        className='player'
        url={url}
        width='100%'
        height='100%'
        config={{
          youtube: {
            playerVars: {controls: 1, autoplay: true, fs:1,iv_load_policy:3,modestbranding:1,rel:0}
          }
        }}
      />
    </div>
  );
};

export default Player;
