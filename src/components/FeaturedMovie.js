import React, { useState, useEffect } from "react";
import "./FeaturedMovie.css";
import "./MovieRow.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Player from "./videoPlayer";
const API_KEY = "bbd9548ca40094e1de167abba96ec747";
export default ({item}) => {
  const [Details, setDetails] = useState(false);

  useEffect(() => {
      const fetchDetails = async () => {
        let url;
          url = `https://api.themoviedb.org/3/tv/${item.id}?language=pt-BR&api_key=${API_KEY}`;
          
          const response = await fetch(url);
          const DetailsData = await response.json();
          setDetails(DetailsData);
        }
      fetchDetails();
  }, [item]);
  let firstDate = new Date(item.first_air_date)
  let genres = [];

  for(let i in Details.genres){
    genres.push(Details.genres[i].name);
  }

  let description = item.overview;

  if(description.length > 200){
    description = description.substring(0,200)+"..."
  }

  return (
    <section className="featured" style={{
      backgroundSize:'cover',
      backgroundPosition:'center',
      backgroundImage:`url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured-vertical">
        <div className="featured-horizontal">
          <div className="featured-name">
            {item.name}
          </div>
          <div className="featured-info">
            <div className="featured-points">{item.vote_average} pontos</div>
            <div className="featured-year">{firstDate.getFullYear()}</div>
            <div className="featured-seasons">{Details.number_of_seasons} temporada{Details.number_of_seasons !== 1? 's': ''}</div>
            <div className="featured-overview">{description}</div>
            <div className="featured-buttons">
              <button onClick={()=>{window.MyAppGlobal.navigateToYouTubeSeries(item)}} className="button-2">Mais informações</button>
              {/* <a href={`/list/add/${item.id}`} className="button-2">+ Minha Lista</a> */}
            </div>
            <div className="featured-genres"><strong>Genero:</strong> {genres.join(', ')}</div>
          </div>
        </div>
      </div>
      {/* {showVideoPlayer && videoUrl && (
        <div className="player-wrapper" onClick={handleToggle}>
          <div className="teste">
            <Player url={videoUrl} />
          </div>
        </div>
      )} */}
    </section>
  );
}