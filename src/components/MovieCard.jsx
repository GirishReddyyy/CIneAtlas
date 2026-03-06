import { Link } from "react-router-dom"

function MovieCard({ movie }) {

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden text-white">

      <Link to={`/movie/${movie.id}`}>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

      </Link>

      <div className="p-3">

        <h3 className="text-lg font-semibold">
          {movie.title}
        </h3>

        <p className="text-gray-400">
          {movie.release_date}
        </p>

      </div>

    </div>
  )
}

export default MovieCard