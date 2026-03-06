import { useState } from "react"
import { searchMulti } from "../services/api"
import MovieCard from "../components/MovieCard"

function Search({ results, setResults }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const data = await searchMulti(query)
      setResults(data)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#061214] p-10 flex flex-col items-center">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 text-white tracking-tighter uppercase">
          Search <span className="text-purple-500">Atlas</span>
        </h1>
        <p className="text-gray-400">Find movies, TV shows, and more across the cinematic universe.</p>
      </div>

      {/* Enhanced Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-16 w-full max-w-2xl">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Type a movie or show name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // bg-white/10 gives that glass look, text-white ensures visibility
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all shadow-2xl"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-purple-500/20"
        >
          {loading ? "SEARCHING..." : "SEARCH"}
        </button>
      </form>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {results && results.length > 0 ? (
          results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))
        ) : (
          !loading && query && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-xl italic">"No cosmic signals found for that title. Try another search."</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Search