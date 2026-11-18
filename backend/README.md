# Kampüs Etkinlikleri - Backend (Sprint 8: Kalıcı Veri - MongoDB & Mongoose)

Express ve Mongoose ile geliştirilmiş, MongoDB veritabanı destekli REST API sunucusu.

## Çalıştırma Komutları

Geliştirme ortamında çalıştırmak için:
```bash
npm install
npm run seed   # Veritabanını 6 örnek etkinlik ile sıfırlayıp doldurur
npm run dev    # Sunucuyu izleme modunda başlatır
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

Canlı modda çalıştırmak için:
```bash
npm start
```

## Ortam Değişkenleri (Environment Variables)

Sunucu yapılandırması `.env` dosyasından okunur:
- `PORT`: Dinlenecek port numarası (Varsayılan: `3000`)
- `MONGODB_URI`: MongoDB bağlantı adresi (Atlas veya yerel veritabanı)

Örnek `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

> **Önemli:** Gerçek MongoDB bağlantı adresi ve kullanıcı bilgileri asla versiyon kontrol sistemine (git) commit edilmez. Yalnızca yerel `.env` dosyasında saklanır.

## Veri Modeli (Event Schema)

Mongoose Schema alanları ve kısıtları:
- `title`: String, zorunlu (`required`), baş/son boşlukları silinir (`trim`), min 3, max 100 karakter.
- `category`: String, zorunlu (`required`), enum: `["Seminer", "Atölye", "Söyleşi", "Yarışma"]`.
- `capacity`: Number, min 0, varsayılan 0.
- `date`: String, zorunlu (`required`).
- `time`: String, varsayılan `""`.
- `location`: String, `trim`, varsayılan `""`.
- `description`: String, `trim`, max 500 karakter, varsayılan `""`.
- `timestamps`: `true` (`createdAt` ve `updatedAt` otomatik üretilir).

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu sağlık kontrolü (`student: "2416501029"`) | 200 | — | Tamamlandı |
| GET | `/events` | Etkinlik listesi (İsteğe bağlı `?category=` filtresi, tarihe göre sıralı) | 200 | 500 | Tamamlandı |
| GET | `/events/:id` | Belirli bir etkinliğin detayı (Geçersiz veya bulunamayan id: 404) | 200 | 404, 500 | Tamamlandı |
| POST | `/events` | Yeni etkinlik oluşturma (Schema doğrulama hatası: 400) | 201 | 400, 500 | Tamamlandı |
| PATCH | `/events/:id` | Etkinliği güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Etkinliği sil | 204 | 404 | Sprint 9 |

### Durum Kodları (Status Codes)
- **200 OK:** İstek başarılı tamamlandı.
- **201 Created:** Yeni kayıt oluşturuldu.
- **400 Bad Request:** Mongoose doğrulama hatası (`ValidationError` - zorunlu alanlar veya kısıtlar sağlanmadı).
- **404 Not Found:** Geçersiz/bulunamayan id veya eşleşmeyen rota (`Route not found` / `Event not found`).
- **500 Internal Server Error:** Sunucu içi hata (`Server error`).

### Hata Yanıt Formatı
```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

## Postman İstek Koleksiyonu
Postman koleksiyonu `backend/requests/kampus-api.json` dosyası içerisindedir:
1. `1 Health` (GET /health) -> 200 OK
2. `2 Etkinlik listesi` (GET /events) -> 200 OK
3. `3 Tek etkinlik` (GET /events/:id) -> 200 OK
4. `4 Olmayan etkinlik (404)` (GET /events/111111) -> 404 Not Found
5. `5 Etkinlik oluştur (201)` (POST /events) -> 201 Created
6. `6 Eksik veri (400)` (POST /events) -> 400 Bad Request

## Öğrenci Bilgileri
- **Öğrenci No:** 2416501029
- **Ad Soyad:** Ahmet Turhan Ertuğrul
