import React, { useState, useEffect, useRef } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import Player from "./videoPlayer";
import { Rating, useMediaQuery } from '@mui/material';
const API_KEY = "bbd9548ca40094e1de167abba96ec747";

export default ({ title, items, slug }) => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollX2, setScrollX2] = useState(0);
  const [scrollX3, setScrollX3] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [providers, setProviders] = useState();
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [Details, setDetails] = useState(false);
  const [Cast, setCast] = useState(false);
  const [Similar, setSimilar] = useState(false);
  const [Rating, setRating] = useState(false);
  const [Rating2, setRating2] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const movieInfosRef = useRef(null);
  // const [castItem,setCastItem] = useState(false);
  // const [castMovies,setCastMovies] = useState(false);
  // const [castName,setCastName] = useState(false);
  const isMobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);

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
      const fetchSimilar = async () =>{
        let url;
        if (slug === "originals" || selectedItem.media_type === 'tv') {
          url = `https://api.themoviedb.org/3/tv/${selectedItem.id}/recommendations?language=pt-BR&api_key=${API_KEY}`;
        } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${selectedItem.id}/recommendations?language=pt-BR&api_key=${API_KEY}`;
        }
        const response = await fetch(url);
        const SimilarData = await response.json();
        setSimilar(SimilarData);
      }
      const fetchAge = async () =>{
        let url;
        if (slug === "originals" || selectedItem.media_type === 'tv') {
          url = `https://api.themoviedb.org/3/tv/${selectedItem.id}/content_ratings?api_key=${API_KEY}`;
        } else if (slug !== "originals" || selectedItem.media_type === 'movie') {
          url = `https://api.themoviedb.org/3/movie/${selectedItem.id}/release_dates?api_key=${API_KEY}`;
        }
        const response = await fetch(url);
        const AgeData = await response.json();
        const filter = AgeData.results.filter((result)=> result.iso_3166_1 == "BR")
        const rating = filter[0].rating ? filter[0].rating : null
        setRating(rating)
        const rating2 = filter[0].release_dates[0].certification ? filter[0].release_dates[0].certification : null
        setRating2(rating2)
      }
      fetchAge();
      fetchDetails();
      fetchCast();
      fetchProviders();
      fetchSimilar();
    }
  }, [selectedItem, slug]);
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
  useEffect(() => {
    setRating(false);
    setRating2(false);
  }, [selectedItem]);
  
  useEffect(() => {
    setScrollX2(0);
    setScrollX3(0);
  }, [selectedItem]);
  
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
  const handleSimilarLeft = () => {
    let x3 = scrollX3 + Math.round(document.querySelector('.similar').offsetWidth / 2);
  
    if (x3 > 0) {
      x3 = 0;
    }
    setScrollX3(x3);
  };
  
  const handleSimilarRight = () => {
    let x3 = scrollX3 - Math.round(document.querySelector('.similar').offsetWidth / 2);
    let listW3 = Similar.results.length * 160;
    if ((document.querySelector('.similar').offsetWidth - listW3)> x3) {
      x3 = (document.querySelector('.similar').offsetWidth - listW3);
    }
    setScrollX3(x3);
  };
  
  
  

  const navigateToYouTubeMovies = async (item) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
    console.log(item);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    const trailers = data.results.filter((result) => result.type === "Trailer");
    if (trailers.length === 1) {
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      setVideoUrl(videoUrl);
    } 
    else if(trailers.length > 1){
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[1].key}`;
      setVideoUrl(videoUrl);
    }
    else {
      setVideoUrl('');
    }
    setSelectedItem(item);
    setShowVideoPlayer(true);
  };

  const navigateToYouTubeSeries = async (item) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
    console.log(item);
    const response = await fetch(`https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data)
    const trailers = data.results.filter((result) => result.type === "Trailer");
    const teaser = data.results.filter((result) => result.type === "Teaser");
    if (trailers.length === 1) {
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      setVideoUrl(videoUrl);
    } 
    else if(trailers.length > 1){
      const videoUrl = `https://www.youtube.com/watch?v=${trailers[1].key}`;
      setVideoUrl(videoUrl);
    }
    else if(teaser.length > 0){
      const videoUrl = `https://www.youtube.com/watch?v=${teaser[0].key}`;
      setVideoUrl(videoUrl);
    }
    else {
      setVideoUrl('');
    }
    setSelectedItem(item);
    setShowVideoPlayer(true);
  };
  window.MyAppGlobal = {
    navigateToYouTubeMovies,
    navigateToYouTubeSeries
  };
  const handlePreviousItem = () => {
    const previousItem = selectedItems[selectedItems.length - 1];

    setSelectedItems((prevSelectedItems) => prevSelectedItems.slice(0, -1));

    setSelectedItem(previousItem);

    if (!previousItem) {
      setShowVideoPlayer(false);
      return;
    }
    const fetchVideoUrl = async () => {
      let url;
      if (slug === "originals" || previousItem.media_type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${previousItem.id}/videos?api_key=${API_KEY}`;
      } else if (slug !== "originals" || previousItem.media_type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${previousItem.id}/videos?api_key=${API_KEY}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      const trailers = data.results.filter((result) => result.type === "Trailer");
      const teaser = data.results.filter((result) => result.type === "Teaser");
      if (trailers.length === 1) {
        const videoUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
        setVideoUrl(videoUrl);
      } 
      else if(trailers.length > 1){
        const videoUrl = `https://www.youtube.com/watch?v=${trailers[1].key}`;
        setVideoUrl(videoUrl);
      }
      else if(teaser.length > 0){
        const videoUrl = `https://www.youtube.com/watch?v=${teaser[0].key}`;
        setVideoUrl(videoUrl);
      }
      else {
        setVideoUrl('');
      }
    };
  
    fetchVideoUrl();
  };
  function getBackgroundColor(rating) {
    switch (rating) {
      case "L":
        return "SpringGreen"; // cor para classificação L
      case "10":
        return "DeepSkyBlue"; // cor para classificação 10
      case "12":
        return "#FFD700"; // cor para classificação 12
      case "14":
        return "orange"; // cor para classificação 14
      case "16":
        return "red"; // cor para classificação 16
      case "18":
        return "#212529"; // cor para classificação 18
      default:
        return "gray"; // cor padrão caso nenhum valor correspondente seja encontrado
    }
  }
  
  const handleToggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };
  // const handleCast = async (cast) =>{
  //   const response = await fetch(`https://api.themoviedb.org/3/person/${cast.id}/combined_credits?language=pt-BR&api_key=${API_KEY}`)
  //   const data = await response.json();
  //   const castMovies = data.cast
  //   setCastMovies(castMovies);
  //   setCastName(cast.name);
  //   setCastItem(true);
  // }
  useEffect(() => {
    // Verifique se a referência existe e se há um novo selectedItem
    if (movieInfosRef.current && selectedItem) {
      // Rola até o topo
      movieInfosRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [selectedItem]);
  return (
    <div className="movieRow">
      <h2>{title}</h2>

      {!isMobileView && scrollX !== 0 &&(
        <div className="movieRow-left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </div>
      )}
      {!isMobileView && (
        <div className="movieRow-right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </div>
      )}
      <div className="movieRow-area">
        <div className="movieRow-list" style={{
          marginLeft: scrollX,
          width: items.results.length * 170
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
          <div ref={movieInfosRef}  className="player-container">
            <div className="player-container-video">
              <button className="close-button" onClick={handlePreviousItem}><CloseIcon /></button>
              {videoUrl ? (
                <Player url={videoUrl} />
              ) : (
                <div className="video-image">
                  <img src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`} alt={selectedItem.title || selectedItem.name} />
                </div>
              )}
            </div>
            <div className="movies-infos">
              <div className="item-name">{selectedItem.title || selectedItem.name}</div>
              {Details.number_of_seasons ? <div className="item-details">
                {Details.runtime ? <div className="item-year">
                  {Math.floor(Details.runtime / 60)}h{" "}
                  {String(Details.runtime % 60).padStart(2, "0")}min
                </div> :null}
                {Details.number_of_seasons ? <div className="item-year">{Details.number_of_seasons} temporada{Details.number_of_seasons !== 1? 's': ''}</div>:null}
                {Rating ? <div className="item-age" style={{ backgroundColor: getBackgroundColor(Rating) }}>{Rating}</div>:null}
                <div className="item-year">{new Date(selectedItem.first_air_date).getFullYear() || new Date(selectedItem.release_date).getFullYear()}</div>
                <div className="item-average">{selectedItem.vote_average.toFixed(1)*10}%</div>
              </div>:<div className="item-details2">
                {Details.runtime ? <div className="item-year">
                  {Math.floor(Details.runtime / 60)}h{" "}
                  {String(Details.runtime % 60).padStart(2, "0")}min
                </div> :null}
                {Rating2 ? <div className="item-age" style={{ backgroundColor: getBackgroundColor(Rating2) }}>{Rating2}</div>:null}
                <div className="item-year">{new Date(selectedItem.first_air_date).getFullYear() || new Date(selectedItem.release_date).getFullYear()}</div>
                <div className="item-average">{selectedItem.vote_average.toFixed(1)*10}%</div>
              </div>}
              <div className="item-overview">
                {selectedItem.overview && (showFullOverview ? selectedItem.overview : `${selectedItem.overview.substring(0, 320)}`)}
                {selectedItem.overview && selectedItem.overview.length > 320 && (
                  <button
                  className="ver-mais-button"
                  onClick={handleToggleOverview}
                  >
                    {showFullOverview ? "ver menos" : "ver mais"}
                  </button>
                )}
              </div>
              <div className="item-genres"><strong>Genero: </strong>{Details.genres.map((details) => {return details.name;}).join(", ")}</div>


              {Details &&(
                <>
                <h1 className="header-details">Informaçoes adicionais</h1>
                {Details.number_of_episodes? <div className="item-season"><strong>Total de episódios:</strong> {Details.number_of_episodes}</div>:null}
                {Details.release_date? <div className="item-season"><strong>Data de lançamento:</strong> {new Date(Details.release_date).toLocaleDateString("pt-BR")}</div>:null}
                {Details.first_air_date? <div className="item-season"><strong>Data de lançamento:</strong> {new Date(Details.first_air_date).toLocaleDateString("pt-BR")}</div>:null}
                {Details.last_episode_to_air ? <div className="item-season"><strong>Data do ultimo episódio lançado:</strong> {new Date(Details.last_episode_to_air.air_date).toLocaleDateString("pt-BR")}</div> : null}
                {Details.next_episode_to_air ? <div className="item-season"><strong>Data do próximo episódio:</strong> {new Date(Details.next_episode_to_air.air_date).toLocaleDateString("pt-BR")}</div> : null}
                {Details.budget ? <div className="item-season"><strong>Orçamento:</strong> ${Details.budget.toLocaleString('en-US')}</div> : null}
                {Details.revenue ? <div className="item-season"><strong>Bilheteria:</strong> ${Details.revenue.toLocaleString('en-US')}</div> : null}
                {Details.production_countries ? <div className="item-season"><strong>{Details.production_countries.length > 1 ? 'Países de produção:' : 'País de produção:'}</strong> {Details.production_countries.map((countries)=>{
                  return countries.name
                }).join(', ')}</div>:null}

                {Cast.crew.filter((crew)=>{
                  return crew.job === "Producer"
                }).length > 0 ? <div className="item-season"><strong>Produtor:</strong> {Cast.crew.filter((crew)=>{
                  return crew.job === "Producer"
                }).map((producer)=> <span key={producer.id}>{producer.name}</span>).reduce((prev, curr) => [prev, ", ", curr])}</div>:null}

                {Cast.crew.filter((crew) => crew.job === "Director").length > 0 ? (
                  <div className="item-season">
                    <strong>Diretor:</strong>{" "}
                    {Cast.crew
                      .filter((crew) => crew.job === "Director")
                      .map((director) => <span key={director.id}>{director.name}</span>)
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </div>
                ) : Cast.crew.filter((crew) => crew.job === "Executive Producer").length > 0 ? (
                  <div className="item-season">
                    <strong>Produtor Executivo:</strong>{" "}
                    {Cast.crew
                      .filter((crew) => crew.job === "Executive Producer")
                      .map((executiveProducer) => <span key={executiveProducer.id}>{executiveProducer.name}</span>)
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </div>
                ) : null}
                </>
                
              )}
              {Cast.cast.length > 0 ? <h1 className="header-details">Elenco</h1> : null}
              {Cast.cast.length > 0 ? (
                <div className="teste2">
                  <div className="cast-list" style={{marginLeft: scrollX2,width: 'fit-content' }}>
                    {!isMobileView && scrollX2 !== 0 &&(
                      <div className="movieRow-left" onClick={handleCastLeft}>
                        <NavigateBeforeIcon style={{ fontSize: 50 }} />
                      </div>
                    )}
                    {!isMobileView && (
                      <div className="movieRow-right" onClick={handleCastRight}>
                        <NavigateNextIcon style={{ fontSize: 50 }} />
                      </div>
                    )}
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
                <h1 className="header-details">Onde assistir</h1>
                <div className="providers-list">
                  <strong>Stream: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.flatrate ? providers.results.BR.flatrate.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Não disponível</li>}
                  </ul>
                </div>
                <div className="providers-list">
                  <strong>Comprar: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.buy ? providers.results.BR.buy.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Não disponível</li>}
                  </ul>
                </div>
                <div className="providers-list">
                  <strong>Alugar: </strong>
                  <ul>
                    {providers && providers.results && providers.results.BR && providers.results.BR.rent ? providers.results.BR.rent.map((provider, index) => {
                      return <li><img src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}></img></li>
                    }) : <li>Não disponível</li>}
                  </ul>
                </div>
              </div>
              { Similar && Similar.results.length > 0 &&(   
              <><h1 className="header-details">Similares a {selectedItem.title || selectedItem.name}</h1>
              <div className="similar">
                  <div className="cast-list" style={{ marginLeft: scrollX3, width: 'fit-content' }}>
                    {!isMobileView && scrollX3 !== 0 && (
                      <div className="movieRow-left" onClick={handleSimilarLeft}>
                        <NavigateBeforeIcon style={{ fontSize: 50 }} />
                      </div>
                    )}
                    {!isMobileView && (
                      <div className="movieRow-right" onClick={handleSimilarRight}>
                        <NavigateNextIcon style={{ fontSize: 50 }} />
                      </div>
                    )}
                    {Similar.results.length > 0 &&
                      Similar.results.map((similar) => {
                        const backgroundImageStyle = {
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        };
                        if (similar.poster_path) {
                          backgroundImageStyle.backgroundImage = `url(https://image.tmdb.org/t/p/w300${similar.poster_path})`;
                        }
                        return (
                          <div onClick={() => 
                            {if(similar.media_type === "movie"){
                              navigateToYouTubeMovies(similar)
                            }
                            else if(similar.media_type === "tv"){
                              navigateToYouTubeSeries(similar)
                            }
                            }}
                          className="item-similar" style={backgroundImageStyle}>
                          </div>
                        );
                      })}
                  </div>
                </div></>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {castItem && castName &&(
        <div className="player-wrapper2">
          <div className="player-container">
            <header className="cast-item-header"><strong>Filmes e séries com <span style={{color:"crimson"}}>{castName}</span></strong>  <button className="close-buttonCast" onClick={()=>setCastItem(false)}><CloseIcon style={{fontSize:28}}/></button></header>
            <div className="CastMovies">
              {castMovies ? castMovies.map((item) => {
                      return <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} onClick={() => 
                      {if(item.media_type === "movie"){
                        navigateToYouTubeMovies(item)
                        setCastItem(false)
                      }
                      else if(item.media_type === "tv"){
                        navigateToYouTubeSeries(item)
                      }
                      }}></img>
                    }) : <h1>Não disponível</h1>}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
