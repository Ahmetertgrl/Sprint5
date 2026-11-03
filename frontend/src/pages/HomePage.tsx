import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik" style={{ marginBottom: "1rem" }}>Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <Link
        className="buton"
        to="/events"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          backgroundColor: "#15803d",
          color: "white",
          textDecoration: "none",
        }}
      >
        Tüm etkinlikleri gör
      </Link>
    </section>
  );
}
