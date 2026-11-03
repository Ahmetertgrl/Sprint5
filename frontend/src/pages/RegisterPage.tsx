import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "En az 3 karakter olmalı.";
    }
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section style={{ maxWidth: "450px" }}>
      <h2 className="bolum-baslik" style={{ marginBottom: "1rem" }}>Kayıt Ol</h2>

      {sent && (
        <p className="mesaj mesaj-basari" style={{ marginBottom: "1rem" }}>
          Kayıt başarılı (demo).
        </p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label htmlFor="reg-name" style={{ display: "block", marginBottom: "0.25rem" }}>Ad Soyad</label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="reg-email" style={{ display: "block", marginBottom: "0.25rem" }}>E-posta</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="reg-password" style={{ display: "block", marginBottom: "0.25rem" }}>Şifre</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="reg-password2" style={{ display: "block", marginBottom: "0.25rem" }}>Şifre (tekrar)</label>
          <input
            id="reg-password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            aria-invalid={errors.password2 ? true : undefined}
            style={{ width: "100%", padding: "0.5rem" }}
          />
          {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
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
          Kayıt ol
        </button>

        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "#15803d" }}>Zaten hesabın var mı? Giriş yap</Link>
        </div>
      </form>
    </section>
  );
}
