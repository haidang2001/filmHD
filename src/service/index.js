import axios from "axios";

const apiKey = 'd65576ff8c623925ca8cfb1cfd60e5ac';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl =`${url}/movie/now_playing`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl =`${url}/movie`;

export const fetchMovies = async () => {
    try{
        const {data} = await axios.get(nowPlayingUrl, {
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData
    } catch(error) {}
}
export const fetchGenre = async () => {
    try{
        const {data} = await axios.get(genreUrl,{
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }))
        return modifiedData
    }catch(error){}
}
export const fetchMoviesByGenre = async (genre_id) => {
    try{
        const {data} = await axios.get(moviesUrl,{
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id 
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData
    }catch(error){}
}
export const fetchPersons = async () => {
    try{
        const {data} = await axios.get(personUrl,{
            params:{
                api_key: apiKey
            }
        });
        const modifiedData = data['results'].map((p) => ({
            id: p['id'],
            name: p['name'],
            know: p['known_for_department'],
            profileImg: 'http://image.tmdb.org/t/p/w200/' + p['profile_path']
        }))
        return modifiedData;
    }catch(error){}
}
export const fetchTopRatedMovie = async () => {
    try{
        const {data} = await axios.get(topratedUrl, {
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData
    } catch(error) {}
}
export const fetchMovieDetail = async (id) => {
    try{
        const { data } = await axios.get(`${movieUrl}/${id}`,{
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        return data;
    }catch(error) {}
}
export const fetchMovieVideos = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/videos`,{
            params:{
                api_key: apiKey,
            }
        })
        return data['results'][0]
    }catch(error){}
}
export const fetchCasts = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/credits`,{
            params:{
                api_key: apiKey,
            }
        })
        const modifiedData = data['cast'].map((c) => ({
            id: c['id'],
            name: c['name'],
            character: c['character'],
            profileImg: 'http://image.tmdb.org/t/p/w200/' + c['profile_path']
        }))
        return modifiedData
    }catch(error){}

}
export const fetchSimilarMovie = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params:{
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData
    } catch(error) {}
}

// const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const SEARCH_API = `${url}/search/movie`;
export const fetchSearch = async (searchTerm) => {
    try{
        const {data} = await axios.get(SEARCH_API,{
            params:{
                api_key: apiKey,
                query: searchTerm
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original';
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData
    } catch(error) {}
}