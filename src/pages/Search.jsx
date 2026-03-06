import { useState } from "react"

function Search({ setResults }) {

  const [query, setQuery] = useState("")

  const searchShows = async (e) => {
  e.preventDefault()

  const res = await fetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
  )

  const data = await res.json()

  setResults(data.results)
}

  return (
    <div className="p-10 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6 text-purple-500">
        TV Show Finder
      </h1>

      <form
        onSubmit={searchShows}
        className="flex gap-4"
      >
        <input
          type="text"
          placeholder="Search TV Shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80"
        />

        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Search
        </button>

      </form>

    </div>
  )
}

export default Search