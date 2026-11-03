import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section style={{ textAlign: "left", padding: "1rem 0" }}>
      <h2 className="bolum-baslik" style={{ marginBottom: "0.5rem" }}>Sayfa bulunamadı</h2>
      <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
        Aradığınız sayfa ya da etkinlik yok.
      </p>
      <Link
        to="/"
        className="buton"
        style={{
          display: "inline-block",
          backgroundColor: "#15803d",
          color: "white",
          textDecoration: "none",
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        Ana sayfaya dön
      </Link>
    </section>
  );
}
