import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 bg-black/90 backdrop-blur-md text-white border-b border-white/10">
      {/* Brand Name links to Home (Hero Page) */}
      <div className="text-2xl font-black tracking-tighter">
        <Link to="/" className="hover:text-purple-500 transition-colors">
          CINE<span className="text-purple-500">ATLAS</span>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex gap-8 font-semibold text-sm uppercase tracking-widest">
        <Link to="/movies" className="hover:text-purple-400 transition-colors">
          Movies
        </Link>
        <Link to="/shows" className="hover:text-purple-400 transition-colors">
          TV Shows
        </Link>
        <Link to="/search" className="hover:text-purple-400 transition-colors">
          Search
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;