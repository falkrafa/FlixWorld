import React, {useEffect, useState} from "react";
import API from './API';
import MovieRow from "./components/MovieRow";
import "./App.css";
import Featuredmovie from './components/FeaturedMovie';

export default () => {

  const [movielist, setMovieList] = useState([]);
  const [featuredData, setFeatureData] = useState(null)

  useEffect(()=>{
    const loadAll = async () =>{
      let list = await API.getHomeList();
      setMovieList(list);

      // getting featured movie 
      let originals = list.filter(i=>i.slug === 'originals');
      let randomOriginals = Math.floor(Math.random()*(originals[0].items.results.length-1));
      let chosen =  originals[0].items.results[randomOriginals];
      let chosenInfo = await API.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    loadAll();
  },[]);
  return(
    <div className="page">

      {featuredData && 
        <Featuredmovie item={featuredData}/>
      }
      <section className="lists">
        {movielist.map((item,key)=>(
          <MovieRow key={key} title ={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}