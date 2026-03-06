import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white border-l-4 border-purple-600 pl-4">
            Explore <span className="text-purple-500">Movies</span>
          </h1>
          <p className="text-gray-400 mt-2 ml-5 italic">
            Browse through the world's most popular cinematic releases.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((m) => (
              // Explicitly set media_type so MovieCard links to /details/movie/id
              <MovieCard key={m.id} movie={{ ...m, media_type: "movie" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;