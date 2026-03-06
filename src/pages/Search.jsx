import { useState } from "react"
import { searchMulti } from "../services/api" // Changed this import
import MovieCard from "../components/MovieCard"

function Search({ results, setResults }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      // Use the multi-search function to get movies AND shows
      const data = await searchMulti(query)
      setResults(data)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-purple-500">
        Search Movies & Shows
      </h1>

      <form onSubmit={handleSearch} className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Search for movies or TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80 text-black focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {results && results.length > 0 ? (
          results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))
        ) : (
          !loading && <p className="text-gray-400 col-span-full text-center">No results found. Try a different title!</p>
        )}
      </div>
    </div>
  )
}

export default Search