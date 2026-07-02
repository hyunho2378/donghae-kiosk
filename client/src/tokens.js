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
    'status-done-bg': '#F0FDF4', // 완료 카드 연초록 배경 (FIX-C)
    'sample-badge': '#6B7280', // 예시 항목 구분(회색). 보라색 폐기(FIX-A). 키는 하위호환 위해 유지
  },
  // 도움말 모드(PROMPT 07) — 시뮬레이터 오버레이용. 키오스크 화면 자체엔 안 쓴다.
  help: {
    'bubble-bg': '#FFF7D6', // 말풍선 노란 배경
    'bubble-border': '#F5C518', // 말풍선 테두리
    'bubble-text': '#5A4B00', // 말풍선 어두운 텍스트
    ring: '#EAB308', // 목표 요소 노란 점선 강조
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
  'dash-heading': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
  'dash-body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
  'dash-small': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
  'dash-ai-body': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
  'dash-panel-title': ['20px', { lineHeight: '1.3', fontWeight: '700' }], // 패널 타이틀 강화(FIX-B)
  'dash-item-title': ['16px', { lineHeight: '1.4', fontWeight: '700' }], // 카드 단계명 강화(FIX-B)
  'dash-elapsed': ['30px', { lineHeight: '1', fontWeight: '700' }], // 경과초 큰 숫자(FIX-B)
}

// 4pt 배수 간격 체계
export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
}

export const radius = {
  'kiosk-button': '4px',
  'dash-card': '8px',
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
  deviceTopHeight: 956, // 기기 상단부 자연 높이 = 카메라 가용 높이(1000-44) → 줌인 시 폭/높이 꽉 채움 (FIX-C)
  deviceBottomHeight: 480, // 기기 하단부(증명서 출구/시각장애인키보드/거스름돈) 높이 (FIX-B 축소)
  controlBarHeight: 44, // 좌측 최상단 데모 컨트롤 바 높이 (PROMPT 07)
}

// 키오스크 하드웨어 섀시 색상 (PROMPT 05 — 실물 기기 재현, 전부 CSS/SVG)
export const chassisColors = {
  bodyLight: '#9EA3AB', // 금속 몸체 밝은 부분(세로 그라데이션 양끝)
  bodyDark: '#7E838C', // 금속 몸체 어두운 부분(그라데이션 중앙)
  panelInset: '#5A5E66', // 음각 패널 배경
  labelBg: '#111111', // 라벨 알약 배경
  labelBorder: '#B7C94A', // 라벨 연두 테두리
  labelText: '#FFFFFF', // 라벨 흰 글씨
  metalSilver: '#C7CBD1', // 은색 금속(투입구/슬롯)
  glossBlack: '#0D0D0D', // 검정 광택 패널
  redButton: '#C0392B', // 상단 빨간 장식 버튼 / 종이 직인
  returnBlue: '#2563EB', // 반환버튼 파란 원 / 지문 스캔 라인
  bodyBottom: '#2E2E30', // 하단 몸체(상단보다 어두운 차콜)
  redLed: '#E74C3C', // 증명서 출구 빨간 LED
  redactBar: '#C4C8CE', // 종이 개인정보 가림 회색 바
}

export const modalDim = 'rgba(0, 0, 0, 0.35)'

// 모달 자동 전환 딜레이(ms) — PATTERNS.md 데모용 임의값
export const timing = {
  modalServerConnecting: 1500, // M2 서버 접속 중
  modalVerificationDone: 1200, // M6 본인확인 완료
  modalPrinting: 1200, // M13 인쇄중 (FIX-C 단축)
  idleResetMs: 30000, // 시간제한 모드: 무입력 30초 시 S1 초기화 (PROMPT 07)
  aiMockDelayMin: 600, // AI 목업 최소 딜레이(FIX-B, 단축)
  aiMockDelayMax: 1200, // AI 목업 최대 딜레이(FIX-B, 단축)
  cameraMs: 500, // 카메라 줌 전환(FIX-C, 0.9s→0.5s)
  paperSlideMs: 800, // 종이 슬라이드 출력(FIX-C, 2s→0.8s)
}

// IA.md: 동일 화면 8초 체류 시 '막힘' 전환
export const stuckThresholdMs = 8000

export const transition = {
  stuckState: '200ms ease',
}
