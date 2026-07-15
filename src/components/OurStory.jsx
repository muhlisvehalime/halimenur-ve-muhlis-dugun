import { FlowerCornerA, FlowerCornerB } from './CornerFlowers';

export function OurStory() {
  return (
    <section style={{ padding: '120px 24px', background: '#faf6ef', position: 'relative', overflow: 'hidden' }}>
      <FlowerCornerB
        style={{ position: 'absolute', top: -20, right: -40, width: 280, opacity: 1, pointerEvents: 'none', transform: 'scaleX(-1)' }}
      />
      <FlowerCornerA
        style={{ position: 'absolute', bottom: -30, left: -30, width: 260, opacity: 1, pointerEvents: 'none' }}
      />
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a24b', marginBottom: 18 }}>
          Bizim Hikayemiz
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(19px,2.4vw,24px)', lineHeight: 1.85, color: '#5c4a3a' }}>
          Tevafuklarla başlayan hikayemiz, hayatımızın en güzel sayfasına dönüşüyor. Ailelerimizin ve
          sevdiklerimizin desteğiyle, birbirimize verdiğimiz sözü sizlerin huzurunda tazelemek istiyoruz. Bu
          yolculukta yanımızda olan herkese şimdiden teşekkür ederiz.
        </p>
        <div style={{ width: 80, height: 1, background: '#c9a24b', margin: '36px auto', opacity: 0.5 }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap', fontFamily: "'Cormorant Garamond',serif", color: '#6b5d4c' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, color: '#5c6b4f', marginBottom: 4 }}>
              Ayşe Nur &amp; Zafer Evis
            </div>
            <div style={{ fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: '#a08b6f' }}>Gelin Tarafı</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, color: '#5c6b4f', marginBottom: 4 }}>
              Müzeyyen &amp; Ahmet Yıldız
            </div>
            <div style={{ fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: '#a08b6f' }}>Damat Tarafı</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
