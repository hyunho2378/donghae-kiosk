-- server/schema.sql — NeonDB 스키마 문서 (PROMPT 08 설계 → PROMPT 09 실제 적용)
-- 실제 적용은 server/migrate.js(node server/migrate.js)가 담당 — 이 파일과 동일한 정의를
-- CREATE TABLE IF NOT EXISTS로 실행한다(반복 실행 안전). 이 파일은 사람이 읽는 참조 문서로 유지.
-- client/src/lib/mockRecordsClient.js가 server/routes/records.js(GET /api/records[/:identifier])를
-- 통해 이 스키마를 조회한다.

-- seniors: 식별자(YYMMDD-A) 단위 인물. 실명 등 개인정보 컬럼 없음.
CREATE TABLE IF NOT EXISTS seniors (
  id SERIAL PRIMARY KEY,
  identifier TEXT NOT NULL UNIQUE, -- 형식 YYMMDD-A (예: 260601-A). 최초 방문일 + 그날 발급 순서
  first_visit_date DATE NOT NULL,
  service TEXT NOT NULL -- FIX-L: 발급 서비스명(예: 졸업증명서 발급). 인물당 서비스 1종 고정
);

-- visits: 방문 단위. 한 senior가 여러 번 방문할 수 있다.
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  senior_id INTEGER NOT NULL REFERENCES seniors(id),
  visit_number INTEGER NOT NULL, -- 1차, 2차, 3차...
  visit_date DATE NOT NULL
);

-- step_logs: 방문 내 단계별(S1~S13) 체류 로그.
CREATE TABLE IF NOT EXISTS step_logs (
  id SERIAL PRIMARY KEY,
  visit_id INTEGER NOT NULL REFERENCES visits(id),
  screen_id TEXT NOT NULL, -- 예: S8
  screen_label TEXT NOT NULL, -- 예: 학교명 입력
  entered_at TIMESTAMPTZ NOT NULL,
  duration_seconds INTEGER NOT NULL,
  stuck BOOLEAN NOT NULL DEFAULT FALSE -- 8초 이상 체류 시 true(IA.md 막힘 판정 로직과 동일 기준)
);

-- ai_weakness_summaries: 방문 기록 기반 AI 추정 반복 약점 요약(캐시).
CREATE TABLE IF NOT EXISTS ai_weakness_summaries (
  id SERIAL PRIMARY KEY,
  senior_id INTEGER NOT NULL REFERENCES seniors(id),
  summary_text TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
