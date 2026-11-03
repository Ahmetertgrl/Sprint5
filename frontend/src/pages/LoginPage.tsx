import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section style={{ maxWidth: "450px" }}>
      <h2 className="bolum-baslik" style={{ marginBottom: "1rem" }}>Giriş Yap</h2>

      {sent && (
        <p className="mesaj mesaj-basari" style={{ marginBottom: "1rem" }}>
          Gerçek giriş Sprint 10'da
        </p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label htmlFor="login-email" style={{ display: "block", marginBottom: "0.25rem" }}>E-posta</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="login-password" style={{ display: "block", marginBottom: "0.25rem" }}>Şifre</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <button
          type="submit"
          className="buton"
          style={{
            padding: "0.75rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Giriş yap
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          <Link to="/forgot-password" style={{ color: "#15803d" }}>Şifremi unuttum</Link>
          <Link to="/register" style={{ color: "#15803d" }}>Hesabın yok mu? Kayıt ol</Link>
        </div>
      </form>
    </section>
  );
}
