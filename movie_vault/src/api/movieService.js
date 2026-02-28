import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com"

// search movies by title ~ return an array of result
export async function searchMovies(query){
    const response = await axios.get(BASE_URL,{
        params:{
            apikey: API_KEY,
            s:query,
            type:'movie',
        },
    });
    
    if (response.data.Response === 'false'){
        throw new Error(response.data.Error);
    }
    return response.data.Search;

}
export async function getMovieDetails(imdbID){
    const response = await axios.get(BASE_URL,{
        params:{
            apikey: API_KEY,
            i:imdbID,
            plot:'full'
        },
    });

    if (response.data.Response === "false"){
        throw new Error(response.data.Error);
    }

    return response.data;
}