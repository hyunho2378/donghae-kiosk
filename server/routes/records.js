// 강사용 개인별 기록 조회 API (PROMPT 09). server/schema.sql(seniors/visits/step_logs) 기준 Neon 쿼리.
// 반환 shape은 client/src/lib/mockRecordsClient.js가 PROMPT 08부터 쓰던 것과 동일하게 맞춘다.

import { Router } from 'express'
import { sql } from '../db.js'

const router = Router()

function toDateStr(d) {
  // Neon 드라이버는 DATE 컬럼을 로컬 자정 기준 Date 객체로 파싱한다(문자열로 올 때도 있어 둘 다 처리).
  // toISOString()은 UTC로 변환해 KST(UTC+9) 등에서 하루가 밀리므로 로컬 getter로 읽는다.
  if (typeof d === 'string') return d.slice(0, 10)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// GET /api/records — 전체 목록(식별자, 방문 횟수, 최초/최근 방문일, 최근 상태 한 줄 요약)
router.get('/', async (req, res) => {
  try {
    const seniors = await sql`
      SELECT id, identifier, service, first_visit_date FROM seniors ORDER BY identifier
    `
    const results = []
    for (const senior of seniors) {
      const visits = await sql`
        SELECT id, visit_number, visit_date FROM visits
        WHERE senior_id = ${senior.id}
        ORDER BY visit_number
      `
      if (visits.length === 0) continue
      const lastVisit = visits[visits.length - 1]
      const lastStuckSteps = await sql`
        SELECT screen_label FROM step_logs
        WHERE visit_id = ${lastVisit.id} AND stuck = true
        ORDER BY id
      `
      const lastStatusSummary =
        lastStuckSteps.length === 0
          ? '막힘 없이 완료'
          : `최근 막힘 ${lastStuckSteps[lastStuckSteps.length - 1].screen_label}`

      results.push({
        identifier: senior.identifier,
        service: senior.service,
        visitCount: visits.length,
        firstVisitDate: toDateStr(senior.first_visit_date),
        lastVisitDate: toDateStr(lastVisit.visit_date),
        lastStatusSummary,
      })
    }
    res.json(results)
  } catch (err) {
    console.error('[records] GET / 실패', err)
    res.status(500).json({ error: '기록 목록을 불러오지 못했습니다' })
  }
})

// GET /api/records/:identifier — 방문 이력 전체 + 단계별 로그
router.get('/:identifier', async (req, res) => {
  try {
    const [senior] = await sql`
      SELECT id, identifier, service FROM seniors WHERE identifier = ${req.params.identifier}
    `
    if (!senior) {
      return res.status(404).json({ error: '기록을 찾을 수 없습니다' })
    }

    const visits = await sql`
      SELECT id, visit_number, visit_date FROM visits
      WHERE senior_id = ${senior.id}
      ORDER BY visit_number
    `

    const visitsWithSteps = []
    for (const visit of visits) {
      const steps = await sql`
        SELECT screen_id, screen_label, stuck, duration_seconds FROM step_logs
        WHERE visit_id = ${visit.id}
        ORDER BY id
      `
      visitsWithSteps.push({
        visitNumber: visit.visit_number,
        date: toDateStr(visit.visit_date),
        stepLogs: steps.map((s) => ({
          screenId: s.screen_id,
          screenLabel: s.screen_label,
          stuck: s.stuck,
          durationSeconds: s.duration_seconds,
        })),
      })
    }

    res.json({ identifier: senior.identifier, service: senior.service, visits: visitsWithSteps })
  } catch (err) {
    console.error('[records] GET /:identifier 실패', err)
    res.status(500).json({ error: '기록을 불러오지 못했습니다' })
  }
})

export default router
