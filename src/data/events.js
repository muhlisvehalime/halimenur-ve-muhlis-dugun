const kinaAddress = 'Riva Balo Nikah Salonu Acity Mall, Macun, Fatih Sultan Mehmet Bulvarı, Yenimahalle/Ankara';
const dugunAddress = 'ASFOR & ARUS Balo Nikah Salonu, Yunus Emre, Kayıkçı Sk. no:8, 06145 Pursaklar/Ankara';

export const EVENTS = [
  {
    key: 'kina',
    title: 'Kına Gecesi',
    date: '27 Ağustos 2026 Perşembe',
    time: '19:00',
    venue: 'Riva Balo Nikah Salonu',
    address: 'Acity Mall, Macun, Fatih Sultan Mehmet Bulvarı, Yenimahalle/Ankara',
    mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kinaAddress)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(kinaAddress)}&output=embed`,
  },
  {
    key: 'dugun',
    title: 'Düğün Töreni',
    date: '29 Ağustos 2026 Cumartesi',
    time: '13:00',
    venue: 'ASFOR & ARUS Balo Nikah Salonu',
    address: 'Yunus Emre, Kayıkçı Sk. no:8, 06145 Pursaklar/Ankara',
    mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dugunAddress)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(dugunAddress)}&output=embed`,
  },
];
