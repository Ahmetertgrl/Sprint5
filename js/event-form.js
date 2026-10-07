const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

// Hata mesajlarını temizleyen yardımcı fonksiyon
function hataTemizle() {
    const errorSpans = document.querySelectorAll(".hata-mesaji");
    errorSpans.forEach(span => span.textContent = "");
    
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => input.removeAttribute("aria-invalid"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Sayfanın yenilenmesini durdur
  hataTemizle();
  
  const fd = new FormData(form);
  
  // Form verisini nesneye çevir
  const data = {
    id: "event-7", // Geçici ID
    title: fd.get("etkinlik_adi").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"), // HTML'de saat alanı eklenmeli
    location: fd.get("yer"), // HTML'de yer alanı eklenmeli
    capacity: fd.get("kontenjan") || null,
    description: fd.get("aciklama").trim()
  };

  const errors = {};

  // Kuralları kontrol et
  if (data.title.length < 3) errors.etkinlik_adi = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (data.capacity && (data.capacity < 1 || data.capacity > 1000)) errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";

  // Eğer hata varsa
  if (Object.keys(errors).length > 0) {
      for (const [key, value] of Object.entries(errors)) {
          const errorSpan = document.getElementById(`${key}-hata`);
          const inputField = document.getElementById(key === "etkinlik_adi" ? "etkinlik-adi" : key); // ID eşleşmesine dikkat
          
          if(errorSpan) errorSpan.textContent = value;
          if(inputField) inputField.setAttribute("aria-invalid", "true");
      }
      mesajKutusu.innerHTML = `<div style="color: #e11d48; margin-top: 1rem;">Formda hatalı alanlar var. Lütfen düzeltin.</div>`;
      return;
  }

  // Her şey doğruysa başarılı mesajını ve JSON verisini göster
  mesajKutusu.innerHTML = `
    <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
      <p style="color: #10b981; font-weight: bold; margin-bottom: 0.5rem;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
      <pre style="margin: 0; font-size: 0.85rem; color: #047857;">${JSON.stringify(data, null, 2)}</pre>
    </div>
  `;
});