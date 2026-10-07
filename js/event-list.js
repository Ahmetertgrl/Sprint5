import { events } from "./data.js";

const listContainer = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaKutusu = document.querySelector("#arama");
const kategoriSecimi = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Kart şablonunu oluşturan fonksiyon
function createCard(event) {
  // Tarihi Türkçe formatta göstermek için (GG.AA.YYYY)
  const tarih = new Date(event.date).toLocaleDateString("tr-TR");
  
  return `
    <article class="card">
      <h3>${event.title}</h3>
      <p>${event.category} · ${tarih} · ${event.location}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>
  `;
}

// Veriyi ekrana basan ana fonksiyon
function render(dizi) {
  listContainer.innerHTML = dizi.map(createCard).join("");
  
  // Eğer sonuç satırı sayfada varsa sayıyı yazdır
  if (sonucSatiri) {
    if (dizi.length === 0) {
        sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
        sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
  }
}

// Eğer ana sayfadaysak ve data-limit=2 ise
if (listContainer.dataset.limit) {
  // Diziyi kopyala ve tarihe göre yakın olanları sırala
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(listContainer.dataset.limit));
  render(yaklasan);
} else {
  // Filtreleme ekranındaysak
  
  // Kategorileri data'dan dinamik çek ve select box'a ekle
  if(kategoriSecimi) {
      const kategoriler = [...new Set(events.map(e => e.category))];
      kategoriler.forEach(kategori => {
          kategoriSecimi.innerHTML += `<option value="${kategori}">${kategori}</option>`;
      });

      // Filtreleme fonksiyonu
      function filtrele() {
        const aranan = aramaKutusu.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriSecimi.value;

        const sonuc = events.filter(e => {
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
            return metinUyuyor && kategoriUyuyor;
        });

        render(sonuc);
      }

      aramaKutusu.addEventListener("input", filtrele);
      kategoriSecimi.addEventListener("change", filtrele);
      filtreFormu.addEventListener("submit", (e) => e.preventDefault()); // Enter'a basınca sayfa yenilenmesin
  }
  render(events); // Sayfa ilk açıldığında tümünü göster
}