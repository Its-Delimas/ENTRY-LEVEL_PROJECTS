import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favourites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </>
  );
}
