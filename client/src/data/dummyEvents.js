// 예시(더미) 이벤트 — 진행중/막힘/완료 섞어서 정적 고정 (IA.md: 실제 타이머와 무관)
// 좌측 바 색으로 실제(dash-primary)와 구분되도록 kind: 'sample'.
// enteredAt은 로드 시각 기준으로 그럴듯한 시각을 만들되, elapsedMs는 고정값(틱으로 갱신하지 않음).

const now = Date.now()

export const dummyEvents = [
  {
    id: 'sample-1',
    kind: 'sample',
    screenId: 'S7',
    screenLabel: '시·도교육청 선택',
    enteredAt: now - 95_000,
    elapsedMs: 95_000,
    status: 'stuck',
    analysisStatus: 'idle',
    analysis: null,
  },
  {
    id: 'sample-2',
    kind: 'sample',
    screenId: 'S9',
    screenLabel: '학교 선택',
    enteredAt: now - 5_000,
    elapsedMs: 5_000,
    status: 'progress',
    analysisStatus: 'idle',
    analysis: null,
  },
  {
    id: 'sample-3',
    kind: 'sample',
    screenId: 'S12',
    screenLabel: '수수료 투입 및 발급',
    enteredAt: now - 210_000,
    elapsedMs: 210_000,
    status: 'done',
    analysisStatus: 'idle',
    analysis: null,
  },
]
