import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function SearchResult({ searchQuery, setResultBox, setSearchQuery }) {
  const [data, setData] = useState([])
  const API_KEY = "bbd9548ca40094e1de167abba96ec747";
  const API_BASE = "https://api.themoviedb.org/3";

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_BASE}/search/multi?language=pt-BR&api_key=${API_KEY}&query=${searchQuery}`
          )
          setData(response.data.results)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
  }, [searchQuery])

  const filteredResults = data?.filter((content) => {
    if (content.media_type == 'movie') {
      return content.title || content.name
    } else {
      return content.title || content.name
    }
  })

  return (
    <div
      className='result'
    >
      {filteredResults.length > 0 ? (
        <>
          {filteredResults.map((result) => (
              <div className='items-result' onClick={()=> {
                if(result.media_type === "movie"){
                  window.MyAppGlobal.navigateToYouTubeMovies(result); 
                  setResultBox(false);
                  setSearchQuery('')
                }else{
                  window.MyAppGlobal.navigateToYouTubeSeries(result); 
                  setResultBox(false);
                  setSearchQuery('')
                }
              }}>
                {result.poster_path &&(
                <>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
                  />
                  <div className='name-year'>
                    <p className='text-white fw-bold mb-0 medium'>
                      {result.title ? result.title : null}
                      {result.name ? result.name : null}
                    </p>
                    {result.title? <p className='text-secondary fw-bold mb-0 small'>
                      {result.title && result.release_date.slice(0, 4)}
                    </p> : null}
                    {result.name? <p className='text-secondary fw-bold mb-0 small'>
                      {result.name && result.first_air_date.slice(0, 4)}
                    </p> : null}
                  </div></>
                )}
              </div>
          ))}
        </>
      ) : (
        <p style={{padding:'0px 30px'}}>Nenhum resultado encontrado</p>
      )}
    </div>
  )
}