function MovieCard({ title, year, description, poster, rating }) {
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
      }}
    >
      {/* poster is a url string */}
      <img
        src={poster}
        alt={title}
        style={{ width: "100%", borderRadius: "4px" }}
      />

      <h3 style={{ marginTop: "0.5rem" }}>{title}</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.3rem",
        }}
      >
        <p style={{ color: "#231123", fontSize: "0.9rem" }}>{year}</p>
        <p style={{ color: "#f5c518", fontSize: "0.9rem" }}> {rating}</p>
      </div>

      <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>{description}</p>
    </div>
  );
}

export default MovieCard;
