import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlmbEF6Wp5AIotxONa0zjvdSaR8iyX_BqoI720888_w&s";
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden group hover:border-purple-500/50 border border-white/10 transition-all duration-300 flex flex-col h-full shadow-2xl">
      <Link to={`/details/${mediaType}/${movie.id}`} className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholder}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = placeholder; }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <span className="w-full bg-purple-600 text-white text-center py-2 rounded-xl font-bold text-xs uppercase tracking-widest">
             View Details
           </span>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-bold truncate text-lg group-hover:text-purple-400 transition-colors">
          {movie.title || movie.name}
        </h3>
        <p className="text-purple-400 text-sm font-medium mt-1 uppercase tracking-tighter">
          {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || "TBD"} 
          <span className="text-gray-600 mx-2">|</span> 
          {mediaType}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;