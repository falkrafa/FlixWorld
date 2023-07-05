import { React, useEffect, useState } from "react";
import "./MovieRow.css";
import ReactPlayer from 'react-player/youtube';

const Player = ({ url, castItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [shouldPlay, setShouldPlay] = useState(false);

  // useEffect(() => {
  //   setIsPlaying(false);
  //   setShouldPlay(!castItem); 
  // }, [castItem]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className='video-container'>
      <ReactPlayer
        className='player'
        playing={isPlaying}
        url={url}
        width='100%'
        height='100%'
        onPlay={handlePlay}
        config={{
          youtube: {
            playerVars: { controls: 1, fs: 1, iv_load_policy: 3, modestbranding: 1, rel: 0 }
          }
        }}
      />
    </div>
  );
};

export default Player;
