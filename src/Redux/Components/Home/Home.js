import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useDispatch } from 'react-redux';
import { fetchMovieDetails, fetchSeasonEpisodeDetails } from '../Reducer/mediaSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    let [state, setState] = useState({
        movieid: "",
        seasonid: "",
        seasonno: "",
        episodeno: ""
    });
    let [moviestatus, setMoviessatus] = useState("");
    let [seriesstatus, setSeriesssatus] = useState("");
    const [selectedOption, setSelectedOption] = useState('movie');

    const dispatch = useDispatch("");

    const handleChange = (event) => {
        let { value, name } = event.target;
        console.log(name, ":", value);

        switch (name) {
            case "movieid":
                setState({ ...state, movieid: value, seasonid: "", seasonno: "", episodeno: "" });
                break;
            case "seasonid":
                setState({ ...state, seasonid: value, seasonno: "", episodeno: "" });
                break;
            case "seasonno":
                setState({ ...state, seasonno: value, episodeno: "" });
                break;
            case "episodeno":
                setState({ ...state, episodeno: value });
                break;
            default:
                console.log("Invalid field");
                break;

            // case "movieid":
            //     setState({...state, movieid: value });
            //     break;
            // case "seasonid":
            //     setState({...state, seasonid: value });
            //     break;
            // case "seasonno":
            //     setState({...state, seasonno: value
        }
        // setState(event.target.value);
    }

    const movieDispatch = (() => {
        dispatch(fetchMovieDetails({ id: state.movieid }))
            .then((res) => {
                console.log(res);
                if (res.meta.requestStatus === "fulfilled") {
                    setMoviessatus("Movie Found!")
                }
                else {
                    setMoviessatus("Movie Not Found!")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })

    const seasonDetails = (() => {
        dispatch(fetchSeasonEpisodeDetails(state = { id: state.seasonid, season: state.seasonno, episode: state.episodeno }))
            .then((res) => {
                // console.log(res);
                if (res.meta.requestStatus === "fulfilled") {
                    setSeriesssatus("Series Found!")
                }
                else {
                    setSeriesssatus("Series Not Found!")
                }
            })
            .catch((err) => {
                // console.log(err);
            })
    })

    useEffect(() => {
        movieDispatch()
        seasonDetails()
    }, [])

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    // console.log("state: ", state);
    // console.log("Option: ", selectedOption);
    console.log("Status: ", moviestatus);

    return (
        <div className='home_css'>
            <div className='home_css_2'>
                <div className='header_css'>
                    <h1>IMDB Movies</h1>
                </div>
                <div>
                    <button>
                        <Link to={`/llm`}>
                            Latest Movies
                        </Link>
                    </button>
                    <button>Latest TV Shows</button>
                    <button>Latest Episodes</button>
                </div>
                <div className='button_css'>
                    <button onClick={() => handleOptionChange('movie')}
                        className={selectedOption === 'movie' ? 'active' : ''} defaultChecked>Movie Player</button>
                    <button onClick={() => handleOptionChange('series')}
                        className={selectedOption === 'series' ? 'active' : ''}>Series Player</button>
                </div>

                <div className='status_css'>
                    <p><b>Status: </b>{selectedOption === "movie" ? moviestatus : seriesstatus}</p>
                </div>

                {selectedOption === "movie" ?
                    (
                        <div className='movie_css'>
                            <div className='movie_search_css'>
                                <label>
                                    <b>Enter the movie ID:</b>
                                </label>
                                <input onChange={handleChange} name='movieid' placeholder='Movie ID' />
                            </div>
                            <div className='video_search_css'>
                                <iframe src={`https://vidsrc.to/embed/movie/${state.movieid}`}
                                    title='video'
                                    allowFullScreen
                                    controls />
                            </div>
                        </div>
                    )
                    :
                    <div className='series_css'>
                        <div className='series_search_css'>
                            <label>
                                <b>Enter the Season ID:</b>
                            </label>
                            <input onChange={handleChange} name='seasonid' type="text" placeholder='Season ID' />
                            <input onChange={handleChange} name='seasonno' type="number" placeholder='Season no.' />
                            <input onChange={handleChange} name='episodeno' type="number" placeholder='Episode no.' />
                        </div>
                        <div className='video_search_css'>
                            <iframe src={`https://vidsrc.to/embed/tv/${state.seasonid}/${state.seasonno}/${state.episodeno}`}
                                title='video'
                                allowFullScreen
                                controls />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home