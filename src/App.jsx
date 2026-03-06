import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Search from "./pages/Search"
import Shows from "./pages/Shows"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/search" element={<Search />} />

        <Route path="/shows" element={<Shows />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App