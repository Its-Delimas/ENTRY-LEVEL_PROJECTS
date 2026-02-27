import { useState } from "react";

import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

// hard coded data for UI ~ mock data
const ALL_MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: "2010",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    rating: "8.8",
  },
  {
    id: 2,
    title: "Interstellar",
    year: "2014",
    description: "A team of explorers travel through a wormhole in space.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    rating: "8.6",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: "2008",
    description:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    rating: "9.0",
  },
  {
    id: 4,
    title: "Parasite",
    year: "2019",
    description:
      "A poor family schemes to become employed by a wealthy family.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    rating: "8.5",
  },
];

function App() {
  const [query, setQuery] = useState("");

  const filteredMovies =
    query.trim() === ""
      ? ALL_MOVIES
      : ALL_MOVIES.filter((movie) => {
          movie.title.toLowerCase().includes(query.toLowerCase);
        });

  return (
    <>
      <h1>MovieVault 🎬</h1>

      {query && (
        <p style={{ color: "#888" }}>
          Showing {filteredMovies.length} result
          {filteredMovies.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      <SearchBar onSearch={setQuery} />

      {filteredMovies.length === 0 ? (
        <p style={{ color: "#888", marginTop: "2rem" }}>
          No Movies found for {query}
        </p>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            description={movie.description}
            poster={movie.poster}
            rating={movie.rating}
          />
        ))
      )}
    </>
  );
}

export default App;
