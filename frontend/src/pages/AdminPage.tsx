import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik" style={{ marginBottom: "1rem" }}>Etkinlik Yönetimi</h2>

      <div style={{ marginBottom: "1rem" }}>
        <Link
          to="/admin/new"
          className="buton"
          style={{
            display: "inline-block",
            backgroundColor: "#15803d",
            color: "white",
            textDecoration: "none",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p style={{ color: "#64748b" }}>Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{event.date}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler" className="islemler">
                  <Link
                    to={`/admin/${event.id}/edit`}
                    className="buton"
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#15803d",
                      color: "white",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "4px",
                    }}
                  >
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton buton-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                    style={{
                      cursor: "pointer",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "4px",
                    }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
