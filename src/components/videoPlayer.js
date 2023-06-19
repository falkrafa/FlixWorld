import React from "react";
import './Player.css';
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

const Player = ({ url }) => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: url,
        provider: "youtube",
      }
    ],
  };

  return (
    <Plyr options={{
      controls: [
        // "play-large",
        "play",
        // "rewind",
        // "fast-forward",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        // "settings",
        // "pip",
        "fullscreen"
      ],
      captions: { active: true, language: "auto", update: true },
      previewThumbnails: { enabled: false, src: "" },
      autoplay: true,
    }} source={videoSrc}/>
  );
};

export default Player;
