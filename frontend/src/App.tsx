import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

// Sayfa isimleri için tip tanımı (Adım 8)
type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  // State Tanımlamaları
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştirme fonksiyonu (Adım 8)
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Veri Hesaplamaları
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map(e => e.category))];

  // Sekme Başlığı Güncelleme (Adım 11)
  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "detail" && selected) {
      title = `Kampüs Etkinlikleri - ${selected.title}`;
    }
    document.title = title;
  }, [page, selected, selectedId]);

  // Kart Çizim Fonksiyonu (Adım 9)
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p style={{ color: "#16a34a", fontWeight: "bold" }}>{event.category}</p>
        <p>Tarih: {event.date}, {event.time}</p>
        <p>Yer: {event.location}</p>
        {event.capacity && <p>Kontenjan: {event.capacity} kişi</p>}
        <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{event.description}</p>
        <button onClick={() => go("detail", event.id)} style={{ marginTop: "1rem" }}>
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <nav>
          <a href="#" aria-current={page === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a>
          <a href="#" aria-current={page === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a>
          <a href="#" aria-current={page === "add" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA (Adım 9) */}
        {page === "home" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </div>
            <button onClick={() => go("events")} style={{ marginTop: "1rem", backgroundColor: "#15803d", color: "white" }}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI (Adım 10) */}
        {page === "events" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Tüm Etkinlikler</h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap", background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
              <div style={{ flex: "1" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Etkinlik ara</label>
                <input 
                  type="search" 
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="Örn. atölye, kariyer" 
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ minWidth: "200px" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Kategori</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                  style={{ width: "100%", padding: "0.5rem" }}
                >
                  <option value="">Tümü</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <p style={{ marginBottom: "1rem", color: "#64748b" }}>
              {filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : "Bulunamadı."}
            </p>
            <div className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI (Adım 12) */}
        {page === "detail" && (
          <section>
            {!selected && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>Etkinlik bulunamadı.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            )}
            {selected && (
              <article style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {selected.image && (
                  <figure style={{ flex: "1", minWidth: "300px", margin: 0 }}>
                    <img src={selected.image} alt={`${selected.title} afişi`} style={{ width: "100%", borderRadius: "8px" }} />
                  </figure>
                )}
                <div style={{ flex: "1", minWidth: "300px", background: "#f8fafc", padding: "2rem", borderRadius: "8px" }}>
                  <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>{selected.title}</h2>
                  <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                    <p><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
                    <p><strong>Yer:</strong> {selected.location}</p>
                    <p><strong>Kategori:</strong> {selected.category}</p>
                    <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                    <p><strong>Açıklama:</strong> {selected.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => go("events")}>&larr; Listeye dön</button>
                    <button onClick={() => go("update", selected.id)} style={{ backgroundColor: "#15803d", color: "white" }}>
                      Bu etkinliği güncelle
                    </button>
                  </div>
                </div>
              </article>
            )}
          </section>
        )}

        {/* EKLE VE GÜNCELLE FORMU (Adım 13) */}
        {(page === "add" || page === "update") && (
          <section style={{ maxWidth: "600px" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p style={{ marginBottom: "1.5rem", color: "#64748b" }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: "1rem" }}>
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
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>
        <p>Ahmet Turhan Ertuğrul · 2416501029</p>
      </footer>
    </>
  );
}

export default App;