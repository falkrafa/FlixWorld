const API_KEY = "bbd9548ca40094e1de167abba96ec747";
const API_BASE = "https://api.themoviedb.org/3";

/*
-netflix original 
-trendings
-top rated 
-movie list(action,comedy,terror,romance...)
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}
export default {
  getHomeList: async () => {
    return [
      {
        slug:'originals',
        title:'Netflix Originals',
        items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`) 
      },
      {
        slug:'trendings',
        title:'Trendings',
        items: await basicFetch(`/trending/all/week?language=ptBR&api_key=${API_KEY}`)
      },
      {
        slug:'toprated',
        title:'Top Rated',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug:'action',
        title:'Action',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug:'comedy',
        title:'Comedy',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug:'horror',
        title:'Horror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug:'romance',
        title:'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug:'documentary',
        title:'Documentary',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
    ];
  },
  getMovieInfo: async (movieId, type) =>{
    let info = {};

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;

        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
        default:
          info = null;
        break;
      }
    }
    return info;
  }
}