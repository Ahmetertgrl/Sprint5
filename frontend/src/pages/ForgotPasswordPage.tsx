import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section style={{ maxWidth: "450px" }}>
      <h2 className="bolum-baslik" style={{ marginBottom: "0.5rem" }}>Şifremi Unuttum</h2>
      <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <div className="mesaj mesaj-basari" style={{ marginBottom: "1rem" }}>
          Bağlantı {email} adresine gönderildi (demo).
        </div>
      )}

      <form className="form" noValidate onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label htmlFor="forgot-email" style={{ display: "block", marginBottom: "0.25rem" }}>E-posta</label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
            placeholder="ornek@sdu.edu.tr"
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button
          type="submit"
          className="buton"
          style={{
            padding: "0.75rem",
            backgroundColor: "#15803d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Bağlantı gönder
        </button>

        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "#15803d" }}>&larr; Girişe dön</Link>
        </div>
      </form>
    </section>
  );
}
