import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p style={{ color: "#16a34a", fontWeight: "bold" }}>{event.category}</p>
      <p>Tarih: {formatDate(event.date, event.time)}</p>
      <p>Yer: {event.location}</p>
      {event.capacity && <p>Kontenjan: {event.capacity} kişi</p>}
      <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{event.description}</p>
      <Link to={`/events/${event.id}`} className="buton" style={{ display: "inline-block", marginTop: "1rem" }}>
        Detayları gör
      </Link>
    </article>
  );
}
