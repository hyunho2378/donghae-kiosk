// 가상 시니어 B~F 라이브 시뮬레이션 시나리오 (FIX-C)
// A는 좌측 키오스크 실제 조작 세션(App에서 CREATE_EVENT). B~F는 여기 스크립트로 구동.
// 별도 엔진 없이 eventsReducer의 TICK 루프가 timeline을 따라 단계 전환/막힘/완료를 처리한다.

// 서비스 공통 일반 단계 (screenId는 AI 목업 GENERIC 키와 연결)
export const GENERIC_STEPS = [
  { key: 'GEN_MENU', label: '메뉴 선택' },
  { key: 'GEN_ID', label: '주민등록번호 입력' },
  { key: 'GEN_FINGERPRINT', label: '지문 인식' },
  { key: 'GEN_OPTION', label: '옵션 선택' },
  { key: 'GEN_FEE', label: '수수료 결제' },
  { key: 'GEN_DONE', label: '발급 완료' },
]

// outcome '완료' → 전체 단계, '막힘' → stuckAt 단계까지만(마지막 단계에서 8초 후 막힘)
function makeSenior({ id, service, outcome, stuckAt, timeline, startDelay }) {
  const steps = outcome === '완료' ? GENERIC_STEPS : GENERIC_STEPS.slice(0, stuckAt + 1)
  return {
    id,
    kind: 'sim',
    avatar: id,
    service,
    steps,
    timeline, // 각 단계 체류 초(단계 전환 간격). 마지막 단계는 timeline 없음.
    outcome,
    startDelay, // 데모 시작 후 등장 시각(초)
    appeared: false,
    stepIndex: 0,
    screenId: steps[0].key,
    screenLabel: steps[0].label,
    enteredAt: null,
    elapsedMs: 0,
    status: 'progress',
    analysisStatus: 'idle',
    analysis: null,
  }
}

export const simulatedSeniors = [
  // 완료 2명, 막힘 2명, 진행중(늦게 시작해 느리게) 1명 — startDelay로 등장 시차 분산
  makeSenior({ id: 'B', service: '가족관계증명서 발급', outcome: '완료', timeline: [6, 10, 8, 7, 9], startDelay: 3 }),
  makeSenior({ id: 'C', service: '주민등록등본 발급', outcome: '막힘', stuckAt: 2, timeline: [7, 9], startDelay: 6 }),
  makeSenior({ id: 'D', service: '지방세 납세증명 발급', outcome: '완료', timeline: [8, 7, 10, 6, 8], startDelay: 10 }),
  makeSenior({ id: 'E', service: '건축물대장 발급', outcome: '막힘', stuckAt: 4, timeline: [6, 8, 7, 9], startDelay: 8 }),
  makeSenior({ id: 'F', service: '토지대장 발급', outcome: '완료', timeline: [12, 12, 12, 12, 12], startDelay: 18 }),
]
