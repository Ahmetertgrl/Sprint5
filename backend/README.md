# Kampüs Etkinlikleri - Backend (Sprint 7)

Express ile geliştirilmiş REST API sunucusu.

## Çalıştırma Komutları

Geliştirme ortamında çalıştırmak için:
```bash
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

Canlı modda çalıştırmak için:
```bash
npm start
```

## Ortam Değişkenleri (Environment Variables)

Sunucu portu `.env` dosyasından okunur:
- `PORT`: Dinlenecek port numarası (Varsayılan: `3000`)

Örnek yapılandırma `.env.example` dosyasında mevcuttur.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu sağlık kontrolü | 200 | — | Bu sprint |
| GET | `/events` | Etkinlik listesini getir (İsteğe bağlı `?category=` filtresi) | 200 | — | Bu sprint |
| GET | `/events/:id` | Belirli bir etkinliğin detayını getir | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Etkinliği güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Etkinliği sil | 204 | 404 | Sprint 9 |

### Durum Kodları (Status Codes)
- **200 OK:** İstek başarılı tamamlandı.
- **201 Created:** Yeni kayıt oluşturuldu.
- **204 No Content:** İçerik yok (silme/güncelleme).
- **400 Bad Request:** Eksik veya geçersiz alanlar (`title`, `category`, `date` zorunludur).
- **404 Not Found:** İstenen rota veya etkinlik bulunamadı.

### Hata Yanıt Formatı
Tüm hata durumlarında API standart olarak şu JSON formatında yanıt döner:
```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

## Öğrenci Bilgileri
- **Öğrenci No:** 2416501029
- **Ad Soyad:** Ahmet Turhan Ertuğrul
