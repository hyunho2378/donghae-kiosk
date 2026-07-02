// AI 추정 반복 약점 요약 카드 (PROMPT 08). 규칙 기반 문구 생성(추정형 표현, *·:·작은따옴표 없음).
// 톤은 기존 AI 분석 카드(AIPrescriptionCard)와 동일하게 재사용: 옅은 파란 배경 + dash-primary 볼드.
// 문구 생성 로직은 server/seed.js와 공유(weaknessSummary.js) — DB 시드 텍스트와 항상 동일하게 유지.

import { buildWeaknessSummaryText } from '../../lib/weaknessSummary.js'

function AIWeaknessSummary({ identifier, stuckSteps }) {
  return (
    <div className="rounded-dash-card bg-dash-select p-4">
      <p className="mb-1 text-dash-label text-dash-text-secondary">AI 추정 반복 약점 · {identifier}</p>
      <p className="text-dash-ai-body text-dash-primary">{buildWeaknessSummaryText(stuckSteps)}</p>
    </div>
  )
}

export default AIWeaknessSummary
