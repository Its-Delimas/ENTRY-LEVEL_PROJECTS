import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); //tell app.jsx what user searched
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
  }
  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search for a Movie"
        style={{
          padding: "0.75rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "#fff",
          width: "300px",
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: "0.5rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          background: "#e50914",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}
