import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map(e => e.category))];

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "detail" && selected) {
      title = `Kampüs Etkinlikleri - ${selected.title}`;
    }
    document.title = title;
  }, [page, selected]);

  return (
    <>
      <Header 
        title="Kampüs Etkinlikleri" 
        text={page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." : undefined} 
      />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <button onClick={() => go("events")} style={{ marginTop: "1rem", backgroundColor: "#15803d", color: "white" }}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {page === "events" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Tüm Etkinlikler</h2>
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
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="Bulunamadı." />
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>Etkinlik bulunamadı.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            )}
            {selected && (
              <EventDetail
                event={selected}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            title={page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            categories={categories}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;