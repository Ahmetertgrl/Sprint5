import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  categories: Category[];
  title: string;
}

export default function EventForm({ onSubmit, categories, title }: EventFormProps) {
  return (
    <section style={{ maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>
      <p style={{ marginBottom: "1.5rem", color: "#64748b" }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem" }}>Etkinlik Adı</label>
          <input id="title" maxLength={80} placeholder="Örn: Kariyer Günleri 2026" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label htmlFor="kategori" style={{ display: "block", marginBottom: "0.5rem" }}>Kategori</label>
          <select id="kategori" style={{ width: "100%", padding: "0.5rem" }}>
            <option value="">Seçiniz</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tarih" style={{ display: "block", marginBottom: "0.5rem" }}>Tarih</label>
          <input type="date" id="tarih" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label htmlFor="saat" style={{ display: "block", marginBottom: "0.5rem" }}>Saat</label>
          <input type="time" id="saat" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label htmlFor="yer" style={{ display: "block", marginBottom: "0.5rem" }}>Yer</label>
          <input id="yer" placeholder="Örn: A Blok Konferans Salonu" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label htmlFor="kontenjan" style={{ display: "block", marginBottom: "0.5rem" }}>Kontenjan</label>
          <input type="number" id="kontenjan" style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem" }}>Açıklama</label>
          <textarea id="description" rows={5} style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <button type="submit" style={{ padding: "0.75rem", backgroundColor: "#15803d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "1rem" }}>
          Kaydet
        </button>
      </form>
    </section>
  );
}