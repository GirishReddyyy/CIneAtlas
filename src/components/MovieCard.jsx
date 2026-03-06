import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlmbEF6Wp5AIotxONa0zjvdSaR8iyX_BqoI720888_w&s";
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");

  return (
    <div className="glass-effect rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
      <Link to={`/details/${mediaType}/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholder}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = placeholder; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
             <button className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold text-sm">View Details</button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{movie.title || movie.name}</h3>
        <p className="text-purple-400 text-sm font-medium mt-1">
          {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || "TBD"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;