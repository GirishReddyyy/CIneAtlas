import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Search from "./pages/Search"
import Shows from "./pages/Shows"
import MoviesPage from "./pages/MoviesPage"

function App() {
  // Global state to store search results so they persist when 
  // navigating between the search page and detail pages
  const [results, setResults] = useState([])

  return (
    <BrowserRouter>
      {/* The 'flex flex-col min-h-screen' classes ensure that the 
          footer pushes to the bottom of the viewport 
      */}
      <div className="flex flex-col min-h-screen bg-[#061214]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Landing Page with Hero section */}
            <Route path="/" element={<Home />} />
            
            {/* Dedicated Catalog for Movies */}
            <Route path="/movies" element={<MoviesPage />} />

            {/* Search Route: Passes state to Search.jsx 
                Note: Ensure searchMulti is used in Search.jsx for mixed results
            */}
            <Route
              path="/search"
              element={<Search results={results} setResults={setResults} />}
            />

            {/* Media-Aware Details Route:
                Handles both /details/movie/123 and /details/tv/123
            */}
            <Route path="/details/:type/:id" element={<MovieDetails />} />

            {/* Dedicated Catalog for TV Shows */}
            <Route path="/shows" element={<Shows />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App