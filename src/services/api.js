import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

const api = axios.create({
  baseURL: BASE_URL
})

export const getPopularMovies = async () => {
  const res = await api.get(`/movie/popular?api_key=${API_KEY}`)
  return res.data.results
}

export const getMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}?api_key=${API_KEY}`)
  return res.data
}

export const searchMovies = async (query) => {
  const res = await api.get(`/search/movie?api_key=${API_KEY}&query=${query}`)
  return res.data.results
}