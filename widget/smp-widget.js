/* 솔라리스 재생에너지팀 블로그 · 전력·가스 시세 위젯 */
(function () {
  'use strict';

  var CFG = window.SMW_CONFIG || {};
  var DATA_URL = CFG.dataUrl || '';
  var LINK = CFG.link || '';
  var MIN_DESKTOP = CFG.minDesktop || 1280;
  var CARD_W = 300;
  var GAP = 48;

  var CSS = [
    '.smw{font-family:inherit;color:#15171a;-webkit-font-smoothing:antialiased;box-sizing:border-box}',
    '.smw *{box-sizing:border-box}',
    '.smw-acc{color:var(--ghost-accent-color,#5b4a39)}',
    '.smw-card{width:' + CARD_W + 'px;background:#fff;border:1px solid #e6e4df;border-radius:10px;padding:20px 20px 16px}',
    '.smw-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding-bottom:12px;border-bottom:1px solid #eeece8}',
    '.smw-title{font-size:13px;font-weight:800;letter-spacing:.02em}',
    '.smw-date{font-size:11px;color:#8a8780;white-space:nowrap}',
    '.smw-sec{padding:16px 0;border-bottom:1px solid #eeece8}',
    '.smw-lbl{font-size:11px;color:#8a8780;margin-bottom:6px}',
    '.smw-big{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}',
    '.smw-num{font-size:30px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;letter-spacing:-.01em}',
    '.smw-unit{font-size:12px;color:#8a8780}',
    '.smw-chg{font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;margin-left:auto;white-space:nowrap}',
    '.smw-sub{font-size:11px;color:#8a8780;margin-top:6px;font-variant-numeric:tabular-nums}',
    '.smw-spark{display:block;width:100%;height:44px;margin-top:10px}',
    '.smw-mini{display:flex;gap:14px;font-size:11px;color:#6b6862;margin-top:10px;font-variant-numeric:tabular-nums}',
    '.smw-mini b{color:#15171a;font-weight:700}',
    '.smw-note{font-size:12.5px;line-height:1.65;color:#3d3b37;padding:14px 0 4px;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}',
    '.smw-link{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;text-decoration:none;margin-top:10px}',
    '.smw-link:hover{text-decoration:underline}',
    '.smw-foot{font-size:10px;line-height:1.5;color:#a3a09a;margin-top:12px}',
    '.smw-rail{position:absolute;z-index:5}',
    '.smw-rail .smw-card{position:sticky;top:24px}',
    /* 모바일 띠 */
    '.smw-band{width:100%;margin:0 0 28px;border:1px solid #e6e4df;border-radius:12px;background:#fff;overflow:hidden}',
    '.smw-bar{all:unset;box-sizing:border-box;display:grid;grid-template-columns:4px 1fr auto;gap:0 12px;align-items:center;width:100%;padding:12px 14px 12px 0;cursor:pointer;-webkit-tap-highlight-color:transparent}',
    '.smw-bar:focus-visible{outline:2px solid var(--ghost-accent-color,#5b4a39);outline-offset:-2px;border-radius:12px}',
    '.smw-stripe{align-self:stretch;background:var(--ghost-accent-color,#5b4a39);border-radius:0 3px 3px 0}',
    '.smw-bar-top{font-size:10.5px;color:#8a8780;letter-spacing:.02em;margin-bottom:4px}',
    '.smw-bar-vals{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:13.5px;font-variant-numeric:tabular-nums}',
    '.smw-bar-vals span{white-space:nowrap}',
    '.smw-bar-vals b{font-weight:800}',
    '.smw-bar-vals i{font-style:normal;font-size:11.5px;color:#6b6862;margin-left:3px}',
    '.smw-chev{width:28px;height:28px;border-radius:50%;background:#f4f2ee;display:flex;align-items:center;justify-content:center;transition:transform .25s ease}',
    '.smw-band[data-open="1"] .smw-chev{transform:rotate(180deg)}',
    '.smw-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}',
    '.smw-band[data-open="1"] .smw-body{grid-template-rows:1fr}',
    '.smw-body>div{overflow:hidden}',
    '.smw-inner{padding:2px 16px 16px;border-top:1px solid #eeece8}',
    '.smw-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding-top:14px}',
    '.smw-two .smw-num{font-size:22px}',
    '.smw-two .smw-spark{height:36px}',
    '@media (prefers-reduced-motion:reduce){.smw-body,.smw-chev{transition:none}}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('smw-css')) return;
    var s = document.createElement('style');
    s.id = 'smw-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------- 숫자 정리 ---------- */
  function num(v) { return v === null || v === undefined || v === '' || isNaN(+v) ? null : +v; }
  function f1(v) { return v === null ? '—' : (Math.round(v * 10) / 10).toFixed(1); }
  function sign(v) { return v === null ? '' : (v > 0 ? '▲ ' : v < 0 ? '▼ ' : '') + Math.abs(Math.round(v * 10) / 10).toFixed(1); }
  function md(s) { var p = s.split('-'); return (+p[1]) + '/' + (+p[2]); }
  var RANGE = { low: '초반', mid: '중반', high: '후반' };
  function jkmText(row) {
    if (!row) return '—';
    var m = /(low|mid|high)\s*-?\s*(?:USD\s*)?(\d+)s/i.exec(row.jkm_note || '');
    if (m) return m[2] + '달러 ' + RANGE[m[1].toLowerCase()];
    return f1(num(row.jkm)) + '달러';
  }

  function summarize(d) {
    var w = (d.smp_weekly || []).filter(function (r) { return num(r.v) !== null; })
      .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var l = (d.lng || []).filter(function (r) { return num(r.jkm) !== null; })
      .sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    var lastW = w[w.length - 1], prevW = w[w.length - 2];
    var lastJ = l[l.length - 1], prevJ = l[l.length - 2], firstJ = l[0];
    var lastTtf = (d.lng || []).filter(function (r) { return num(r.ttf) !== null; }).sort(function (a, b) { return a.d < b.d ? -1 : 1; }).pop();
    var lastHh = (d.lng || []).filter(function (r) { return num(r.hh) !== null; }).sort(function (a, b) { return a.d < b.d ? -1 : 1; }).pop();
    return {
      weeks: w.slice(-12),
      jkmLine: l,
      smp: lastW ? num(lastW.v) : null,
      smpChg: lastW && prevW ? num(lastW.v) - num(prevW.v) : null,
      range: lastW ? md(lastW.start) + '~' + md(lastW.end) : '',
      jkm: lastJ,
      jkmDir: lastJ && prevJ ? num(lastJ.jkm) - num(prevJ.jkm) : null,
      jkmFirst: firstJ,
      ttf: lastTtf ? num(lastTtf.ttf) : null,
      hh: lastHh ? num(lastHh.hh) : null,
      note: d.note || null,
      src: d.sources || {}
    };
  }

  /* ---------- 작은 그래프 ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function bars(values, label) {
    var W = 260, H = 44, n = values.length, gap = 3;
    var max = Math.max.apply(null, values), min = Math.min.apply(null, values) * 0.8;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', class: 'smw-spark', role: 'img', 'aria-label': label });
    var bw = (W - gap * (n - 1)) / n;
    values.forEach(function (v, i) {
      var h = Math.max(2, (v - min) / (max - min || 1) * (H - 4));
      svg.appendChild(svgEl('rect', {
        x: i * (bw + gap), y: H - h, width: bw, height: h, rx: 1.5,
        fill: i === n - 1 ? 'var(--ghost-accent-color,#5b4a39)' : '#d9d5cd'
      }));
    });
    return svg;
  }
  function line(points, label) {
    var W = 260, H = 44, pad = 3;
    var xs = points.map(function (p) { return +new Date(p.d); });
    var ys = points.map(function (p) { return num(p.jkm); });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = 0, y1 = Math.max.apply(null, ys) * 1.05;
    var X = function (v) { return pad + (v - x0) / (x1 - x0 || 1) * (W - pad * 2); };
    var Y = function (v) { return H - pad - (v - y0) / (y1 - y0 || 1) * (H - pad * 2); };
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', class: 'smw-spark', role: 'img', 'aria-label': label });
    var dpath = points.map(function (p, i) { return (i ? 'L' : 'M') + X(xs[i]).toFixed(1) + ' ' + Y(ys[i]).toFixed(1); }).join(' ');
    var area = dpath + ' L' + X(x1).toFixed(1) + ' ' + (H - pad) + ' L' + X(x0).toFixed(1) + ' ' + (H - pad) + ' Z';
    svg.appendChild(svgEl('path', { d: area, fill: 'var(--ghost-accent-color,#5b4a39)', 'fill-opacity': '0.08' }));
    svg.appendChild(svgEl('path', { d: dpath, fill: 'none', stroke: 'var(--ghost-accent-color,#5b4a39)', 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke', 'stroke-linejoin': 'round' }));
    return svg;
  }

  /* ---------- DOM 도우미 ---------- */
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function smpBlock(s, compact) {
    var sec = h('div', compact ? '' : 'smw-sec');
    sec.appendChild(h('div', 'smw-lbl', '육지 SMP 주간 평균'));
    var big = h('div', 'smw-big');
    big.appendChild(h('span', 'smw-num', f1(s.smp)));
    big.appendChild(h('span', 'smw-unit', '원/kWh'));
    if (!compact) big.appendChild(h('span', 'smw-chg', sign(s.smpChg)));
    sec.appendChild(big);
    sec.appendChild(h('div', 'smw-sub', compact ? sign(s.smpChg) + ' 전주 대비' : '전주 대비 · 최근 12주'));
    if (s.weeks.length) sec.appendChild(bars(s.weeks.map(function (r) { return num(r.v); }), '최근 12주 육지 SMP 주간 평균 막대그래프'));
    return sec;
  }
  function jkmBlock(s, compact) {
    var sec = h('div', compact ? '' : 'smw-sec');
    sec.appendChild(h('div', 'smw-lbl', 'JKM · 아시아 LNG 현물'));
    var big = h('div', 'smw-big');
    big.appendChild(h('span', 'smw-num', jkmText(s.jkm)));
    if (!compact) big.appendChild(h('span', 'smw-unit', '/MMBtu'));
    sec.appendChild(big);
    sec.appendChild(h('div', 'smw-sub', '1년 전 ' + jkmText(s.jkmFirst)));
    if (s.jkmLine.length > 1) sec.appendChild(line(s.jkmLine, '최근 1년 JKM 추이선'));
    if (!compact) {
      var mini = h('div', 'smw-mini');
      var a = h('span'); a.appendChild(document.createTextNode('유럽 TTF ')); a.appendChild(h('b', '', f1(s.ttf)));
      var b = h('span'); b.appendChild(document.createTextNode('미국 Henry Hub ')); b.appendChild(h('b', '', f1(s.hh)));
      mini.appendChild(a); mini.appendChild(b);
      sec.appendChild(mini);
    }
    return sec;
  }
  function tail(box, s) {
    if (s.note && s.note.text) box.appendChild(h('div', 'smw-note', s.note.text));
    if (LINK) {
      var a = h('a', 'smw-link smw-acc', 'SMP·LNG 추이 전체 보기 →');
      a.href = LINK;
      box.appendChild(a);
    }
    box.appendChild(h('div', 'smw-foot', '출처: ' + (s.src.smp || '전력거래소') + ', ' + (s.src.lng || 'JOGMEC') + '. 시장 동향 참고 자료이며 개별 거래·투자 판단의 근거가 아닙니다.'));
  }

  function renderCard(d) {
    var s = summarize(d);
    var card = h('aside', 'smw smw-card');
    card.setAttribute('aria-label', '이번 주 전력·가스 시세');
    var head = h('div', 'smw-head');
    head.appendChild(h('span', 'smw-title', '전력·가스 시세'));
    head.appendChild(h('span', 'smw-date', s.range + ' 기준'));
    card.appendChild(head);
    card.appendChild(smpBlock(s, false));
    card.appendChild(jkmBlock(s, false));
    tail(card, s);
    return card;
  }

  function renderBand(d) {
    var s = summarize(d);
    var band = h('section', 'smw smw-band');
    band.setAttribute('aria-label', '이번 주 전력·가스 시세');
    band.dataset.open = '0';
    var bar = h('button', 'smw-bar');
    bar.type = 'button';
    bar.setAttribute('aria-expanded', 'false');
    bar.appendChild(h('span', 'smw-stripe'));
    var mid = h('span');
    mid.appendChild(h('div', 'smw-bar-top', '이번 주 전력·가스 시세 · ' + s.range));
    var vals = h('div', 'smw-bar-vals');
    var v1 = h('span'); v1.appendChild(document.createTextNode('SMP ')); v1.appendChild(h('b', '', f1(s.smp) + '원')); v1.appendChild(h('i', '', sign(s.smpChg)));
    var v2 = h('span'); v2.appendChild(document.createTextNode('JKM ')); v2.appendChild(h('b', '', jkmText(s.jkm)));
    if (s.jkmDir !== null && s.jkmDir !== 0) v2.appendChild(h('i', '', s.jkmDir > 0 ? '▲' : '▼'));
    vals.appendChild(v1); vals.appendChild(v2);
    mid.appendChild(vals);
    bar.appendChild(mid);
    var chev = h('span', 'smw-chev');
    chev.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f5c56" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    bar.appendChild(chev);
    band.appendChild(bar);

    var body = h('div', 'smw-body');
    var wrap = h('div');
    var inner = h('div', 'smw-inner');
    var two = h('div', 'smw-two');
    two.appendChild(smpBlock(s, true));
    two.appendChild(jkmBlock(s, true));
    inner.appendChild(two);
    tail(inner, s);
    wrap.appendChild(inner);
    body.appendChild(wrap);
    band.appendChild(body);

    bar.addEventListener('click', function () {
      var open = band.dataset.open !== '1';
      band.dataset.open = open ? '1' : '0';
      bar.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    return band;
  }

  /* ---------- 블로그에 붙이기 ---------- */
  function findFeed() {
    if (CFG.feedSelector) {
      var el = document.querySelector(CFG.feedSelector);
      if (el) return { heading: el, column: el };
    }
    var cands = document.querySelectorAll('h1,h2,h3,h4,div,span');
    for (var i = 0; i < cands.length; i++) {
      var t = (cands[i].textContent || '').trim();
      if (/^latest$/i.test(t) && cands[i].children.length === 0) {
        var heading = cands[i];
        var col = heading.parentElement;
        while (col && col.parentElement && col.getBoundingClientRect().width < 260) col = col.parentElement;
        return { heading: heading, column: col };
      }
    }
    var main = document.querySelector('.site-main, main');
    return main ? { heading: main.firstElementChild || main, column: main } : null;
  }

  var state = { mode: null, el: null, data: null };

  function place() {
    if (!state.data) return;
    var f = findFeed();
    if (!f) return;
    var r = f.column.getBoundingClientRect();
    var room = document.documentElement.clientWidth - r.right;
    var wantCard = window.innerWidth >= MIN_DESKTOP && room >= CARD_W + GAP + 24;
    var mode = wantCard ? 'card' : 'band';
    if (mode !== state.mode) {
      if (state.el) state.el.remove();
      if (mode === 'card') {
        var rail = h('div', 'smw-rail');
        rail.appendChild(renderCard(state.data));
        document.body.appendChild(rail);
        state.el = rail;
      } else {
        var band = renderBand(state.data);
        f.heading.parentNode.insertBefore(band, f.heading);
        state.el = band;
      }
      state.mode = mode;
    }
    if (mode === 'card') {
      var top = r.top + window.pageYOffset;
      state.el.style.left = (r.right + window.pageXOffset + GAP) + 'px';
      state.el.style.top = top + 'px';
      state.el.style.height = Math.max(r.height, 520) + 'px';
    }
  }

  function boot() {
    if (!DATA_URL) return;
    if (CFG.homeOnly !== false && !document.body.classList.contains('home-template')) return;
    injectCss();
    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (d) {
        state.data = d;
        place();
        var t;
        window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(place, 120); });
        window.addEventListener('load', place);
      })
      .catch(function () { /* 데이터를 못 읽으면 아무것도 띄우지 않음 */ });
  }

  window.SolarisMarketWidget = { renderCard: renderCard, renderBand: renderBand, injectCss: injectCss };
  if (!CFG.manual) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})();
