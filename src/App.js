import React, {useEffect, useState} from "react";
import API from './API';
import MovieRow from "./components/MovieRow";

export default () => {

  const [movielist, setMovieList] = useState([]);

  useEffect(()=>{
    const loadAll = async () =>{
      let list = await API.getHomeList();
      setMovieList(list);
    }
    loadAll();
  },[]);
  return(
    <div className="page">
      <section className="lists">
        {movielist.map((item,key)=>(
          <MovieRow key={key} title ={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}