# Handoff: Halime Nur & Muhlis Erdem — Düğün Davetiyesi Web Sitesi

## Overview
Tek sayfalık, animasyonlu bir düğün davetiyesi web sitesi. Zarf açma animasyonu, geri sayım, çift hikayesi, düğün/kına detayları, Google Maps konumları ve bir RSVP (katılım) formu içerir. Site tamamen tek bir HTML dosyası olarak tasarlandı (React, inline stiller, script-tag üzerinden derlenmiş).

## About the Design Files
Bu pakette iki şey var:
- `site/index.html` — sitenin **çalışan, kendi kendine yeten (self-contained) statik bir derlemesi**. Tüm görseller/fontlar/scriptler dosyanın içine gömülü; klasörü olduğu gibi herhangi bir statik barındırma servisine (Vercel, Netlify, GitHub Pages, S3, vb.) yükleyip anında yayınlayabilirsiniz. Bu dosya doğrudan tarayıcıda açılabilir.
- `source/Dugun Davetiyesi.dc.html` + `source/assets/` — **orijinal tasarım kaynağı**. Bu, tasarım aracının kendi bileşen formatıdır (React benzeri, inline stiller, `sc-for`/`sc-if` şablon sözdizimi ile). Claude Code (veya başka bir geliştirici) buradan gerçek kodu okuyup anlayabilir, ama bu format npm/React projesi gibi doğrudan çalıştırılamaz — çalışan referans olarak `site/index.html`'i kullanın.

**Önerilen yaklaşım:** `site/index.html`'i olduğu gibi barındırıp kullanabilirsiniz (değişiklik gerekmiyorsa). Eğer bir React/Next.js projesine taşımak veya yeni özellik eklemek istiyorsanız, `source/Dugun Davetiyesi.dc.html` içindeki mantığı (state, animasyon zamanlamaları, stil değerleri) referans alarak gerçek bir React bileşenine dönüştürün — kodu kelimesi kelimesine kopyalamak yerine.

## Fidelity
**High-fidelity.** Bu, son haliyle yayınlanabilecek bir tasarımdır — renkler, tipografi, boşluklar ve etkileşimler nihai. Piksel piksel aynısını üretmeye çalışın.

## Screens / Views
Tek sayfalık bir site, yukarıdan aşağı akan bölümler:

1. **Zarf Açılış Ekranı (Envelope Overlay)** — Sayfa yüklendiğinde tam ekran kaplayan bir overlay. Ortada kapalı bir zarf (360×250px), üzerinde H&M çiçek çelengi (wreath) rozeti ve bir mühür (seal) görseli var. Tıklanınca:
   - Zarf hafifçe yukarı kalkıp döner (`lifting` state, ~450ms)
   - Mühür döner/uçar, kapak (flap) 3D `rotateX` ile yukarı açılır (~1.5s, cubic-bezier ease)
   - Zarfın içinden mektup (H&M çelengi + tarih) yukarı kayarak çıkar
   - Aynı anda ekranda çiçek şeklinde (CSS ile çizilmiş, 6 yapraklı) parçacıklar patlayarak yukarı savrulur
   - Overlay opacity ile solup ana siteyi gösterir (~1.3s fade)
   - Toplam süre: tıklamadan tam açılışa ~3.9 saniye

2. **Hero** — Çiftin isimleri (Great Vibes cursive font, burgundy #9c3159), geri sayım sayaçları (gün/saat/dakika/saniye), köşelerde watercolor çiçek görselleri (soft radial mask ile kenarları yumuşatılmış), mouse hareketine göre hafif 3D tilt efekti.

3. **Hikayemiz** — Çiftin hikayesi metni + aile isimleri (gelin/damat tarafı).

4. **Davet Detayları** — Kına ve Düğün için iki kart, hover'da 3D tilt efekti, tarih/saat/mekan bilgisi ve Google Maps linki.

5. **Konumlar** — Her etkinlik için gömülü Google Maps iframe'i.

6. **Katılım Formu (RSVP)** — Ad soyad, katılım durumu (evet/hayır toggle), kişi sayısı, hangi etkinlik, not alanı. Gönder'e basınca: yerel "teşekkürler" ekranı gösterilir VE Google Form'un gerçek linki yeni sekmede açılır (böylece asıl yanıt Google Forms'a da düşer — response'ları oradan görebilirsiniz).

7. **Footer** — İsimler + tarih, köşe çiçek dekorasyonları.

Ayrıca sağ altta sabit bir müzik aç/kapa butonu var (bkz. State Management).

## Interactions & Behavior
- **Zarf açılış zamanlaması** (bkz. `openEnvelope()` in kaynak dosya): closed → lifting (450ms) → opening (flap açılır, +1300ms) → letter (+1300ms, patlama parçacıkları tetiklenir) → reveal (+1300ms, müzik başlar) → done (+850ms, overlay tamamen kaldırılır).
- **Geri sayım**: `setInterval` ile her saniye güncellenir, hedef tarih `2026-08-29T13:00:00`.
- **Hover tilt**: mouse pozisyonuna göre `rotateX/rotateY` hesaplanan kart ve hero tilt efektleri.
- **Ambient çiçek yağmuru**: sayfa arka planında sürekli yukarıdan aşağı düşen, CSS ile çizilmiş küçük çiçekler (pembe/altın/yeşil), `@keyframes petalFall`.
- **Patlama efekti**: zarf açılırken merkezden dışa doğru fırlayan, aynı CSS çiçek şekilleri (`@keyframes burstUp`), rastgele açı/boyut/gecikme ile.
- **RSVP submit**: isim boşsa gönderilmez; doluysa yerel state `submitted=true` olur ve 400ms sonra `googleFormUrl` yeni sekmede açılır.
- **Müzik**: `musicUrl` prop'u bir YouTube linki ise gizli bir YouTube iframe (`enablejsapi=1`) postMessage komutlarıyla (`playVideo`/`pauseVideo`) kontrol edilir; düz bir ses dosyası linkiyse normal `<audio>` elementi kullanılır. Zarf tamamen açıldığında (`musicEnabled !== false` ise) otomatik çalmaya çalışır.

## State Management
Kaynaktaki `Component` sınıfının state'i:
- `envelopeStage`: 'closed' | 'lifting' | 'opening' | 'letter' | 'reveal' | 'done'
- `envelopeDone`, `opened`: boolean bayraklar
- `now`: geri sayım için canlı timestamp
- `scrollY`: parallax için
- `submitted`: RSVP gönderildi mi
- `musicOn`: müzik açık/kapalı
- `form`: { name, attending, guests, event, note }
- `tilt1`, `tilt2`, `heroTilt`: mouse tilt pozisyonları

## Design Tokens
**Renkler:**
- Burgundy (başlıklar, vurgular): `#9c3159`
- Altın/gold (kicker, çizgiler): `#c9a24b` / `#c5a34f`
- Sage yeşil (aile isimleri, ikincil vurgu): `#5c6b4f` / `#7f8f66`
- Kahverengi/taupe (gövde metni, ikincil metin): `#6b5d4c`, `#8a7355`, `#a08b6f`
- Arkaplan krem tonları: `#f7f3ec`, `#faf6ef`, `#f2ece0`
- CSS çiçek paleti (`Component.hueColors`): `['#c9718a', '#c5a34f', '#7f8f66']` (pembe, altın, sage)

**Tipografi:**
- Başlıklar (isimler): `Great Vibes`, cursive
- İkincil başlıklar / kartlar: `Playfair Display`, serif (500/600 weight, bazen italic)
- Gövde metni: `Cormorant Garamond`, serif
- Google Fonts importu: `Great+Vibes`, `Playfair+Display:ital,wght@0,500;0,600;1,500`, `Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400`

**Diğer:**
- Kart border-radius: 14–22px
- Kart gölgeleri: `0 8-24px 24-50px rgba(90,70,40,0.08-0.25)`
- Zarf boyutu: 360×250px, kapak (flap) yüksekliği 125px

## Assets
`source/assets/` klasöründe:
- `flower-corner-a.png`, `flower-corner-b.png` — watercolor çiçek köşe süslemeleri (hero, footer, story bölümlerinde, radial-gradient mask ile yumuşatılmış kenarlar)
- `hm-wreath.png` — H&M çelenk/monogram görseli (zarf ön yüzünde ve mektup içinde kullanılıyor)
- `seal.png` — zarf mühür (wax seal) görseli
- `kenar-top.png` — zarfın kapak (flap) kısmının arkaplan deseni
- CSS ile çizilmiş 6 yapraklı çiçek şekli (`Component.makeFlower()`) — ambient düşen çiçekler ve patlama efekti için, görsel dosya değil, tamamen `div` + `border-radius` ile inline stil üretilir.

## Files
- `source/Dugun Davetiyesi.dc.html` — tüm markup + React mantığı (tek dosya)
- `source/assets/` — yukarıdaki görseller
- `site/index.html` — çalışan, offline da açılabilen tam derleme (önizleme / doğrudan yayına almak için)
