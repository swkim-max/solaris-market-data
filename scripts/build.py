"""data/*.csv 를 읽어 위젯이 쓰는 data/smp-lng.json 을 만든다."""
import csv, json, pathlib
D = pathlib.Path(__file__).resolve().parent.parent / 'data'
f = lambda v: None if v in ('', None) else float(v)
rows = lambda n: list(csv.DictReader(open(D / n, encoding='utf-8')))
sw, sm, lw, nt = rows('smp_weekly.csv'), rows('smp_monthly.csv'), rows('lng_weekly.csv'), rows('notes.csv')
nt.sort(key=lambda r: r['date'])
out = {
    "updated": nt[-1]['date'],
    "smp_weekly": [{"start": r['week_start'], "end": r['week_end'], "v": f(r['smp'])} for r in sorted(sw, key=lambda r: r['week_start'])],
    "smp_monthly": [{"m": r['month'], "v": f(r['smp'])} for r in sorted(sm, key=lambda r: r['month'])],
    "lng": [{"d": r['date'], "jkm": f(r['jkm']), "jkm_note": r['jkm_note'], "ttf": f(r['ttf']), "hh": f(r['hh'])} for r in sorted(lw, key=lambda r: r['date'])],
    "note": {"date": nt[-1]['date'], "text": nt[-1]['text']},
    "sources": {"smp": "전력거래소(해줌 집계)", "lng": "JOGMEC 주간 동향"},
}
(D / 'smp-lng.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
print('ok', len(out['smp_weekly']), len(out['lng']))
