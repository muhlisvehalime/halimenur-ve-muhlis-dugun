import { useState } from 'react';
import { GOOGLE_FORM_ACTION_URL, GOOGLE_FORM_ENTRIES, ATTENDING_LABELS } from '../data/config';
import { FlowerCornerA } from './CornerFlowers';

const labelStyle = { display: 'block', fontFamily: "'Cormorant Garamond',serif", fontSize: 15, letterSpacing: 1, color: '#5c4a3a', marginBottom: 8 };
const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(140,115,85,0.3)', fontFamily: "'Cormorant Garamond',serif", fontSize: 17, background: '#fff', marginBottom: 22, outline: 'none' };
const attendBtnStyle = (active, activeColor) => ({
  flex: 1, padding: '12px 8px', borderRadius: 10, cursor: 'pointer',
  border: active ? `1px solid ${activeColor}` : '1px solid rgba(140,115,85,0.3)',
  background: active ? activeColor : '#fff',
  color: active ? '#fff' : '#5c4a3a',
  fontFamily: "'Cormorant Garamond',serif", fontSize: 15, transition: 'all 0.2s',
});

export function RSVPForm() {
  const [form, setForm] = useState({ name: '', attending: true, guests: 2, event: 'Sadece Düğün (29 Ağustos)', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || submitting) return;
    setSubmitting(true);
    setError(false);

    const params = new URLSearchParams();
    params.append(GOOGLE_FORM_ENTRIES.name, form.name);
    params.append(GOOGLE_FORM_ENTRIES.attending, form.attending ? ATTENDING_LABELS.yes : ATTENDING_LABELS.no);
    if (form.attending) {
      params.append(GOOGLE_FORM_ENTRIES.guests, String(form.guests));
      params.append(GOOGLE_FORM_ENTRIES.event, form.event);
    }
    params.append(GOOGLE_FORM_ENTRIES.note, form.note);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body: params });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '120px 24px', background: '#f7f3ec', position: 'relative', overflow: 'hidden' }}>
      <FlowerCornerA
        style={{ position: 'absolute', top: -30, left: -30, width: 240, maxWidth: '30vw', opacity: 1, pointerEvents: 'none' }}
      />
      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(38px,5vw,56px)', color: '#9c3159', margin: '0 0 14px' }}>Katılım    Formu</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#6b5d4c' }}>Lütfen 20 Ağustos'a kadar bize haber verin.</p>
        </div>

        {!submitted && (
          <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(140,115,85,0.18)', borderRadius: 22, padding: 36, boxShadow: '0 20px 50px rgba(90,70,40,0.1)' }}>
            <label style={labelStyle}>Ad Soyad</label>
            <input value={form.name} onChange={update('name')} placeholder="Adınız Soyadınız" style={inputStyle} />

            <label style={labelStyle}>Katılım Durumu</label>
            <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
              <button onClick={() => setForm((f) => ({ ...f, attending: true }))} style={attendBtnStyle(form.attending, '#5c6b4f')}>
                Seve Seve Geliyoruz
              </button>
              <button onClick={() => setForm((f) => ({ ...f, attending: false }))} style={attendBtnStyle(!form.attending, '#8a3a5e')}>
                Ne Yazık ki Gelemiyoruz
              </button>
            </div>

            {form.attending && (
              <>
                <label style={labelStyle}>Kaç Kişi</label>
                <input type="number" min="1" value={form.guests} onChange={update('guests')} style={inputStyle} />

                <label style={labelStyle}>Hangi Etkinliğe</label>
                <select value={form.event} onChange={update('event')} style={inputStyle}>
                  <option value="Sadece Düğün (29 Ağustos)">Sadece Düğün (29 Ağustos)</option>
                  <option value="Sadece Kına (27 Ağustos)">Sadece Kına (27 Ağustos)</option>
                  <option value="Her İkisi">Her İkisi</option>
                </select>
              </>
            )}

            <label style={labelStyle}>Not (opsiyonel)</label>
            <textarea
              value={form.note}
              onChange={update('note')}
              placeholder="Bize iletmek istediğiniz bir şey var mı?"
              rows={3}
              style={{ ...inputStyle, fontSize: 16, marginBottom: 26, resize: 'vertical' }}
            />

            <button
              onClick={submit}
              disabled={submitting}
              style={{
                width: '100%', padding: 15, border: 'none', borderRadius: 12,
                background: 'linear-gradient(90deg,#8a7355,#5c6b4f,#8a7355)', backgroundSize: '200% auto',
                animation: 'shimmer 5s linear infinite', color: '#fff', fontFamily: "'Playfair Display',serif",
                fontSize: 17, fontWeight: 600, letterSpacing: 1, cursor: submitting ? 'default' : 'pointer',
                boxShadow: '0 10px 26px rgba(90,70,40,0.25)', opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>

            {error && (
              <p style={{ textAlign: 'center', marginTop: 14, fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: '#8a3a5e' }}>
                Gönderilemedi, lütfen internet bağlantınızı kontrol edip tekrar deneyin.
              </p>
            )}
          </div>
        )}

        {submitted && (
          <div style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(140,115,85,0.18)', borderRadius: 22, padding: '52px 36px', textAlign: 'center', boxShadow: '0 20px 50px rgba(90,70,40,0.1)' }}>
            <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: 42, color: '#9c3159', marginBottom: 12 }}>Teşekkürler {form.name}!</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#6b5d4c', lineHeight: 1.7 }}>
              Yanıtınız alındı. O günü sizinle paylaşmak için sabırsızlanıyoruz.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RSVPForm;
