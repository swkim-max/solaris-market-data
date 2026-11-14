/* 솔라리스 재생에너지팀 블로그 · 전력·가스 시세 전체 보기 페이지 (/smp-lng/) */
(function () {
  'use strict';

  var CFG = window.SMP_PAGE_CONFIG || {};
  var DATA_URL = CFG.dataUrl || '';
  var C = {
    land: '#2563a8', jeju: '#14a37f', jkm: '#e8731a', ttf: '#7c5cc4', hh: '#2f8f6b',
    oil: '#6b4f2e', up: '#d33a2c', down: '#2563a8', orange: '#ff9a1f'
  };

  var CSS = [
    '.smp{container-type:inline-size;font-family:inherit;color:#15171a;-webkit-font-smoothing:antialiased;line-height:1.6}',
    '.smp *{box-sizing:border-box}',
    '.smp-tick{background:#0e0e0f;color:#e9e6df;overflow:hidden;white-space:nowrap;position:relative;font-variant-numeric:tabular-nums;border-radius:10px;padding:12px 0;margin:0 0 14px}',
    '.smp-tick::before,.smp-tick::after{content:"";position:absolute;top:0;bottom:0;width:28px;z-index:1;pointer-events:none}',
    '.smp-tick::before{left:0;background:linear-gradient(90deg,#0e0e0f,rgba(14,14,15,0))}',
    '.smp-tick::after{right:0;background:linear-gradient(270deg,#0e0e0f,rgba(14,14,15,0))}',
    '.smp-track{display:inline-flex;animation:smp-scroll 56s linear infinite}',
    '.smp-tick:hover .smp-track{animation-play-state:paused}',
    '.smp-item{display:inline-flex;align-items:baseline;gap:6px;padding:0 18px;font-size:14px}',
    '.smp-item .k{color:#8d8a84;font-size:12px;font-weight:700;letter-spacing:.04em}',
    '.smp-item .v{color:' + C.orange + ';font-weight:800;text-shadow:0 0 6px rgba(255,154,31,.45)}',
    '.smp-item .u{color:#8d8a84;font-size:11.5px}',
    '.smp-item .c{font-weight:800;font-size:12.5px}',
    '.smp-item .up{color:#ff5b4f}.smp-item .down{color:#4da3ff}',
    '.smp-item .b{color:#6f6c66;font-size:11px}',
    '.smp-sep{color:' + C.orange + ';opacity:.5}',
    '@keyframes smp-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
    '.smp-meta{font-size:13px;color:#8a8780;margin:0 0 22px}',
    '.smp-kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:0 0 28px}',
    '.smp-kpi{background:#fff;border:1px solid #e6e4df;border-radius:10px;padding:14px 14px 12px;min-width:0}',
    '.smp-kpi .l{font-size:12px;color:#8a8780;display:flex;align-items:center;gap:6px;white-space:nowrap}',
    '.smp-kpi .l i{width:8px;height:8px;border-radius:50%;flex:none}',
    '.smp-kpi .n{font-size:24px;font-weight:800;line-height:1.15;margin-top:6px;font-variant-numeric:tabular-nums;letter-spacing:-.01em}',
    '.smp-kpi .u{font-size:11.5px;color:#8a8780;margin-left:3px;font-weight:400}',
    '.smp-kpi .c{font-size:12.5px;font-weight:800;margin-top:4px;font-variant-numeric:tabular-nums}',
    '.smp-kpi .c span{display:block;font-weight:400;font-size:11.5px;color:#8a8780;margin-top:1px}',
    '.smp-up{color:' + C.up + '}.smp-down{color:' + C.down + '}',
    '.smp-note{background:#f7f5f1;border-left:3px solid var(--ghost-accent-color,#5b4a39);border-radius:0 10px 10px 0;padding:18px 22px;margin:0 0 40px}',
    '.smp-note h3{font-size:15px;margin:0 0 8px;font-weight:800}',
    '.smp-note p{margin:0;font-size:15.5px;line-height:1.85;color:#2e2c29}',
    '.smp-note small{display:block;font-size:12px;color:#8a8780;margin-top:10px}',
    '.smp-sec{margin:0 0 44px}',
    '.smp-sec h2{font-size:21px;font-weight:800;margin:0 0 4px;letter-spacing:-.01em}',
    '.smp-sec .d{font-size:14.5px;color:#5f5c56;margin:0 0 14px}',
    '.smp-box{background:#fff;border:1px solid #e6e4df;border-radius:12px;padding:16px 16px 10px}',
    '.smp-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px}',
    '.smp-leg{display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#4a4843}',
    '.smp-leg span{display:inline-flex;align-items:center;gap:6px}',
    '.smp-leg i{width:14px;height:3px;border-radius:2px}',
    '.smp-tabs{display:inline-flex;background:#f1efeb;border-radius:8px;padding:3px}',
    '.smp-tabs button{all:unset;cursor:pointer;font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:6px;color:#6b6862}',
    '.smp-tabs button[aria-pressed="true"]{background:#fff;color:#15171a;box-shadow:0 1px 2px rgba(0,0,0,.08)}',
    '.smp-tabs button:focus-visible{outline:2px solid var(--ghost-accent-color,#5b4a39)}',
    '.smp-chart{position:relative}',
    '.smp-chart svg{display:block;width:100%;overflow:visible}',
    '.smp-chart text{font-size:11.5px;fill:#8a8780;font-variant-numeric:tabular-nums}',
    '.smp-tip{position:absolute;pointer-events:none;background:#15171a;color:#fff;border-radius:8px;padding:8px 10px;font-size:12.5px;line-height:1.5;white-space:nowrap;opacity:0;transition:opacity .12s;z-index:2;font-variant-numeric:tabular-nums}',
    '.smp-tip b{display:block;font-size:11.5px;color:#bdb9b1;font-weight:700;margin-bottom:2px}',
    '.smp-tip i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}',
    '.smp-read{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}',
    '.smp-read div{font-size:14.5px;line-height:1.75;color:#3d3b37;background:#faf9f7;border-radius:10px;padding:14px 16px}',
    '.smp-read b{display:block;font-size:13px;color:#15171a;margin-bottom:4px}',
    '.smp-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;align-items:stretch;gap:8px;margin:4px 0 14px}',
    '.smp-flow .s{background:#fff;border:1px solid #e6e4df;border-radius:10px;padding:12px 12px;font-size:13px;line-height:1.55;color:#4a4843}',
    '.smp-flow .s b{display:block;font-size:14px;color:#15171a;margin-bottom:4px}',
    '.smp-flow .s.k{border-color:var(--ghost-accent-color,#5b4a39);background:#f7f5f1}',
    '.smp-flow .a{align-self:center;color:#b0aca4;font-size:18px}',
    '.smp-ex p{font-size:15.5px;line-height:1.85;color:#2e2c29;margin:0 0 12px}',
    '.smp-table{width:100%;border-collapse:collapse;font-size:14px;font-variant-numeric:tabular-nums}',
    '.smp-table th{font-size:12px;color:#8a8780;font-weight:700;text-align:right;padding:8px 10px;border-bottom:1px solid #e6e4df}',
    '.smp-table th:first-child,.smp-table td:first-child{text-align:left}',
    '.smp-table td{text-align:right;padding:9px 10px;border-bottom:1px solid #f0eeea}',
    '.smp-table tbody tr:first-child td{font-weight:800;background:#faf9f7}',
    '.smp-foot{font-size:13px;line-height:1.7;color:#8a8780;border-top:1px solid #e6e4df;padding-top:16px}',
    '@container (max-width:680px){.smp-kpis{grid-template-columns:repeat(2,1fr)}.smp-kpis .smp-kpi:first-child{grid-column:1/-1}.smp-read{grid-template-columns:1fr}.smp-flow{grid-template-columns:1fr}.smp-flow .a{transform:rotate(90deg);justify-self:center}}',
    '@media (prefers-reduced-motion:reduce){.smp-track{animation:none}.smp-tick{overflow-x:auto}}'
  ].join('\n');

  /* ---------- 도우미 ---------- */
  function num(v) { return v === null || v === undefined || v === '' || isNaN(+v) ? null : +v; }
  function f1(v) { return v === null ? '—' : (Math.round(v * 10) / 10).toFixed(1); }
  function fx1(v) { return v === null ? '—' : v.toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }
  function sign(v) { return v === null || v === undefined ? '' : (v > 0 ? '▲ ' : v < 0 ? '▼ ' : '') + Math.abs(Math.round(v * 10) / 10).toFixed(1); }
  function cls(v) { return v > 0 ? 'smp-up' : v < 0 ? 'smp-down' : ''; }
  function md(s) { var p = s.split('-'); return (+p[1]) + '/' + (+p[2]); }
  function ymK(s) { var p = s.split('-'); return p[0] + '년 ' + (+p[1]) + '월'; }
  function ym(s) { var p = s.split('-'); return p[0].slice(2) + '.' + (+p[1]); }
  function t(s) { return +new Date(s.length === 7 ? s + '-15T00:00:00' : s + 'T00:00:00'); }
  function h(tag, c, text) { var e = document.createElement(tag); if (c) e.className = c; if (text !== undefined) e.textContent = text; return e; }
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, a) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function sorted(arr, key) { return (arr || []).slice().sort(function (a, b) { return a[key] < b[key] ? -1 : 1; }); }

  /* ---------- 큰 그래프 ----------
     series: [{name, color, unit, pts:[{x, y, label}], gap(ms, 이보다 벌어지면 선을 끊음), dash}] */
  function chart(host, o) {
    var box = h('div', 'smp-chart');
    var tip = h('div', 'smp-tip');
    host.appendChild(box);
    function draw() {
      box.innerHTML = '';
      box.appendChild(tip);
      var W = Math.max(280, box.clientWidth || host.clientWidth || 640), H = o.height || 260;
      var padL = 40, padR = 12, padT = 12, padB = 26;
      var xs = [], ys = [];
      o.series.forEach(function (se) { se.pts.forEach(function (p) { if (p.y !== null) { xs.push(p.x); ys.push(p.y); } }); });
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
      var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys);
      var step = o.step || niceStep((hi - lo) / 4);
      var y0 = o.zero ? 0 : Math.floor((lo - step * 0.3) / step) * step, y1 = Math.ceil((hi + step * 0.2) / step) * step;
      if (y0 < 0) y0 = 0;
      var X = function (v) { return padL + (v - x0) / (x1 - x0 || 1) * (W - padL - padR); };
      var Y = function (v) { return padT + (1 - (v - y0) / (y1 - y0 || 1)) * (H - padT - padB); };
      var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, height: H, role: 'img', 'aria-label': o.label });
      for (var g = y0; g <= y1 + 1e-9; g += step) {
        svg.appendChild(s('line', { x1: padL, x2: W - padR, y1: Y(g), y2: Y(g), stroke: '#efede9', 'stroke-width': 1 }));
        var tx = s('text', { x: padL - 8, y: Y(g) + 4, 'text-anchor': 'end' }); tx.textContent = Math.round(g * 10) / 10; svg.appendChild(tx);
      }
      var tks = [], all = o.xTicks || [];
      all.forEach(function (tk, i) {
        if (i === all.length - 1) { while (tks.length && X(tk.x) - X(tks[tks.length - 1].x) < 46) tks.pop(); tks.push(tk); }
        else if (!tks.length || X(tk.x) - X(tks[tks.length - 1].x) >= 46) tks.push(tk);
      });
      tks.forEach(function (tk, i) {
        var anc = X(tk.x) < padL + 16 ? 'start' : X(tk.x) > W - padR - 16 ? 'end' : 'middle';
        var tx = s('text', { x: anc === 'start' ? X(tk.x) - 4 : anc === 'end' ? X(tk.x) + 4 : X(tk.x), y: H - 6, 'text-anchor': anc }); tx.textContent = tk.label; svg.appendChild(tx);
      });
      o.series.forEach(function (se) {
        var d = '', dd = '', prev = null;
        se.pts.forEach(function (p) {
          if (p.y === null) { if (!se.skipNull) prev = null; return; }
          var P = X(p.x).toFixed(1) + ' ' + Y(p.y).toFixed(1);
          var far = prev && se.gap && p.x - prev.x > se.gap;
          if (far) dd += 'M' + X(prev.x).toFixed(1) + ' ' + Y(prev.y).toFixed(1) + ' L' + P + ' ';
          d += (prev === null || far ? 'M' : 'L') + P + ' ';
          prev = p;
        });
        if (dd) svg.appendChild(s('path', { d: dd, fill: 'none', stroke: se.color, 'stroke-width': 1.6, 'stroke-dasharray': '3 4', 'stroke-opacity': .7 }));
        var attrs = { d: d, fill: 'none', stroke: se.color, 'stroke-width': se.width || 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
        if (se.dash) attrs['stroke-dasharray'] = se.dash;
        svg.appendChild(s('path', attrs));
        if (se.dots) se.pts.forEach(function (p) {
          if (p.y !== null) svg.appendChild(s('circle', { cx: X(p.x), cy: Y(p.y), r: 3, fill: '#fff', stroke: se.color, 'stroke-width': 1.8 }));
        });
        var last = se.pts.filter(function (p) { return p.y !== null; }).pop();
        if (last) svg.appendChild(s('circle', { cx: X(last.x), cy: Y(last.y), r: 4.5, fill: se.color, stroke: '#fff', 'stroke-width': 2 }));
      });
      var guide = s('line', { y1: padT, y2: H - padB, stroke: '#15171a', 'stroke-opacity': 0, 'stroke-width': 1 });
      svg.appendChild(guide);
      var marks = o.series.map(function (se) { var c = s('circle', { r: 5, fill: se.color, stroke: '#fff', 'stroke-width': 2, opacity: 0 }); svg.appendChild(c); return c; });
      var hit = s('rect', { x: padL, y: 0, width: W - padL - padR, height: H, fill: 'transparent' });
      svg.appendChild(hit);
      var allX = xs.filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
      function move(ev) {
        var r = svg.getBoundingClientRect();
        var px = (ev.clientX - r.left) * W / r.width;
        var best = allX[0];
        allX.forEach(function (v) { if (Math.abs(X(v) - px) < Math.abs(X(best) - px)) best = v; });
        guide.setAttribute('x1', X(best)); guide.setAttribute('x2', X(best)); guide.setAttribute('stroke-opacity', .25);
        tip.innerHTML = '';
        var title = null;
        o.series.forEach(function (se, i) {
          var p = se.pts.filter(function (q) { return q.x === best && q.y !== null; })[0];
          if (!p) { marks[i].setAttribute('opacity', 0); return; }
          title = title || p.label;
          marks[i].setAttribute('cx', X(p.x)); marks[i].setAttribute('cy', Y(p.y)); marks[i].setAttribute('opacity', 1);
          var row = h('div'); var dot = h('i'); dot.style.background = se.color; row.appendChild(dot);
          row.appendChild(document.createTextNode(se.name + ' ' + f1(p.y) + (se.unit ? ' ' + se.unit : '')));
          tip.appendChild(row);
        });
        tip.insertBefore(h('b', '', title || ''), tip.firstChild);
        tip.style.opacity = 1;
        var left = X(best) / W * box.clientWidth;
        var tw = tip.offsetWidth;
        tip.style.left = Math.min(Math.max(0, left + 12 + tw > box.clientWidth ? left - tw - 12 : left + 12), box.clientWidth - tw) + 'px';
        tip.style.top = '8px';
      }
      function leave() { tip.style.opacity = 0; guide.setAttribute('stroke-opacity', 0); marks.forEach(function (m) { m.setAttribute('opacity', 0); }); }
      hit.addEventListener('pointermove', move);
      hit.addEventListener('pointerdown', move);
      hit.addEventListener('pointerleave', leave);
      box.appendChild(svg);
    }
    draw();
    var wl = box.clientWidth;
    window.addEventListener('resize', function () { if (box.clientWidth !== wl) { wl = box.clientWidth; draw(); } });
    return { redraw: draw };
  }
  function niceStep(r) {
    var p = Math.pow(10, Math.floor(Math.log10(r || 1))), m = r / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }
  function legend(items) {
    var l = h('div', 'smp-leg');
    items.forEach(function (it) {
      var sp = h('span'); var i = h('i'); i.style.background = it[1];
      if (it[2]) { i.style.background = 'none'; i.style.borderTop = '3px dashed ' + it[1]; i.style.height = '0'; }
      sp.appendChild(i); sp.appendChild(document.createTextNode(it[0])); l.appendChild(sp);
    });
    return l;
  }
  function read(pairs) {
    var r = h('div', 'smp-read');
    pairs.forEach(function (p) { var d = h('div'); d.appendChild(h('b', '', p[0])); d.appendChild(document.createTextNode(p[1])); r.appendChild(d); });
    return r;
  }
  function section(root, title, desc) {
    var sec = h('section', 'smp-sec');
    sec.appendChild(h('h2', '', title));
    if (desc) sec.appendChild(h('p', 'd', desc));
    root.appendChild(sec);
    return sec;
  }

  /* ---------- 페이지 ---------- */
  function render(root, d) {
    root.innerHTML = '';
    root.classList.add('smp');
    var W = sorted(d.smp_weekly, 'start').filter(function (r) { return num(r.v) !== null; });
    var M = sorted(d.smp_monthly, 'm').filter(function (r) { return num(r.v) !== null; });
    var L = sorted(d.lng, 'd');
    var O = sorted(d.oil_monthly, 'm').filter(function (r) { return num(r.dubai) !== null; });
    var lw = W[W.length - 1], pw = W[W.length - 2];
    var jw = W.filter(function (r) { return num(r.jeju) !== null; });
    var lj = jw[jw.length - 1], pj = jw[jw.length - 2];
    var jl = L.filter(function (r) { return num(r.jkm) !== null; });
    var lk = jl[jl.length - 1], pk = jl[jl.length - 2], fk = jl[0];
    var lastOf = function (k) { var a = L.filter(function (r) { return num(r[k]) !== null; }); return [a[a.length - 1], a[a.length - 2]]; };
    var tt = lastOf('ttf'), hhh = lastOf('hh');
    var lm = M[M.length - 1], pm = M[M.length - 2];
    var dub = (d.latest || {}).dubai, fx = (d.latest || {}).usdkrw;
    var src = d.sources || {};

    /* 전광판 */
    var items = [
      ['육지 SMP 주간', f1(num(lw.v)), '원/kWh', pw ? lw.v - pw.v : null],
      ['제주 SMP 주간', f1(lj ? num(lj.jeju) : null), '원/kWh', lj && pj && lj.start === lw.start ? lj.jeju - pj.jeju : null],
      ['SMP ' + (+lm.m.slice(5)) + '월 평균', f1(num(lm.v)), '원/kWh', pm ? lm.v - pm.v : null],
      ['JKM 아시아 LNG', f1(num(lk.jkm)), '$/MMBtu', pk ? lk.jkm - pk.jkm : null],
      ['TTF 유럽', f1(num(tt[0].ttf)), '$/MMBtu', tt[1] ? tt[0].ttf - tt[1].ttf : null],
      ['Henry Hub 미국', f1(num(hhh[0].hh)), '$/MMBtu', hhh[1] ? hhh[0].hh - hhh[1].hh : null],
      ['두바이유', dub ? f1(dub.value) : '—', '$/배럴', dub ? dub.change : null, dub ? dub.basis : ''],
      ['원/달러', fx ? fx1(fx.value) : '—', '원', fx ? fx.change : null, fx ? fx.basis : '']
    ];
    var tick = h('div', 'smp-tick'); tick.setAttribute('role', 'marquee');
    tick.setAttribute('aria-label', items.map(function (it) { return it[0] + ' ' + it[1] + it[2]; }).join(', '));
    var track = h('div', 'smp-track'); track.setAttribute('aria-hidden', 'true');
    for (var rep = 0; rep < 2; rep++) items.forEach(function (it) {
      var el = h('span', 'smp-item');
      el.appendChild(h('span', 'k', it[0])); el.appendChild(h('span', 'v', it[1])); el.appendChild(h('span', 'u', it[2]));
      if (it[3] !== null && it[3] !== undefined) el.appendChild(h('span', 'c ' + (it[3] > 0 ? 'up' : it[3] < 0 ? 'down' : ''), sign(it[3])));
      if (it[4]) el.appendChild(h('span', 'b', it[4]));
      track.appendChild(el); track.appendChild(h('span', 'smp-sep', '·'));
    });
    tick.appendChild(track); root.appendChild(tick);

    var upd = d.updated ? d.updated.split('-') : null;
    root.appendChild(h('p', 'smp-meta', (upd ? upd[0] + '년 ' + (+upd[1]) + '월 ' + (+upd[2]) + '일 업데이트' : '') + ' · 매주 월요일 갱신 · 그래프에 마우스를 올리거나 누르면 값이 보입니다.'));

    /* 핵심 숫자 */
    var kp = h('div', 'smp-kpis');
    [
      ['육지 SMP', C.land, f1(num(lw.v)), '원/kWh', pw ? lw.v - pw.v : null, '전주 대비', md(lw.start) + '~' + md(lw.end) + ' 주간 평균'],
      ['제주 SMP', C.jeju, f1(lj ? num(lj.jeju) : null), '원/kWh', lj && pj && lj.start === lw.start ? lj.jeju - pj.jeju : null, '전주 대비'],
      ['JKM', C.jkm, f1(num(lk.jkm)), '$/MMBtu', pk ? lk.jkm - pk.jkm : null, '전주 대비'],
      ['두바이유', C.oil, dub ? f1(dub.value) : '—', '$/배럴', dub ? dub.change : null, dub ? dub.basis : ''],
      ['원/달러', '#8a8780', fx ? fx1(fx.value) : '—', '원', fx ? fx.change : null, fx ? fx.basis : '']
    ].forEach(function (k) {
      var c = h('div', 'smp-kpi');
      var l = h('div', 'l'); var i = h('i'); i.style.background = k[1]; l.appendChild(i); l.appendChild(document.createTextNode(k[0])); c.appendChild(l);
      var n = h('div', 'n', k[2]); n.appendChild(h('span', 'u', k[3])); c.appendChild(n);
      var ch = h('div', 'c ' + cls(k[4]), sign(k[4])); ch.appendChild(h('span', '', k[5])); c.appendChild(ch);
      kp.appendChild(c);
    });
    root.appendChild(kp);

    /* 해설 */
    if (d.note && d.note.text) {
      var nt = h('div', 'smp-note');
      nt.appendChild(h('h3', '', '이번 주 시장 해설'));
      nt.appendChild(h('p', '', d.note.text));
      nt.appendChild(h('small', '', md(d.note.date) + ' 작성 · 법률사무소 솔라리스 재생에너지팀'));
      root.appendChild(nt);
    }

    /* SMP */
    var s1 = section(root, 'SMP: 육지와 제주', '전력시장에서 발전사업자가 받는 전력량 가격입니다. 제주는 육지와 따로 운영되는 전력망이라 가격도 따로 정해집니다. 그래프의 점선은 자료가 비어 있는 구간입니다.');
    var b1 = h('div', 'smp-box'); s1.appendChild(b1);
    var bar1 = h('div', 'smp-bar');
    bar1.appendChild(legend([['육지', C.land], ['제주', C.jeju]]));
    var tabs = h('div', 'smp-tabs');
    var bw = h('button', '', '주간'), bm = h('button', '', '월간');
    bw.type = bm.type = 'button';
    tabs.appendChild(bw); tabs.appendChild(bm); bar1.appendChild(tabs); b1.appendChild(bar1);
    var holder = h('div'); b1.appendChild(holder);
    var WEEK = 9 * 864e5;
    function smpWeekly() {
      holder.innerHTML = '';
      var pts = function (k) { return W.map(function (r) { return { x: t(r.start), y: num(r[k]), label: md(r.start) + '~' + md(r.end) + ' 주간 평균' }; }); };
      chart(holder, {
        label: '육지와 제주 SMP 주간 평균 추이', unit: '원/kWh',
        series: [{ name: '육지', color: C.land, unit: '원', pts: pts('v'), gap: WEEK }, { name: '제주', color: C.jeju, unit: '원', pts: pts('jeju'), gap: WEEK, skipNull: true }],
        xTicks: W.map(function (r) { return { x: t(r.start), label: md(r.start) }; })
      });
    }
    function smpMonthly() {
      holder.innerHTML = '';
      var pts = function (k) { return M.map(function (r) { return { x: t(r.m), y: num(r[k]), label: r.m.slice(0, 4) + '년 ' + (+r.m.slice(5)) + '월 평균' }; }); };
      chart(holder, {
        label: '육지와 제주 SMP 월평균 추이',
        series: [{ name: '육지', color: C.land, unit: '원', pts: pts('v') }, { name: '제주', color: C.jeju, unit: '원', pts: pts('jeju'), dots: true, skipNull: true, gap: 40 * 864e5 }],
        xTicks: M.map(function (r) { return { x: t(r.m), label: ym(r.m) }; })
      });
    }
    function setTab(w) { bw.setAttribute('aria-pressed', w ? 'true' : 'false'); bm.setAttribute('aria-pressed', w ? 'false' : 'true'); (w ? smpWeekly : smpMonthly)(); }
    bw.addEventListener('click', function () { setTab(true); });
    bm.addEventListener('click', function () { setTab(false); });
    setTab(true);
    var mmax = M.reduce(function (a, r) { return num(r.v) > num(a.v) ? r : a; }, M[0]);
    var mmin = M.reduce(function (a, r) { return num(r.v) < num(a.v) ? r : a; }, M[0]);
    s1.appendChild(read([
      ['최근 1년 흐름', '육지 월평균은 ' + ymK(mmin.m) + ' ' + f1(num(mmin.v)) + '원이 가장 낮았고 ' + ymK(mmax.m) + ' ' + f1(num(mmax.v)) + '원이 가장 높았습니다. 같은 1년 안에서도 kWh당 50원 넘게 움직였습니다. 현물시장에 전력을 파는 태양광·풍력 사업자의 매출도 그만큼 흔들립니다.'],
      ['제주가 다른 이유', '제주는 재생에너지 비중이 높아 낮 시간 태양광 발전이 몰리면 가격이 크게 떨어지고, 출력제어도 잦습니다. 제주에서 사업을 하거나 검토 중이라면 육지 SMP가 아니라 제주 SMP와 출력제어 이력을 함께 보셔야 합니다.']
    ]));

    /* LNG */
    var s2 = section(root, 'LNG 국제 가격', '세계 3대 천연가스 가격입니다. 단위는 모두 달러/MMBtu(열량 100만 BTU당 가격)입니다.');
    var b2 = h('div', 'smp-box'); s2.appendChild(b2);
    var bar2 = h('div', 'smp-bar');
    bar2.appendChild(legend([['JKM 아시아 현물', C.jkm], ['TTF 유럽', C.ttf], ['Henry Hub 미국', C.hh]]));
    b2.appendChild(bar2);
    var lpts = function (k) { return L.map(function (r) { return { x: t(r.d), y: num(r[k]), label: r.d.slice(0, 4) + '년 ' + md(r.d) + ' 주간' }; }); };
    var months = [];
    L.forEach(function (r) { var m = r.d.slice(0, 7); if (months.indexOf(m) < 0) months.push(m); });
    chart(b2, {
      label: 'JKM, TTF, Henry Hub 최근 1년 추이', zero: true,
      series: [{ name: 'JKM', color: C.jkm, unit: '달러', pts: lpts('jkm'), width: 2.8, skipNull: true }, { name: 'TTF', color: C.ttf, unit: '달러', pts: lpts('ttf'), skipNull: true }, { name: 'Henry Hub', color: C.hh, unit: '달러', pts: lpts('hh'), skipNull: true }],
      xTicks: months.map(function (m) { return { x: t(m + '-01'), label: ym(m) }; })
    });
    s2.appendChild(read([
      ['JKM을 먼저 보는 이유', '한국·일본·중국이 현물로 LNG를 살 때 기준이 되는 가격입니다. 지금 ' + f1(num(lk.jkm)) + '달러로 1년 전 ' + f1(num(fk.jkm)) + '달러의 ' + (num(lk.jkm) / num(fk.jkm)).toFixed(1) + '배입니다. 우리나라가 현물로 사는 물량의 비용이 그만큼 올랐다는 뜻입니다.'],
      ['TTF와 Henry Hub', '유럽 TTF는 JKM과 같은 물량을 놓고 경쟁하므로 비슷하게 움직입니다. 미국 Henry Hub는 미국 내수 가격이라 훨씬 낮고, 둘의 차이가 미국산 LNG를 수입할 유인이 됩니다.']
    ]));

    /* 유가·환율 */
    var s3 = section(root, '두바이유와 원/달러 환율', '우리나라가 들여오는 LNG는 상당수가 장기계약이고, 장기계약 가격은 국제유가에 연동됩니다. 달러로 사니 환율도 같이 봐야 합니다.');
    var b3 = h('div', 'smp-box'); s3.appendChild(b3);
    var bar3 = h('div', 'smp-bar');
    bar3.appendChild(legend([['두바이유 월평균', C.oil]]));
    if (dub) bar3.appendChild(h('div', 'smp-leg', md(dub.date) + ' 현재 ' + f1(dub.value) + '달러 · 원/달러 ' + (fx ? fx1(fx.value) + '원' : '—')));
    b3.appendChild(bar3);
    chart(b3, {
      label: '두바이유 월평균 추이', height: 220,
      series: [{ name: '두바이유', color: C.oil, unit: '달러', pts: O.map(function (r) { return { x: t(r.m), y: num(r.dubai), label: r.m.slice(0, 4) + '년 ' + (+r.m.slice(5)) + '월 평균' }; }), dots: true, gap: 40 * 864e5 }],
      xTicks: O.map(function (r) { return { x: t(r.m), label: ym(r.m) }; })
    });
    var omax = O.reduce(function (a, r) { return num(r.dubai) > num(a.dubai) ? r : a; }, O[0]);
    s3.appendChild(read([
      ['유가는 몇 달 뒤 SMP에 반영됩니다', '유가 연동 계약은 보통 과거 몇 달의 평균 유가로 값을 매깁니다. ' + ymK(omax.m) + ' ' + f1(num(omax.dubai)) + '달러까지 오른 유가는 그 뒤 몇 달 동안 발전용 LNG 단가를 끌어올렸습니다. 지금 유가가 내려가고 있다면 몇 달 뒤 SMP가 내려갈 여지가 생깁니다.'],
      ['환율이 오르면 같은 LNG도 비싸집니다', '달러 가격이 그대로여도 원/달러 환율이 오르면 원화로 내는 연료비가 늘어납니다. 유가가 내리는데 환율이 오르면 두 효과가 일부 상쇄됩니다.']
    ]));

    /* 읽는 법 */
    var s4 = section(root, 'SMP는 어떻게 정해지나요');
    var flow = h('div', 'smp-flow');
    [
      ['국제 가격', '두바이유, JKM, 원/달러 환율'],
      ['발전용 LNG 단가', '장기계약(유가 연동)과 현물 구매를 섞어 정해집니다'],
      ['한계 발전기', '그 시간 수요를 맞추려고 마지막에 켠 가장 비싼 발전기'],
      ['SMP', '그 발전기의 연료비가 그 시간 모든 발전기의 전력량 가격이 됩니다']
    ].forEach(function (st, i, a) {
      var b = h('div', 's' + (i === a.length - 1 ? ' k' : '')); b.appendChild(h('b', '', st[0])); b.appendChild(document.createTextNode(st[1])); flow.appendChild(b);
      if (i < a.length - 1) flow.appendChild(h('div', 'a', '→'));
    });
    s4.appendChild(flow);
    var ex = h('div', 'smp-ex');
    [
      'SMP(계통한계가격)는 시간대마다 정해집니다. 전력거래소는 값싼 발전기부터 차례로 켜서 수요를 맞추고, 마지막으로 켠 발전기의 연료비를 그 시간의 가격으로 삼습니다. 우리나라에서는 대부분의 시간에 LNG 발전기가 이 마지막 자리를 차지합니다. 그래서 LNG 연료비가 오르면 SMP가 오르고, 원자력이나 태양광으로 전기를 만든 사업자도 같은 SMP를 받습니다.',
      '태양광·풍력 사업자의 수익은 SMP와 REC(신재생에너지 공급인증서) 가격의 합으로 정해지는 경우가 많습니다. 고정가격계약을 맺지 않고 현물로 파는 사업자라면 SMP가 곧 매출 단가입니다. 기업이 직접 PPA를 검토할 때도 SMP는 계약 가격이 적정한지 비교하는 기준이 됩니다.'
    ].forEach(function (p) { ex.appendChild(h('p', '', p)); });
    s4.appendChild(ex);

    /* 표 */
    var s5 = section(root, '주간 SMP 기록', '최근 주가 맨 위에 있습니다. 비어 있는 칸은 아직 확인하지 못한 값입니다.');
    var tb = h('table', 'smp-table');
    var thead = h('thead'); var hr = h('tr');
    ['기간', '육지 (원/kWh)', '전주 대비', '제주 (원/kWh)', '전주 대비'].forEach(function (c) { hr.appendChild(h('th', '', c)); });
    thead.appendChild(hr); tb.appendChild(thead);
    var tbody = h('tbody');
    W.forEach(function (r, i) {
      var p = W[i - 1];
      var near = p && t(r.start) - t(p.start) < WEEK;
      var tr = h('tr');
      tr.appendChild(h('td', '', md(r.start) + '~' + md(r.end)));
      tr.appendChild(h('td', '', f1(num(r.v))));
      var c1 = near ? r.v - p.v : null; tr.appendChild(h('td', cls(c1), near ? sign(c1) : ''));
      tr.appendChild(h('td', '', num(r.jeju) === null ? '' : f1(num(r.jeju))));
      var c2 = near && num(r.jeju) !== null && num(p.jeju) !== null ? r.jeju - p.jeju : null; tr.appendChild(h('td', cls(c2), c2 === null ? '' : sign(c2)));
      tbody.insertBefore(tr, tbody.firstChild);
    });
    tb.appendChild(tbody);
    var tw = h('div', 'smp-box'); tw.style.overflowX = 'auto'; tw.appendChild(tb); s5.appendChild(tw);

    root.appendChild(h('p', 'smp-foot', '출처: ' + [src.smp || '전력거래소', src.lng || 'JOGMEC 주간 동향', src.oil, src.fx].filter(Boolean).join(', ') + '. 법률사무소 솔라리스 재생에너지팀이 매주 정리합니다. 시장 동향을 이해하기 위한 참고 자료이며 개별 거래·투자 판단의 근거로 쓰실 수 없습니다.'));
  }

  function boot() {
    var root = document.getElementById(CFG.mount || 'smp-full');
    if (!root) return;
    if (!document.getElementById('smp-css')) { var st = h('style'); st.id = 'smp-css'; st.textContent = CSS; document.head.appendChild(st); }
    if (CFG.data) { render(root, CFG.data); return; }
    if (!DATA_URL) return;
    fetch(DATA_URL, { cache: 'no-cache' }).then(function (r) { return r.json(); })
      .then(function (d) { render(root, d); })
      .catch(function () { root.textContent = '시세 자료를 불러오지 못했습니다. 잠시 뒤 다시 열어 주세요.'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
