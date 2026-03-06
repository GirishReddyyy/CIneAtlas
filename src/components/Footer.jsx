import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#061214] border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="text-3xl font-black tracking-tighter text-white">
          <Link to="/" className="hover:text-purple-500 transition-colors">
            CINE<span className="text-purple-500">ATLAS</span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex gap-10 text-gray-400 font-medium text-sm uppercase tracking-widest">
          <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link to="/shows" className="hover:text-white transition-colors">TV Shows</Link>
          <Link to="/search" className="hover:text-white transition-colors">Search</Link>
        </div>

        {/* Socials */}
        <div className="flex gap-6 text-xl text-gray-400">
          <a href="#" className="hover:text-purple-500 transition-colors">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-purple-500 transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-purple-500 transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <p className="text-center text-gray-600 text-xs mt-10 tracking-widest uppercase">
        © 2026 CineAtlas Universe. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;