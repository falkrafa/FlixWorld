import React, { useState, useEffect } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import Player from "./videoPlayer";

const API_KEY = "bbd9548ca40094e1de167abba96ec747";

export default ({ title, items, slug }) => {
  const [scrollX, setScrollX] = useState(-400);
  const [scrollX2, setScrollX2] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [providers, setProviders] = useState();
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [Details, setDetails] = useState(false);
  const [Cast, setCast] = useState(false);

  useEffect(() => {
    if (showVideoPlayer) {
      document.documentElement.classList.add("hide-scroll");
    } else {
      document.documentElement.classList.remove("hide-scroll");
    }
  }, [showVideoPlayer]);

  useEffect(() => {
    if (selectedItem) {
      const fetchProviders = async () => {
        let url;
        if (slug === "originals" || selectedItem.media_type === 'tv') {
          url = `https://api.themoviedb.org/3/tv/${selectedItem.id}/watch/providers?locale=BR&api_key=${API_KEY}`;
        } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${selectedItem.id}/watch/providers?locale=BR&api_key=${API_KEY}`;
        }

        const response = await fetch(url);
        const providersData = await response.json();
        setProviders(providersData);
      };
      const fetchDetails = async () => {
        let url;
        if (slug === "originals" || selectedItem.media_type === 'tv') {
          url = `https://api.themoviedb.org/3/tv/${selectedItem.id}?language=pt-BR&api_key=${API_KEY}`;
        } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${selectedItem.id}?language=pt-BR&api_key=${API_KEY}`;
        }

        const response = await fetch(url);
        const DetailsData = await response.json();
        setDetails(DetailsData);
      };
      const fetchCast = async () =>{
        let url;
        if (slug === "originals" || selectedItem.media_type === 'tv') {
          url = `https://api.themoviedb.org/3/tv/${selectedItem.id}/credits?language=pt-BR&api_key=${API_KEY}`;
        } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${selectedItem.id}/credits?language=pt-BR&api_key=${API_KEY}`;
        }

        const response = await fetch(url);
        const CastData = await response.json();
        setCast(CastData);
      }
      fetchDetails();
      fetchCast();
      fetchProviders();
    }
  }, [selectedItem, slug]);

  // useEffect(() => {
  //   if (selectedItem) {
  //     const fetchDetails = async () => {
  //       let url;
  //       if (slug === "originals" || selectedItem.media_type === 'tv') {
  //         url = `https://api.themoviedb.org/3/tv/${selectedItem.id}?language=pt-BR&api_key=${API_KEY}`;
  //       } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
  //         url = `https://api.themoviedb.org/3/movie/${selectedItem.id}?language=pt-BR&api_key=${API_KEY}`;
  //       }

  //       const response = await fetch(url);
  //       const DetailsData = await response.json();
  //       setDetails(DetailsData);
  //     };

  //     fetchDetails();
  //   }
  // }, [selectedItem, slug]);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };


  const handleCastLeft = () => {
    let x2 = scrollX2 + Math.round(document.querySelector('.teste2').offsetWidth / 2);
  
    if (x2 > 0) {
      x2 = 0;
    }
    setScrollX2(x2);
  };
  
  const handleCastRight = () => {
    let x2 = scrollX2 - Math.round(document.querySelector('.teste2').offsetWidth / 2);
    let listW2 = Cast.cast.length * 160;
    if ((document.querySelector('.teste2').offsetWidth - listW2)> x2) {
      x2 = (document.querySelector('.teste2').offsetWidth - listW2);
    }
    setScrollX2(x2);
  };
  
  
  

  const navigateToYouTubeMovies = async (item) => {
    console.log(item);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    const trailers = data.results.filter((result) => result.type === "Trailer");
    if (trailers.length > 0) {
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      setVideoUrl(videoUrl);
    } else {
      setVideoUrl('');
    }
    setSelectedItem(item);
    setShowVideoPlayer(true);
  };

  const navigateToYouTubeSeries = async (item) => {
    console.log(item);
    const response = await fetch(`https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    const trailers = data.results.filter((result) => result.type === "Trailer");
    if (trailers.length > 0) {
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      setVideoUrl(videoUrl);
    } else {
      setVideoUrl('');
    }
    setSelectedItem(item);
    setShowVideoPlayer(true);
  };

  const handleToggleOverview = () => {
    setShowFullOverview(!showFullOverview);
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
          })}
        </div>
      </div>
      {showVideoPlayer && selectedItem && Details && Cast &&(
        <div className="player-wrapper">
          <div className="player-container">
            <div className="player-container-video">
              <button className="close-button" onClick={() => setShowVideoPlayer(false)}><CloseIcon /></button>
              {videoUrl ? (
                <Player url={videoUrl} />
              ) : (
                <div className="video-image">
                  <img src={`https://image.tmdb.org/t/p/w300${selectedItem.poster_path}`} alt={selectedItem.title || selectedItem.name} />
                </div>
              )}
            </div>
            <div className="movies-infos">
              <div className="item-name">{selectedItem.title || selectedItem.name}</div>
              <div className="item-details">
                <div className="item-year">{new Date(selectedItem.first_air_date).getFullYear() || new Date(selectedItem.release_date).getFullYear()}</div>
                <div className="item-average">{selectedItem.vote_average.toFixed(1)} pontos</div>
              </div>
              <div className="item-overview">
                {selectedItem.overview && (showFullOverview ? selectedItem.overview : `${selectedItem.overview.substring(0, 320)}`)}
                {selectedItem.overview && selectedItem.overview.length > 320 && (
                  <button
                  className="ver-mais-button"
                  onClick={handleToggleOverview}
                  >
                    {showFullOverview ? "Ver menos" : "Ver mais"}
                  </button>
                )}
              </div>
              <div className="item-genres"><strong>Generos: </strong>{Details.genres.map((details) => {return details.name;}).join(", ")}</div>

              {Details.number_of_seasons &&(
                <>
                <h1>Informações adicionais</h1>
                <div className="item-season"><strong>Quantidade de Temporadas:</strong> {Details.number_of_seasons}</div>
                <div className="item-season"><strong>Quantidade de episódios:</strong> {Details.number_of_episodes}</div>
                {Details.last_episode_to_air ? <div className="item-season"><strong>Data do ultimo episódio lançado:</strong> {new Date(Details.last_episode_to_air.air_date).toLocaleDateString("pt-BR")}</div> : null}
                {Details.next_episode_to_air ? <div className="item-season"><strong>Data do próximo episódio:</strong> {new Date(Details.next_episode_to_air.air_date).toLocaleDateString("pt-BR")}</div> : null}
                </>
              )}
              {Details.runtime &&(
                <>
                <h1>Informações adicionais</h1>
                {Details.revenue ? <div className="item-season"><strong>Bilheteria:</strong> {Details.revenue.toLocaleString('pt-BR')}</div> : null}
                <div className="item-season">
                  <strong>
                    Duração:</strong> {Math.floor(Details.runtime / 60)}h{" "}
                    {String(Details.runtime % 60).padStart(2, "0")}min
                  
                </div>
                </>
              )}
              {Cast.cast.length > 0 ? <h1>Cast</h1> : null}
              {Cast.cast.length > 0 ? (
                <div className="teste2">
                  <div className="cast-list" style={{marginLeft: scrollX2,width: 'fit-content' }}>
                    <div className="movieRow-left" onClick={handleCastLeft}>
                      <NavigateBeforeIcon style={{ fontSize: 50 }} />
                    </div>
                    <div className="movieRow-right" onClick={handleCastRight}>
                      <NavigateNextIcon style={{ fontSize: 50 }} />
                    </div>
                    {Cast.cast.length > 0 &&
                      Cast.cast.map((cast) => {
                        const backgroundImageStyle = {
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        };
                        if (cast.profile_path) {
                          backgroundImageStyle.backgroundImage = `url(https://image.tmdb.org/t/p/w300${cast.profile_path})`;
                        }
                        return (
                          <div className="item-cast" style={backgroundImageStyle}>
                            <div>{cast.profile_path ? cast.name : null}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : null}
              <div className="providers-container">
                <h1>Onde Assistir</h1>
                <div className="providers-list">
                  <strong>Stream: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.flatrate ? providers.results.BR.flatrate.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Nao disponivel</li>}
                  </ul>
                </div>
                <div className="providers-list">
                  <strong>Comprar: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.buy ? providers.results.BR.buy.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Nao disponivel</li>}
                  </ul>
                </div>
                <div className="providers-list">
                  <strong>Alugar: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.rent ? providers.results.BR.rent.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Nao disponivel</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
