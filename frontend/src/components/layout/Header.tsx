import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

interface HeaderProps {
  title?: string;
  text?: string;
}

export default function Header(props: HeaderProps) {
  const location = useLocation();
  const { events } = useEvents();
  const pathname = location.pathname;

  let computedTitle = "Kampüs Etkinlikleri";
  let computedText: string | undefined = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (pathname === "/") {
    computedTitle = "Kampüs Etkinlikleri";
    computedText = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (pathname === "/events") {
    computedTitle = "Tüm Etkinlikler";
    computedText = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (pathname.startsWith("/events/")) {
    const eventId = pathname.replace("/events/", "");
    const event = findEventById(events, eventId);
    computedTitle = event ? event.title : "Etkinlik Detayı";
    computedText = undefined;
  } else if (pathname === "/admin") {
    computedTitle = "Etkinlik Yönetimi";
    computedText = "Etkinlikleri listeleyin, düzenleyin veya silin.";
  } else if (pathname === "/admin/new") {
    computedTitle = "Etkinlik Ekle";
    computedText = "Yeni bir kampüs etkinliği ekleyin.";
  } else if (pathname.startsWith("/admin/") && pathname.endsWith("/edit")) {
    const eventId = pathname.replace("/admin/", "").replace("/edit", "");
    const event = findEventById(events, eventId);
    computedTitle = "Etkinlik Güncelle";
    computedText = event ? `"${event.title}" etkinliğini güncelleyin.` : undefined;
  } else if (pathname === "/login") {
    computedTitle = "Giriş Yap";
    computedText = "Hesabınıza giriş yapın.";
  } else if (pathname === "/register") {
    computedTitle = "Kayıt Ol";
    computedText = "Yeni bir hesap oluşturun.";
  } else if (pathname === "/forgot-password") {
    computedTitle = "Şifremi Unuttum";
    computedText = "Kayıtlı e-posta adresinize şifre yenileme bağlantısı gönderin.";
  } else {
    computedTitle = "Sayfa bulunamadı";
    computedText = "Aradığınız sayfa ya da etkinlik yok.";
  }

  const finalTitle = props.title ?? computedTitle;
  const finalText = props.text !== undefined ? props.text : computedText;

  useEffect(() => {
    let docTitle = "Kampüs Etkinlikleri";
    if (finalTitle && finalTitle !== "Kampüs Etkinlikleri") {
      docTitle = `Kampüs Etkinlikleri - ${finalTitle}`;
    }
    document.title = docTitle;
  }, [finalTitle]);

  return (
    <header className="site-baslik">
      <h1>{finalTitle}</h1>
      {finalText && <p>{finalText}</p>}
    </header>
  );
}
