// DESIGN.md 기준 디자인 토큰. 색상·타이포·간격 값은 반드시 이 파일에서만 가져온다.

export const colors = {
  kiosk: {
    'blue-primary': '#1B4FD8',
    'blue-light': '#E8EEFB',
    'navy-header': '#16213D', // 어두운 본문/값 텍스트, 알림 타이틀
    'header-bar': '#2A2A2E', // 상단 헤더바 배경(거의 검정 회색, 실물 기준)
    white: '#FFFFFF',
    'gray-text': '#333333',
    'gray-border': '#C7CCD6',
    'black-frame': '#1A1A1A',
    'alert-blue': '#2255CC',
    'yellow-title': '#F5C518', // S1 타이틀(원본 사진 재현)
    // FIX-F: S1 메인화면 실물 재현(검정 배경 + 흰 글자). S1 전용, 다른 화면엔 안 씀.
    'main-bg': '#0A0A0A', // S1 스크린 콘텐츠 배경(실물 순검정에 가까움)
    'main-bar': '#000000', // S1 상단 티커 바(스크린 검정과 이어지되 약간 더 어둡게)
    'main-accent-blue': '#5BA3E8', // S1 하단 현금가능/카드가능 하늘색
    'stage-bg': '#5A5D63', // 좌측 기기 바깥 배경(중간 회색) — 검정 몸체 실루엣 대비 확보 (FIX-I)
  },
  dash: {
    bg: '#F7F8FA',
    surface: '#FFFFFF',
    border: '#E2E5EA',
    'text-primary': '#16181D',
    'text-secondary': '#6B7280',
    primary: '#1B4FD8',
    'status-progress': '#2563EB',
    'status-stuck': '#DC2626',
    'status-stuck-bg': '#FEF2F2',
    'status-done': '#16A34A',
    'status-done-bg': '#F0FDF4', // (FIX-D부터 미사용 — 완료 카드 틴트 폐기). 하위호환 위해 키 유지
    select: '#F5F8FF', // 선택 카드 옅은 파란 배경 (FIX-D)
    'avatar-bg': '#E8EAEE', // 시뮬 시니어(B~F) 아바타 배경 (FIX-D)
    'text-strong': '#4B5563', // 단계 텍스트·아바타 글자(진한 회색) (FIX-D)
    'sample-badge': '#6B7280', // 예시 항목 구분(회색). 보라색 폐기(FIX-A). 키는 하위호환 위해 유지
  },
  // 도움말 모드(PROMPT 07) — 시뮬레이터 오버레이용. 키오스크 화면 자체엔 안 쓴다.
  help: {
    'bubble-bg': '#FFE58A', // 말풍선 노란 배경(FIX-G: 조금 더 진하게, 존재감↑)
    'bubble-border': '#F5C518', // 말풍선 테두리
    'bubble-text': '#111111', // 말풍선 텍스트·아이콘(FIX-G: 검정, 대비 우선)
    ring: '#EAB308', // 목표 요소 노란 실선 강조링
  },
}

export const fontFamily = {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Apple SD Gothic Neo',
    'Pretendard',
    'sans-serif',
  ],
}

// [fontSize, { lineHeight, fontWeight }] — Tailwind fontSize 확장 규격
// Tailwind의 fontSize 스케일은 colors와 달리 중첩 객체를 자동으로 펼치지 않으므로 키를 평평하게 유지한다.
export const fontSize = {
  'kiosk-title': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
  'kiosk-body': ['17px', { lineHeight: '1.5', fontWeight: '400' }],
  'kiosk-button': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
  'kiosk-keypad': ['22px', { lineHeight: '1.2', fontWeight: '500' }],
  'kiosk-watermark': ['38px', { lineHeight: '1', fontWeight: '700' }], // S1 "무인민원발급기" 워터마크(FIX-F)
  'kiosk-cash': ['15px', { lineHeight: '1.2', fontWeight: '600' }], // S1 현금가능/카드가능 라벨(FIX-F)
  'help-text': ['22px', { lineHeight: '1.4', fontWeight: '700' }], // 도움말 말풍선 텍스트(FIX-G: 시니어 가독성, 이 값 아래로 X)
  'dash-heading': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
  'dash-body': ['14px', { lineHeight: '1.5', fontWeight: '400' }], // 키오스크 도움말 말풍선 등 비대시보드용
  'dash-small': ['12px', { lineHeight: '1.4', fontWeight: '400' }], // 컨트롤바/키오스크용(비대시보드)
  'dash-ai-body': ['16px', { lineHeight: '1.6', fontWeight: '700' }], // AI 원인/제안 본문(FIX-D 15→16, 볼드 내장)
  'dash-panel-title': ['20px', { lineHeight: '1.3', fontWeight: '800' }], // 패널 타이틀(FIX-D 700→800)
  'dash-item-title': ['16px', { lineHeight: '1.4', fontWeight: '700' }], // 서비스명·아바타 글자
  'dash-elapsed': ['30px', { lineHeight: '1', fontWeight: '700' }], // 경과초 큰 숫자(FIX-B)
  // FIX-D 대시보드 카드 타이포 — 규칙: 12px 미만 금지, 400 웨이트 본문 금지(최소 500)
  'dash-step': ['14px', { lineHeight: '1.4', fontWeight: '500' }], // "현재 단계:" 라벨
  'dash-step-strong': ['14px', { lineHeight: '1.4', fontWeight: '600' }], // 단계 값 강조
  'dash-meta': ['12px', { lineHeight: '1.4', fontWeight: '500' }], // 진입 시각/실습 마커
  'dash-label': ['13px', { lineHeight: '1.3', fontWeight: '700' }], // 상태 텍스트/AI 라벨
  'dash-note': ['14px', { lineHeight: '1.5', fontWeight: '500' }], // AI 패널 안내 본문
}

// 4pt 배수 간격 체계 (2pt 반단계 1.5/2.5/3.5는 FIX-D 카드 정밀 간격용)
export const spacing = {
  1: '4px',
  1.5: '6px', // 상태 dot 간격·스크롤 컨테이너 여백
  2: '8px',
  2.5: '10px', // 카드 간 간격
  3: '12px',
  3.5: '14px', // 카드 상하 패딩
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
}

export const radius = {
  'kiosk-button': '4px',
  'kiosk-card': '8px', // S1 증명서 버튼 아웃라인 라운드(FIX-F)
  'dash-card': '8px',
  'dash-row': '10px', // 시니어 카드·아바타(FIX-D)
}

// 강조 테두리/액센트 폭 (FIX-D)
export const borderWidth = {
  emphasis: '1.5px', // 막힘·선택 카드 강조 테두리
  accent: '3px', // 막힘 카드 좌측 세로 액센트
}

export const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
}

// 1600x1000 고정 데스크톱 캔버스 (DESIGN.md 레이아웃 그리드)
// 좌우 65:35 분할 — 좌측 키오스크 기기 1040 / 우측 대시보드·AI 560
export const layout = {
  viewportWidth: 1600,
  viewportHeight: 1000,
  leftPanelWidth: 1040,
  rightPanelWidth: 560,
  kioskPanelHeight: 1000,
  dashboardHeight: 600, // 우측 상단 대시보드 (FIX-C, 500→600)
  aiPanelHeight: 400, // 우측 하단 AI 분석 (FIX-C, 500→400)
  deviceFrameMaxHeight: 920,
  deviceFrameWidth: 690,
  deviceTopHeight: 956, // 본체(스크린 컬럼 + 우측 하드웨어 컬럼) 높이
  // FIX-H 실물 세로 구성: 캐노피 + 본체 + 증명서/지문 띠 + 은색 받침대
  canopyHeight: 52, // 상단 캐노피("무인민원 발급창구")
  bandHeight: 150, // 증명서 출구 + 지문확인 띠(스크린 바로 아래)
  baseHeight: 230, // 최하단 은색 받침대(영수증/스티커/시각장애인키보드/이어폰)
  controlBarHeight: 44, // 좌측 최상단 데모 컨트롤 바 높이 (PROMPT 07)
}

// 키오스크 하드웨어 섀시 색상 (FIX-H — 실물 동해시청 무인민원발급기: 검정 몸체, 전부 CSS/SVG)
export const chassisColors = {
  bodyMain: '#0F0F10', // 검정 몸체 기본
  bodyGradTop: '#1A1A1C', // 몸체 세로 그라데이션 위(옅은 광택)
  bodyGradBottom: '#0B0B0C', // 몸체 세로 그라데이션 아래
  bodyGloss: 'rgba(255,255,255,0.06)', // 광택 하이라이트(gradient용)
  labelBg: '#111111', // 라벨 알약 배경(검정)
  labelBorder: '#FFFFFF', // 라벨 흰 테두리(FIX-H: 연두 폐기)
  labelText: '#FFFFFF', // 라벨 흰 글씨
  neonAccent: '#FF3B5C', // 빨강/핑크 네온(증명서 출구·지문확인 링/화살표)
  baseSilver: '#B8BCC2', // 하단 받침대 은색(밝은쪽)
  baseSilverDark: '#8A8F98', // 받침대 은색 그라데이션 어두운쪽
  yellowReturn: '#F2C230', // 노란 원형 반환 버튼
  displayRed: '#FF3B3B', // 현재 금액 7세그먼트 빨강 숫자
  metalSilver: '#C7CBD1', // 은색 금속(슬롯/레버/카드리더/지문 링)
  glossBlack: '#0D0D0D', // 검정 광택(슬롯 홈/QR·지문 하우징)
  canopy: '#E8EAED', // 상단 캐노피 은/흰 패널
  canopyEdge: '#B7BCC4', // 캐노피 하단 음영(입체)
  canopyText: '#111111', // 캐노피 검정 굵은 글씨
  stickerBlue: '#1C3D6E', // 하단 받침대 안내 스티커(파란/검정 톤)
  redButton: '#C0392B', // 종이 직인(증명서 목업 CertificateCard 전용, 유지)
  redactBar: '#C4C8CE', // 종이 개인정보 가림 회색 바(CertificateCard, 유지)
}

export const modalDim = 'rgba(0, 0, 0, 0.35)'

// 모달 자동 전환 딜레이(ms) — PATTERNS.md 데모용 임의값
export const timing = {
  modalServerConnecting: 1500, // M2 서버 접속 중
  modalVerificationDone: 1200, // M6 본인확인 완료
  modalPrinting: 1200, // M13 인쇄중 (FIX-C 단축)
  idleResetMs: 20000, // 시간제한 모드: 무입력 20초 시 S1 초기화 (FIX-D 30→20, 경고는 마지막 10초)
  aiMockDelayMin: 600, // AI 목업 최소 딜레이(FIX-B, 단축)
  aiMockDelayMax: 1200, // AI 목업 최대 딜레이(FIX-B, 단축)
  cameraMs: 500, // 카메라 줌 전환(FIX-C, 0.9s→0.5s)
  paperSlideMs: 800, // 종이 슬라이드 출력(FIX-C, 2s→0.8s)
  // FIX-D 종이 수령 연출: 클릭→중앙 이동+확대(move)→유지(hold)→소멸(fade)
  paperReceiveMoveMs: 400,
  paperHoldMs: 1000,
  paperReceiveFadeMs: 300,
}

// IA.md: 동일 화면 8초 체류 시 '막힘' 전환
export const stuckThresholdMs = 8000

export const transition = {
  stuckState: '200ms ease',
}
