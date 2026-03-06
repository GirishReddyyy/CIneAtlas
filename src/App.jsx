import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // Import utility
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import Shows from "./pages/Shows";
import MoviesPage from "./pages/MoviesPage";

function App() {
  const [results, setResults] = useState([]);

  return (
    <BrowserRouter>
      {/* Ensures every page starts at the top */}
      <ScrollToTop /> 
      
      <div className="flex flex-col min-h-screen bg-[#061214]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route 
              path="/search" 
              element={<Search results={results} setResults={setResults} />} 
            />
            <Route path="/details/:type/:id" element={<MovieDetails />} />
            <Route path="/shows" element={<Shows />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;