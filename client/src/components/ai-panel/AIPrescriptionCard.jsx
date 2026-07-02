// AI 처방 카드 (결과 상태) — 화면명 / 경과 시간 / 추정 원인 / 강사 제안
// PATTERNS.md 카드 규칙: dash-surface 배경 + dash-border 테두리 + radius 8px + 패딩 16px

import { formatElapsed } from '../../lib/timer.js'

function AIPrescriptionCard({ analysis, elapsedMs }) {
  return (
    <div className="rounded-dash-card border border-dash-border bg-dash-surface p-4">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <span className="text-dash-heading text-dash-text-primary">{analysis.screenLabel}</span>
        <span className="text-dash-small text-dash-text-secondary">
          경과 {formatElapsed(elapsedMs)}
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-1 text-dash-small text-dash-text-secondary">추정 원인</p>
        <p className="text-dash-ai-body font-bold text-dash-primary">{analysis.cause}</p>
      </div>

      <div>
        <p className="mb-1 text-dash-small text-dash-text-secondary">강사 제안</p>
        <p className="text-dash-ai-body font-bold text-dash-primary">{analysis.suggestion}</p>
      </div>
    </div>
  )
}

export default AIPrescriptionCard
