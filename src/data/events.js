const kinaAddress = 'Riva Balo Nikah Salonu, Acity AVM, Fatih Sultan Mehmet Bulvarı, Yenimahalle/Ankara';
const dugunAddress = 'Asfor Düğün Salonu, Yunus Emre Mahallesi, Kayıkçı Sokak No:8, Pursaklar/Ankara';

export const EVENTS = [
  {
    key: 'kina',
    title: 'Kına Gecesi',
    date: '27 Ağustos',
    weekday: 'Perşembe',
    time: '19:00',
    venue: 'Riva Balo Nikah Salonu',
    address: 'Acity AVM, Fatih Sultan Mehmet Bulvarı Kat:2, Yenimahalle/Ankara',
    mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kinaAddress)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(kinaAddress)}&output=embed`,
  },
  {
    key: 'dugun',
    title: 'Düğün Töreni',
    date: '29 Ağustos',
    weekday: 'Cumartesi',
    time: '13:00',
    venue: 'Asfor Düğün Salonu',
    address: 'Yunus Emre Mah. Kayıkçı Sk. No:8 (Protokol Yolu Üzeri), Pursaklar/Ankara',
    mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dugunAddress)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(dugunAddress)}&output=embed`,
  },
];
