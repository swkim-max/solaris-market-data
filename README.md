# solaris-market-data

법률사무소 솔라리스 재생에너지팀 블로그(energy-solarislaw.net) 메인 화면의 전력·가스 시세 위젯이 읽는 데이터와 위젯 코드입니다.

- `data/*.csv`: 원자료. 매주 월요일 Claude 예약 작업이 새 행을 덧붙입니다.
- `data/smp-lng.json`: 위젯이 읽는 파일. `python3 scripts/build.py`로 CSV에서 만듭니다.
- `widget/smp-widget.js`: Ghost 코드 삽입(Site footer)으로 불러오는 위젯.

출처: 육지 SMP는 전력거래소 자료, JKM·TTF·Henry Hub는 JOGMEC 주간 동향(Global LNG Hub 게재). 시장 동향 참고 자료이며 개별 거래·투자 판단의 근거가 아닙니다.
