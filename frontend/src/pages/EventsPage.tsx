import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section>
      <h2 className="bolum-baslik" style={{ marginBottom: "1rem" }}>Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <p style={{ marginBottom: "1rem", color: "#64748b" }}>
        {filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : ""}
      </p>
      <EventList events={filtered} emptyText="Bulunamadı." />
    </section>
  );
}
