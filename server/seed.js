// PROMPT 08 더미 데이터(client/src/data/dummyRecords.js)를 실제 DB에 삽입 (PROMPT 09).
// 내용(식별자/방문 패턴/막힘 단계)은 그대로 재사용 — 새로 지어내지 않음.
// AI 요약 문구도 client/src/lib/weaknessSummary.js(PROMPT 08과 동일 로직)로 생성해 그대로 저장.
// node server/seed.js로 실행. 개발 편의상 TRUNCATE 후 재삽입(반복 실행 안전).

import { sql } from './db.js'
import { dummyRecords } from '../client/src/data/dummyRecords.js'
import { aggregateStuckSteps, buildWeaknessSummaryText } from '../client/src/lib/weaknessSummary.js'

async function seed() {
  // 자식 → 부모 역순으로 비움(외래키)
  await sql`TRUNCATE ai_weakness_summaries, step_logs, visits, seniors RESTART IDENTITY CASCADE`

  for (const person of dummyRecords) {
    const firstVisitDate = person.visits[0].date
    const [senior] = await sql`
      INSERT INTO seniors (identifier, first_visit_date, service)
      VALUES (${person.identifier}, ${firstVisitDate}, ${person.service})
      RETURNING id
    `

    for (const visit of person.visits) {
      const [visitRow] = await sql`
        INSERT INTO visits (senior_id, visit_number, visit_date)
        VALUES (${senior.id}, ${visit.visitNumber}, ${visit.date})
        RETURNING id
      `

      for (const step of visit.stepLogs) {
        // 실측 진입 타임스탬프가 없는 더미 데이터라 방문일 자정을 entered_at 대표값으로 사용
        await sql`
          INSERT INTO step_logs (visit_id, screen_id, screen_label, entered_at, duration_seconds, stuck)
          VALUES (${visitRow.id}, ${step.screenId}, ${step.screenLabel}, ${visit.date}, ${step.durationSeconds}, ${step.stuck})
        `
      }
    }

    const stuckSteps = aggregateStuckSteps(person.visits)
    const summaryText = buildWeaknessSummaryText(stuckSteps)
    await sql`
      INSERT INTO ai_weakness_summaries (senior_id, summary_text)
      VALUES (${senior.id}, ${summaryText})
    `

    console.log(`[seed] ${person.identifier} 완료 (방문 ${person.visits.length}회)`)
  }

  console.log(`[seed] 전체 완료 — 인물 ${dummyRecords.length}명`)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] 실패', err)
    process.exit(1)
  })
