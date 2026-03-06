import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL
});

export const getPopularMovies = async () => {
  const res = await api.get(`/movie/popular?api_key=${API_KEY}`);
  return res.data.results;
};

export const getPopularShows = async () => {
  const res = await api.get(`/tv/popular?api_key=${API_KEY}`);
  return res.data.results;
};

// NEW: Separated detail fetchers
// export const getMovieDetails = async (id) => {
//   const res = await api.get(`/movie/${id}?api_key=${API_KEY}`);
//   return res.data;
// };

// export const getTVDetails = async (id) => {
//   const res = await api.get(`/tv/${id}?api_key=${API_KEY}`);
//   return res.data;
// };

export const searchMulti = async (query) => {
  const res = await api.get(`/search/multi?api_key=${API_KEY}&query=${query}`);
  return res.data.results.filter(item => item.media_type !== "person");
};

// Add append_to_response to get cast in one call
export const getMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
  return res.data;
};

export const getTVDetails = async (id) => {
  const res = await api.get(`/tv/${id}?api_key=${API_KEY}&append_to_response=credits`);
  return res.data;
};