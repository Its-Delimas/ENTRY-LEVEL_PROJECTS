function MovieCard({ title, year, description, poster }) {
  return (
    <div
      style={{
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        margin: "1rem",
        display: "inline-block",
        verticalAlign: "top",
      }}
    >
      {/* poster is a url string */}
      <img
        src={poster}
        alt={title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3 style={{ marginTop: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#ee0039", fontSize: "0.9rem" }}>{year}</p>
      <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>{description}</p>
    </div>
  );
}

export default MovieCard;
