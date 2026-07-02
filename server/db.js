// NeonDB 연결 모듈 (PROMPT 09). DATABASE_URL을 읽어 Neon 서버리스 SQL 클라이언트를 export한다.
// server/.env를 항상 이 파일 기준 절대경로로 읽는다 — cwd가 server/든 repo 루트든
// (node index.js vs node server/migrate.js) 동일하게 동작하게 하기 위함.

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env')
config({ path: envPath })

const { DATABASE_URL } = process.env

if (!DATABASE_URL) {
  console.error(`[db] DATABASE_URL이 비어있습니다. 확인 위치: ${envPath}`)
  throw new Error('DATABASE_URL이 설정되지 않았습니다')
}

export const sql = neon(DATABASE_URL)
