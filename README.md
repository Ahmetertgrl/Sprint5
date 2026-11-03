# Kampüs Etkinlikleri - Sprint 6 ve Vize Teslimi

## Canlı Vercel Adresi
- **Canlı Adres:** https://ahmetturhanertugrul-frontend.vercel.app/

## Kurulum ve Çalıştırma
```bash
cd frontend
npm install
npm run dev
```

Derleme (Build):
```bash
npm run build
```

## Route Listesi (10 Adres / 10 Sayfa)
| Adres | Sayfa Bileşeni | Açıklama |
|---|---|---|
| `/` | `HomePage` | Yaklaşan 2 etkinlik ve yönlendirme |
| `/events` | `EventsPage` | Arama ve kategori filtrelemeli tüm etkinlikler |
| `/events/:id` | `EventDetailPage` | Seçili etkinliğin afiş ve detay künyesi |
| `/login` | `LoginPage` | Doğrulamalı giriş yapma sayfası |
| `/register` | `RegisterPage` | Doğrulamalı kayıt olma sayfası |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantısı gönderme |
| `/admin` | `AdminPage` | Etkinlik tablosu, silme (onaylı) ve düzenleme |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Etkinlik bilgilerini güncelleme formu |
| `*` | `NotFoundPage` | 404 Sayfa bulunamadı |

## Öğrenci Bilgileri
- **Ad Soyad:** Ahmet Turhan Ertuğrul
- **Öğrenci No:** 2416501029
