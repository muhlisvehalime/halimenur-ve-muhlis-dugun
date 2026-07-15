import { useCardTilt } from '../hooks/useCardTilt';
import { FlowerCornerA, FlowerCornerB } from './CornerFlowers';

function EventCard({ ev }) {
  const { tilt, onMove, onLeave } = useCardTilt();
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} style={{ flex: '1 1 380px', maxWidth: 420, perspective: 900 }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)', border: '1px solid rgba(140,115,85,0.18)',
          borderRadius: 22, padding: '44px 34px', textAlign: 'center', boxShadow: '0 24px 50px rgba(90,70,40,0.14)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a24b' }}>
          {ev.kicker}
        </div>
        <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: 48, color: '#9c3159', margin: '8px 0 18px' }}>{ev.title}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: 32, color: '#5c6b4f' }}>{ev.date}</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, letterSpacing: 1, color: '#a08b6f', margin: '4px 0 20px' }}>
          {ev.time}
        </div>
        <div style={{ width: 56, height: 1, background: '#c9a24b', margin: '0 auto 20px', opacity: 0.5 }} />
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 1.6, color: '#6b5d4c' }}>{ev.venue}</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, lineHeight: 1.6, color: '#a08b6f', marginTop: 4 }}>
          {ev.address}
        </div>
        <a
          href={ev.mapLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, padding: '10px 22px',
            border: '1px solid #8a7355', borderRadius: 30, fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
            letterSpacing: 1, color: '#5c4a3a', textDecoration: 'none',
          }}
        >
          Haritada Gör →
        </a>
      </div>
    </div>
  );
}

export function EventDetails({ events }) {
  return (
    <section style={{ padding: '120px 24px', background: '#f7f3ec', position: 'relative', overflow: 'hidden' }}>
      <FlowerCornerB
        style={{ position: 'absolute', top: -20, left: -30, width: 260, opacity: 1, pointerEvents: 'none' }}
      />
      <FlowerCornerA
        style={{ position: 'absolute', bottom: -30, right: -30, width: 280, opacity: 1, pointerEvents: 'none', transform: 'scaleX(-1)' }}
      />
      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 14, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a24b', marginBottom: 14 }}>
          Ne Zaman, Nerede
        </div>
        <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(38px,5vw,56px)', color: '#9c3159', margin: 0 }}>Davet Detayları</h2>
      </div>
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1040, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {events.map((ev) => (
          <EventCard key={ev.key} ev={ev} />
        ))}
      </div>
    </section>
  );
}

export default EventDetails;
