import React, { useCallback, useEffect, useState } from 'react'
import "./LLM.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { allMovielist, latestMovieDetails, searchMovielist, sortMovielist } from '../../Reducer/mediaSlice';
import Carousel from 'react-material-ui-carousel'
import { image_url } from '../../../../api/api';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const LLM = () => {
    const [selectedOption, setSelectedOption] = useState('movies');
    const [selectedtime, setSelectedtime] = useState('day');
    const [state, setState] = useState([]);
    const [movie, setMovie] = useState([]);
    const [pages, setPages] = useState("");
    const [pageno, setPageno] = useState("1");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("popularity.desc");

    const dispatch = useDispatch("")
    const { loading } = useSelector((state) => state.user)
    // console.log("loading: ", loading)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleOptionMovie = (option) => {
        setSelectedtime(option);
    };

    const handlePagination = (event, value) => {
        setPageno(value);
    };
    // console.log("Page no: ", pageno)

    const searchHandler = ((event) => {
        setSearch(event.target.value);
    })
    // console.log("Search: ", search)

    const sortChange = ((event) => {
        setSort(event.target.value);
    })
    // console.log("Sort: ", sort)

    const latestMovies = useCallback(() => {
        dispatch(latestMovieDetails({ time_window: selectedtime }))
            .then((res) => {
                // console.log(res.payload.results);
                setState(res.payload.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [dispatch, latestMovieDetails, selectedtime])

    const allMovies = useCallback(() => {
        dispatch(allMovielist({ pageno }))
            .then((res) => {
                // console.log(res.payload);
                if (search === "") {
                    setPages(res.payload);
                    setMovie(res.payload.results);
                }
                else {
                    return;
                }
                setPages(res.payload);
                setMovie(res.payload.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [dispatch, allMovielist, pageno])

    const searchMovies = useCallback(() => {
        dispatch(searchMovielist({ data: search }))
            .then((res) => {
                // console.log(res.payload);
                if (search === "") {
                    return;
                }
                else {
                    setPages(res.payload);
                    setMovie(res.payload.results);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [dispatch, searchMovielist, search])

    const sortMovies = useCallback(() => {
        dispatch(sortMovielist({ pages: pageno, data: sort }))
            .then((res) => {
                // console.log(res.payload);
                if (search === "" && search) {
                    return;
                }
                else {
                    setPages(res.payload);
                    setMovie(res.payload.results);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [dispatch, sortMovielist, sort])

    useEffect(() => {
        latestMovies()
        allMovies()
        searchMovies()
        sortMovies()
    }, [latestMovies, allMovies, searchMovies, sortMovies])

    // console.log("selected: ", selectedOption);
    // console.log("selected time: ", selectedtime);
    console.log("movies: ", movie);
    // console.log("pages: ", pages);
    return (
        <div className='llm_css'>
            <div className='llm_css_2'>
                <div className='llm_header_1_1'>
                    <p>Latest</p>
                    <div className='llm_sub_header_1_1'>
                        <Link onClick={() => handleOptionChange('movies')} className={selectedOption === 'movies' ? 'active' : 'header_link_css'}>Movies</Link>
                        <Link onClick={() => handleOptionChange('tvshows')} className={selectedOption === 'tvshows' ? 'active' : 'header_link_css'}>TV Shows</Link>
                        <Link onClick={() => handleOptionChange('episodes')} className={selectedOption === 'episodes' ? 'active' : 'header_link_css'}>Episodes</Link>
                    </div>
                </div>
                <div className='llm_header_1_2'>
                    <div className='llm_header_1_2_sub_1'>
                        <Link onClick={() => handleOptionMovie('day')} className={selectedtime === 'day' ? 'active' : 'llm_header_1_2_sub_1_link'}>Day</Link>
                        <Link onClick={() => handleOptionMovie('week')} className={selectedtime === 'week' ? 'active' : 'llm_header_1_2_sub_1_link'}>Week</Link>
                    </div>
                    <div className='llm_header_1_2_sub_2'>
                        <Carousel responsive={responsive} className='header_carousel_css'>
                            {
                                state.map((mov, index) => (
                                    <Link to={`https://vidsrc.to/embed/movie/${mov.id}`} style={{ textDecoration: "none", display: 'flex', alignItems: "center", flexDirection: "column" }} key={index} target="_blank" >
                                        <div key={index} className='llm_header_1_2_sub_2_link' style={{ backgroundImage: `url(${image_url}${mov.backdrop_path})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", objectFit: "cover" }}>
                                            <div className='llm_header_1_2_sub_2_link' style={{
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                            }}>
                                                <img src={`${image_url}${mov.poster_path}`} alt="no img" />
                                                <div className='carousel_title_css'>
                                                    <p className='carousel_title_css_1'>{mov.title}</p>
                                                    <p className='carousel_title_css_2'>{mov.overview}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
            </div >
            <div className='llm_css_4'>
                <div className='search_bar_css'>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <label style={{ color: "white" }}>Search:</label>
                        <input type="text" onChange={searchHandler} placeholder='Enter the movie name' />
                    </div>
                    <select name="" id="" onChange={sortChange}>
                        <option value="popularity.desc">Most Popularity</option>
                        <option value="popularity.asc">Least Popularity</option>
                        <option value="primary_release_date.asc">Oldest Movies</option>
                        <option value="primary_release_date.desc">latest Movies</option>
                    </select>
                </div>
            </div>
            <div className='llm_css_3'>
                <div sx={{ width: '100%' }} className='llm_css_3_1'>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='llm_css_3_1_1'>
                        {
                            movie.map((prod) => (
                                <Grid item key={prod.id} >
                                    {loading ? (
                                        <Skeleton variant="rectangular" width={200} height={300} animation="wave" />
                                    ) : (
                                        <div >
                                            <Item style={{
                                                height: "300px", width: "200px", padding: "5px"
                                            }}>
                                                <Link to={`https://vidsrc.to/embed/movie/${prod.id}`} target="_blank" style={{ textDecoration: "none" }}>
                                                    <img src={`${image_url}${prod.poster_path}`} height="100%"
                                                        width="100%" alt="no img" />
                                                </Link>
                                            </Item>
                                            <p>{prod.title}</p>
                                            <p style={{ color: "grey", fontSize: "13px" }}>{new Date(prod.release_date).getFullYear()}</p>
                                        </div>
                                    )}
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                <Box className='pagination_css'>
                    <Stack spacing={2}>
                        <Pagination onChange={handlePagination} count={pages.total_pages} variant="outlined" shape="rounded" color="primary" style={{ backgroundColor: "white" }} />
                    </Stack>
                </Box>
            </div>
        </div >
    )
}

export default LLM