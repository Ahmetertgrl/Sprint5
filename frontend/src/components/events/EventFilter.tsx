import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  onCategoryChange: (category: Category | "") => void;
  categories: Category[];
}

export default function EventFilter({ searchText, onSearchChange, category, onCategoryChange, categories }: EventFilterProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap", background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
      <div style={{ flex: "1" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Etkinlik ara</label>
        <input 
          type="search" 
          value={searchText} 
          onChange={(e) => onSearchChange(e.target.value)} 
          placeholder="Örn. atölye, kariyer" 
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ minWidth: "200px" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Kategori</label>
        <select 
          value={category} 
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Tümü</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}