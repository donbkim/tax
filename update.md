# update

## 목적

이 파일은 반포자이 보유·양도 최적화 시뮬레이터를 변경한 뒤 코드·세법·배포 문서를 빠뜨리지 않고 갱신하기 위한 체크리스트다.

`handoff.md`는 현재 상태와 다음 작업을, `ref.md`는 새 세션의 참조 순서를 관리한다. 이 파일은 문서 갱신 기준만 관리한다.

## 문서 업데이트 지시문

```text
작업 시작 시 AGENTS.md, handoff.md, ref.md, update.md를 읽고, 이번 변경사항을 기준으로 필요한 문서를 함께 업데이트하세요.

필수 확인 파일:
- AGENTS.md
- handoff.md
- ref.md
- update.md
- src/banpo_xi_tax_simulator.html
- src/Code.gs 및 src/appsscript.json (Apps Script 또는 배포 변경 시)

업데이트 기준:
1. 세법·공제·과세기준일·세액 산식 변경 시 AGENTS.md의 3장, HTML의 계산/해설/UI 문구, handoff.md를 함께 갱신한다.
2. 시나리오·입력값·차트·소유 형태 변경 시 AGENTS.md의 검증 항목, ref.md의 엔트리포인트 설명, handoff.md의 검증 상태를 갱신한다.
3. 집값 상승 등 가격 가정 변경 시 기준 연도·상승률·복리 방식, 상승 매도가에 따른 양도세 재계산, 기본 막대와 음영 레이어의 앞뒤 순서를 함께 검증하고 문서화한다.
4. Apps Script 또는 GitHub Pages 배포 경로·명령 변경 시 ref.md와 handoff.md를 갱신한다.
5. 새 문서를 추가하거나 문서 위치가 바뀌면 ref.md의 문서 목록과 이 파일의 필수 확인 파일을 갱신한다.
6. README.md는 아직 미작성이다. 사용자용 실행·배포 안내가 필요해져 새로 만들면 ref.md와 이 파일에 추가한다.
7. 작업 완료 후 실행한 검증과 미실행 사유를 handoff.md에 기록한다.
```

## 문서별 갱신 기준

| 문서 | 언제 갱신하는가 | 확인할 내용 |
| --- | --- | --- |
| `AGENTS.md` | 계산 로직·SPA 제약·검증 기준이 바뀔 때 | 세법 공식, 단일 HTML 원칙, 차트 제약, 변경 이력 |
| `handoff.md` | 현재 상태·배포·검증·다음 작업이 바뀔 때 | 완료 작업, 검증 결과, Recommended next step |
| `ref.md` | 문서·코드 진입점·실행/배포 명령이 바뀔 때 | 새 세션 읽기 순서, 실제 파일 경로, 검증 명령 |
| `update.md` | 갱신 대상 문서나 판단 기준이 바뀔 때 | 필수 확인 파일, 문서 책임, 종료 전 점검 |
| `src/banpo_xi_tax_simulator.html` | 모든 제품·계산·UI 변경 시 | HTML/CSS/JS가 단일 파일에 있고 한국어 UI·차트 컨테이너 제약을 지키는지 |
| 가격 가정 차트 | 기준 매도가·상승률·차트 레이어가 바뀔 때 | 기준 연도, 복리 산식, 상승 매도가 양도세 재계산, 회색 음영이 기준 막대 뒤에 표시되는지 |
| `src/Code.gs`, `src/appsscript.json` | Apps Script 진입점·권한·런타임이 바뀔 때 | `doGet()` 경로, 배포 설정, 웹앱 동작 |

## 확인 명령

```bash
# 문서·소스와 변경 상태 확인
find . -maxdepth 2 -type f | sort
git status --short
git diff --check

# HTML 내 JavaScript 문법 확인
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('src/banpo_xi_tax_simulator.html', 'utf8');
new Function(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
console.log('JavaScript syntax: OK');
NODE

# 로컬 화면 확인
python3 -m http.server 4173 --directory src
# http://127.0.0.1:4173/banpo_xi_tax_simulator.html

# 배포가 필요한 변경일 때
clasp status
git ls-remote origin main gh-pages
curl -I https://tax.dbserver.dedyn.io/
```

## 커밋 또는 세션 종료 전 점검

- [ ] 세법·시나리오·공제 한도 변경이 `AGENTS.md`, HTML 설명문, `handoff.md`에 함께 반영됐는가?
- [ ] 새 문서·코드 진입점·명령 변경이 `ref.md`와 이 파일에 반영됐는가?
- [ ] 슬라이더 재계산, 시나리오 4 강조, 종부세 과세기준일 전·후 차이, 양도세 공제 한도, 차트 재생성을 확인했는가?
- [ ] 가격 가정 차트가 기준 매도가 막대 뒤에 음영으로 표시되고, 상승 매도가 기준 양도세가 재계산되는 것을 확인했는가?
- [ ] Apps Script와 GitHub Pages를 배포했다면 배포 대상과 운영 응답을 확인했는가?
- [ ] `.env`, `.clasp.json`, `.playwright-cli/`, `output/` 및 사용자 미추적 파일이 커밋에 포함되지 않았는가?
- [ ] 검증 결과와 남은 과제를 `handoff.md`에 기록했는가?

## 문서별 책임

- `AGENTS.md`: 프로젝트 제약, 세법 계산 규칙, 개발·검증 기준.
- `handoff.md`: 현재 상태, 완료·검증 내역, 다음 우선순위.
- `ref.md`: 새 세션용 참조 인덱스와 코드·배포 경로.
- `update.md`: 작업 후 문서 갱신 체크리스트.
- `webapp.md`: 초기 화면 구성 참고 자료이며 런타임 소스가 아니다.
- `src/banpo_xi_tax_simulator.html`: 유일한 런타임 SPA 소스.
