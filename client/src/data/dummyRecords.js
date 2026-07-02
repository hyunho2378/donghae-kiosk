// 강사용 "개인별 기록" 더미 데이터 (PROMPT 08 → FIX-L: 10명, 서비스 6종 다양화)
// 실명 등 개인정보 없음 — identifier(YYMMDD-A)만 사용.
// 졸업증명서는 실제 S1~S13 중 관련 단계(S3~S12), 그 외 서비스는 FIX-C의 일반 단계
// taxonomy(simulatedSeniors.js GENERIC_STEPS)를 그대로 재사용한다.

// FIX-C 일반 서비스 6단계(simulatedSeniors.js와 동일 key/label)
const GENERIC_STEPS = [
  { key: 'GEN_MENU', label: '메뉴 선택' },
  { key: 'GEN_ID', label: '주민등록번호 입력' },
  { key: 'GEN_FINGERPRINT', label: '지문 인식' },
  { key: 'GEN_OPTION', label: '옵션 선택' },
  { key: 'GEN_FEE', label: '수수료 결제' },
  { key: 'GEN_DONE', label: '발급 완료' },
]
const GENERIC_FLOW = GENERIC_STEPS.map((s) => s.key)
const GENERIC_LABELS = Object.fromEntries(GENERIC_STEPS.map((s) => [s.key, s.label]))

// 졸업증명서 플로우 — 실제 S1~S13 중 S3~S12(App.jsx SCREEN_LABELS와 동일 라벨)
const GRAD_SCREEN_LABELS = {
  S3: '주민등록번호 입력',
  S4: '인증 방법 선택',
  S5: '지문 인식',
  S7: '시·도교육청 선택',
  S8: '학교명 입력',
  S9: '학교 선택',
  S10: '주민등록번호 공시여부 선택',
  S11: '부수 입력',
  S12: '수수료 투입 및 발급',
}
const GRAD_FLOW = Object.keys(GRAD_SCREEN_LABELS)

// stuckMap: { screenId: durationSeconds } — 막힌 단계만 넣는다. 나머지는 정상 통과(짧은 고정 체류 6초).
// 막힘 시간은 8~90초 범위에서 사람마다·단계마다 겹치지 않게 배정(하단 각 방문 주석 참고).
function makeVisit(flow, labels, visitNumber, date, stuckMap) {
  const stepLogs = flow.map((screenId) => {
    const stuck = screenId in stuckMap
    return {
      screenId,
      screenLabel: labels[screenId],
      stuck,
      durationSeconds: stuck ? stuckMap[screenId] : 6,
    }
  })
  return { visitNumber, date, stepLogs }
}

const makeGradVisit = (visitNumber, date, stuckMap) =>
  makeVisit(GRAD_FLOW, GRAD_SCREEN_LABELS, visitNumber, date, stuckMap)
const makeGenericVisit = (visitNumber, date, stuckMap) =>
  makeVisit(GENERIC_FLOW, GENERIC_LABELS, visitNumber, date, stuckMap)

function makePerson(identifier, service, visits) {
  return { identifier, service, visits }
}

export const dummyRecords = [
  // 졸업증명서 발급 — 주로 막힘: 수수료 투입 및 발급(S12) — 개선(4→2→1)
  makePerson('260601-A', '졸업증명서 발급', [
    makeGradVisit(1, '2026-06-01', { S8: 8, S9: 45, S11: 82, S12: 36 }),
    makeGradVisit(2, '2026-06-13', { S9: 73, S12: 27 }),
    makeGradVisit(3, '2026-06-23', { S12: 64 }),
  ]),
  // 가족관계증명서 발급 — 주로 막힘: 지문 인식 — 개선(3→1)
  makePerson('260601-B', '가족관계증명서 발급', [
    makeGenericVisit(1, '2026-06-01', { GEN_ID: 18, GEN_FINGERPRINT: 55, GEN_OPTION: 9 }),
    makeGenericVisit(2, '2026-06-10', { GEN_FINGERPRINT: 46 }),
  ]),
  // 주민등록등본 발급 — 주로 막힘: 옵션 선택 — 정체/소폭 악화(2→2→3)
  makePerson('260601-C', '주민등록등본 발급', [
    makeGenericVisit(1, '2026-06-01', { GEN_OPTION: 83, GEN_FEE: 37 }),
    makeGenericVisit(2, '2026-06-09', { GEN_OPTION: 74, GEN_ID: 28 }),
    makeGenericVisit(3, '2026-06-20', { GEN_OPTION: 65, GEN_FEE: 19, GEN_FINGERPRINT: 56 }),
  ]),
  // 지방세 납세증명 발급 — 주로 막힘: 주민등록번호 입력 — 꾸준한 개선(5→3→2→0, 완료)
  makePerson('260605-A', '지방세 납세증명 발급', [
    makeGenericVisit(1, '2026-06-05', {
      GEN_MENU: 10,
      GEN_ID: 47,
      GEN_FINGERPRINT: 84,
      GEN_OPTION: 38,
      GEN_FEE: 75,
    }),
    makeGenericVisit(2, '2026-06-12', { GEN_ID: 29, GEN_FINGERPRINT: 66, GEN_FEE: 20 }),
    makeGenericVisit(3, '2026-06-21', { GEN_ID: 57, GEN_OPTION: 11 }),
    makeGenericVisit(4, '2026-07-04', {}),
  ]),
  // 건축물대장 발급 — 주로 막힘: 메뉴 선택(처음부터 헤맴) — 정체(2→2)
  makePerson('260605-B', '건축물대장 발급', [
    makeGenericVisit(1, '2026-06-05', { GEN_MENU: 48, GEN_ID: 85 }),
    makeGenericVisit(2, '2026-06-19', { GEN_MENU: 39, GEN_FINGERPRINT: 76 }),
  ]),
  // 토지대장 발급 — 주로 막힘: 수수료 결제 — 첫 방문뿐(비교 불가 케이스)
  makePerson('260610-A', '토지대장 발급', [makeGenericVisit(1, '2026-06-10', { GEN_FEE: 30 })]),
  // 졸업증명서 발급 — 주로 막힘: 지문 인식(S5) — 개선(3→1→0, 완료)
  makePerson('260610-B', '졸업증명서 발급', [
    makeGradVisit(1, '2026-06-10', { S5: 67, S8: 21, S9: 58 }),
    makeGradVisit(2, '2026-06-16', { S5: 12 }),
    makeGradVisit(3, '2026-06-26', {}),
  ]),
  // 가족관계증명서 발급 — 주로 막힘: 옵션 선택 — 악화(1→3, 다른 단계에서 새로 막힘)
  makePerson('260615-A', '가족관계증명서 발급', [
    makeGenericVisit(1, '2026-06-15', { GEN_OPTION: 49 }),
    makeGenericVisit(2, '2026-06-27', { GEN_OPTION: 86, GEN_FEE: 40, GEN_FINGERPRINT: 77 }),
  ]),
  // 주민등록등본 발급 — 주로 막힘: 수수료 결제 — 개선(4→2→1)
  makePerson('260615-B', '주민등록등본 발급', [
    makeGenericVisit(1, '2026-06-15', { GEN_MENU: 31, GEN_ID: 68, GEN_FEE: 22, GEN_OPTION: 59 }),
    makeGenericVisit(2, '2026-06-24', { GEN_FEE: 13, GEN_OPTION: 50 }),
    makeGenericVisit(3, '2026-07-07', { GEN_FEE: 87 }),
  ]),
  // 지방세 납세증명 발급 — 주로 막힘: 주민등록번호 입력 — 정체(2→2)
  makePerson('260620-A', '지방세 납세증명 발급', [
    makeGenericVisit(1, '2026-06-20', { GEN_ID: 41, GEN_FINGERPRINT: 78 }),
    makeGenericVisit(2, '2026-06-30', { GEN_ID: 32, GEN_OPTION: 69 }),
  ]),
]
