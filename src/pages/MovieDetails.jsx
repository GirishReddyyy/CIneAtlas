import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getTVDetails } from "../services/api";

function MovieDetails() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlmbEF6Wp5AIotxONa0zjvdSaR8iyX_BqoI720888_w&s";

  useEffect(() => {
    async function fetchData() {
      try {
        const result = type === "tv" ? await getTVDetails(id) : await getMovieDetails(id);
        setData(result);
      } catch (err) { console.error(err); }
    }
    fetchData();
  }, [type, id]);

  if (!data) return <div className="text-white text-center mt-20">Loading...</div>;

  const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : placeholder;
  const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

  return (
    <div className="min-h-screen bg-[#061214] text-white">
      {/* Dynamic Backdrop */}
      <div 
        className="absolute inset-0 h-[70vh] opacity-25 blur-2xl z-0"
        style={{ backgroundImage: `url(${backdropUrl})`, backgroundSize: 'cover' }}
      />

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(type === 'tv' ? '/shows' : '/movies')}
          className="mb-8 border border-cyan-500/30 bg-black/40 px-5 py-1.5 rounded text-xs font-bold hover:bg-cyan-500/20 transition-all text-gray-200"
        >
          Back To {type === 'tv' ? 'Shows' : 'Movies'}
        </button>

        <div className="grid md:grid-cols-[450px_1fr] gap-16 items-start">
          <img src={posterUrl} alt={data.title} className="w-full rounded shadow-2xl border border-white/5" />

          <div className="pt-10">
            <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">{data.title || data.name}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-lg font-medium">
              <span className="text-cyan-400">⭐ {data.vote_average?.toFixed(1)} / 10</span>
              <span className="text-gray-300">Release Date: {data.release_date || data.first_air_date}</span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-10 text-lg max-w-3xl">
              {data.overview}
            </p>

            <div className="mb-10">
              <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Genres</h4>
              <div className="flex flex-wrap gap-y-1">
                {data.genres?.map((g, idx) => (
                  <span key={g.id} className="text-gray-100 mr-4 border-b border-gray-700 pb-1">
                    {g.name}{idx < data.genres.length - 1 ? "" : ""}
                  </span>
                ))}
              </div>
            </div>

            <a href={data.homepage} target="_blank" className="inline-block border border-cyan-500/40 px-8 py-2 rounded text-xs font-bold uppercase hover:bg-cyan-500/10 transition-all">
              Visit {type === 'tv' ? 'Show' : 'Movie'} Homepage
            </a>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-24 border-t border-white/5 pt-12">
          <h2 className="text-xl font-black text-center mb-16 tracking-[0.3em] uppercase underline underline-offset-[12px] decoration-cyan-500">
            {type === 'tv' ? 'Show Info' : 'Movie Info'}
          </h2>

          <div className="max-w-4xl mx-auto space-y-8 text-sm">
            <p className="leading-relaxed border-b border-white/5 pb-6">
              <span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Cast:</span>
              {data.credits?.cast?.slice(0, 8).map((c, i) => (
                <span key={c.id} className="text-gray-300">{c.name}{i < 7 ? ", " : ""}</span>
              ))}
            </p>

            <div className="grid grid-cols-1 gap-6">
              {type === 'movie' && (
                <>
                  <p><span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Budget:</span> ${data.budget?.toLocaleString()}</p>
                  <p><span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Revenue:</span> ${data.revenue?.toLocaleString()}</p>
                </>
              )}
              <p><span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Runtime:</span> {data.runtime} minutes</p>
              <p><span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Status:</span> {data.status}</p>
              <p>
                <span className="text-cyan-400 font-bold uppercase tracking-wider mr-3">Production Companies:</span>
                {data.production_companies?.map(p => p.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;