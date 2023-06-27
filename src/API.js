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
  // console.log(json)
  return json;
}
export default {
  getHomeList: async () => {
    const totalPages = 3;

    const originalList = [];
    const trendingList = [];
    const topList = [];
    for (let page = 1; page <= totalPages; page++) {
      const response = await basicFetch(
        `/discover/tv?with_networks=213&page=${page}&api_key=${API_KEY}`
      );
      originalList.push(...response.results);
      const responseTrendings = await basicFetch(
        `/trending/all/week?page=${page}&api_key=${API_KEY}`
      );
      trendingList.push(...responseTrendings.results);
      const responseTop = await basicFetch(
        `/movie/top_rated?page=${page}&api_key=${API_KEY}`
      );
      topList.push(...responseTop.results);
    }
    return [
      {
        slug:'originals',
        title:'Netflix Originals',
        items: {results: originalList},
      },
      {
        slug:'trendings',
        title:'Trendings',
        items: {results: trendingList},
      },
      {
        slug:'toprated',
        title:'Top Rated',
        items: {results: topList}
      },
      {
        slug:'action',
        title:'Action',
        items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}`)
      },
      {
        slug:'comedy',
        title:'Comedy',
        items: await basicFetch(`/discover/movie?with_genres=35&include_video=true&api_key=${API_KEY}`)
      },
      {
        slug:'horror',
        title:'Horror',
        items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}`)
      },
      {
        slug:'romance',
        title:'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&api_key=${API_KEY}`)
      },
      {
        slug:'upcoming',
        title:'Up coming movies',
        items: await basicFetch(`/movie/upcoming?api_key=${API_KEY}`)
      },
    ];
  },
  getMovieInfo: async (movieId, type) =>{
    let info = {};

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}`);
        break;

        case 'tv':
          info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}`);
        break;
        default:
          info = null;
        break;
      }
    }
    return info;
  },
}