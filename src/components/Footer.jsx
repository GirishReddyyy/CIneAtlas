import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#061214] border-t border-white/5 py-10 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Name */}
        <div className="text-2xl font-black tracking-tighter text-white">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            CINE<span className="text-purple-500">ATLAS</span>
          </Link>
        </div>

        {/* Social Icons (Font Awesome or Heroicons equivalents) */}
        <div className="flex gap-6 text-xl text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <p className="text-center text-gray-600 text-xs mt-8">
        © 2026 CINEATLAS. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;