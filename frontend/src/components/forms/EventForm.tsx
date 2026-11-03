import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData, EventFormErrors, Category } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const CATEGORIES: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "600px" }}>
      <div>
        <label htmlFor="title" style={{ display: "block", marginBottom: "0.25rem" }}>Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={80}
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
          placeholder="Örn: Kariyer Günleri 2026"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="category" style={{ display: "block", marginBottom: "0.25rem" }}>Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Seçiniz</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div>
        <label htmlFor="date" style={{ display: "block", marginBottom: "0.25rem" }}>Tarih</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="time" style={{ display: "block", marginBottom: "0.25rem" }}>Saat</label>
        <input
          id="time"
          name="time"
          type="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div>
        <label htmlFor="location" style={{ display: "block", marginBottom: "0.25rem" }}>Yer</label>
        <input
          id="location"
          name="location"
          type="text"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
          placeholder="Örn: A Blok Konferans Salonu"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div>
        <label htmlFor="capacity" style={{ display: "block", marginBottom: "0.25rem" }}>Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
          placeholder="Örn: 100"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div>
        <label htmlFor="description" style={{ display: "block", marginBottom: "0.25rem" }}>Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button
        type="submit"
        className="buton"
        style={{
          padding: "0.75rem",
          backgroundColor: "#15803d",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {submitText}
      </button>
    </form>
  );
}
