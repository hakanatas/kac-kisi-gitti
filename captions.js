/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '150 TL + kişi başı 25 TL = 650 TL', en: '150 TL + 25 TL a person = 650 TL',
      note: 'Sınıf gezisi için otobüse 150 lira, kişi başı bilete 25 lira ödendi. Toplam 650 lira. Geziye kaç kişi katıldı?' },
    { scene: 2, start: 10.8, end: 20.6, tr: 'Kişi sayısı x, biletler 25x', en: 'x people, tickets 25x',
      note: 'Nicelikleri belirleyelim: kişi sayısına x diyelim. Biletler 25x lira, toplam 150 artı 25x. Şerit modelde 150 ve 25x birlikte 650 ediyor.' },
    { scene: 2, start: 21.0, end: 27.8, tr: '150 + 25x = 650', en: '150 + 25x = 650',
      note: 'Denklem: 150 artı 25x eşittir 650.' },
    { scene: 3, start: 28.6, end: 35.8, tr: 'Önce bölmek? −124 kişi olamaz', en: 'Divide first? −124 people makes no sense',
      note: 'Bir strateji deneyelim: önce 650’yi 25’e bölelim, 26; sonra 150’yi çıkaralım: eksi 124. Kişi sayısı negatif olamaz. Bu strateji çözüme götürmedi; değiştirelim.' },
    { scene: 3, start: 36.2, end: 45.8, tr: '25x = 500, x = 20', en: '25x = 500, x = 20',
      note: 'Denge stratejisi: eşitliğin iki tarafından 150 çıkaralım: 25x eşittir 500. İki tarafı 25’e bölelim: x eşittir 20. Geziye 20 kişi katıldı.' },
    { scene: 4, start: 46.6, end: 56.6, tr: 'Kontrol: 150 + 500 = 650', en: 'Check: 150 + 500 = 650',
      note: 'Kontrol edelim: 150 artı 25 çarpı 20, 650. Başka stratejiler de var: ters işlemle 650’den 150 çıkar, 25’e böl; ya da bir tablo yap. Hepsi 20 buluyor.' },
    { scene: 4, start: 57.0, end: 63.8, tr: 'x = (toplam − sabit) ÷ fiyat', en: 'x = (total − fixed) ÷ price',
      note: 'Genelleme: sabit ücretli bu tür problemlerde x, toplamdan sabiti çıkarıp birim fiyata bölerek bulunur.' },
    { scene: 5, start: 64.6, end: 74.6, tr: '150 + 25x ≤ 800, x ≤ 26', en: '150 + 25x ≤ 800, x ≤ 26',
      note: 'Bütçe en fazla 800 lira olsaydı? 150 artı 25x, 800’den küçük ya da eşit. 25x en fazla 650, x en fazla 26. 0’dan 26’ya kadar her kişi sayısı olur; 27 kişi 825 lira tutar.' },
    { scene: 5, start: 75.0, end: 79.8, tr: '660 TL olsaydı: 20,4 kişi?', en: 'With 660 TL: 20.4 people?',
      note: 'Toplam 660 lira olsaydı x 20,4 çıkardı. Kişi sayısı böyle olamaz: genellemenin sonucunu bağlamda kontrol etmeliyiz.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Kur, çöz, kontrol et', en: 'Set up, solve, check',
      note: 'Aklında kalsın: nicelikleri belirle, denklemi kur, iki tarafa aynı işlemi uygula, kontrol et; gerekirse stratejiyi değiştir.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Çözüm anlamlı mı? Bak!', en: 'Does the answer make sense?',
      note: 'Çözümün bağlamda anlamlı olup olmadığına bak!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
