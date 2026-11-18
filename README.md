# Kampüs Etkinlikleri - Sprint 8 (Fullstack: Frontend & Backend)

## Proje Yapısı
- **`frontend/`**: React + Vite + TypeScript ile geliştirilmiş kullanıcı arayüzü.
  - Canlı Vercel Adresi: https://ahmetturhanertugrul-frontend.vercel.app/
- **`backend/`**: Node.js + Express + Mongoose + MongoDB REST API servisi (`http://localhost:3000`).

---

## Kurulum ve Çalıştırma

### 1. Backend (REST API)
```bash
cd backend
npm install
npm run seed   # Veritabanını 6 örnek etkinlik ile sıfırlayıp doldurur
npm run dev    # Sunucuyu izleme modunda başlatır
```
Sunucu `http://localhost:3000` adresinde dinlemeye başlar.

### 2. Frontend (Kullanıcı Arayüzü)
```bash
cd frontend
npm install
npm run dev
```

---

## Backend REST API Özeti (Sprint 8: MongoDB & Mongoose)
- `GET /health` ➔ Sağlık kontrolü (Öğrenci No: `2416501029`)
- `GET /events` ➔ MongoDB'deki etkinlik listesi (tarihe göre sıralı, `?category=` destekli)
- `GET /events/:id` ➔ Tekil etkinlik detayı (Geçersiz veya bulunamayan id için 404 Not Found)
- `POST /events` ➔ Yeni etkinlik kaydı (Schema doğrulaması ile tam kayıtta 201 Created, eksik veride 400 Bad Request)
- `npm run seed` ➔ Veritabanını sıfırlayıp 6 benzersiz örnek etkinlik ekler

Postman istek koleksiyonu: `backend/requests/kampus-api.json`

---

## Öğrenci Bilgileri
- **Ad Soyad:** Ahmet Turhan Ertuğrul
- **Öğrenci No:** 2416501029
