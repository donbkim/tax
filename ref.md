# ref

## 목적

새로운 세션에서 반포자이 보유·양도 최적화 시뮬레이터의 구조와 배포 경로를 빠르게 파악하기 위한 참조 인덱스입니다. 이 문서는 작업 큐나 진행 상태 문서가 아닙니다.

`ref.md`는 참조 인덱스이며 작업 큐가 아닙니다. 현재 상태와 다음 작업 우선순위는 `handoff.md`에서 관리합니다. `update.md`는 아직 없습니다.

작업 시작 순서:

1. `AGENTS.md`
2. `handoff.md`
3. `ref.md`
4. 현재 작업과 관련된 `src/` 파일
5. 필요 시 형제 프로젝트 `../group-trip-account-app-script/README.md`

## 필수 문서

### AGENTS.md

단일 HTML SPA 제약, 금지된 시각화 방식, UI 언어·반응형 기준 및 양도소득세·종부세 계산 공식을 확인합니다. 세금 계산 엔진 변경 전에는 반드시 이 문서의 3장과 4장을 읽습니다.

### ref.md

현재 저장소의 문서, 코드 진입점, 배포 브랜치와 검증 명령을 확인합니다.

### handoff.md

현재 상태, 완료·검증 내역, 주의사항과 다음 작업 우선순위를 확인합니다. 새 세션의 활성 작업은 이 문서의 `Recommended next step`을 기준으로 시작합니다.

## 현재 작성된 문서

### webapp.md

초기 웹앱 설계·콘텐츠·화면 구성의 원본 참고 자료입니다. 런타임에서 사용되는 파일은 아니므로, 기능 변경은 `src/banpo_xi_tax_simulator.html`에 반영합니다.

### README.md (미작성)

사용 방법, 계산 전제, 로컬 실행·Apps Script·GitHub Pages 배포 과정을 기록할 문서입니다. 대외 배포 안내가 필요해지면 추가합니다.

### update.md (미작성)

코드·세법·배포 변경 시 함께 갱신할 문서 목록과 점검 기준을 기록할 문서입니다.

## 현재 코드 참조

### SPA 계산·UI

- `src/banpo_xi_tax_simulator.html`: 유일한 HTML 애플리케이션 파일입니다. Tailwind CDN, Chart.js CDN, 모든 UI/CSS/Vanilla JS 계산 엔진을 포함합니다.
  - `runSimulationEngine()`: 5개 시나리오의 양도소득세·종부세·대출 이자·총비용을 계산합니다.
  - `updateSimulation()`: 슬라이더 표시, 요약 카드, 비교표를 갱신하고 차트를 다시 그립니다.
  - `renderCharts()`: 기존 Chart.js 인스턴스를 `destroy()`한 뒤 비용·순이익 차트를 생성합니다.

### Google Apps Script 웹앱

- `src/Code.gs`: `doGet()`으로 HTML Service에서 시뮬레이터를 제공합니다.
- `src/appsscript.json`: Apps Script 런타임, 한국 시간대 및 웹앱 실행 설정입니다.
- `.clasp.json`: 로컬 Apps Script 연결 설정입니다. 민감한 식별자를 포함할 수 있으므로 커밋하지 않습니다.

### GitHub Pages

- `main` 브랜치: Apps Script 원본과 프로젝트 문서입니다.
- `gh-pages` 브랜치: GitHub Pages 배포 전용 브랜치입니다. 루트의 `index.html`과 `CNAME`만 유지합니다.
- 배포 도메인: <https://tax.dbserver.dedyn.io>

## 실행·검증·배포 명령

```bash
# 변경 상태 확인
git status --short

# 로컬 정적 확인 (브라우저에서 아래 URL을 연다)
python3 -m http.server 4173 --directory src
# http://127.0.0.1:4173/banpo_xi_tax_simulator.html

# Apps Script 반영 및 기존 웹앱 배포 갱신
clasp status
clasp push --force
clasp deployments

# GitHub Pages 배포 브랜치와 도메인 응답 확인
git ls-remote origin main gh-pages
curl -I https://tax.dbserver.dedyn.io/
```

## 외부 또는 형제 프로젝트 참조

- `../group-trip-account-app-script/README.md`: Google Apps Script와 `clasp` 배포 흐름의 참조 구현입니다.
- 이 프로젝트는 데이터 저장소·Google Sheets 기능을 사용하지 않습니다. 형제 프로젝트의 Apps Script 연결 ID, 배포 ID, 인증 정보는 재사용하지 않습니다.

## 종료 전 체크

```bash
git status --short
clasp status
curl -I https://tax.dbserver.dedyn.io/
```

- `.env`, `.clasp.json`, 브라우저 로그·스크린샷 등 인증 정보 또는 생성 산출물이 커밋 대상에 포함되지 않았는지 확인합니다.
- HTML 파일을 수정한 경우 슬라이더 재계산, 탭 전환, 시나리오 4 강조, 차트 재렌더링을 브라우저에서 확인합니다.
- 다음 작업 우선순위나 배포 상태가 바뀌면 `handoff.md`를 갱신합니다.
