import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-[100] bg-[#061214] border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter text-white">
          <Link to="/" onClick={closeMenu} className="hover:text-purple-500 transition-colors">
            CINE<span className="text-purple-500">ATLAS</span>
          </Link>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 font-bold text-xs uppercase tracking-[0.2em]">
          <Link to="/movies" className="text-gray-300 hover:text-purple-400 transition-colors">Movies</Link>
          <Link to="/shows" className="text-gray-300 hover:text-purple-400 transition-colors">TV Shows</Link>
          <Link to="/search" className="text-gray-300 hover:text-purple-400 transition-colors">Search</Link>
        </div>

        {/* Mobile Menu Button (Visible only on Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-white transition-all"></div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0b1a1d] border-b border-white/10 py-6 flex flex-col items-center gap-6 animate-in slide-in-from-top duration-300">
          <Link to="/movies" onClick={closeMenu} className="text-gray-200 font-bold uppercase tracking-widest hover:text-purple-500">Movies</Link>
          <Link to="/shows" onClick={closeMenu} className="text-gray-200 font-bold uppercase tracking-widest hover:text-purple-500">TV Shows</Link>
          <Link to="/search" onClick={closeMenu} className="text-gray-200 font-bold uppercase tracking-widest hover:text-purple-500">Search</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;