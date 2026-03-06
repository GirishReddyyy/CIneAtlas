import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMovieDetails } from "../services/api"

function MovieDetails() {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {

    async function fetchMovie() {
      const data = await getMovieDetails(id)
      setMovie(data)
    }

    fetchMovie()

  }, [id])

  if (!movie) {
    return (
      <div className="text-white text-center mt-10">
        Loading movie details...
      </div>
    )
  }

  return (
    <div className="text-white p-8 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-400 mb-4">
            ⭐ {movie.vote_average} / 10
          </p>

          <p className="mb-6">
            {movie.overview}
          </p>

          <div className="space-y-2 text-gray-300">

            <p>
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </p>

            <p>
              <span className="font-semibold">Runtime:</span>{" "}
              {movie.runtime} minutes
            </p>

            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {movie.genres.map(g => g.name).join(", ")}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MovieDetails