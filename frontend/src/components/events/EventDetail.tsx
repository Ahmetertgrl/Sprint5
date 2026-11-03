import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}>
      {event.image && (
        <figure style={{ flex: "1", minWidth: "300px", margin: 0 }}>
          <img src={event.image} alt={`${event.title} afişi`} style={{ width: "100%", borderRadius: "8px" }} />
        </figure>
      )}
      <div style={{ flex: "1", minWidth: "300px", background: "#f8fafc", padding: "2rem", borderRadius: "8px" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Etkinlik Künyesi</h3>
        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          <p><strong>Tarih:</strong> {formatDate(event.date, event.time)}</p>
          <p><strong>Yer:</strong> {event.location}</p>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
          <p><strong>Açıklama:</strong> {event.description}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/events" className="buton" style={{ textDecoration: "none", display: "inline-block" }}>
            &larr; Listeye dön
          </Link>
          <Link
            to={`/admin/${event.id}/edit`}
            className="buton"
            style={{ textDecoration: "none", display: "inline-block", backgroundColor: "#15803d", color: "white" }}
          >
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}
