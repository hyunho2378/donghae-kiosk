// 강사용 개인별 기록 조회 (PROMPT 08 목업 → PROMPT 09 실제 API 연동)
// 파일명은 유지(다른 곳에서 이 경로로 import 중). 함수 시그니처(getRecordsList/getRecordDetail)와
// 반환 shape은 그대로라 RecordsList.jsx/RecordDetail.jsx는 손댈 필요 없음.
// 실제 엔드포인트: server/routes/records.js (server/schema.sql 기준 Neon 쿼리).

async function request(path) {
  const res = await fetch(path)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `요청 실패 (${res.status})`)
  }
  return res.json()
}

export async function getRecordsList() {
  return request('/api/records')
}

export async function getRecordDetail(identifier) {
  return request(`/api/records/${encodeURIComponent(identifier)}`)
}
