/* 솔라리스 재생에너지팀 블로그 · 전력·가스 시세 위젯 */
(function () {
  'use strict';

  var CFG = window.SMW_CONFIG || {};
  var DATA_URL = CFG.dataUrl || '';
  var LINK = CFG.link || '';
  var MIN_DESKTOP = CFG.minDesktop || 1280;
  var CARD_W = 256;
  var C_SMP = '#2563a8', C_SMP_LAST = '#f28c18', C_JKM = '#e8731a', C_ORANGE = '#ff9a1f', C_JEJU = '#14a37f', C_OIL = '#6b4f2e', C_UP = '#d33a2c', C_DOWN = '#2563a8', C_TTF = '#7c5cc4', C_HH = '#2f8f6b';
  var GAP = 48;
  var POSTS_DEFAULT = true;
  var LEFT_DEFAULT = false;
  var LEFT_ON = false;

  var CSS = [
    '.smw{font-family:inherit;color:#15171a;-webkit-font-smoothing:antialiased;box-sizing:border-box}',
    '.smw *{box-sizing:border-box}',
    '.smw-acc{color:var(--ghost-accent-color,#5b4a39)}',
    '.smw-card{width:' + CARD_W + 'px;background:#fff;border:1px solid #e6e4df;border-radius:10px;padding:16px 16px 14px}',
    '.smw-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding-bottom:10px;border-bottom:1px solid #eeece8}',
    '.smw-title{font-size:12px;font-weight:800;letter-spacing:.02em}',
    '.smw-date{font-size:11px;color:#8a8780;white-space:nowrap}',
    '.smw-sec{padding:12px 0;border-bottom:1px solid #eeece8}',
    '.smw-lbl{font-size:11px;color:#8a8780;margin-bottom:6px}',
    '.smw-big{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}',
    '.smw-num{font-size:23px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;letter-spacing:-.01em}',
    '.smw-unit{font-size:12px;color:#8a8780}',
    '.smw-chg{font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;margin-left:auto;white-space:nowrap}',
    '.smw-sub{font-size:11px;color:#8a8780;margin-top:6px;font-variant-numeric:tabular-nums}',
    '.smw-spark{display:block;width:100%;height:38px;margin-top:8px}',
    '.smw-axis{display:flex;justify-content:space-between;font-size:10px;color:#8a8780;margin-top:4px;font-variant-numeric:tabular-nums}',
    '.smw-up{color:'+C_UP+'}','.smw-down{color:'+C_DOWN+'}',
    '.smw-leg{display:flex;gap:10px;font-size:10px;color:#8a8780;margin-top:6px}',
    '.smw-leg i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:4px;vertical-align:-1px}',
    '.smw-item .b{color:#6f6c66;font-size:10px}',
    '.smw-dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;vertical-align:1px}',
    '.smw-mini{display:flex;gap:14px;font-size:11px;color:#6b6862;margin-top:10px;font-variant-numeric:tabular-nums}',
    '.smw-mini b{color:#15171a;font-weight:700}',
    '.smw-note{font-size:12px;line-height:1.7;color:#3d3b37;padding:14px 0 4px}',
    '.smw-note-h{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;color:#15171a;padding-top:14px}',
    '.smw-note-h::before{content:"";width:3px;height:11px;border-radius:2px;background:var(--ghost-accent-color,#5b4a39)}',
    '.smw-note-h+.smw-note{padding-top:6px}',
    '.smw-link{display:flex;align-items:center;justify-content:center;gap:4px;font-size:12px;font-weight:700;text-decoration:none;margin-top:12px;padding:8px 12px;border-radius:6px;border:1px solid #dcd8d0;color:var(--ghost-accent-color,#5b4a39) !important;background:#fff}',
    '.smw-link:hover{background:#f6f4f0}',
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
    '.smw-bar-vals i{font-style:normal;font-size:11.5px;font-weight:700;margin-left:3px}',
    '.smw-chev{width:28px;height:28px;border-radius:50%;background:#f4f2ee;display:flex;align-items:center;justify-content:center;transition:transform .25s ease}',
    '.smw-band[data-open="1"] .smw-chev{transform:rotate(180deg)}',
    '.smw-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}',
    '.smw-band[data-open="1"] .smw-body{grid-template-rows:1fr}',
    '.smw-body>div{overflow:hidden}',
    '.smw-inner{padding:2px 16px 16px}',
    '.smw-inner .smw-meta{font-size:10.5px;color:#8a8780;padding:12px 0 0}',
    '.smw-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding-top:14px}',
    '.smw-two .smw-num{font-size:22px}',
    '.smw-two .smw-spark{height:44px}',
    '.smw-tick{background:#0e0e0f;color:#e9e6df;overflow:hidden;white-space:nowrap;position:relative;font-variant-numeric:tabular-nums}',
    '.smw-tick::before,.smw-tick::after{content:"";position:absolute;top:0;bottom:0;width:22px;z-index:1;pointer-events:none}',
    '.smw-tick::before{left:0;background:linear-gradient(90deg,#0e0e0f,rgba(14,14,15,0))}',
    '.smw-tick::after{right:0;background:linear-gradient(270deg,#0e0e0f,rgba(14,14,15,0))}',
    '.smw-track{display:inline-flex;animation:smw-scroll var(--smw-dur,48s) linear infinite}',
    '.smw-tick:hover .smw-track{animation-play-state:paused}',
    '.smw-item{display:inline-flex;align-items:baseline;gap:5px;padding:0 14px;font-size:12px;letter-spacing:.01em}',
    '.smw-item .k{color:#8d8a84;font-size:11px;font-weight:700;letter-spacing:.04em}',
    '.smw-item .v{color:'+C_ORANGE+';font-weight:800;text-shadow:0 0 6px rgba(255,154,31,.45)}',
    '.smw-item .u{color:#8d8a84;font-size:10.5px}',
    '.smw-item .c{font-weight:800}',
    '.smw-item .up{color:#ff5b4f}.smw-item .down{color:#4da3ff}',
    '.smw-sep{color:#ff9a1f;opacity:.5;padding:0 2px}',
    '@keyframes smw-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
    '.smw-card{padding-top:0;overflow:hidden}',
    '.smw-card .smw-tick{margin:0 -16px 12px;padding:8px 0}',
    '.smw-band .smw-bar{background:#0e0e0f;padding:0 12px 0 0;grid-template-columns:1fr auto;gap:0 8px}',
    '.smw-band .smw-tick{padding:13px 0;min-width:0}',
    '.smw-band .smw-chev{background:#2a2622}',
    '.smw-band .smw-chev path{stroke:'+C_ORANGE+'}',
    /* 포스트 상단 띠 (PC) */
    '.smw-strip{display:flex;align-items:stretch;height:38px;background:#0e0e0f;color:#e9e6df;text-decoration:none !important;border-bottom:1px solid #000}',
    '.smw-strip-lbl{flex:none;display:flex;align-items:center;gap:8px;padding:0 18px 0 24px;font-size:11.5px;font-weight:800;letter-spacing:.04em;color:#fff;border-right:1px solid #2a2622;white-space:nowrap}',
    '.smw-strip-lbl i{width:7px;height:7px;border-radius:2px;background:'+C_ORANGE+';box-shadow:0 0 6px rgba(255,154,31,.6)}',
    '.smw-strip .smw-tick{flex:1;min-width:0;display:flex;align-items:center;padding:0}',
    '.smw-strip .smw-item{font-size:12.5px}',
    '.smw-strip-go{flex:none;display:flex;align-items:center;padding:0 24px 0 18px;font-size:12px;font-weight:700;color:'+C_ORANGE+';border-left:1px solid #2a2622;white-space:nowrap}',
    'a.smw-strip:hover .smw-strip-go{text-decoration:underline}',
    'a.smw-strip:focus-visible{outline:2px solid '+C_ORANGE+';outline-offset:-2px}',
    /* 띠 색: 갈색(헤더 연장) */
    '.smw-strip.t-brown{background:#4b3e30;border-bottom:0}',
    '.t-brown .smw-tick{background:#4b3e30}',
    '.t-brown .smw-tick::before{background:linear-gradient(90deg,#4b3e30,rgba(75,62,48,0))}',
    '.t-brown .smw-tick::after{background:linear-gradient(270deg,#4b3e30,rgba(75,62,48,0))}',
    '.t-brown .smw-strip-lbl,.t-brown .smw-strip-go{border-color:rgba(255,255,255,.1)}',
    '.t-brown .smw-item .k{color:#cbbda9}.t-brown .smw-item .u,.t-brown .smw-item .b{color:#a8998a}',
    '.t-brown .smw-item .v{color:#ffb35c;text-shadow:none}',
    '.t-brown .smw-item .up{color:#ff9282}.t-brown .smw-item .down{color:#9fcbff}',
    '.t-brown .smw-strip-go{color:#ffb35c}.t-brown .smw-strip-lbl i{background:#ffb35c;box-shadow:none}',
    /* 띠 색: 밝은 바탕 */
    '.smw-strip.t-light{background:#fff;color:#15171a;border-bottom:1px solid #ece8e1}',
    '.t-light .smw-tick{background:#fff;color:#15171a}',
    '.t-light .smw-tick::before{background:linear-gradient(90deg,#fff,rgba(255,255,255,0))}',
    '.t-light .smw-tick::after{background:linear-gradient(270deg,#fff,rgba(255,255,255,0))}',
    '.t-light .smw-strip-lbl{color:#60503e;border-color:#ece8e1}.t-light .smw-strip-go{color:#60503e;border-color:#ece8e1}',
    '.t-light .smw-strip-lbl i{background:#60503e;box-shadow:none}',
    '.t-light .smw-item .k{color:#8a8780}.t-light .smw-item .u,.t-light .smw-item .b{color:#a3a09a}',
    '.t-light .smw-item .v{color:#15171a;text-shadow:none}',
    '.t-light .smw-item .up{color:#d33a2c}.t-light .smw-item .down{color:#2563a8}',
    '.t-light .smw-sep{color:#c9c4bb}',
    '.smw-post{padding-top:16px}',
    /* 왼쪽 소개 칸 */
    '.smw-left{width:240px;word-break:keep-all;font-size:13px;line-height:1.65;color:#3d3b37}',
    '.smw-l-eyebrow{font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--ghost-accent-color,#60503e);padding-bottom:10px;border-bottom:1px solid #e6e4df}',
    '.smw-l-h{font-size:18px;line-height:1.4;font-weight:800;color:#15171a;margin:14px 0 6px;letter-spacing:-.01em}',
    '.smw-l-list{list-style:none;margin:0;padding:0}',
    '.smw-l-list li{border-bottom:1px solid #eeece8}',
    '.smw-l-list a{display:grid;grid-template-columns:22px 1fr;gap:0 8px;padding:12px 0;text-decoration:none !important;color:inherit}',
    '.smw-l-list i{font-style:normal;font-size:11px;font-weight:800;color:#b5a894;padding-top:2px;font-variant-numeric:tabular-nums;transition:color .15s}',
    '.smw-l-list b{display:block;font-size:13.5px;line-height:1.45;color:#15171a;transition:color .15s}',
    '.smw-l-list span{display:block;font-size:12px;color:#8a8780;margin-top:3px;line-height:1.5}',
    '.smw-l-list span::after{content:" →";color:#c9c2b6;transition:color .15s}',
    '.smw-l-list a:hover b,.smw-l-list a:hover i,.smw-l-list a:hover span::after{color:var(--ghost-accent-color,#60503e)}',
    '.smw-l-series{display:block;margin-top:14px;padding:10px 12px;background:#f6f4f0;border-radius:6px;font-size:12.5px;font-weight:700;color:#3d3b37 !important;text-decoration:none !important}',
    '.smw-l-series em{font-style:normal;font-size:10.5px;font-weight:800;color:#fff;background:var(--ghost-accent-color,#60503e);border-radius:3px;padding:1px 5px;margin-right:6px;vertical-align:1px}',
    '.smw-l-series:hover{background:#efebe4}',
    '.smw-l-cta{display:flex;align-items:center;justify-content:center;margin-top:18px;padding:10px 12px;border-radius:6px;background:var(--ghost-accent-color,#60503e);color:#fff !important;font-size:13px;font-weight:800;text-decoration:none !important}',
    '.smw-l-cta:hover{filter:brightness(1.1)}',
    '.smw-l-contact{font-size:12px;color:#8a8780;margin-top:10px;line-height:1.7;font-variant-numeric:tabular-nums}',
    '.smw-l-contact a{color:inherit !important;text-decoration:none !important}',
    '.smw-lrail{position:absolute;z-index:5}',
    /* 지금 서울의 해 */
    '.smw-sun{width:240px;word-break:keep-all;color:#3d3b37}',
    '.smw-sun-eye{display:flex;justify-content:space-between;font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--ghost-accent-color,#60503e);padding-bottom:10px;border-bottom:1px solid #e6e4df}',
    '.smw-sun-eye span{font-weight:400;letter-spacing:0;color:#a3a09a;font-variant-numeric:tabular-nums}',
    '.smw-sun svg{display:block;width:100%;height:auto;margin:14px 0 4px;overflow:visible}',
    '.smw-sun-axis{display:flex;justify-content:space-between;font-size:10.5px;color:#a3a09a;font-variant-numeric:tabular-nums}',
    '.smw-sun-lead{font-size:13.5px;line-height:1.55;color:#3d3b37;margin-top:14px}',
    '.smw-sun-big{display:flex;align-items:baseline;gap:4px;margin:2px 0 2px}',
    '.smw-sun-big b{font-size:34px;line-height:1.05;font-weight:800;color:#15171a;letter-spacing:-.02em;font-variant-numeric:tabular-nums}',
    '.smw-sun-big i{font-style:normal;font-size:14px;color:#8a8780;font-weight:700}',
    '.smw-sun-rows{margin-top:14px;border-top:1px solid #eeece8}',
    '.smw-sun-rows div{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;padding:8px 0;border-bottom:1px solid #eeece8;font-variant-numeric:tabular-nums}',
    '.smw-sun-rows span{color:#8a8780}',
    '.smw-sun-rows b{color:#15171a}',
    '.smw-sun-rows b.won{color:var(--ghost-accent-color,#60503e)}',
    '.smw-sun-note{font-size:11px;color:#a3a09a;line-height:1.55;margin-top:8px}',
    '.smw-sun-cta{display:block;margin-top:14px;font-size:12.5px;font-weight:800;color:var(--ghost-accent-color,#60503e) !important;text-decoration:none !important}',
    '.smw-sun-cta:hover{text-decoration:underline !important}',
    '@keyframes smw-glow{0%,100%{opacity:.35}50%{opacity:.7}}',
    '.smw-sun .glow{animation:smw-glow 3.2s ease-in-out infinite}',
    '.smw-post .smw-band{margin:0}',
    '@media (prefers-reduced-motion:reduce){.smw-body,.smw-chev{transition:none}.smw-track{animation:none}.smw-tick{overflow-x:auto}}'
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
  function signCls(v) { return v > 0 ? 'smw-up' : v < 0 ? 'smw-down' : ''; }
  function sentences(t, max) {
    var parts = (t || '').split(/(?<=[.!?])\s+/), out = '';
    for (var i = 0; i < parts.length; i++) {
      if (out && (out + ' ' + parts[i]).length > max) break;
      out = out ? out + ' ' + parts[i] : parts[i];
    }
    return out;
  }
  function md(s) { var p = s.split('-'); return (+p[1]) + '/' + (+p[2]); }
  function jkmText(row) {
    if (!row) return '—';
    return f1(num(row.jkm)) + '달러';
  }

  function summarize(d) {
    var w = (d.smp_weekly || []).filter(function (r) { return num(r.v) !== null; })
      .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    var l = (d.lng || []).filter(function (r) { return num(r.jkm) !== null; })
      .sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    var lastW = w[w.length - 1], prevW = w[w.length - 2];
    var lastJ = l[l.length - 1], prevJ = l[l.length - 2], firstJ = l[0];
    var byD = function (k) { return (d.lng || []).filter(function (r) { return num(r[k]) !== null; }).sort(function (a, b) { return a.d < b.d ? -1 : 1; }); };
    var tt = byD('ttf'), hh = byD('hh');
    var lastTtf = tt[tt.length - 1], lastHh = hh[hh.length - 1];
    var m = (d.smp_monthly || []).filter(function (r) { return num(r.v) !== null; }).sort(function (a, b) { return a.m < b.m ? -1 : 1; });
    var lm = m[m.length - 1], pm = m[m.length - 2];
    var jw = w.filter(function (r) { return num(r.jeju) !== null; });
    var lj2 = jw[jw.length - 1], pj2 = jw[jw.length - 2];
    var oil = (d.oil_monthly || []).filter(function (r) { return num(r.dubai) !== null; }).sort(function (a, b) { return a.m < b.m ? -1 : 1; });
    var L = d.latest || {};
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
      ttfChg: tt.length > 1 ? num(lastTtf.ttf) - num(tt[tt.length - 2].ttf) : null,
      hhChg: hh.length > 1 ? num(lastHh.hh) - num(hh[hh.length - 2].hh) : null,
      month: lm ? (+lm.m.slice(5)) + '월' : '',
      jeju: lj2 ? num(lj2.jeju) : null,
      jejuChg: lj2 && pj2 && lj2.start === (lastW && lastW.start) ? num(lj2.jeju) - num(pj2.jeju) : null,
      oilLine: oil,
      oilLast: oil[oil.length - 1] || null,
      dubai: L.dubai || null,
      fx: L.usdkrw || null,
      smpMonth: lm ? num(lm.v) : null,
      smpMonthChg: lm && pm ? num(lm.v) - num(pm.v) : null,
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
  function bars(values, label, overlay) {
    var W = 260, H = 52, n = values.length, gap = 3;
    var all = values.concat((overlay || []).filter(function (v) { return v !== null; }));
    var max = Math.max.apply(null, all), min = Math.min.apply(null, all) * 0.75;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', class: 'smw-spark', role: 'img', 'aria-label': label });
    var bw = (W - gap * (n - 1)) / n;
    var Y = function (v) { return H - Math.max(3, (v - min) / (max - min || 1) * (H - 4)); };
    values.forEach(function (v, i) {
      svg.appendChild(svgEl('rect', {
        x: i * (bw + gap), y: Y(v), width: bw, height: H - Y(v), rx: 2,
        fill: i === n - 1 ? C_SMP_LAST : C_SMP, 'fill-opacity': i === n - 1 ? 1 : 0.85
      }));
    });
    if (overlay) {
      var seg = '';
      overlay.forEach(function (v, i) {
        if (v === null) { seg += ' '; return; }
        var cx = i * (bw + gap) + bw / 2;
        seg += (seg && seg.slice(-1) !== ' ' ? 'L' : 'M') + cx.toFixed(1) + ' ' + Y(v).toFixed(1);
      });
      svg.appendChild(svgEl('path', { d: seg.replace(/ +M/g, ' M').trim(), fill: 'none', stroke: C_JEJU, 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke' }));
      overlay.forEach(function (v, i) {
        if (v === null) return;
        svg.appendChild(svgEl('circle', { cx: i * (bw + gap) + bw / 2, cy: Y(v), r: 2.4, fill: '#fff', stroke: C_JEJU, 'stroke-width': 1.4 }));
      });
    }
    return svg;
  }
  function axis(left, right) {
    var a = h('div', 'smw-axis');
    a.appendChild(h('span', '', left)); a.appendChild(h('span', '', right));
    return a;
  }
  function line(points, label, key, color) {
    key = key || 'jkm'; color = color || C_JKM;
    var W = 260, H = 52, pad = 3;
    var xs = points.map(function (p) { return +new Date(p.d || (p.m + '-15')); });
    var ys = points.map(function (p) { return num(p[key]); });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = 0, y1 = Math.max.apply(null, ys) * 1.05;
    var X = function (v) { return pad + (v - x0) / (x1 - x0 || 1) * (W - pad * 2); };
    var Y = function (v) { return H - pad - (v - y0) / (y1 - y0 || 1) * (H - pad * 2); };
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', class: 'smw-spark', role: 'img', 'aria-label': label });
    var dpath = points.map(function (p, i) { return (i ? 'L' : 'M') + X(xs[i]).toFixed(1) + ' ' + Y(ys[i]).toFixed(1); }).join(' ');
    var area = dpath + ' L' + X(x1).toFixed(1) + ' ' + (H - pad) + ' L' + X(x0).toFixed(1) + ' ' + (H - pad) + ' Z';
    svg.appendChild(svgEl('path', { d: area, fill: color, 'fill-opacity': '0.16' }));
    svg.appendChild(svgEl('path', { d: dpath, fill: 'none', stroke: color, 'stroke-width': 2.2, 'vector-effect': 'non-scaling-stroke', 'stroke-linejoin': 'round' }));
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
    if (!compact) big.appendChild(h('span', 'smw-chg ' + signCls(s.smpChg), sign(s.smpChg)));
    sec.appendChild(big);
    var sub = h('div', 'smw-sub');
    if (compact) { sub.appendChild(h('span', signCls(s.smpChg), sign(s.smpChg))); sub.appendChild(document.createTextNode(' 전주 대비')); }
    else sub.textContent = '전주 대비';
    sec.appendChild(sub);
    if (s.weeks.length) {
      var vals = s.weeks.map(function (r) { return num(r.v); });
      var jv = s.weeks.map(function (r) { return num(r.jeju); });
      sec.appendChild(bars(vals, '최근 육지 SMP 주간 평균 막대그래프와 제주 SMP 꺾은선', jv));
      sec.appendChild(axis(md(s.weeks[0].start) + '주', '최고 ' + Math.round(Math.max.apply(null, vals)) + ' · 최저 ' + Math.round(Math.min.apply(null, vals))));
      var leg = h('div', 'smw-leg');
      var l1 = h('span'); var i1 = h('i'); i1.style.background = C_SMP; l1.appendChild(i1); l1.appendChild(document.createTextNode('육지'));
      var l2 = h('span'); var i2 = h('i'); i2.style.background = C_JEJU; i2.style.borderRadius = '50%'; l2.appendChild(i2);
      l2.appendChild(document.createTextNode('제주 ' + (s.jeju !== null ? f1(s.jeju) + '원' : '')));
      leg.appendChild(l1); leg.appendChild(l2);
      sec.appendChild(leg);
    }
    return sec;
  }
  function jkmBlock(s, compact) {
    var sec = h('div', compact ? '' : 'smw-sec');
    sec.appendChild(h('div', 'smw-lbl', 'JKM · 아시아 LNG 현물'));
    var big = h('div', 'smw-big');
    big.appendChild(h('span', 'smw-num', s.jkm ? f1(num(s.jkm.jkm)) : '—'));
    big.appendChild(h('span', 'smw-unit', '달러/MMBtu'));
    sec.appendChild(big);
    sec.appendChild(h('div', 'smw-sub', '1년 전 ' + jkmText(s.jkmFirst)));
    if (s.jkmLine.length > 1) {
      sec.appendChild(line(s.jkmLine, '최근 1년 JKM 추이선'));
      var fd = s.jkmLine[0].d.split('-');
      sec.appendChild(axis(fd[0].slice(2) + '.' + (+fd[1]), '지금'));
    }
    if (!compact) {
      var mini = h('div', 'smw-mini');
      var a = h('span'); var da = h('i', 'smw-dot'); da.style.background = C_TTF; a.appendChild(da); a.appendChild(document.createTextNode('유럽 TTF ')); a.appendChild(h('b', '', f1(s.ttf)));
      var b = h('span'); var db = h('i', 'smw-dot'); db.style.background = C_HH; b.appendChild(db); b.appendChild(document.createTextNode('미국 Henry Hub ')); b.appendChild(h('b', '', f1(s.hh)));
      mini.appendChild(a); mini.appendChild(b);
      sec.appendChild(mini);
    }
    return sec;
  }
  function oilBlock(s, compact) {
    var sec = h('div', compact ? '' : 'smw-sec');
    sec.appendChild(h('div', 'smw-lbl', '두바이유 · 국제유가'));
    var big = h('div', 'smw-big');
    big.appendChild(h('span', 'smw-num', s.dubai ? f1(s.dubai.value) : '—'));
    big.appendChild(h('span', 'smw-unit', '달러/배럴'));
    if (!compact && s.dubai && s.dubai.change !== null) big.appendChild(h('span', 'smw-chg ' + signCls(s.dubai.change), sign(s.dubai.change)));
    sec.appendChild(big);
    var sub = h('div', 'smw-sub');
    if (s.dubai) sub.textContent = md(s.dubai.date) + ' 기준' + (s.oilLast ? ' · ' + (+s.oilLast.m.slice(5)) + '월 평균 ' + f1(num(s.oilLast.dubai)) + '달러' : '');
    sec.appendChild(sub);
    if (s.oilLine.length > 1) {
      sec.appendChild(line(s.oilLine, '두바이유 월평균 추이선', 'dubai', C_OIL));
      var fm = s.oilLine[0].m.split('-');
      sec.appendChild(axis(fm[0].slice(2) + '.' + (+fm[1]) + ' 월평균', (+s.oilLast.m.slice(5)) + '월'));
    }
    if (!compact && s.fx) {
      var mini = h('div', 'smw-mini');
      var a = h('span'); a.appendChild(document.createTextNode('원/달러 ')); a.appendChild(h('b', '', s.fx.value.toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '원'));
      if (s.fx.change !== null) { var c = h('span', signCls(s.fx.change), ' ' + sign(s.fx.change)); a.appendChild(c); }
      mini.appendChild(a);
      sec.appendChild(mini);
    }
    return sec;
  }

  function tail(box, s) {
    if (s.note && s.note.text) {
      box.appendChild(h('div', 'smw-note-h', '이번 주 시장 해설'));
      box.appendChild(h('div', 'smw-note', sentences(s.note.text, CFG.noteMax || 400)));
    }
    if (LINK) {
      var a = h('a', 'smw-link', 'SMP·LNG 추이 전체 보기 →');
      a.href = LINK;
      box.appendChild(a);
    }
    box.appendChild(h('div', 'smw-foot', '출처: ' + [s.src.smp || '전력거래소', s.src.lng || 'JOGMEC', s.src.oil, s.src.fx].filter(Boolean).join(', ') + '. 시장 동향 참고 자료이며 개별 거래·투자 판단의 근거가 아닙니다.'));
  }

  function ticker(s) {
    var fxv = s.fx ? s.fx.value.toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : '—';
    var items = [
      ['육지 SMP 주간', f1(s.smp), '원/kWh', s.smpChg],
      ['제주 SMP 주간', f1(s.jeju), '원/kWh', s.jejuChg],
      ['SMP ' + s.month + ' 평균', f1(s.smpMonth), '원/kWh', s.smpMonthChg],
      ['JKM 아시아 LNG', f1(s.jkm ? num(s.jkm.jkm) : null), '$/MMBtu', s.jkmDir],
      ['TTF 유럽', f1(s.ttf), '$/MMBtu', s.ttfChg],
      ['Henry Hub 미국', f1(s.hh), '$/MMBtu', s.hhChg],
      ['두바이유', s.dubai ? f1(s.dubai.value) : '—', '$/배럴', s.dubai ? s.dubai.change : null, s.dubai ? s.dubai.basis : ''],
      ['원/달러', fxv, '원', s.fx ? s.fx.change : null, s.fx ? s.fx.basis : '']
    ];
    var box = h('div', 'smw-tick');
    box.setAttribute('role', 'marquee');
    box.setAttribute('aria-label', items.map(function (it) { return it[0] + ' ' + it[1] + it[2] + (it[3] ? ' ' + sign(it[3]) : ''); }).join(', '));
    var track = h('div', 'smw-track');
    track.setAttribute('aria-hidden', 'true');
    for (var rep = 0; rep < 2; rep++) {
      items.forEach(function (it) {
        var el = h('span', 'smw-item');
        el.appendChild(h('span', 'k', it[0]));
        el.appendChild(h('span', 'v', it[1]));
        el.appendChild(h('span', 'u', it[2]));
        if (it[3] !== null && it[3] !== undefined) el.appendChild(h('span', 'c ' + (it[3] > 0 ? 'up' : it[3] < 0 ? 'down' : ''), sign(it[3])));
        if (it[4]) el.appendChild(h('span', 'b', it[4]));
        track.appendChild(el);
        track.appendChild(h('span', 'smw-sep', '·'));
      });
    }
    box.appendChild(track);
    return box;
  }

  function renderCard(d) {
    var s = summarize(d);
    var card = h('aside', 'smw smw-card');
    card.setAttribute('aria-label', '이번 주 전력·가스 시세');
    card.appendChild(ticker(s));
    var head = h('div', 'smw-head');
    head.appendChild(h('span', 'smw-title', '전력·가스 시세'));
    head.appendChild(h('span', 'smw-date', s.range + ' 기준'));
    card.appendChild(head);
    card.appendChild(smpBlock(s, false));
    card.appendChild(jkmBlock(s, false));
    card.appendChild(oilBlock(s, false));
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
    bar.appendChild(ticker(s));
    var chev = h('span', 'smw-chev');
    chev.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f5c56" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    bar.appendChild(chev);
    band.appendChild(bar);

    var body = h('div', 'smw-body');
    var wrap = h('div');
    var inner = h('div', 'smw-inner');
    inner.appendChild(h('div', 'smw-meta', '이번 주 전력·가스 시세 · ' + s.range + ' 기준'));
    var two = h('div', 'smw-two');
    two.appendChild(smpBlock(s, true));
    two.appendChild(jkmBlock(s, true));
    inner.appendChild(two);
    var ob = oilBlock(s, true); ob.style.paddingTop = '14px';
    inner.appendChild(ob);
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

  function renderStrip(d) {
    var s = summarize(d);
    var tone = (location.search.match(/[?&]smwtone=(\w+)/) || [])[1] || CFG.stripTone || 'light';
    var el = h(LINK ? 'a' : 'div', 'smw smw-strip' + (tone === 'black' ? '' : ' t-' + tone));
    if (LINK) { el.href = LINK; el.setAttribute('aria-label', '전력·가스 시세 전체 보기'); }
    var lbl = h('span', 'smw-strip-lbl'); lbl.appendChild(h('i')); lbl.appendChild(document.createTextNode('이번 주 전력·가스 시세'));
    el.appendChild(lbl);
    el.appendChild(ticker(s));
    if (LINK) el.appendChild(h('span', 'smw-strip-go', '전체 보기 →'));
    return el;
  }

  var ABOUT = CFG.about || {
    eyebrow: '법률사무소 솔라리스 재생에너지팀',
    title: '지금 이런 상황이신가요?',
    items: [
      ['출력제어로 수익이 줄었습니다', '손실보상을 받을 수 있는지부터 봅니다', '/curtailment-legal-basis-compensation/'],
      ['발전량이 예상보다 적게 나옵니다', '시공사·설계사 책임을 인정한 판례', '/solar-output-loss-damages-precedents/'],
      ['발전소를 사거나 팔 계획입니다', '거래 구조 선택과 법률실사 순서', '/solar-plant-sale-structure-asset-share/'],
      ['분양받은 발전소가 약속과 다릅니다', '법원이 사기로 본 기준과 피해 회복', '/solar-power-plant-scam-precedents/'],
      ['이격거리 규제로 허가가 막혔습니다', '200m 상한과 조례 기준', '/solar-separation-distance-limit-200m/']
    ],
    series: ['연재', '출력제어의 법률적 쟁점 6편', '/renewable-energy-curtailment-causes/'],
    cta: ['변호사에게 직접 상담하기', '/contact/'],
    phone: '02-6001-2903',
    email: 'info@solarislaw.net'
  };
  function renderLeft() {
    var a = ABOUT;
    var box = h('aside', 'smw smw-left');
    box.setAttribute('aria-label', '상황별 안내');
    box.appendChild(h('div', 'smw-l-eyebrow', a.eyebrow));
    box.appendChild(h('div', 'smw-l-h', a.title));
    var ul = h('ol', 'smw-l-list');
    a.items.forEach(function (it, i) {
      var li = h('li'), link = h('a');
      link.href = it[2];
      link.appendChild(h('i', '', ('0' + (i + 1)).slice(-2)));
      var tx = h('div');
      tx.appendChild(h('b', '', it[0]));
      tx.appendChild(h('span', '', it[1]));
      link.appendChild(tx);
      li.appendChild(link); ul.appendChild(li);
    });
    box.appendChild(ul);
    if (a.series) {
      var sr = h('a', 'smw-l-series'); sr.href = a.series[2];
      sr.appendChild(h('em', '', a.series[0])); sr.appendChild(document.createTextNode(a.series[1] + ' 처음부터 읽기'));
      box.appendChild(sr);
    }
    var cta = h('a', 'smw-l-cta', a.cta[0]); cta.href = a.cta[1]; box.appendChild(cta);
    var c = h('div', 'smw-l-contact');
    var tel = h('a', '', 'T. ' + a.phone); tel.href = 'tel:' + a.phone.replace(/-/g, '');
    var em = h('a', '', 'E. ' + a.email); em.href = 'mailto:' + a.email;
    c.appendChild(tel); c.appendChild(h('br')); c.appendChild(em);
    box.appendChild(c);
    return box;
  }

  /* ---------- 지금 서울의 해: 태양 위치와 1MW 발전량 추정 ---------- */
  var LAT = 37.5665, LON = 126.978, RAD = Math.PI / 180, TILT = 30;
  function sunAt(ms) {
    var d = ms / 864e5 + 2440587.5 - 2451545.0;
    var g = (357.529 + 0.98560028 * d) * RAD, q = 280.459 + 0.98564736 * d;
    var L = (q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * RAD;
    var e = (23.439 - 0.00000036 * d) * RAD;
    var ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
    var dec = Math.asin(Math.sin(e) * Math.sin(L));
    var gmst = (18.697374558 + 24.06570982441908 * d) % 24;
    var ha = ((gmst * 15 + LON) * RAD) - ra;
    var la = LAT * RAD;
    var el = Math.asin(Math.sin(la) * Math.sin(dec) + Math.cos(la) * Math.cos(dec) * Math.cos(ha));
    var az = Math.atan2(-Math.sin(ha), Math.tan(dec) * Math.cos(la) - Math.sin(la) * Math.cos(ha));
    return { el: el / RAD, az: (az / RAD + 360) % 360 };
  }
  /* 맑은 날, 남향 30° 고정식, 시스템 효율 0.8 기준 1MW 출력(kW) */
  function powerKw(s) {
    if (s.el <= 0.5) return 0;
    var se = Math.sin(s.el * RAD), am = 1 / (se + 0.50572 * Math.pow(s.el + 6.07995, -1.6364));
    var dni = 1353 * Math.pow(0.7, Math.pow(am, 0.678));
    var cosi = se * Math.cos(TILT * RAD) + Math.cos(s.el * RAD) * Math.sin(TILT * RAD) * Math.cos((s.az - 180) * RAD);
    var poa = dni * Math.max(0, cosi) + 0.1 * dni * (1 + Math.cos(TILT * RAD)) / 2;
    return Math.max(0, Math.min(1000, poa * 0.8));
  }
  function kstDayStart(ms) { var k = ms + 9 * 36e5; return k - (k % 864e5) - 9 * 36e5; }
  function hm(ms) { var k = new Date(ms + 9 * 36e5); return ('0' + k.getUTCHours()).slice(-2) + ':' + ('0' + k.getUTCMinutes()).slice(-2); }
  function dayModel(now) {
    var d0 = kstDayStart(now), step = 5 * 6e4, pts = [], rise = null, set = null, total = 0, sofar = 0;
    for (var t = d0; t <= d0 + 864e5; t += step) {
      var s = sunAt(t), p = powerKw(s);
      if (rise === null && s.el > -0.833) rise = t;
      if (rise !== null && set === null && s.el < -0.833 && t > rise) set = t;
      pts.push({ t: t, p: p });
      total += p * step / 36e5;
      if (t <= now) sofar += p * step / 36e5;
    }
    return { pts: pts, rise: rise, set: set, total: total, sofar: sofar, now: powerKw(sunAt(now)), sun: sunAt(now) };
  }
  function won(v) {
    if (v >= 1e4) return '약 ' + Math.round(v / 1e4).toLocaleString('ko-KR') + '만 원';
    return '약 ' + Math.round(v).toLocaleString('ko-KR') + '원';
  }
  function renderSun(d) {
    var smp = summarize(d).smp;
    var box = h('aside', 'smw smw-sun');
    box.setAttribute('aria-label', '지금 서울의 해와 1MW 태양광 발전량 추정');
    function draw() {
      var now = Date.now(), m = dayModel(now);
      box.innerHTML = '';
      var eye = h('div', 'smw-sun-eye'); eye.appendChild(document.createTextNode('SOLARIS · 지금 서울의 해')); eye.appendChild(h('span', '', hm(now)));
      box.appendChild(eye);
      var W = 240, H = 110, x0 = m.rise - 36e5, x1 = m.set + 36e5;
      var X = function (t) { return (t - x0) / (x1 - x0) * W; }, Y = function (p) { return H - 6 - p / 1000 * (H - 22); };
      var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + (H + 4), role: 'img', 'aria-label': '오늘 1MW 태양광 발전량 곡선과 현재 해의 위치' });
      var defs = svgEl('defs', {}), gr = svgEl('linearGradient', { id: 'smwSunFill', x1: 0, y1: 0, x2: 0, y2: 1 });
      gr.appendChild(svgEl('stop', { offset: '0', 'stop-color': '#f7a23b', 'stop-opacity': '.55' }));
      gr.appendChild(svgEl('stop', { offset: '1', 'stop-color': '#f7a23b', 'stop-opacity': '.05' }));
      defs.appendChild(gr); svg.appendChild(defs);
      var vis = m.pts.filter(function (q) { return q.t >= x0 && q.t <= x1; });
      var line = vis.map(function (q, i) { return (i ? 'L' : 'M') + X(q.t).toFixed(1) + ' ' + Y(q.p).toFixed(1); }).join(' ');
      svg.appendChild(svgEl('line', { x1: 0, x2: W, y1: H - 6, y2: H - 6, stroke: '#d9d4cb', 'stroke-width': 1 }));
      svg.appendChild(svgEl('path', { d: line, fill: 'none', stroke: '#e3b77d', 'stroke-width': 1.4, 'stroke-dasharray': '3 3' }));
      var past = vis.filter(function (q) { return q.t <= now; });
      if (past.length > 1) {
        var pl = past.map(function (q, i) { return (i ? 'L' : 'M') + X(q.t).toFixed(1) + ' ' + Y(q.p).toFixed(1); }).join(' ');
        svg.appendChild(svgEl('path', { d: pl + ' L' + X(past[past.length - 1].t).toFixed(1) + ' ' + (H - 6) + ' L' + X(past[0].t).toFixed(1) + ' ' + (H - 6) + ' Z', fill: 'url(#smwSunFill)' }));
        svg.appendChild(svgEl('path', { d: pl, fill: 'none', stroke: '#e8731a', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
      }
      var day = now > m.rise && now < m.set;
      if (day) {
        var sx = X(now), sy = Y(m.now);
        svg.appendChild(svgEl('line', { x1: sx, x2: sx, y1: sy, y2: H - 6, stroke: '#e8731a', 'stroke-opacity': .35, 'stroke-width': 1 }));
        svg.appendChild(svgEl('circle', { cx: sx, cy: sy, r: 13, fill: '#ffb347', class: 'glow' }));
        svg.appendChild(svgEl('circle', { cx: sx, cy: sy, r: 6.5, fill: '#f28c18', stroke: '#fff', 'stroke-width': 2 }));
      }
      box.appendChild(svg);
      var ax = h('div', 'smw-sun-axis'); ax.appendChild(h('span', '', '일출 ' + hm(m.rise))); ax.appendChild(h('span', '', '일몰 ' + hm(m.set)));
      box.appendChild(ax);
      var lead = h('div', 'smw-sun-lead'), big = h('div', 'smw-sun-big');
      if (day) {
        lead.appendChild(document.createTextNode('지금 1MW 태양광 발전소는'));
        big.appendChild(h('b', '', Math.round(m.now).toLocaleString('ko-KR'))); big.appendChild(h('i', '', 'kW'));
        lead.appendChild(big); lead.appendChild(document.createTextNode('로 전기를 만들고 있습니다.'));
      } else {
        lead.appendChild(document.createTextNode(now < m.rise ? '아직 해가 뜨기 전입니다. 오늘 1MW 발전소는' : '해가 졌습니다. 오늘 1MW 발전소는'));
        big.appendChild(h('b', '', (m.total / 1000).toFixed(1))); big.appendChild(h('i', '', 'MWh'));
        lead.appendChild(big); lead.appendChild(document.createTextNode(now < m.rise ? '를 만들 것으로 보입니다.' : '를 만들었습니다.'));
      }
      box.appendChild(lead);
      var rows = h('div', 'smw-sun-rows');
      function row(k, v, c) { var r = h('div'); r.appendChild(h('span', '', k)); r.appendChild(h('b', c || '', v)); rows.appendChild(r); }
      if (day) row('지금까지', (m.sofar / 1000).toFixed(2) + ' MWh');
      row(now >= m.set ? '오늘 하루' : '오늘 하루 예상', (m.total / 1000).toFixed(1) + ' MWh');
      if (smp !== null) row('이번 주 SMP로 환산', won(m.total * smp), 'won');
      box.appendChild(rows);
      box.appendChild(h('div', 'smw-sun-note', '맑은 날, 남향 30° 설치 기준으로 계산한 추정치입니다. SMP 환산에는 REC 수익이 빠져 있습니다.'));
      var cta = h('a', 'smw-sun-cta', '우리 발전소 수익 구조 상담하기 →'); cta.href = (ABOUT.cta && ABOUT.cta[1]) || '/contact/';
      box.appendChild(cta);
    }
    draw();
    setInterval(draw, 60000);
    return box;
  }

  /* ---------- 포스트에 붙이기 ---------- */
  var POST_MIN = CFG.postStripMin || 768;
  function placePost() {
    if (!state.data) return;
    var head = document.querySelector('.gh-head') || document.querySelector('header');
    if (!head) return;
    var mode = window.innerWidth >= POST_MIN ? 'strip' : 'band';
    if (mode === state.mode) return;
    if (state.el) state.el.remove();
    var el;
    if (mode === 'strip') el = renderStrip(state.data);
    else { el = h('div', 'gh-canvas smw-post'); el.appendChild(renderBand(state.data)); }
    head.parentNode.insertBefore(el, head.nextSibling);
    state.el = el; state.mode = mode;
  }

  /* ---------- 블로그에 붙이기 ---------- */
  function findFeed() {
    var gh = document.querySelector('.feed-header');
    if (gh) {
      var wrap = gh.querySelector('.feed-header-wrapper') || gh;
      return { heading: gh, column: wrap, ghost: true };
    }
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
      if (state.left) { state.left.remove(); state.left = null; }
      if (mode === 'card') {
        if (LEFT_ON) { state.left = h('div', 'smw-lrail'); state.left.appendChild(CFG.leftMode === 'about' ? renderLeft() : renderSun(state.data)); document.body.appendChild(state.left); }
        var rail = h('div', 'smw-rail');
        rail.appendChild(renderCard(state.data));
        document.body.appendChild(rail);
        state.el = rail;
      } else {
        var band = renderBand(state.data);
        var holder = band;
        if (f.ghost) { holder = h('div', 'gh-canvas smw-holder'); holder.appendChild(band); }
        f.heading.parentNode.insertBefore(holder, f.heading);
        state.el = holder;
      }
      state.mode = mode;
    }
    if (mode === 'card') {
      var hb = (f.ghost ? f.column : f.heading).getBoundingClientRect();
      var top = hb.bottom + 24 + window.pageYOffset;
      state.el.style.left = (r.right + window.pageXOffset + GAP) + 'px';
      state.el.style.top = top + 'px';
      var card = state.el.firstChild;
      var ch = card.offsetHeight;
      state.el.style.height = Math.max(r.bottom + window.pageYOffset - top, ch) + 'px';
      card.style.position = ch + 48 < window.innerHeight ? 'sticky' : 'static';
      if (state.left) {
        state.left.style.top = top + 'px';
        state.left.style.left = (r.left + window.pageXOffset - GAP - 240) + 'px';
        state.left.style.display = r.left >= 240 + GAP + 24 ? '' : 'none';
      }
    }
  }

  function boot() {
    if (!DATA_URL) return;
    var on = /[?&]smw=preview\b/.test(location.search);
    try { if (on) sessionStorage.setItem('smw-preview', '1'); else on = sessionStorage.getItem('smw-preview') === '1'; } catch (e) {}
    var cls = document.body.classList;
    var isHome = cls.contains('home-template');
    /* 포스트 띠: 확정 전까지는 미리보기에서만 보임 */
    var isPost = cls.contains('post-template') && (CFG.posts === true || POSTS_DEFAULT || on);
    if (!isHome && !isPost && CFG.homeOnly !== false) return;
    if (CFG.preview && !on) return;
    LEFT_ON = CFG.left === true || LEFT_DEFAULT || on;
    var placer = isHome ? place : placePost;
    injectCss();
    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (d) {
        state.data = d;
        try { placer(); } catch (e) { if (state.el) state.el.remove(); return; }
        var t;
        var safe = function () { try { placer(); } catch (e) {} };
        window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(safe, 120); });
        window.addEventListener('load', safe);
      })
      .catch(function () { /* 데이터를 못 읽으면 아무것도 띄우지 않음 */ });
  }

  window.SolarisMarketWidget = { renderCard: renderCard, renderBand: renderBand, renderLeft: renderLeft, renderSun: renderSun, renderStrip: renderStrip, injectCss: injectCss };
  if (!CFG.manual) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})();
