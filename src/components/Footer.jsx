import { FlowerCornerA } from './CornerFlowers';

export function Footer() {
  return (
    <footer style={{ padding: '64px 20px 50px', textAlign: 'center', background: '#f2ece0', position: 'relative', overflow: 'hidden' }}>
      <FlowerCornerA
        style={{ position: 'absolute', bottom: -30, left: -30, width: 240, maxWidth: '26vw', opacity: 1, pointerEvents: 'none' }}
      />
      <FlowerCornerA
        style={{ position: 'absolute', bottom: -30, right: -30, width: 240, maxWidth: '26vw', opacity: 1, pointerEvents: 'none', transform: 'scaleX(-1)' }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: 32, color: '#9c3159', marginBottom: 10 }}>
          Halime Nur &amp; Muhlis Erdem
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, letterSpacing: 2, color: '#a08b6f' }}>
          Sevgiyle bekliyoruz · 2026
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, letterSpacing: 1, color: '#c2b39c', marginTop: 28 }}>
          Developed by Muhlis Erdem Yıldız
        </div>
      </div>
    </footer>
  );
}

export default Footer;
