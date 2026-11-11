# Kampüs Etkinlikleri - Sprint 7 (Fullstack: Frontend & Backend)

## Proje Yapısı
- **`frontend/`**: React + Vite + TypeScript ile geliştirilmiş kullanıcı arayüzü.
  - Canlı Vercel Adresi: https://ahmetturhanertugrul-frontend.vercel.app/
- **`backend/`**: Node.js + Express ile geliştirilmiş REST API servisi (`http://localhost:3000`).

---

## Kurulum ve Çalıştırma

### 1. Backend (REST API)
```bash
cd backend
npm install
npm run dev
```
Sunucu `http://localhost:3000` adresinde dinlemeye başlar.

### 2. Frontend (Kullanıcı Arayüzü)
```bash
cd frontend
npm install
npm run dev
```

---

## Backend REST API Özeti (Sprint 7)
- `GET /health` ➔ Sağlık kontrolü (Öğrenci No: `2416501029`)
- `GET /events` ➔ Etkinlik listesi
- `GET /events/:id` ➔ Tekil etkinlik detayı (Bulunamazsa 404)
- `POST /events` ➔ Yeni etkinlik kaydı (Eksik alanda 400, başarılı 201)

Postman istek koleksiyonu: `backend/requests/kampus-api.json`

---

## Öğrenci Bilgileri
- **Ad Soyad:** Ahmet Turhan Ertuğrul
- **Öğrenci No:** 2416501029
