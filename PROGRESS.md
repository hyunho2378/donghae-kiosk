# PROGRESS.md

## 완료

- [x] 키오스크 실제 화면 13단계 사진 분석 및 확정
- [x] DESIGN.md / IA.md / COMPONENTS.md / PATTERNS.md / ROUTES.md / tokens.js 초안 작성
- [x] AI 목업 방식으로 전환 확정(실제 Gemini 호출 안 함), S1 졸업증명서 단일 클릭 제한 확정
- [x] client 셋업: Vite + React 18 JS/JSX + Tailwind v3 + react-router-dom + lucide-react, 데모 콘텐츠 제거
- [x] tokens.js → tailwind.config.js 연결 확인(bg-dash-bg, text-dash-status-stuck 등 빌드 확인됨)
- [x] COMPONENTS.md 기준 폴더 스캐폴딩(kiosk/{screens,modals,shared}, dashboard/, ai-panel/, data/, state/, lib/)
- [x] server/ Express + cors + dotenv + @google/genai 셋업, /api/gemini 501 스텁, curl 검증 완료
  - **현재 미사용 상태로 보류.** 이번 프로토타입은 mockAiClient.js로 대체하기로 확정했기 때문. 폐기하지 않고 나중에 real API 연동 시점에 재사용 예정.
- [x] npm run build(client), node index.js(server) 정상 동작 확인

## 진행중

- [ ] (다음 세션에서 PROMPT 08 시작 — 2회차 재방문 시뮬레이션: 이전 막힘 지점 기억)

## 완료 (FIX-H: 기기 섀시 전면 교체 — 실물 동해시청 발급기, 검정 몸체. 스크린 화면 미변경)

### 색/토큰
- [x] chassisColors 전면 교체: bodyMain #0F0F10(+bodyGradTop/Bottom 옅은 그라데이션), labelBorder 연두 #B7C94A→흰 #FFFFFF, neonAccent #FF3B5C, baseSilver/baseSilverDark, yellowReturn #F2C230, displayRed #FF3B3B, canopy/canopyEdge/canopyText, stickerBlue. 폐기: bodyLight/bodyDark/panelInset/returnBlue/bodyBottom/redLed. redButton/redactBar는 증명서 목업용 유지
- [x] layout: deviceBottomHeight 폐기 → canopyHeight 52 / bandHeight 150 / baseHeight 230 (deviceTopHeight 956 유지)

### 구조(위→아래)
- [x] Canopy(신규): 은/흰 캐노피 + 검정 800 "무인민원 발급창구"
- [x] 본체: 스크린 컬럼 + 우측 하드웨어 컬럼(신규 MoneyDisplay 빨간 7세그 "0" / CashInput 지폐투입구+동전레버 / ReturnButton 노란 원형+반환레버 / CardReader 은색 세로슬롯 재스킨 / QRScanner 신규)
- [x] 띠(신규 band): CertificateOutlet(재스킨 — 빨간 »»» 화살표 + 와이드 슬롯 빨간 네온 링, 프린터 라벨) 좌 + FingerprintScanner(재스킨 — 흰/은색 원형 장치 + 빨간 네온 링, 라벨 "지문확인") 중앙
- [x] 은색 받침대: ReceiptSlot/InfoSticker(신규 1577-XXXX)/AccessibilityKeypad(트레이 재스킨)/EarphoneJack 재배치
- [x] 제거: RedButton/GlossPanel/PaymentModule/ChangeTray 파일 삭제 + import 정리. HardwareLabel은 labelBorder 토큰만 바뀌어 전 라벨 흰 테두리로 일괄 반영

### 지문 이동 + 줌인 프레이밍(핵심 검증)
- [x] FingerprintScanner 하단 중앙 띠로 이동, S5 클릭→0.8초 스캔→onScanComplete(M6) 로직 그대로 유지
- [x] KioskCamera SCREEN_SCALE = 카메라높이 / (캐노피+본체+띠) = 956/1158 = 0.826. node 검증: 띠 device-y 1008~1158 ⊂ 줌인 가시범위 0~1158 → 지문확인 줌인에도 보임 ✓. FULL_SCALE 0.675
- [x] 검정 몸체 + 카메라 배경 bodyMain(검정)이라 줌인 좌우 여백(≈91px)이 몸체와 자연스레 이어짐(카메라 로직 자체 미변경, 프레이밍 범위만 조정)
- [x] 종이 출력: CertificateOutlet 슬롯 아래 클립(z-20) 유지 → 새 슬롯에서 종이 나옴, 기존 타이밍/PaperReceiveOverlay 연출 그대로

### 검증
- [x] npm run build 통과. 폐기 색키(bodyLight 등)·삭제 컴포넌트 잔존 0건. 스크린(S1~S13)에 chassis 참조 없음(화면 미변경)
- [x] dev 200, 콘솔 에러 없음. DESIGN.md 섀시 팔레트/구조 갱신

## 완료 (FIX-G: 도움말 오버레이 확대 + 강조링 실선 점멸 — 도움말 요소만)

### 1 HelpOverlay 확대 + 검정 텍스트
- [x] 텍스트 dash-body(14/400)→신규 help-text(22px/700). 색 help-bubble-text #5A4B00→#111111(검정, 대비)
- [x] 배경 help-bubble-bg #FFF7D6→#FFE58A(조금 더 진한 노랑, 톤 유지). 테두리 help-bubble-border 유지
- [x] 말풍선 패딩 px-5 py-3→px-6 py-5, Lightbulb 20→28, 폭 max-w-[600px]→w-full max-w-[680px](스크린 폭 70%+). 위치 하단 중앙(bottom-6) 유지, 잘림 없음
### 2 강조링 점선→실선+점멸
- [x] HELP_RING_CLASS: outline-2 outline-dashed → outline-[3px](실선 3px) + help-ring-blink. help-ring 색(#EAB308) 유지
- [x] index.css help-ring-blink 키프레임: outline-color 1↔0.4(#eab308↔#eab30866), 1s ease-in-out infinite. 8개 강조 대상(S1/S3=KioskTopBar/S4/S5=FingerprintScanner/S7/S9/S10/S12) 자동 반영
### 3 범위
- [x] 도움말 OFF 시 무렌더 유지(App 조건 그대로), 화면은 두 모드 동일. 섀시/대시보드/AI/키오스크 화면 미변경. 힌트 문구(helpHints 텍스트) 불변

### 검증
- [x] npm run build 통과. 생성 확인: text-help-text 22px/700, bg-help-bubble-bg rgb(255 229 138), text-help-bubble-text rgb(17 17 17), outline-[3px] 3px, @keyframes help-ring-blink(#eab308↔#eab30866). outline-dashed 잔존 0건
- [x] DESIGN.md help 팔레트/모드 원칙 갱신. dev 200, 콘솔 에러 없음

## 완료 (FIX-F: S1 메인화면 실물 재현 — 검정 배경 + 흰 글자, S1 전용)

### 1 배경/기본 색
- [x] tokens.js colors.kiosk에 main-bg #0A0A0A / main-bar #000000(상단바) / main-accent-blue #5BA3E8 추가(하이픈 키로 파일 컨벤션 통일)
- [x] S1 배경 bg-kiosk-white→bg-kiosk-main-bg(검정). 안내문 gray-text→white. 타이틀 노랑 유지
### 2 증명서 버튼 9개(아웃라인)
- [x] KioskButton(공유, S3~S13 사용) 대신 S1 로컬 버튼으로 렌더(공유 컴포넌트 미변경). 투명 배경 + border-kiosk-white 1px + rounded-kiosk-card(신규 8px) + 흰 글자. min-h-[76px]/문구/2열/클릭로직 유지(졸업증명서만 동작). cursor-pointer 9개 균일(IA.md 구분 없음)
### 3 상단 티커 바(S1 전용)
- [x] KioskFrame에 mainScreen prop 추가 → true일 때만 MainTickerBar(좌 재생/정지 알약 + 중앙 안내 + 우 29/시간연장 알약, 전부 장식 span). false면 기존 간단 바 그대로(S3~S13 바이트 동일). 바 배경 main-bar(#000, 스크린보다 약간 어둡게)
- [x] KioskDevice/App에 mainScreen 배선(session.step==='S1'). lucide Play/Pause 사용
### 4 처음으로(좌하단)
- [x] 흰 테두리 알약(rounded-full) + 투명 배경 + 흰 글자 + Home 아이콘. onHome(S1 초기화) 유지, 좌하단 self-start
### 5 하단 요소 3종
- [x] 무인민원발급기 워터마크: 중앙, text-kiosk-watermark(신규 38px/700) + text-kiosk-white/80 반투명. 장식(그리드~하단 라벨 사이 flex-1 중앙)
- [x] 현금가능·카드가능: 좌하단, text-kiosk-cash(신규 15px/600) + main-accent-blue(하늘색). 장식
- [x] 휠체어 사용자 보기: 우하단, 흰 알약 + lucide Accessibility. 장식 span
### 6 레이아웃
- [x] flex-col + 하단 flex-1 영역으로 워터마크 중앙 배치. 그리드 gap-3 유지(세로 여유 충분, 조일 필요 없음). S1에 어두운 글자 토큰 0건(navy-header/gray-text/gray-border/bg-kiosk-white 잔존 없음)

### 검증
- [x] npm run build 통과(1833). 신규 클래스 생성·값 확인(main-bg rgb(10 10 10)/main-bar rgb(0 0 0)/main-accent-blue rgb(91 163 232)/watermark 38px700/white\/80 #fffc/rounded-kiosk-card/border-kiosk-white)
- [x] S3~S13 미변경(공유 변경은 KioskFrame·KioskDevice의 mainScreen prop 추가뿐, default false로 기존 렌더 동일). KioskButton 미변경
- [x] dev 200, 콘솔 에러 없음

## 완료 (FIX-D: 대시보드 프로덕션급 정리 + 행 수 고정 + 종이 수령 연출 + 시간제한 20초)

### FIX1 대시보드 디자인 정리(AI티 제거)
- [x] 기본 카드 흰 배경 + 1px dash-border + radius 10px(dash-row) 통일. 완료 연초록 틴트 폐기
- [x] 막힘 카드: 흰 배경 유지 + 1.5px 빨간 테두리(border-emphasis) + 좌측 안쪽 3px 빨간 액센트(borderWidth.accent, 절대배치 span). 틴트 없음
- [x] 선택 카드: 1.5px 파란 테두리 + 옅은 파란 배경(dash-select #F5F8FF). 두꺼운 outline 제거
- [x] 상태: 알약 채움 뱃지 폐기 → 8px dot + 13px 700 텍스트(dash-label). 진행중 dot만 badge-blink
- [x] 아바타: 원형→radius 10px 라운드 사각(36px). A=파랑, B~F=dash-avatar-bg+dash-text-strong. "실습" 마커 서비스명 오른쪽 12px 파랑으로 이동
- [x] 타이포: 패널타이틀 20px 800, 서비스명 16px 700, 단계 14px 500/값 600(dash-step/step-strong, #4B5563), 진입 12px 500(dash-meta), AI 라벨 13px 700(dash-label), AI 본문 16px 700(dash-ai-body)
- [x] DESIGN.md 대시보드 타이포에 "12px 미만 금지 / 400 웨이트 본문 금지(최소 500)" 규칙 추가. AIPanel/EmptyState 안내문 dash-body(400)→dash-note(500)

### FIX2 행 수 고정(최대 6행, A 항상 1개)
- [x] CREATE_EVENT가 기존 real 행을 제거하고 교체(누적 방지). activeEventId 가드 제거 → 항상 real 1개
- [x] 막힘/완료 시 경과 카운트 정지: TICK 실제세션은 status==='progress'일 때만 갱신, advanceSim 막힘 last-step은 8초 확정 시 고정 후 return e
- [x] RESET_ALL 액션: 시뮬레이터(홈) 버튼/새로고침 시 A 제거 + B~F startDelay부터 재시작(initialEventsState 반환). handleSimulatorReset가 session RESET + events RESET_ALL + ref 초기화
- [x] DashboardPanel overflow-y-auto→overflow-hidden(px-1.5), EventList gap 8→10px(gap-2.5). 카드 패딩 py-3.5 px-4
- [x] node 검증: 시뮬 0~300초 틱 동안 경과 2분 초과 0건(막힘 8s·완료 8~12s 고정 관측)

### FIX3 시간제한 20초
- [x] timing.idleResetMs 30000→20000. 경고는 기존 마지막 10초 로직 그대로(코드 변경 없음)

### FIX4 종이 수령 연출(클릭→중앙 확대→유지→소멸)
- [x] session issuePhase에 'receiving' 추가 + RECEIVE_START 액션(paperReady→receiving)
- [x] CertificateCard.jsx 신규(표시 전용) — CertificatePaper(슬롯)와 PaperReceiveOverlay가 공유
- [x] CertificatePaper: leaving/fade 로직 제거, 클릭 즉시 onReceive(=RECEIVE_START). 슬라이드 출력만
- [x] PaperReceiveOverlay.jsx 신규: 좌측 영역 중앙 절대배치, rAF로 mount→scale 0.85→1.8+translateY 이동(move 400ms ease-out, 그림자 커짐)→hold 1000ms→fade 300ms→onDone. 전부 tokens.timing
- [x] onDone=handlePaperReceive(완료 처리+RECEIVE_PAPER). 카메라는 receiving 동안 'full' 유지→idle 복귀 시 줌인
- [x] index.css paper-leave/paper-leaving 제거(미사용). scale 예외 3호 DESIGN.md 등록

### 검증
- [x] npm run build 통과(1834 modules). 신규 클래스 생성 확인(border-emphasis/rounded-dash-row/bg-dash-select/gap-2.5/py-3.5/text-dash-label 등)
- [x] node verify_fixd.mjs 24/24 pass(A행 단일·경과고정·RESET_ALL·2분 초과 없음·종이 상태흐름)
- [x] dev 200, 콘솔 에러 없음

## 완료 (FIX-C: 좌측 줌/타이밍 + 우측 강사용 대시보드 전면 개편)

### PART 1 좌측
- [x] FIX1 줌: deviceTopHeight 1000→956(=카메라 가용높이) → 줌인 SCREEN_SCALE=1로 폭 꽉 참. 줌아웃 FULL_SCALE 0.95→0.98
- [x] FIX2 발급 속도: timing cameraMs 500 / modalPrinting 3000→1200 / paperSlideMs 800. CertificatePaper animationDuration 인라인 토큰화. 발급→종이 등장 ~2초
### PART 2 대시보드
- [x] FIX3 제목 "시니어 교육 강사용 대시보드", 우측 상하 500:500→600:400(layout dashboardHeight/aiPanelHeight)
- [x] FIX4 더미 폐기 → simulatedSeniors.js(B~F, 서비스/steps/timeline/outcome/startDelay). eventsReducer TICK 확장(advanceSim, demoStartAt), 상시 TICK. node 검증 13/13(등장 시차/진행/막힘/완료). A는 실제 세션(service '졸업증명서 발급', avatar 'A')
- [x] aiMockResponses에 GEN_MENU/ID/FINGERPRINT/OPTION/FEE/DONE 6종 추가(B~F 클릭 분석)
- [x] FIX5 카드 개편: [문자 아바타(A파랑+실습마커/B~F회색)][서비스명+현재단계+진입][상태뱃지][큰 경과초]
- [x] FIX6 상태 피드백: 진행중 뱃지 badge-blink(1.2s), 완료 연초록 배경+CircleCheck, 막힘 전환 순간 card-shake 1회(prevStatus ref로 감지)
- [x] FIX7 카드 4변 테두리: 스크롤 컨테이너 pr-1→px-1로 좌변 클립 방지
- [x] FIX8 AI 카드 원인/제안 본문 font-bold + dash-primary(파랑)
- [x] tokens 신규: timing(cameraMs/paperSlideMs), layout(dashboardHeight 600/aiPanelHeight 400/deviceTopHeight 956), dash status-done-bg. dummyEvents.js 삭제
- [x] npm run build 통과(1834), node 검증 13/13, dev 200

## 결정 사항 추가

- 시니어 시뮬레이션은 별도 엔진 없이 eventsReducer TICK 확장으로 구동(과설계 금지 준수). demoStartAt(첫 틱) 기준 startDelay 후 등장, timeline 따라 단계 전진, 막힘 시니어는 마지막 단계 8초 후 stuck
- TICK 상시 구동으로 변경(B~F가 키오스크와 무관하게 진행). 실제 A는 리듀서에서 activeEventId 가드라 안전
- 완료 경과초는 마지막 단계 체류값으로 고정(0초 방지), done은 빨강 제외
- 카드 shake는 prevStatusRef로 progress→stuck 전환 1회만 트리거(계속 흔들리지 않음)
- 줌인 폭 꽉 채움은 deviceTopHeight를 카메라 가용높이와 동일(956)하게 맞춰 SCREEN_SCALE=1 달성

## 완료 (FIX-B: 줌/종이/홈버튼/대시보드/AI 로딩 6건)

- [x] FIX1 기기 한 덩어리: KioskDevice 외곽에 bodyBottom 베이스 배경(흰 배경 새는 것 방지) + 하단부 상단 seam 보더. 하단 높이 700→480 축소
- [x] FIX2 줌아웃 스케일: KioskCamera FULL_SCALE = (가용높이 0.95)/기기전체높이 — 기기가 가용 높이의 ~95% 차지(창 크기 비례 계산). node 검증 908/956
- [x] FIX3 종이 클리핑: CertificateOutlet 슬롯 아래 overflow-hidden 클립 영역(300px), 종이 translateY -100%(슬롯 안 숨김)→-12%(물린 채 정지) 2초, forwards. 수령은 -12%에서 페이드
- [x] FIX4 홈 버튼: ModeControlBar "시뮬레이터"를 RotateCcw 버튼으로. onReset→dispatch RESET(세션/줌/종이 초기화, 이벤트는 보존, 모드 토글 유지). 데모 UI라 hover 허용
- [x] FIX5 대시보드 강화: 카드 좌(단계명 16/700 + 진입시각 + 상태) / 우(경과초 30/700 tabular-nums, 8초 미만 검정→8초 이상 빨강 200ms 전환). 패널 타이틀 20/700. 좌측 세로 바 부활 안 함
- [x] FIX6 AI 로딩 단축: mockAiClient 딜레이 timing.aiMockDelayMin 600/Max 1200(0.6~1.2초). node 실측 777ms
- [x] tokens 신규: dash-panel-title/dash-item-title/dash-elapsed 폰트, timing aiMockDelay, deviceBottomHeight 480
- [x] npm run build 통과, node 검증 5/5, dev 200

## 결정 사항 추가

- 기기 몸체 흰 배경 누출 방지: KioskDevice 외곽 컨테이너에 bodyBottom 베이스색을 깔아 어떤 빈틈도 차콜로 보이게
- 종이 "물린 채 정지"는 클립 영역 + translateY -12% 최종값(animation forwards)로 구현. 위 12%는 슬롯(클립 밖)에 가려짐
- 시뮬레이터 리셋은 이벤트를 SET_STATUS로 건드리지 않고 RESET만 → sync effect의 CLEAR_ACTIVE가 현재 상태/경과로 동결 보존(타임아웃처럼 강제 막힘 아님)
- 경과초 빨강 전환 기준은 elapsedMs >= stuckThresholdMs(8000)로 8초 막힘 판정과 일치

## 완료 (PROMPT 07: 모드 토글 도움말/시간제한/실제 + 타임아웃)

- [x] tokens.js: colors.help(bubble-bg/border/text, ring), timing.idleResetMs 30000, layout.controlBarHeight 44
- [x] state/modeReducer.js: helpOn/timeLimitOn 독립 토글 + SET_REAL_MODE 프리셋(둘 다 OFF). node 검증 통과
- [x] data/helpHints.js: 화면별 힌트 10종 + HELP_RING_CLASS(노란 점선)
- [x] controls/ModeControlBar.jsx(dash 계열, 기기 밖 상단 44px 바 — 도움말/시간제한 스위치 + 실제모드 프리셋 버튼 + 현재 상태 라벨)
- [x] controls/HelpOverlay.jsx(노란 말풍선, Lightbulb, 발급 연출 중 숨김), controls/TimeoutWarning.jsx(마지막 10초 카운트다운, pointer-events-none)
- [x] 목표 요소 강조: KioskTopBar(highlightNext), FingerprintScanner(highlight), S1/S4/S7/S9/S10/S12(핵심 요소) + S3/S8/S11(다음 버튼) — highlight prop 방식(절대좌표 오버레이 없음)
- [x] KioskCamera: controlBarHeight 반영해 SCREEN_SCALE/FULL_SCALE 재계산(기기 잘림 방지)
- [x] App: mode 리듀서, 전역 클릭 활동감지(registerActivity), 30초 무입력 타임아웃(마지막 10초 경고→S1 리셋+이벤트 막힘 보존), 발급 연출 구간 타임아웃 미적용
- [x] DESIGN.md: help 팔레트 + 모드 토글 원칙(화면 안 바꿈, 오버레이만) + 8초/30초 독립 명시
- [x] node 검증 10/10(모드 토글/프리셋, helpHints, 타임아웃 이벤트 보존+경과 고정), build 통과(1832), dev 200

## 결정 사항 추가

- 도움말은 실물 화면을 절대 바꾸지 않음(배움터 문제 회피). 힌트 말풍선(기기 밖) + highlight prop 노란 점선만. 절대좌표 오버레이 금지(줌/스케일 얽힘)
- 8초 막힘(강사 관찰, 항상) vs 30초 타임아웃(키오스크 재현, timeLimitOn만) 독립. 타임아웃 시 이벤트는 삭제 않고 막힘으로 경과 고정 보존
- 타임아웃 활동감지는 최상위 div onClick(버블링)으로 "아무 클릭이나 리셋". 경고 오버레이는 pointer-events-none이라 클릭이 통과되어 리셋+동작 동시
- 컨트롤 바 44px만큼 카메라 가시 높이 축소 → KioskCamera가 (1000-44) 기준으로 스케일 계산

## 완료 (PROMPT 06: 하단 섹션 + 줌 카메라 + 종이 출력)

- [x] tokens.js: chassisColors에 bodyBottom(#2E2E30)/redLed(#E74C3C)/redactBar(#C4C8CE) 추가, layout에 deviceTopHeight 1000 / deviceBottomHeight 700
- [x] index.css: paper-out(2초 슬라이드)/paper-leave(0.4초 페이드) 키프레임
- [x] sessionReducer: issuePhase('idle'|'printing'|'paperReady') + ISSUE_START/PRINTING_DONE/RECEIVE_PAPER. M13 자동 리셋 제거(DISMISS_MODAL은 M2/M6만)
- [x] chassis 하단 부품: CertificateOutlet(빨간 LED+와이드 슬롯), CertificatePaper(졸업증명서 목업 — 회색 바 가림+빨간 직인, 클릭 수령), AccessibilityKeypad(숫자부+기능부, 장식), ChangeTray(inset 트레이, 장식)
- [x] KioskCamera: view screen/full, transform scale(FULL_SCALE=1000/1700) + transition 0.9s ease-in-out, transform-origin top center, overflow hidden
- [x] KioskDevice 재구성: 상단부(1000, 금속) + 하단부(700, 차콜) 고정 세로 컨테이너
- [x] App: 카메라 view=issuePhase 파생, S12 발급→ISSUE_START, M13 종료→PRINTING_DONE(paperReady), 종이 클릭→handlePaperReceive(SET_STATUS done + RECEIVE_PAPER). 완료 처리를 종이 수령 시점으로 이동
- [x] DESIGN.md: 카메라 scale 예외(2곳만), chassis 하단 토큰/구조, 종이 목업 원칙 반영
- [x] node 발급흐름 검증 15/15 pass(발급→printing/full→M13종료→paperReady→수령→S1/idle/screen, 수령 전 초기화 안 됨, 완료는 수령 시점만), npm run build 통과(1828 modules), dev 200

## 결정 사항 추가

- 진짜 완료 시점 = 종이 수령(SET_STATUS done을 M13 종료가 아니라 종이 클릭으로 이동). 수령 전엔 세션 초기화 안 됨(발표자 타이밍 통제)
- 카메라 줌: 기기 자연 높이 1700(상단1000+하단700)을 좌측 영역 높이 1000에 맞춰 full 시 scale≈0.588. screen 시 scale 1로 상단부만 노출(하단 overflow hidden으로 클립)
- FingerprintScanner처럼 CertificatePaper도 수령 타이머(0.4초) unmount cleanup 포함
- 종이는 실물 문서 복제 금지 원칙에 따라 자체 졸업증명서 목업으로 제작

## 완료 (PROMPT 05: 레이아웃 65:35 + 기기 섀시 + 지문인식기)

- [x] tokens.js layout 65:35: leftPanelWidth 1040 / rightPanelWidth 560(옛 kioskPanelWidth/dashboardPanelWidth 제거). chassisColors 그룹 신설(bodyLight/bodyDark/panelInset/labelBg/labelBorder/labelText/metalSilver/glossBlack/redButton/returnBlue)
- [x] chassis/ 신설 — HardwareLabel(검정 알약+연두 테두리+흰 글씨 통일), RedButton, GlossPanel, PaymentModule(동전/반환/지폐), FingerprintScanner(동작), CardReader, EarphoneJack, ReceiptSlot 전부 CSS/SVG(이미지 없음)
- [x] KioskDevice 조립: 금속 몸체 세로 그라데이션 + 스크린 컬럼(700px, KioskFrame) + 하드웨어 컬럼(순서: RedButton→GlossPanel→PaymentModule→지문/카드 나란히→이어폰→영수증). PROMPT 06 대비 세로로 긴 컨테이너
- [x] KioskFrame를 두꺼운 검정 베젤(p-5 20px, radius 28px)로 개편
- [x] 지문인식기 연동: S5 화면 내 스캐너는 표시 전용(클릭 제거), 하드웨어 FingerprintScanner만 active(step===S5)일 때 클릭→0.8초 파란 스캔 라인(fp-scan keyframe)→M6. 다른 화면 클릭 무반응. S5 이탈 시 진행 중 스캔 취소(useEffect)
- [x] App 좌측을 KioskDevice로 교체(fingerprintActive/onFingerprint 전달), 좌 1040/우 560
- [x] DESIGN.md: 65:35 레이아웃, chassisColors 팔레트, 하드웨어 리얼리즘 예외(gradient/shadow는 섀시에만) 반영
- [x] npm run build 통과(1822 modules), dev 서버 200

## 결정 사항 추가

- 하드웨어 섀시는 gradient/box-shadow 허용(금속·유리 질감). 스크린 UI·우측 대시보드는 여전히 flat 유지 — DESIGN.md에 예외 명시
- 하드웨어 색은 inline style + chassisColors 참조(gradient/SVG 때문). 라벨/부품 전부 tokens 기반
- 지문 스캔 완료 콜백은 active 가드로 보호: S5 이탈 중 타이머 취소해 M6 오출력 방지

## 완료 (FIX-A: 실측 기반 스타일 수정 5건)

- [x] FIX1 scale-to-fit: App.jsx에 바깥 래퍼 + transform scale(min(w/1600,h/1000)), transform-origin top center, resize 리스너(cleanup 포함), 여백 kiosk-black-frame. 1600x1000 고정 캔버스 유지하며 창에 맞춤
- [x] FIX2 보라색 제거: tokens.js sample-badge #9333EA→#6B7280(회색), EventItem 좌측 바/예시 텍스트 dash-text-secondary로 교체. 빌드 CSS에 9333EA 잔존 0건 확인
- [x] FIX3 S1 버튼 높이 통일: 증명서 버튼 min-h-[76px] + flex items-center justify-center(줄 수 무관 동일 높이)
- [x] FIX4 헤더바 재설계: kiosk-header-bar #2A2A2E 토큰 추가, KioskTopBar를 [이전][다음] 좌측 나란히(작게, 연한 회색) + 타이틀 절대 중앙(흰색) + 홈 우측 구조로. navy-header는 텍스트 색으로 계속 사용
- [x] FIX5 hover 제거: 좌측 키오스크 11개 위치(KioskButton/NumericKeypad/HangulKeypad/S4/S5/S7/S8x2/S9/S10/S11/S12) hover 클래스 삭제. cursor-pointer/focus-visible 유지. 우측 대시보드 EventItem hover는 유지
- [x] DESIGN.md 갱신: scale-to-fit 예외, kiosk-header-bar 색, hover 금지 규칙, sample-badge 회색/보라 폐기 반영
- [x] npm run build 통과, header-bar 클래스 생성 확인, dev 서버 200

## 완료 (FIX-A 6: 이전/다음 비활성 회색 제거 — 외형·동작 분리)

- [x] KioskTopBar: nextEnabled prop/비활성 스타일 완전 제거. 다음은 이전과 동일한 활성 외형(연회색)으로 항상 표시·클릭 가능
- [x] 전환 게이팅을 화면 onNext로 이동: S3(13자리)·S8(2자 이상)은 조건 충족 시에만 onNext 호출(미충족 시 no-op → 전환 안 됨), S11은 항상 전환. 이전 버튼은 항상 직전 화면
- [x] DESIGN.md에 "이전/다음 비활성 스타일 금지(외형·동작 분리)" 규칙 추가
- [x] npm run build 통과, src 내 nextEnabled 잔존 0건, dev 서버 200

## 완료 (FIX-A 7: 대시보드 카드 좌측 세로 바 제거 — 단색화)

- [x] EventItem에서 좌측 세로 컬러 바 div(w-1 shrink-0) 완전 제거 + 미사용 accent/colors import 정리
- [x] 실제/예시 구분은 회색 "예시" 배지로만(실제=배지 없음). 카드 배경/테두리는 유지(일반=surface+border, 막힘=stuck-bg+stuck border)
- [x] DESIGN.md / PATTERNS.md 리스트 구분 규칙을 "예시 배지로만 구분, 세로 바 없음"으로 갱신
- [x] npm run build 통과, src 내 좌측 바(w-1 shrink-0) 잔존 0건, dev 서버 200

## 결정 사항 추가

- kiosk-navy-header는 헤더바 배경이 아니라 어두운 텍스트 색으로 여러 화면에서 쓰이므로 유지. 헤더바 배경은 신규 kiosk-header-bar로 분리
- 헤더 버튼 폰트는 키오스크 전용 small 토큰이 없어 dash-small(12px) 재사용(토큰 기반)
- 다음 버튼 조건 판정은 버튼 disabled가 아니라 화면 onNext 안에서 처리(항상 활성 외형 유지). GO_NEXT는 조건 충족 시에만 디스패치
- 대시보드 카드 실제/예시 구분은 좌측 컬러 바가 아니라 회색 "예시" 배지로만(단색 카드)

## 완료 (PROMPT 04)

- [x] tokens.js: modalDelay → timing(modalServerConnecting 1500 / modalVerificationDone 1200 / modalPrinting 3000) 리네이밍
- [x] sessionReducer: SELECT_CERTIFICATE→M2 모달 경유, SHOW_MODAL 추가, DISMISS_MODAL 라우팅(M2→S3/M6→S7/M13→리셋), SET_COPIES(S11), copies 상태 추가
- [x] eventsReducer: ADVANCE_SCREEN 액션(같은 이벤트를 새 화면으로 갱신 — 화면명/enteredAt/타이머/분석캐시 초기화)
- [x] shared/KioskModal(딤 오버레이) + shared/HangulKeypad(자모 조합 없이 이어붙이기)
- [x] modals/M2·M6·M13 — 각자 timing 후 onDone 자동 호출
- [x] screens/S4~S12 9개 — 스펙대로 구현(S4 모바일신분증 무반응, S5 스캐너 클릭→M6, S7 17지역 전부 클릭, S8 자모 이어붙이기, S9 고정 1건, S10 공개/비공개, S11 1-9 교체·항상 다음활성, S12 표+발급)
- [x] KioskFrame relative 처리(모달 오버레이 기준점)
- [x] App.jsx 전면 재작성: 화면 전환→대시보드 이벤트 동기화(effect), S3~S12 tick, 모달 렌더/자동전환, 모달 핸들러 useCallback 고정(tick 리렌더로 타이머 리셋되는 버그 방지)
- [x] node 통합검증 23/23 pass — 전체 한 바퀴(S1→M2→S3…S12→M13→S1 리셋), 이벤트 1개 유지+화면명 갱신, 완료는 S12 발급 시점만, 2회차 새 이벤트, 8초 막힘
- [x] npm run build 통과(1813 modules), dev 서버 200

## 결정 사항 추가

- 화면 전환은 화면 컴포넌트가 세션 액션만 디스패치하고, 대시보드 이벤트(ADVANCE_SCREEN/CREATE/CLEAR)는 App의 useEffect가 session.step 변화를 감지해 일괄 동기화. 이전(뒤로)도 자동으로 화면명 갱신됨
- S5의 "잘못된 위치" 빨강은 키오스크 팔레트에 없어 유일한 빨강 토큰 dash-status-stuck 재사용(하드코딩 아님)
- S8 학교명은 세션이 아니라 S8 로컬 상태(이후 화면에서 안 씀). S11 부수만 세션 상태(S12에서 표시)
- 모달 자동전환 타이머는 모달 컴포넌트 내부 useEffect(setTimeout)로 구현, 지정 시간 후 onDone 호출

## 완료 (PROMPT 03)

- [x] src/data/aiMockResponses.js — 지시대로 그대로 사용(S3~S12 화면별 causes/suggestions 풀). 실제 Gemini 호출 없음
- [x] src/lib/mockAiClient.js — getAnalysis({screenId, elapsedSeconds}) async, 1.5~2.5초 랜덤 딜레이 후 랜덤 1개씩 골라 resolve. 없는 화면(S1) reject. 실제 API 교체 쉽게 시그니처 유지
- [x] eventsReducer 확장 — 이벤트에 analysisStatus('idle'|'loading'|'done')/analysis 필드, REQUEST_ANALYSIS·RECEIVE_ANALYSIS 액션. 더미 이벤트/CREATE_EVENT 모두 필드 포함. node 검증 9/9 pass
- [x] ai-panel/EmptyState(MessageSquareDashed)·AIPrescriptionCard(화면명/경과/추정원인/강사제안)·AIPanel(5분기)
- [x] AIPanel 비동기: 막힘·완료 + idle → REQUEST + getAnalysis → RECEIVE. requestedRef Set으로 중복호출/StrictMode 방어. 응답은 이벤트 id로 캐시되어 stale 응답이 다른 패널에 안 뜸
- [x] App.jsx 우측 하단을 AIPanel로 교체(selectedEvent 파생 + eventsDispatch 전달)
- [x] npm run build 통과(1800 modules), dev 서버 200

## 결정 사항 추가

- AI 분석은 화면 진입이 아니라 "이벤트 선택 시점"에 트리거(막힘/완료 상태에서만). 진행중 선택 시 "아직 막힘이 감지되지 않았습니다"만 표시, 호출 없음
- stale 응답 방지: analysis를 이벤트별(id 키)로 저장 → 선택이 바뀌어도 응답이 해당 이벤트에만 반영. AIPanel은 항상 현재 selectedEvent만 렌더

## 완료 (PROMPT 02)

- [x] src/data/dummyEvents.js — 더미 이벤트 3개(막힘 S7 / 진행중 S9 / 완료 S12), 정적 고정
- [x] src/lib/timer.js — isStuck(8000ms 기준), formatElapsed("N초"/"N분 M초"), formatClock("HH:MM:SS")
- [x] src/state/eventsReducer.js — CREATE_EVENT(중복 방지)/TICK(경과 갱신+8초 막힘 전환)/SET_STATUS/SELECT_EVENT/CLEAR_ACTIVE, activeEventId 추적. node 검증 17/17 pass
- [x] dashboard/StatusBadge·EventItem·EventList·DashboardPanel — PATTERNS.md 카드/리스트/막힘 강조 규칙 준수(좌측 4px 바: 실제=dash-primary, 예시=dash-sample-badge / 막힘=stuck-bg+stuck border / 선택=dash-primary 아웃라인)
- [x] App.jsx 연결 — 우측 상단을 DashboardPanel로 교체. S3 진입 시 CREATE_EVENT(useEffect), S3 체류 중 1초마다 TICK(setInterval), 다음 클릭 시 SET_STATUS(done)+console.log
- [x] (선택) tokens.js에 kiosk 'yellow-title' #F5C518 추가 + DESIGN.md 팔레트 반영, S1 타이틀 노란색 적용
- [x] npm run build 통과(1795 modules), yellow 클래스 생성 확인, dev 서버 200

## 결정 사항 추가

- 이벤트 모델: 한 세션에 실제 이벤트 1개(activeEventId). S1 복귀 시 CLEAR_ACTIVE로 해제 → 재진입 시 새 이벤트. 막힘 이후에도 경과 시간은 계속 증가, 완료 시 경과 고정+목록 유지
- S1 타이틀 색상: PROMPT 01에서 파랑으로 정했으나 PROMPT 02 지시에 따라 노랑(#F5C518)으로 변경(배경은 화이트 유지)

## 완료 (PROMPT 01)

- [x] 실제 사진 매핑: IMG_7872=S1(교육제증명 서비스), IMG_7873=S2(서버접속중), IMG_7875=S3(주민번호+키패드), IMG_7876=S4(인증방법)
- [x] src/state/sessionReducer.js — S1~S13 상태머신 + 모달 플래그(activeModal). PAGE_ORDER 10개 페이지 선형 전환, GO_BACK/GO_HOME, INPUT/DELETE/CLEAR, DISMISS_MODAL 라우팅. node 검증 14/14 pass
- [x] src/components/kiosk/KioskFrame.jsx — 검정 프레임 690×920(3:4) + 상단 상태 티커 바
- [x] src/components/kiosk/KioskTopBar.jsx — 이전/다음/홈 + 타이틀, showBack·nextEnabled props 제어
- [x] shared/KioskButton.jsx(아웃라인/primary), shared/NumericKeypad.jsx(1-2-3/4-5-6/7-8-9/삭제-0-정정)
- [x] screens/S1_MainMenu.jsx — 증명서 버튼 9개(왼5+오4) + 처음으로. 졸업증명서만 onClick→S3, 나머지 8개 무동작(구분 없음)
- [x] screens/S3_IdInput.jsx — 마스킹 필드(6-7) + 키패드 재사용, 13자리 완료 시에만 다음 활성. 다음 클릭은 console.log("S4로 전환 예정")
- [x] App.jsx — 1600×1000 고정, 좌 800 키오스크 / 우 800(상하 500 대시보드·AI placeholder). useReducer 연결, S1↔S3 전환 동작
- [x] npm run build 통과(1788 modules), 토큰 클래스 전부 생성 확인, dev 서버 200

## 결정 사항 (사용자 확인 완료)

- S1 증명서 버튼: 사진 그대로 9개 확정(IA.md "10개"는 오기). 졸업증명서만 동작
- S1 색상: 화이트 배경 + 파랑 타이틀(DESIGN.md 팔레트 준수). 사진의 노란 타이틀은 채택 안 함, 새 색 토큰 추가 없음
- 폴더 구조: COMPONENTS.md 기준(src/components/kiosk/screens|modals|shared)

## 다음 작업

1. PROMPT 02(예정): 대시보드 이벤트 리듀서 + 더미 데이터 + 8초 막힘 판정(S3~S12 공통)
2. PROMPT 03(예정): aiMockResponses.js + mockAiClient.js + AI 패널 UI(빈/로딩/결과 상태)
3. PROMPT 04(예정): S4~S12 나머지 화면 순차 구현. 모달 컴포넌트(M2/M6/M13) 연결 시 SELECT_CERTIFICATE를 S2 경유로 교체
4. PROMPT 05(예정): 전체 연동 테스트, 2회차 재방문 시뮬레이션 로직

## 스코프 아웃 (지금은 안 함)

- 실제 Gemini API 연동 (server/는 이미 준비돼 있으니 나중에 mockAiClient.js만 교체하면 됨)

## 컨텍스트 관리 기준

컨텍스트 85% 도달 시 즉시 중단하고 이 파일 갱신 후 대기. 재시작 시 이 파일 먼저 읽고 이어서 진행.