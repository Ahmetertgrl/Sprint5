import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";
import EventDetail from "../components/events/EventDetail";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </section>
  );
}
