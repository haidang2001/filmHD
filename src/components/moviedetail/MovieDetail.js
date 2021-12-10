import React, { useState,useEffect } from "react";
import { useParams } from "react-router";
import { fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie } from "../../service";
import ReactPlayer from "react-player";
import ReactStars from 'react-rating-stars-component';
import { Link } from "react-router-dom";

export function MovieDetail(){
    let { id } = useParams();

    const [detail,setDetail] = useState([]);
    // const [isOpen,setIsOpen] = useState(false);
    const [video,setVideo] = useState([]);
    const [casts,setCasts] = useState([]);
    const [movieSimi, setMovieSimi] = useState([]);

    useEffect(() =>{
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(id));
            setVideo(await fetchMovieVideos(id));
            setCasts(await fetchCasts(id));
            setMovieSimi(await fetchSimilarMovie(id));
        }
        fetchAPI();
    },[id]);

    // const MoviePalyerModal = (props) => {
    //     const youtubeUrl = "https://www.youtube.com/watch?v=";
    //     return (
    //       <Modal
    //         {...props}
    //         size="lg"
    //         aria-labelledby="contained-modal-title-vcenter"
    //       >
    //         <Modal.Header closeButton>
    //           <Modal.Title
    //             id="contained-modal-title-vcenter"
    //             style={{ color: "#000000", fontWeight: "bolder" }}
    //           >
    //             {detail.title}
    //           </Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body style={{ backgroundColor: "#000000" }}>
    //           <ReactPlayer
    //             className="container-fluid"
    //             url={youtubeUrl + video.key}
    //             playing
    //             width="100%"
    //           ></ReactPlayer>
    //         </Modal.Body>
    //       </Modal>
    //     );
    //   };
    
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    const movieplayer = <ReactPlayer
                            className="container-fluid"
                            url={youtubeUrl + video.key}
                            // playing
                            width="100%"
                        ></ReactPlayer>

    let genres = detail.genres;
    let genresList;
    if(genres)
    {
        genresList = genres.map((genre, index) => {
            return(

            <li className="list-inline-item" key={index}>
                <button className="btn btn-outline-info">
                    {genre.name}
                </button>
            </li>
            )
        })
    }
    
    const castsList = casts.slice(0, 12).map((cast,index) => {
        return(
            <div className="col-md-1 col-sm-6 text-center" key={index}>
                <img className="img-fluid rounded-circle" src={cast.profileImg} alt={cast.name}/>
                <p>{cast.name}</p>
                <div>{cast.character}</div>
                
            </div>
            )
    })

    const movieSimilar = movieSimi.slice(0, 8).map((m,index) => {
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${m.id}`}>

                        <img className="img-fluid" src={m.poster} alt={m.title}></img>
                    </Link>
                </div>
                <div className="mt-3" style={{fontWeight: "bold"}}>
                    {m.title}
                </div>
                <div>
                    Rated: {m.rating}
                </div>
                <ReactStars count={m.rating} size={20} color={'yellow'}>
                </ReactStars>
            </div>
            )
    })

    return(
        <div className="container">
            <div className="row mt-2">
                {/* <MoviePalyerModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}
                ></MoviePalyerModal> */}
                <div className="col text-center" style={{ width: "100%" }}>
                    {/* <img
                        className="img-fluid"
                        src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                        alt={detail.title}
                    ></img>
                    <div className="carousel-center">
                        <i
                        onClick={() => setIsOpen(true)}
                        className="far fa-play-circle"
                        style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
                        ></i>
                    </div>
                    <div
                        className="carousel-caption"
                        style={{ textAlign: "center", fontSize: 35 }}
                    >
                        {detail.title}

                    </div> */}
                    <div style={{ textAlign: "center", fontSize: 35 }} >
                        {detail.title}
                    </div>
                    {movieplayer}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <p style={{color: 'grey', fontWeight: '700'}}>GENRE</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    {genresList}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                <ReactStars count={detail.vote_average} size={20} color={'yellow'}>

                    </ReactStars>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <p style={{color: 'grey', fontWeight: '700'}}>OVERVIEW</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                <p>{detail.overview}</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <p style={{color: 'grey', fontWeight: '700'}}>CASTS</p>
                </div>
            </div>
            <div className="row mt-3">
                {castsList}
            </div>

            <div className="row mt-3">
                <div className="col">
                <p style={{color: 'grey', fontWeight: '700'}}>RELATED MOVIE</p>
                </div>
            </div>
            <div className="row mt-3">
                {movieSimilar}
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