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

  if (loading) return <div className="text-white text-center mt-10">Loading TV Shows...</div>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8 text-purple-500 text-center">Trending TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
}

export default Shows;