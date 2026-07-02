# COMPONENTS.md — 컴포넌트 목록 및 스펙

## 최상위

- `App.jsx` — 전역 상태(Context/useReducer) 프로바이더, 3영역 레이아웃 조립
- `src/state/sessionReducer.js` — 키오스크 세션 상태머신 리듀서(S1~S13 + 모달 플래그)
- `src/state/eventsReducer.js` — 대시보드 이벤트 목록 리듀서
- `src/data/dummyEvents.js` — 예시(더미) 이벤트 2~3개 고정 데이터

## 좌측: 키오스크 영역 (`src/components/kiosk/`)

- `KioskFrame.jsx` — 물리 디바이스 프레임(검정 테두리), 내부에 현재 스크린 렌더. 상단 고정 검정 바(상태바 텍스트 영역, 실제 사진의 상단 잘린 문구 재현)도 포함
- `KioskTopBar.jsx` — "이전" / "다음" / 홈 아이콘 상단바. 화면별로 이전 유무, 다음 활성 조건 props로 제어
- `screens/S1_MainMenu.jsx`
- `screens/S3_IdInput.jsx` — 숫자 키패드 포함
- `screens/S4_AuthMethod.jsx`
- `screens/S5_Fingerprint.jsx` — 카운트다운 숫자, 올바른/잘못된 위치 이미지 쌍
- `screens/S7_EduOfficeSelect.jsx` — 17개 지역 그리드
- `screens/S8_SchoolNameInput.jsx` — 한글 자모 키패드
- `screens/S9_SchoolSelect.jsx` — 리스트 + 스크롤 화살표
- `screens/S10_PrivacySelect.jsx`
- `screens/S11_CopiesInput.jsx` — 숫자 키패드
- `screens/S12_FeeAndIssue.jsx` — 표 + 발급 버튼
- `modals/M2_ServerConnecting.jsx`
- `modals/M6_VerificationDone.jsx`
- `modals/M13_Printing.jsx`
- `shared/NumericKeypad.jsx` — S3, S11에서 재사용
- `shared/HangulKeypad.jsx` — S8 전용
- `shared/KioskButton.jsx` — 공통 버튼(아웃라인 스타일)
- `shared/KioskModal.jsx` — 모달 오버레이 공통 wrapper(딤 배경 + 중앙 정렬)

## 우측 상단: 대시보드 영역 (`src/components/dashboard/`)

- `DashboardPanel.jsx` — 패널 wrapper, 타이틀 + "개인별 기록 보기" 독립 버튼(헤더 우측) + 실시간 이벤트 목록. 버튼 클릭은 `onOpenRecords` 콜백으로 App에 위임(FIX-M — 탭 아님, 진입 트리거만 제공)
- `EventList.jsx` — 이벤트 항목 map 렌더
- `EventItem.jsx` — 개별 항목(화면 단계명, 진입 시각, 경과 시간 실시간 갱신, 상태 뱃지, 실제/예시 구분 바)
- `StatusBadge.jsx` — 진행중/막힘/완료 뱃지
- `RestartSimulationButton.jsx` — 2회차 재방문 시뮬레이션 트리거(데모 전용 컨트롤)

## 우측 전체: 개인별 기록 영역 (`src/components/records/`, PROMPT 08 — 강사 전용, 시니어에게 미노출)

FIX-M부터 탭이 아니라 App.jsx의 `rightView` state('live'|'records')로 전환되는 독립 화면. 진입 시 우측 영역 전체(대시보드 600 + AI 패널 400 = 1000px)를 차지한다.

- `RecordsView.jsx` — 전환 시 렌더되는 wrapper. "실시간 현황으로 돌아가기" 버튼(`onBack`) + 목록↔상세 내비게이션(selectedIdentifier) 관리
- `RecordsList.jsx` — 목록 wrapper. `mockRecordsClient.getRecordsList()` 호출
- `RecordCard.jsx` — 개별 카드(식별자, 최근 방문일, 방문 횟수, 최근 상태 한 줄 요약)
- `RecordDetail.jsx` — 상세 wrapper(뒤로가기 포함). `mockRecordsClient.getRecordDetail(identifier)` 호출
- `StuckRatioDonut.jsx` — 단계별 막힘 비율 SVG 도넛(라이브러리 없음), 중앙에 총 막힘 횟수
- `VisitTrendLine.jsx` — 방문별 막힘 추이 SVG 라인+점 차트(라이브러리 없음, 얇은 선)
- `VisitTimeline.jsx` — 방문별 타임라인(회차, 날짜, 막힌 단계 요약)
- `AIWeaknessSummary.jsx` — AI 추정 반복 약점 카드(규칙 기반 문구, 기존 AI 카드 톤 재사용)

## 우측 하단: AI 패널 영역 (`src/components/ai-panel/`)

- `AIPanel.jsx` — wrapper, 빈 상태 / 로딩 상태 / 결과 상태 분기. `mockAiClient.getAnalysis(...)` 호출해서 결과 받음(실제 네트워크 요청 없음)
- `AIPrescriptionCard.jsx` — 결과 카드(화면명, 경과 시간, 추정 원인, 강사 제안)
- `PreviousVisitBadge.jsx` — 2회차 시뮬레이션 시 "지난번 막힘 지점" 배지
- `EmptyState.jsx` — 기본 안내 문구 상태

## AI 목업 (`src/lib/`, `src/data/`)

서버 없음. 실제 Gemini API 호출 없이 목업으로 처리한다.

- `src/data/aiMockResponses.js` — 화면 ID(S3~S12)별 "추정 원인" 문구 배열 + "강사 제안" 문구 배열. 각 화면당 2개 이상 변형 보유
- `src/lib/mockAiClient.js` — `getAnalysis({ screenId, elapsedSeconds, backCount })` 형태의 async 함수. 내부에서 1.5~2.5초 랜덤 딜레이(`setTimeout` + Promise) 후 `aiMockResponses.js`에서 해당 화면 문구를 랜덤 선택해 반환. 함수 시그니처를 실제 API 클라이언트처럼 만들어두면 나중에 real Gemini 연동으로 교체하기 쉽다.

## 개인별 기록 데이터 (`src/lib/`, `src/data/`, PROMPT 08 더미 → PROMPT 09 실제 NeonDB 연동 → FIX-M 다시 프론트 고정)

Vercel에 Express 서버가 배포되지 않아 `/api/records`가 404 나는 문제를 우회하기 위해, FIX-M부터 다시 `dummyRecords.js`를 프론트에서 직접 반환한다. `server/` 쪽 DB 연동 파일은 삭제하지 않고 보존(나중에 재연결 시 사용).

- `src/data/dummyRecords.js` — 인물 10명(서비스 6종 — FIX-C GENERIC_STEPS 재사용 + 졸업증명서 S3~S12), 각 `{ identifier, service, visits: [{ visitNumber, date, stepLogs }] }`. 실명 등 개인정보 없음
- `src/lib/identifier.js` — `issueIdentifier(date, sameDayCount)` — YYMMDD-A 형식 식별자 발급 유틸
- `src/lib/weaknessSummary.js` — `aggregateStuckSteps(visits)` / `buildWeaknessSummaryText(stuckSteps)` 순수 함수. `RecordDetail.jsx`/`AIWeaknessSummary.jsx`와 `server/seed.js`가 공유
- `src/lib/mockRecordsClient.js` — `getRecordsList()` / `getRecordDetail(identifier)`. FIX-M부터 다시 `dummyRecords.js`를 직접 반환(네트워크 호출 없음, 즉시 resolve). 함수 시그니처·반환 shape 유지

### 서버 (`server/`, PROMPT 09 — NeonDB 실제 연결, 현재 클라이언트에서 미사용·보존)

- `server/db.js` — `DATABASE_URL`로 Neon 서버리스 SQL 클라이언트(`sql`) 생성·export. `server/.env`를 절대경로로 읽어 실행 위치(cwd) 무관하게 동작
- `server/schema.sql` — 4개 테이블 정의 문서(사람이 읽는 참조용, `CREATE TABLE IF NOT EXISTS`)
- `server/migrate.js` — `node server/migrate.js`로 schema.sql과 동일한 정의를 실제 적용(반복 실행 안전)
- `server/seed.js` — `node server/seed.js`로 `dummyRecords.js`를 seniors/visits/step_logs에, `weaknessSummary.js` 결과를 ai_weakness_summaries에 삽입. TRUNCATE 후 재삽입(반복 실행 안전)
- `server/routes/records.js` — `GET /api/records`, `GET /api/records/:identifier`. FIX-M부터 클라이언트가 호출하지 않지만 나중에 실제 연결 시 재사용
- `server/routes/records.js` — `GET /api/records`, `GET /api/records/:identifier`. `server/index.js`에 `/api/records`로 등록

## 공통

- `src/tokens.js` — DESIGN.md 컬러/타이포/간격 값 전부 export
- `src/lib/timer.js` — 8초 체류 판정 및 경과 시간 카운트 유틸