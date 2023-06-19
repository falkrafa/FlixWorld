import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import Player from "./videoPlayer";

const API_KEY = "bbd9548ca40094e1de167abba96ec747";

export default ({ title, items, slug }) => {
  const [scrollX, setScrollX] = useState(-400);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;

    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  }

  const navigateToYouTubeMovies = async (item, key) => {
    console.log(item.title)
    console.log(item.overview)
    const response = await fetch(`http://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    const trailers = data.results.filter((result) => result.type === "Trailer");
    // console.log(trailers)
    const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;

    setVideoUrl(videoUrl);
    setShowVideoPlayer(true);
  };

  const navigateToYouTubeSeries = async (item, key) => {
    const response = await fetch(`http://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    // console.log(data)
    const trailers = data.results.filter((result) => result.type === "Trailer");
    const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;

    setVideoUrl(videoUrl);
    setShowVideoPlayer(true);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow-right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow-area">
        <div className="movieRow-list" style={{
          marginLeft: scrollX,
          width: items.results.length * 150
        }}>
          {items.results.length > 0 && items.results.map((item, key) => {
            if (slug === "originals" || item.media_type === 'tv') {
              return (
                <div key={key} className="movieRow-item">
                  <img onClick={() => navigateToYouTubeSeries(item)} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.originals_title} />
                </div>
              );
            } else if (slug !== "originals" || item.media_type === 'movie') {
              return (
                <div key={key} className="movieRow-item">
                  <img onClick={() => navigateToYouTubeMovies(item)} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.originals_title} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      {showVideoPlayer && (
        <div className="player-wrapper">
          <div className="player-container">
            <button className="close-button" onClick={() => setShowVideoPlayer(false)}><CloseIcon/></button>
            <Player url={videoUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
