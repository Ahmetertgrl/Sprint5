import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {event.image && (
        <figure style={{ flex: "1", minWidth: "300px", margin: 0 }}>
          <img src={event.image} alt={`${event.title} afişi`} style={{ width: "100%", borderRadius: "8px" }} />
        </figure>
      )}
      <div style={{ flex: "1", minWidth: "300px", background: "#f8fafc", padding: "2rem", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>{event.title}</h2>
        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          <p><strong>Tarih:</strong> {formatDate(event.date, event.time)}</p>
          <p><strong>Yer:</strong> {event.location}</p>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
          <p><strong>Açıklama:</strong> {event.description}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={onBack}>&larr; Listeye dön</button>
          <button onClick={() => onEdit(event.id)} style={{ backgroundColor: "#15803d", color: "white" }}>
            Bu etkinliği güncelle
          </button>
        </div>
      </div>
    </article>
  );
}