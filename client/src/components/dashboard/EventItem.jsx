// 개별 이벤트 항목 (PATTERNS.md 카드 + 리스트 규칙)
// - 실제/예시 구분: 회색 "예시" 배지만 사용(좌측 세로 컬러 바 없음, FIX-A 7)
// - 좌: 단계명 + 진입 시각 + 상태 배지 / 우: 큰 경과초 (FIX-B)
// - 경과초 색: 8초 미만 검정, 8초 이상(막힘 판정) 빨강, 200ms 전환
// - 막힘 카드: 배경 dash-status-stuck-bg + 테두리 dash-status-stuck / 선택: dash-primary 아웃라인

import StatusBadge from './StatusBadge.jsx'
import { formatClock, formatElapsed } from '../../lib/timer.js'
import { stuckThresholdMs } from '../../tokens.js'

function EventItem({ event, selected, onSelect }) {
  const isStuck = event.status === 'stuck'
  const elapsedRed = event.elapsedMs >= stuckThresholdMs

  const cardTone = isStuck
    ? 'border-dash-status-stuck bg-dash-status-stuck-bg'
    : 'border-dash-border bg-dash-surface hover:bg-dash-bg'
  const selectedTone = selected ? 'outline outline-2 outline-dash-primary' : ''

  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className={`flex w-full items-center justify-between gap-4 rounded-dash-card border p-4 text-left transition-colors duration-200 ${cardTone} ${selectedTone}`}
    >
      {/* 좌측: 단계명 + 진입 시각 + 상태 */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="truncate text-dash-item-title text-dash-text-primary">
            {event.screenLabel}
          </span>
          <StatusBadge status={event.status} />
        </div>
        <div className="flex items-center gap-3 text-dash-small text-dash-text-secondary">
          <span>진입 {formatClock(event.enteredAt)}</span>
          {event.kind === 'sample' && <span>예시</span>}
        </div>
      </div>

      {/* 우측: 큰 경과초 (8초 이상 빨강) */}
      <div className="shrink-0 text-right">
        <span
          className={`text-dash-elapsed tabular-nums transition-colors duration-200 ${
            elapsedRed ? 'text-dash-status-stuck' : 'text-dash-text-primary'
          }`}
        >
          {formatElapsed(event.elapsedMs)}
        </span>
      </div>
    </button>
  )
}

export default EventItem
