// server/schema.sql 스키마를 실제로 적용 (PROMPT 09). node server/migrate.js로 실행.
// CREATE TABLE IF NOT EXISTS라 반복 실행해도 안전. 정의는 schema.sql과 동일하게 유지한다.
// FIX-L: seniors.service 컬럼 추가 — 기존에 이미 생성된 테이블에는 CREATE TABLE IF NOT EXISTS가
// 컬럼을 소급 추가하지 못하므로 ALTER TABLE ADD COLUMN IF NOT EXISTS로 별도 보강한다.

import { sql } from './db.js'

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS seniors (
      id SERIAL PRIMARY KEY,
      identifier TEXT NOT NULL UNIQUE,
      first_visit_date DATE NOT NULL,
      service TEXT NOT NULL DEFAULT ''
    )
  `
  await sql`ALTER TABLE seniors ADD COLUMN IF NOT EXISTS service TEXT NOT NULL DEFAULT ''`
  await sql`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      senior_id INTEGER NOT NULL REFERENCES seniors(id),
      visit_number INTEGER NOT NULL,
      visit_date DATE NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS step_logs (
      id SERIAL PRIMARY KEY,
      visit_id INTEGER NOT NULL REFERENCES visits(id),
      screen_id TEXT NOT NULL,
      screen_label TEXT NOT NULL,
      entered_at TIMESTAMPTZ NOT NULL,
      duration_seconds INTEGER NOT NULL,
      stuck BOOLEAN NOT NULL DEFAULT FALSE
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS ai_weakness_summaries (
      id SERIAL PRIMARY KEY,
      senior_id INTEGER NOT NULL REFERENCES seniors(id),
      summary_text TEXT NOT NULL,
      generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
  console.log('[migrate] 4개 테이블 확인/생성 완료 (seniors, visits, step_logs, ai_weakness_summaries)')
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[migrate] 실패', err)
    process.exit(1)
  })
