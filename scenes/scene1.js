/* SAHNE 1 — GEZİ (0–10 s)  Otobüs 150 TL + kişi başı 25 TL = 650 TL.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  /** rows of working at P; each [t0, t1, i, items, hot, tick, cross] */
  function rows(ctx, P, list, t, s, W) {
    const f = F();
    list.forEach(([t0, t1, i, items, hot, tick, cross]) => {
      const k = win(t, t0, t1); if (k <= 0) return;
      const y = P.y0 + i * P.dy;
      f.expr(ctx, items, P.x, y, s * 0.86, { alpha: k, halo: true, color: hot ? A.amber : undefined, w: W });
      if (tick) f.tick(ctx, P.x + tick, y - 6, seg(t, t0 + 0.4, t0 + 1.0), k);
      if (cross) f.crossInk(ctx, P.x + cross, y, 18, seg(t, t0 + 0.4, t0 + 1.2), k);
    });
  }

  /** the bar model: [150][25x], total above; cut: split 25x into 20 pieces; drop: fade the 150 */
  function barModel(ctx, B, a, s, t, cut, drop) {
    if (a <= 0) return;
    const f = F(), W = B.x1 - B.x0, xm = B.x0 + W * 150 / 650, y0 = B.y - B.h / 2, y1 = B.y + B.h / 2;
    const a0 = a * (1 - 0.8 * drop);
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.12 * a0})`; ctx.fillRect(B.x0, y0, xm - B.x0, B.h);
    Ink.path(ctx, [[B.x0, y0], [xm, y0], [xm, y1], [B.x0, y1], [B.x0, y0]], { w: 3.5, alpha: a0, seed: 9400, taper: [0, 0] });
    f.T(ctx, '150', (B.x0 + xm) / 2, B.y, { size: s * 0.8, alpha: a0 });
    ctx.fillStyle = amber(0.5 * a); ctx.fillRect(xm, y0, B.x1 - xm, B.h);
    Ink.path(ctx, [[xm, y0], [B.x1, y0], [B.x1, y1], [xm, y1]], { w: 3.5, alpha: a, seed: 9401, taper: [0, 0], color: LI.AMBER_RGB });
    if (cut > 0) for (let i = 1; i < 20; i++) { const x = lerp(xm, B.x1, i / 20); Ink.path(ctx, [[x, y0], [x, y1]], { w: 2, alpha: a * seg(cut, (i - 1) / 19 * 0.8, (i - 1) / 19 * 0.8 + 0.2), seed: 9410 + i, taper: [0, 0] }); }
    else f.T(ctx, '25x', (xm + B.x1) / 2, B.y, { size: s * 0.8, alpha: a });
    const lab = drop > 0.5 ? '500' : '650 TL', l0 = drop > 0.5 ? xm : B.x0;
    Ink.path(ctx, [[l0, y0 - 14], [l0, y0 - 28], [B.x1, y0 - 28], [B.x1, y0 - 14]], { w: 3, alpha: a, seed: 9402, taper: [0, 0] });
    f.T(ctx, lab, (l0 + B.x1) / 2, y0 - 56, { size: s * 0.8, alpha: a, halo: true, color: A.amber });
  }
  /** a number line 0–30 with the solutions 0…26 */
  function sols(ctx, N, a, s, t) {
    if (a <= 0) return;
    const f = F(), X = (v) => lerp(N.x0, N.x1, v / 30);
    Ink.path(ctx, [[N.x0 - 20, N.y], [N.x1 + 30, N.y]], { w: 4, alpha: a, seed: 9500, taper: [0, 0] });
    for (let v = 0; v <= 30; v++) {
      const big = v % 5 === 0;
      Ink.path(ctx, [[X(v), N.y - (big ? 12 : 7)], [X(v), N.y + (big ? 12 : 7)]], { w: big ? 3 : 2, alpha: a, seed: 9510 + v, taper: [0, 0] });
      if ((big && v !== 25) || v === 26) f.T(ctx, String(v), X(v), N.y + 38, { size: s * 0.55, alpha: a, color: v === 26 ? A.amber : undefined });
      if (v <= 26) { const k = seg(t, 70.0 + v * 0.06, 70.3 + v * 0.06) * a; if (k > 0) { ctx.fillStyle = amber(k); ctx.beginPath(); ctx.arc(X(v), N.y, 6.5, 0, 7); ctx.fill(); } }
    }
    if (t > 72) f.crossInk(ctx, X(27), N.y - 40, 12, seg(t, 72.0, 72.6), a);
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Sınıf gezisi: otobüs ve biletler'],
      [10.6, 27.8, 'Nicelikler ve eşitlik: denklemi kuralım'],
      [28.4, 45.8, 'Bir strateji seç, uygula'],
      [46.4, 63.8, 'Kontrol et, başka stratejileri incele'],
      [64.4, 79.8, 'Bütçe sınırı: eşitsizlik'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, P = L.PN, R = L.RB, C = L.C4, V = env.V, WW = V ? 900 : 1000;
    rows(ctx, C, [[5.0, 10.2, 0, ['Otobüs: 150 TL']], [5.8, 10.2, 1, ['Bilet: kişi başı 25 TL']], [6.6, 10.2, 2, ['Toplam: 650 TL ödendi']], [8.4, 10.2, 3, ['Kaç kişi?'], true]], t, s * 1.1, WW);
    // 10–28: quantities and the bar model
    rows(ctx, P, [[11.4, 27.8, 0, ['Kişi sayısı x · biletler 25x · toplam 150 + 25x']]], t, s, WW);
    const b2 = win(t, 13.0, 27.8) * a;
    barModel(ctx, L.BM, b2 * seg(t, 13.0, 13.6), s, t, 0, 0);
    rows(ctx, R, [[18.4, 27.8, 0, ['150 + 25x = 650'], true]], t, s * 1.15, WW);
    // 28–36: a wrong strategy
    rows(ctx, C, [[29.4, 35.8, 0, ['Önce 25’e bölelim: 650 ÷ 25 = 26']], [30.4, 35.8, 1, ['Sonra 150’yi çıkaralım: 26 − 150 = −124 ?'], false, 0, V ? 420 : 460]], t, s, WW);
    // 36–46: the balance method on the bar
    const b3 = win(t, 36.4, 45.8) * a;
    barModel(ctx, L.BM, b3 * seg(t, 36.4, 37.0), s, t, seg(t, 40.6, 42.0), seg(t, 38.0, 38.8));
    rows(ctx, R, [[36.8, 45.8, 0, ['150 + 25x − 150 = 650 − 150  →  25x = 500']], [39.6, 45.8, 1, ['25x ÷ 25 = 500 ÷ 25  →  x = 20'], true]], t, s, WW);
    // 46–64: check and other strategies
    rows(ctx, C, [[47.4, 63.8, 0, ['Kontrol: 150 + 25 · 20 = 150 + 500 = 650'], false, V ? 400 : 440], [50.4, 63.8, 1, ['Ters işlem: 650 → − 150 → 500 → ÷ 25 → 20']],
      [52.8, 63.8, 2, ['Tablo: x = 10 → 400 · x = 15 → 525 · x = 20 → 650']]], t, s, WW);
    // 64–80: the inequality
    rows(ctx, P, [[65.4, 79.8, 0, ['150 + 25x ≤ 800  →  25x ≤ 650  →  x ≤ 26'], true]], t, s, WW);
    sols(ctx, L.NLn, win(t, 68.6, 79.8) * a, s, t);
    rows(ctx, { x: P.x, y0: L.NLn.y + 110, dy: P.dy }, [[73.0, 79.8, 0, ['27 kişi: 150 + 25 · 27 = 825 > 800']]], t, s, WW);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Otobüs sabit 150 TL, bilet kişi başı 25 TL'], [11.4, 27.8, 'Nicelikler: kişi sayısı, bilet tutarı, toplam'],
      [29.4, 35.8, 'Bir strateji deneyelim: önce bölmek?'], [36.4, 45.8, 'Denge: eşitliğin iki tarafına aynı işlemi yap'],
      [47.4, 63.8, 'Çözümü kontrol et, farklı stratejileri incele'], [65.4, 79.8, 'Bütçe en fazla 800 TL olsaydı?']]);
    exprs(ctx, t, at(W, 1), [[16.4, 27.8, 'Eşitlik: sabit ücret + biletler = toplam'], [31.6, 35.8, '−124 kişi olamaz: bu strateji çözüme götürmedi, değiştir'],
      [39.4, 45.8, 'Önce 150’yi çıkar, sonra 25’e böl'], [51.0, 63.8, 'Ters işlem ve tablo da 20 buldu'],
      [69.4, 79.8, '≤ 800: 0’dan 26’ya kadar her kişi sayısı olur, 27 olmaz']]);
    exprs(ctx, t, at(W, 2), [[8.8, 10.2, 'Kaç kişi geziye katıldı?', true], [21.0, 27.8, 'Denklem: 150 + 25x = 650', true],
      [42.0, 45.8, 'x = 20: geziye 20 kişi katıldı', true],
      [57.0, 63.8, 'Genelleme: x = (toplam − sabit) ÷ bilet fiyatı', true],
      [75.0, 79.8, 'Toplam 660 TL olsaydı x = 20,4: kişi sayısı olamaz', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Nicelikleri belirle, denklem kur', 80.6], ['İki tarafa aynı işlemi uygula', 81.6], ['Kontrol et; gerekirse stratejiyi değiştir', 82.6], ['Çözüm bağlamda anlamlı mı? Bak!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A school trip', nameTr: 'Gezi', concept: '150 + 25 per person = 650', conceptTr: '150 + kişi başı 25 = 650', render });
})(window.LI = window.LI || {});
