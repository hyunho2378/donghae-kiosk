// 강사용 개인별 기록 조회 (PROMPT 08 목업 → PROMPT 09 실제 API → FIX-M 다시 프론트 고정 데이터)
// Express 서버가 Vercel에 배포되지 않아 /api/records가 404 나므로, 데모 목적상 dummyRecords.js
// (FIX-L, 10명)를 다시 직접 반환한다. server/routes/records.js·db.js·seed.js·migrate.js는 삭제하지
// 않고 보존(나중에 실제 DB 연결 시 재사용). 함수 시그니처·반환 shape은 그대로 유지.

import { dummyRecords } from '../data/dummyRecords.js'

function summarize(person) {
  const lastVisit = person.visits[person.visits.length - 1]
  const stuckSteps = lastVisit.stepLogs.filter((s) => s.stuck)
  const lastStatusSummary =
    stuckSteps.length === 0
      ? '막힘 없이 완료'
      : `최근 막힘 ${stuckSteps[stuckSteps.length - 1].screenLabel}`
  return {
    identifier: person.identifier,
    service: person.service,
    visitCount: person.visits.length,
    firstVisitDate: person.visits[0].date,
    lastVisitDate: lastVisit.date,
    lastStatusSummary,
  }
}

export async function getRecordsList() {
  return dummyRecords.map(summarize)
}

export async function getRecordDetail(identifier) {
  return dummyRecords.find((p) => p.identifier === identifier) ?? null
}
