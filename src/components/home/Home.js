import React, { useState , useEffect } from "react";
import { fetchGenre, fetchMovies, fetchMoviesByGenre, fetchPersons, fetchSearch, fetchTopRatedMovie } from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from 'react-bootstrap-carousel';
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genre,setGenre] = useState([]);
    const [movieLi,setMovieLi] = useState([]);
    const [person,setPerson] = useState([]);
    const [topRated,setTopRated] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenre(await fetchGenre());
            setMovieLi(await fetchMoviesByGenre(28));
            setPerson(await fetchPersons());
            setTopRated(await fetchTopRatedMovie());
        };
        fetchAPI();
    }, []);
    
    const movies = nowPlaying.slice(0, 5).map((item,index) =>{
        return(
            <div key={index}>
                <div className="">
                    <img style={{ height: 700}} src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center">
                    <i className="far fa-play-circle" style={{ fontSize: 95, cursor: "pointer", color:"#f4c10f"}}> </i>
                </div>
                <div className="carousel-caption" style={{ fontSize: 35, textAlign: "center" }}>
                    {item.title}
                </div>
            </div>
        );
    });

    const handleGenreClick = async (genre_id) => {
        setMovieLi(await fetchMoviesByGenre(genre_id));
    }

    const genreList = genre.map((item,index) =>{
        return(
            <div className="list-inline-item" key={index}>
                <button onClick={() => {handleGenreClick(item.id)}} className="btn btn-outline-info">
                    {item.name}
                </button>
            </div>
        )
    })

    const movieList = movieLi.slice(0, 4).map((item, index) => {
        return(
                <div className="col-md-3 col-sm-6" key={index}>
                    <div className="card">

                        <Link to={`/movie/${item.id}`}>

                            <img className="img-fluid" src={item.poster} alt={item.title}></img>
                        </Link>
                    </div>
                    <div className="mt-3" style={{fontWeight: "bold"}}>
                        {item.title}
                    </div>
                    <div>
                        Rated: {item.rating}
                    </div>
                    <ReactStars count={item.rating} size={20} color={'yellow'}>

                    </ReactStars>
                </div>
        )
    })

    const trendingPersons = person.slice(0, 4).map((per,index) => {
        return(
        <div className="col-md-3 col-sm-6 text-center" key={index}>
            <img className="img-fluid rounded-circle" src={per.profileImg} alt={per.name}/>
            <p>{per.name}</p>
            <div>Trending for {per.know}</div>
            
        </div>
        )
    })

    const topratedMovies = topRated.slice(0, 4).map((item, index) => {
        return(
                <div className="col-md-3 col-sm-6" key={index}>
                    <div className="card">

                        <Link to={`/movie/${item.id}`}>

                            <img className="img-fluid" src={item.poster} alt={item.title}></img>
                        </Link>
                    </div>
                    <div className="mt-3" style={{fontWeight: "bold"}}>
                        {item.title}
                    </div>
                    <div>
                        Rated: {item.rating}
                    </div>
                    <ReactStars count={item.rating} size={20} color={'yellow'}>

                    </ReactStars>
                </div>
        )
    })

    const handleOnChange = async (e) => {
        setSearchTerm(e.target.value);
        if(searchTerm){
            setMovieLi( await fetchSearch(searchTerm));
        }
    } 
    
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col">

                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleOnChange} ></input>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={5000}
                        version={4}
                        indicators={true}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    {genreList}
                </div>
            </div>
            <div className="row mt-3">
                {movieList}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{color: 'grey', fontWeight: '700'}}>TRENDING PERSON OF WEEK</p>
                </div>
            </div>
            <div className="row mt-3">
                {trendingPersons}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{color: 'grey', fontWeight: '700'}}>TOP RATED MOVIES</p>
                </div>
            </div>
            <div className="row mt-3">
                {topratedMovies}
            </div>

            <hr className="row mt-5" style={{borderTop: '1px solid grey'}}></hr>
            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{color: 'grey'}}>
                    <h1>ABOUT ME</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="https://facebook.com">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://instagram.com">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://tiktok.com">
                                <i className="fab fa-tiktok"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{color: 'grey'}}>
                    <h2>KEEP IN TOUCH</h2>
                    <ul className="list-unstyled">
                        <li>
                            <i className="fas fa-map-marker"></i> Ho Chi Minh City
                        </li>
                        <li>
                            <i className="fas fa-phone"></i> 000 000 000
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> Email: email@mail.com
                        </li>
                    </ul>
                </div>
            </div>
        </div>  
    )
}