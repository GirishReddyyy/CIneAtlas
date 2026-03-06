import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        CineAtlas 🎬
      </h1>

      <div className="flex gap-6">

        <Link to="/" className="hover:text-gray-400">
          Movies
        </Link>

        <Link to="/shows" className="hover:text-gray-400">
          TV Shows
        </Link>

        <Link to="/search" className="hover:text-gray-400">
          Search
        </Link>

      </div>

    </nav>
  )
}

export default Navbar