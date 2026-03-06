import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getTVDetails } from "../services/api";

function MovieDetails() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlmbEF6Wp5AIotxONa0zjvdSaR8iyX_BqoI720888_w&s";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = type === "tv" ? await getTVDetails(id) : await getMovieDetails(id);
        setData(result);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061214] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!data) return <div className="text-white text-center mt-20">Content not found.</div>;

  const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : placeholder;
  const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
  
  // Find the official trailer from the videos array
  const trailer = data.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  ) || data.videos?.results?.[0];

  return (
    <div className="min-h-screen bg-[#061214] text-white pb-20 relative">
      {/* Immersive Background Blur */}
      <div 
        className="absolute inset-0 h-[60vh] opacity-20 blur-3xl z-0 pointer-events-none"
        style={{ backgroundImage: `url(${backdropUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        {/* Navigation Button */}
        <button 
          onClick={() => navigate(type === 'tv' ? '/shows' : '/movies')}
          className="mb-10 flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-purple-500/30 transition-all"
        >
          ← Back To {type === 'tv' ? 'Shows' : 'Movies'}
        </button>

        <div className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          {/* Poster Image */}
          <div className="group relative">
            <img 
              src={posterUrl} 
              alt={data.title || data.name} 
              className="w-full rounded-2xl shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.02]" 
              onError={(e) => { e.target.src = placeholder; }}
            />
          </div>

          {/* Primary Metadata */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none">
              {data.title || data.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-lg">
              <span className="text-yellow-400 font-bold flex items-center gap-2 text-2xl">
                ⭐ {data.vote_average?.toFixed(1) || "N/A"} <span className="text-gray-500 text-sm">/ 10</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300 font-medium">
                {data.release_date || data.first_air_date || "TBD"}
              </span>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl font-light italic">
              {data.overview || "No description available."}
            </p>

            <div className="mb-10">
              <h4 className="text-xs font-black uppercase text-purple-500 mb-4 tracking-[0.3em]">Genres</h4>
              <div className="flex flex-wrap gap-3">
                {data.genres?.map((g) => (
                  <span key={g.id} className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            {data.homepage && (
              <a 
                href={data.homepage} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-white text-black px-10 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-xl shadow-white/5"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>

        {/* Video Trailer Section */}
        {trailer && (
          <div className="mt-24">
            <h2 className="text-2xl font-black mb-10 uppercase tracking-widest border-l-4 border-purple-500 pl-4">
              Official Trailer
            </h2>
            <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0`}
                title="Trailer Player"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Detailed Info Grid */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <h2 className="text-3xl font-black text-center mb-16 tracking-[0.4em] uppercase underline underline-offset-[16px] decoration-purple-600">
            {type === 'tv' ? 'Show Specifications' : 'Movie Specifications'}
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div className="space-y-6">
              <p className="flex flex-col">
                <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Key Cast</span>
                <span className="text-gray-200">
                  {data.credits?.cast?.slice(0, 6).map(c => c.name).join(", ") || "Information unavailable"}
                </span>
              </p>
              <p className="flex flex-col">
                <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Status</span>
                <span className="text-gray-200">{data.status}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Production</span>
                <span className="text-gray-200">{data.production_companies?.map(p => p.name).join(", ")}</span>
              </p>
            </div>

            <div className="space-y-6">
              {type === 'movie' ? (
                <>
                  <p className="flex flex-col">
                    <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Budget</span>
                    <span className="text-gray-200">${data.budget?.toLocaleString() || "0"}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Revenue</span>
                    <span className="text-gray-200">${data.revenue?.toLocaleString() || "0"}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="flex flex-col">
                    <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Total Seasons</span>
                    <span className="text-gray-200">{data.number_of_seasons}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Episodes</span>
                    <span className="text-gray-200">{data.number_of_episodes}</span>
                  </p>
                </>
              )}
              <p className="flex flex-col">
                <span className="text-purple-500 font-black uppercase text-xs tracking-widest mb-1">Average Runtime</span>
                <span className="text-gray-200">
                  {data.runtime || data.episode_run_time?.[0] || "N/A"} minutes
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;