import React, {useEffect, useState} from "react";
import API from './API';
import MovieRow from "./components/MovieRow";
import "./App.css";
import Featuredmovie from './components/FeaturedMovie';
import Header from './components/header';

export default () => {

  const [movielist, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null);
  const [blackHeader, setBlackheader] = useState(false); 

  useEffect(()=>{
    const loadAll = async () =>{
      let list = await API.getHomeList();
      setMovieList(list)
      // console.log(list)
      // getting featured movie 
      let originals = list.filter(i=>i.slug === 'originals');
      let randomOriginals = Math.floor(Math.random()*(originals[0].items.results.length-1));
      let chosen =  originals[0].items.results[randomOriginals];
      let chosenInfo = await API.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    loadAll();
  },[]);

  useEffect (()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackheader(true)
      }
      else{
        setBlackheader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll',scrollListener);
    }
  }, [])
  return(
    <div className="page">
      {movielist.length > 0 &&
        <Header black={blackHeader}/>
      }
      {featuredData && 
        <Featuredmovie item={featuredData}/>
      }
      <section className="lists">
        {movielist.map((item,key)=>(
          <MovieRow key={key} title ={item.title} items={item.items} slug = {item.slug}/>
        ))}
      </section>
      <footer>
          Developed with <span role="img" aria-label="heart">❤</span> by Rafael Falk
      </footer>
      {movielist <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading"/>
        </div>
      }
    </div>
  );
}