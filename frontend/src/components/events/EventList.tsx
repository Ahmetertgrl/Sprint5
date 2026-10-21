import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

export default function EventList({ events, onShowDetail, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  if (events.length === 0) {
    return <p style={{ marginBottom: "1rem", color: "#64748b" }}>{emptyText}</p>;
  }

  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </div>
  );
}