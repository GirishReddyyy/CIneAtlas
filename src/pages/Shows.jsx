import { useEffect, useState } from "react";
import { getPopularShows } from "../services/api";
import MovieCard from "../components/MovieCard";

function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShows() {
      try {
        const data = await getPopularShows();
        setShows(data);
      } catch (err) {
        console.error("Error fetching shows:", err);
      } finally {
        setLoading(false);
      }
    }
    loadShows();
  }, []);

  return (
    /* Changed bg- to bg-[#061214] to match the Movies page */
    <div className="min-h-screen bg-[#061214] p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white border-l-4 border-purple-600 pl-4 uppercase tracking-tighter">
            TV <span className="text-purple-500">Shows</span>
          </h1>
          <p className="text-gray-400 mt-2 ml-5 italic">
            Explore trending series with the signature CineAtlas dark theme.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shows.map((show) => (
              <MovieCard key={show.id} movie={{ ...show, media_type: "tv" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shows;