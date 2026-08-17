# handoff

## 현재 상태

- 반포자이 보유·양도 최적화 시뮬레이터의 단일 HTML SPA는 `src/banpo_xi_tax_simulator.html`에 있습니다.
- Google Apps Script 웹앱과 GitHub Pages 배포 구성이 준비돼 있습니다.
- GitHub Pages는 `gh-pages` 브랜치에서 제공되며, 운영 주소는 <https://tax.dbserver.dedyn.io>입니다.
- 현재 계산·문구·비교표는 모두 부부 공동명의 50:50을 전제로 합니다.
- 새 세션의 코드·배포 경로 참조 인덱스는 `ref.md`입니다. 이 문서는 현재 상태와 다음 작업 우선순위만 관리합니다.

## 완료 작업

- `AGENTS.md`의 세법 계산식에 맞춰 5개 매도 시나리오, 슬라이더 기반 재계산, Chart.js 비용·순이익 차트를 구현했습니다.
- 차트 재렌더링 전 기존 인스턴스를 `destroy()`하도록 구성했습니다.
- Apps Script HTML Service 진입점(`src/Code.gs`) 및 매니페스트(`src/appsscript.json`)를 구성해 웹앱을 배포했습니다.
- GitHub `donbkim/tax` 저장소의 `main` 브랜치에 원본을, `gh-pages` 브랜치에 GitHub Pages용 정적 산출물을 배포했습니다.
- `tax.dbserver.dedyn.io`의 GitHub Pages 연결과 HTTPS 응답을 확인했습니다.

## 검증 상태

- 로컬 브라우저에서 초기 화면, 탭 전환, 매도가 슬라이더 변경과 초기화 동작을 확인했습니다.
- 기본값에서 시나리오 4가 `최적`으로 강조되는 것을 확인했습니다.
- `https://tax.dbserver.dedyn.io/`에서 HTTP 200 응답을 확인했습니다.

## Recommended next step

부부 공동명의를 켜고 끌 수 있는 옵션을 추가합니다.

1. `src/banpo_xi_tax_simulator.html`의 입력 제어 영역에 **부부 공동명의 50:50** 토글을 추가하고, 기본값은 켜짐으로 둡니다.
2. `runSimulationEngine()`에서 소유 형태에 따라 계산 단위를 전환합니다.
   - 공동명의: 현재처럼 과세대상 양도차익을 2로 나누고, 인당 장기보유특별공제 한도·기본공제·누진세를 적용한 뒤 세액을 2배 합니다.
   - 단독명의: 전체 과세대상 양도차익에 장기보유특별공제 한도·기본공제·누진세를 1회 적용합니다.
3. 헤더, 취득가액 라벨, 비교표 주석, 시나리오 설명 및 공동명의 탭 문구를 선택한 소유 형태와 일치하게 갱신합니다.
4. 종합부동산세의 현재 고정 시나리오 수치가 공동·단독 명의 옵션에 따라 바뀌어야 하는지 세법 전제를 먼저 확정한 뒤 구현합니다. 근거 없이 고정 수치만 재사용하지 않습니다.
5. 공동/단독 각각에서 슬라이더 변경, 5개 시나리오 재계산, 시나리오 4 강조, 차트 인스턴스 재생성을 브라우저에서 검증합니다.
6. 변경 후 Apps Script와 `gh-pages` 브랜치를 모두 갱신하고 운영 URL을 확인합니다.

## 주의사항

- `AGENTS.md`의 단일 HTML 원칙을 유지합니다. CSS, JavaScript, JSON을 별도 파일로 분리하지 않습니다.
- `src/banpo_xi_tax_simulator.html`의 차트 캔버스는 계속 `.chart-container`로 감싸야 합니다.
- `.env`와 `.clasp.json`은 인증·연결 정보를 포함하므로 출력하거나 커밋하지 않습니다.
- `webapp.md`는 초기 참고 자료이며 현재 Git 추적 대상이 아닙니다. 사용자 원본으로 취급합니다.
