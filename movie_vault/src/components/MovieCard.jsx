function MovieCard({ title, year, poster }) {
  const validPoster =
    poster && poster !== "N/A"
      ? poster
      : "https://via.placeholder.com/200x300?text=No+Poster";

  return (
    <div
      style={{
        background: "#c30f45",
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        margin: "1rem",
        display: "inline-block",
        verticalAlign: "top",
        cursor: "pointer",
      }}
    >
      <img
        src={validPoster}
        alt={title}
        style={{ width: "100%", borderRadius: "4px", display: "block" }}
      />

      <h3 style={{ marginTop: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#231123", fontSize: "0.9rem" }}>{year}</p>
      {/* <p style={{ color: "#f5c518", fontSize: "0.9rem" }}> {imdbID}</p> */}
      {/* <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>{description}</p> */}
    </div>
  );
}

export default MovieCard;
