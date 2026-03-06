import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getPopularMovies();
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
          alt="Hero Background"
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
            CINE<span className="text-purple-500">ATLAS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed">
            Your personal compass through the world of cinema. Discover movies, 
            track TV shows, and get personalized recommendations powered by smart discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              Explore Now
            </button>
            <button className="glass-effect hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING GRID */}
      <section className="px-10 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-l-4 border-purple-500 pl-4">Trending Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;