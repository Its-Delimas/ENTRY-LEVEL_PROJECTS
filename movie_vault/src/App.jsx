import { useState, useEffect } from "react";
import { searchMovies } from "./api/movieService.js";

import SearchBar from "./components/SearchBar.jsx";
import MovieCard from "./components/MovieCard.jsx";

export default function App() {
  const [query, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchMovies(query);
        setMovies(results ?? []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <h1>DeliWatch</h1>
      <SearchBar onSearch={setSearchQuery} />
      {/* loadig states */}
      {loading && (
        <p style={{ color: "#888", marginTop: "1rem" }}>Searching...</p>
      )}
      {/* Error states */}
      {error && (
        <p style={{ color: "#e50914", marginTop: "1rem" }}>⚠ | {error}</p>
      )}
      {/* Empty States ~ Only show when not loading and no error */}
      {!loading && !error && movies.length === 0 && (
        <p style={{ color: "#888", marginTop: "1rem" }}>No movies found</p>
      )}
      {/* Results */}
      {!loading &&
        movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            // imdbID={movie.imdbID}
          />
        ))}
    </div>
  );
}
