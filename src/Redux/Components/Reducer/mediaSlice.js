import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allmovie_list_url, base_url, forget_url, list_latest_movies_url, login_url, movie_embed_url, movie_search_url, profile_url, register_url, sort_movie_url, tv_shows_episode_embed_url, update_url } from "../../../api/api";

let reg_url = base_url + register_url;
let log_url = base_url + login_url;
let UserProfile_url = base_url + profile_url;
let updatePassword_url = base_url + update_url;
let forgetPassword_url = base_url + forget_url;
let movie_url = movie_embed_url;
let season_episode_url = tv_shows_episode_embed_url;

//sort movies
export const sortMovielist = createAsyncThunk("get/sortMovielist", async ({pages, data }) => {
    // console.log("Sort URL: ", `${sort_movie_url}page=${pages}&sort_by=${data}`);
    let res = await axios.get(`${sort_movie_url}sort_by=${data}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNiM2NjNmQ4MTA1YmFjOGZlZWI5ZGYzNzVkMWY0ZiIsIm5iZiI6MTcyMDA3NTU0NS44NjAyMjQsInN1YiI6IjY2ODY0MDcyOGZhZDJlNzAzOTVlYmMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PStRDEaIPjpRtbzcy6gu3-RxZnOTNtqfrXEiXnVMxVw'
        }
    }
    )
    return res?.data
})

//search movies
export const searchMovielist = createAsyncThunk("get/searchMovielist", async ({ data }) => {
    // console.log("search URL: ", `${movie_search_url}/${data}`);
    let res = await axios.get(`${movie_search_url}/${data}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNiM2NjNmQ4MTA1YmFjOGZlZWI5ZGYzNzVkMWY0ZiIsIm5iZiI6MTcyMDA3NTU0NS44NjAyMjQsInN1YiI6IjY2ODY0MDcyOGZhZDJlNzAzOTVlYmMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PStRDEaIPjpRtbzcy6gu3-RxZnOTNtqfrXEiXnVMxVw'
        }
    }
    )
    return res?.data
})

//all movies
export const allMovielist = createAsyncThunk("get/allMovielist", async ({ pageno }) => {
    // console.log("latest movies: ", `${allmovie_list_url}?&page=${pageno}`);
    let res = await axios.get(`${allmovie_list_url}?&page=${pageno}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNiM2NjNmQ4MTA1YmFjOGZlZWI5ZGYzNzVkMWY0ZiIsIm5iZiI6MTcyMDA3NTU0NS44NjAyMjQsInN1YiI6IjY2ODY0MDcyOGZhZDJlNzAzOTVlYmMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PStRDEaIPjpRtbzcy6gu3-RxZnOTNtqfrXEiXnVMxVw'
        }
    }
    )
    return res?.data
})

//list of latest movies
export const latestMovieDetails = createAsyncThunk("get/latestMovieDetails", async ({ time_window }) => {
    // console.log("latest movies: ", `${list_latest_movies_url}/${time_window}?language=en-US`);
    let res = await axios.get(`${list_latest_movies_url}/${time_window}?language=en-US`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNiM2NjNmQ4MTA1YmFjOGZlZWI5ZGYzNzVkMWY0ZiIsIm5iZiI6MTcyMDA3NTU0NS44NjAyMjQsInN1YiI6IjY2ODY0MDcyOGZhZDJlNzAzOTVlYmMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PStRDEaIPjpRtbzcy6gu3-RxZnOTNtqfrXEiXnVMxVw'
        }
    }
    )
    return res?.data
})

//movie search
export const fetchMovieDetails = createAsyncThunk("get/fetchMovieDetails", async ({ id }) => {
    console.log(`${movie_url}/${id}`);
    let res = await axios.get(`${movie_url}/${id}`)
    return res?.data
})

//season with episode
export const fetchSeasonEpisodeDetails = createAsyncThunk("get/fetchSeasonEpisodeDetails", async ({ id, season, episode }) => {
    // console.log(`${season_episode_url}${id}/${season}/${episode}`);
    let res = await axios.get(`${season_episode_url}/${id}/${season}/${episode}`)
    return res?.data
})

//registration
export const registerUser = createAsyncThunk("post/registerUser", async ({ data }) => {
    const res = await axios.post(`${reg_url}`, data);
    // console.log("Registration Slice: ", res.data);
    return res?.data
})

//login
export const loginUser = createAsyncThunk("post/loginUser", async ({ data }) => {
    const res = await axios.post(log_url, data);
    console.log("login Slice:", res.data);
    window.localStorage.setItem("token", res.data.token);
    return res?.data
})

//profile
export const userProfile = createAsyncThunk("get/userProfile", async () => {
    let res = await axios.get(`${UserProfile_url}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//forget password
export const forgotUser = createAsyncThunk("post/forgotUser", async ({ data }) => {
    const res = await axios.post(forgetPassword_url, data);
    // console.log("login Slice:", res.data);
    window.localStorage.setItem("token", res.data.token);
    return res?.data
})

//Update password
export const updateUser = createAsyncThunk("get/updateUser", async ({ data }) => {
    let res = await axios.post(updatePassword_url, data, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

const initialValues = {
    userData: [],
    loading: false,
    error: null,
};

export const mediaSlice = createSlice({
    name: "slice",
    initialState: initialValues,

    extraReducers: (builder) => {
        //Registration
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action.error);
        });

        //Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Profile page
        builder.addCase(userProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(userProfile.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Update Password
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Forget Password
        builder.addCase(forgotUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(forgotUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(forgotUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //movies Search
        builder.addCase(fetchMovieDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });

        //season with episode
        builder.addCase(fetchSeasonEpisodeDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSeasonEpisodeDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(fetchSeasonEpisodeDetails.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });

        //latestMovieDetails
        builder.addCase(latestMovieDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(latestMovieDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(latestMovieDetails.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });

        //allMovielist
        builder.addCase(allMovielist.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(allMovielist.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(allMovielist.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });

        //searchMovielist
        builder.addCase(searchMovielist.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(searchMovielist.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(searchMovielist.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });

        //searchMovielist
        builder.addCase(sortMovielist.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(sortMovielist.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(sortMovielist.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action);
        });
    }
})

export default mediaSlice.reducer;