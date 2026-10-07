import { events } from "./data.js";

const container = document.querySelector("#detay");
// Adres çubuğundaki id'yi yakala
const id = new URLSearchParams(location.search).get("id");
// Bu id'ye sahip etkinliği bul
const event = events.find((e) => e.id === id);

if (!event) {
  container.innerHTML = `
    <div style="border: 2px solid #e11d48; padding: 1rem; border-radius: 8px; color: #e11d48; text-align: center;">
      <h3>Etkinlik bulunamadı</h3>
      <p>"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
    </div>
    <p style="margin-top: 1rem; text-align:center;"><a href="etkinlikler.html">Listeye dön</a></p>
  `;
} else {
  const tarih = new Date(event.date).toLocaleDateString("tr-TR");
  document.title = event.title; // Sekme adını güncelle
  
  container.innerHTML = `
    <figure>
  <img src="afis.jpeg" alt="${event.title} afişi" style="max-width: 100%; height: auto; border-radius: 8px;">
  <figcaption>Şekil 1: ${event.title} afişi</figcaption>
</figure>

    <div>
      <dl>
        <dt>Tarih</dt>
        <dd><time datetime="${event.date}T${event.time}">${tarih}, ${event.time}</time></dd>

        <dt>Yer</dt>
        <dd>${event.location}</dd>

        <dt>Kategori</dt>
        <dd>${event.category}</dd>

        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
      
      <div style="margin-top: 1rem;">
          <h4>Açıklama</h4>
          <p>${event.description}</p>
      </div>
      <p style="margin-top: 1rem;">
          <a href="etkinlikler.html" style="margin-right: 1rem;">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" style="color: white; background: #2563eb; padding: 5px 10px; border-radius:4px; text-decoration:none;">Bu etkinliği güncelle</a>
      </p>
    </div>
  `;
}