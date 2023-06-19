import React from "react";
import "./FeaturedMovie.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const API_KEY = "bbd9548ca40094e1de167abba96ec747";
export default ({item}) => {

  let firstDate = new Date(item.first_air_date)
  let genres = [];

  for(let i in item.genres){
    genres.push(item.genres[i].name);
  }

  let description = item.overview;

  if(description.length > 200){
    description = description.substring(0,200)+"..."
  }
  const getFeaturedTrailer = async (item)=>{
    console.log(item);
    const response = await fetch(`https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${API_KEY}`)
    const data = await response.json();
    const featuredTrailer = await data.results.filter((result)=>result.type === "Trailer");
    window.open(`https://www.youtube.com/watch?v=${featuredTrailer[0].key}`);
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
            {item.original_name}
          </div>
          <div className="featured-info">
            <div className="featured-points">{item.vote_average} pontos</div>
            <div className="featured-year">{firstDate.getFullYear()}</div>
            <div className="featured-seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1? 's': ''}</div>
            <div className="featured-overview">{description}</div>
            <div className="featured-buttons">
              <button onClick={() => getFeaturedTrailer(item)} className="button-1"><PlayArrowIcon/>Assistir</button>
              <a href={`/list/add/${item.id}`} className="button-2">+ Minha Lista</a>
            </div>
            <div className="featured-genres"><strong>Genres:</strong> {genres.join(', ')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}