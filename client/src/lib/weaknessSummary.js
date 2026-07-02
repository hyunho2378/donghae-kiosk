// 방문 기록에서 반복 막힘 단계 집계 + AI 추정 요약 문구 생성 (PROMPT 08에서 추출, PROMPT 09 공유)
// 순수 함수 — 클라이언트(RecordDetail.jsx, AIWeaknessSummary.jsx)와 서버 시드 스크립트(server/seed.js)가
// 동일 로직을 재사용해 시드 데이터의 AI 요약 문구가 새로 지어내지 않고 그대로 일치하게 한다.

export function aggregateStuckSteps(visits) {
  const counts = new Map()
  visits.forEach((visit) => {
    visit.stepLogs.forEach((step) => {
      if (!step.stuck) return
      const cur = counts.get(step.screenId) ?? {
        screenId: step.screenId,
        screenLabel: step.screenLabel,
        count: 0,
      }
      cur.count += 1
      counts.set(step.screenId, cur)
    })
  })
  return [...counts.values()].sort((a, b) => b.count - a.count)
}

export function buildWeaknessSummaryText(stuckSteps) {
  if (stuckSteps.length === 0) {
    return '지금까지 방문 기록에서는 특별히 반복되는 막힘 지점이 발견되지 않는 것으로 보입니다.'
  }
  const [top, second] = stuckSteps
  if (second && second.count >= top.count - 1) {
    return `${top.screenLabel} 단계와 ${second.screenLabel} 단계에서 반복적으로 어려움을 겪고 있는 것으로 추정됩니다. 다음 방문 시 해당 단계 안내를 우선해 주시면 도움이 될 것으로 보입니다.`
  }
  return `${top.screenLabel} 단계에서 매 방문마다 반복적으로 막히는 경향이 있는 것으로 추정됩니다. 다음 방문 시 이 단계를 먼저 안내해 주시면 도움이 될 것으로 보입니다.`
}
