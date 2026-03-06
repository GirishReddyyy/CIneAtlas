import { useEffect, useState } from "react"
import { getPopularMovies } from "../services/api"
import MovieCard from "../components/MovieCard"

function Home() {

  const [movies, setMovies] = useState([])

  useEffect(() => {

    async function fetchMovies() {
      const data = await getPopularMovies()
      setMovies(data)
    }

    fetchMovies()

  }, [])

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">

      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

    </div>
  )
}

export default Home