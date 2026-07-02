// 시니어 카드 (FIX-D — SaaS 관제 톤으로 정리)
// [라운드 사각 아바타] [서비스명(+실습/완료체크) / 현재 단계·진입] [상태 dot+텍스트] [큰 경과초]
// - 기본 카드: 흰 배경 + 1px 테두리 + radius 10px 통일(완료 틴트 폐기)
// - 막힘 카드: 흰 배경 유지 + 1.5px 빨간 테두리 + 좌측 안쪽 3px 빨간 액센트(절제된 강조)
// - 선택 카드: 1.5px 파란 테두리 + 옅은 파란 배경(dash-select)
// - 경과초: 8초 이상(진행중·막힘) 빨강, 완료는 제외. 막힘/완료는 리듀서에서 고정됨.
// - 막힘 전환 순간 1회 shake

import { useEffect, useRef, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import { formatClock, formatElapsed } from '../../lib/timer.js'
import { stuckThresholdMs, iconSize, borderWidth } from '../../tokens.js'

function EventItem({ event, selected, onSelect }) {
  const { status } = event
  const isReal = event.kind === 'real'
  const elapsedRed = status !== 'done' && event.elapsedMs >= stuckThresholdMs

  // 막힘으로 "전환되는 순간" 1회만 shake
  const [shake, setShake] = useState(false)
  const prevStatusRef = useRef(status)
  const shakeTimerRef = useRef(null)
  useEffect(() => {
    if (prevStatusRef.current !== 'stuck' && status === 'stuck') {
      setShake(true)
      shakeTimerRef.current = setTimeout(() => setShake(false), 400)
    }
    prevStatusRef.current = status
  }, [status])
  useEffect(() => () => clearTimeout(shakeTimerRef.current), [])

  const cardTone = selected
    ? 'border-emphasis border-dash-primary bg-dash-select'
    : status === 'stuck'
      ? 'border-emphasis border-dash-status-stuck bg-dash-surface'
      : 'border border-dash-border bg-dash-surface hover:bg-dash-bg'
  const avatarTone = isReal
    ? 'bg-dash-primary text-dash-surface'
    : 'bg-dash-avatar-bg text-dash-text-strong'
  const elapsedColor = elapsedRed ? 'text-dash-status-stuck' : 'text-dash-text-primary'

  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className={`relative flex w-full items-center gap-4 rounded-dash-row px-4 py-3.5 text-left transition-colors duration-200 ${cardTone} ${shake ? 'card-shake' : ''}`}
    >
      {/* 막힘 카드 좌측 안쪽 세로 액센트 (radius 따라 붙게) */}
      {status === 'stuck' && !selected && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 rounded-l-dash-row bg-dash-status-stuck"
          style={{ width: borderWidth.accent }}
        />
      )}

      {/* 1열: 라운드 사각 아바타 */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-dash-row text-dash-item-title ${avatarTone}`}
      >
        {event.avatar}
      </span>

      {/* 2열: 서비스명(+실습/완료) / 현재 단계·진입 */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-dash-item-title text-dash-text-primary">
            {event.service}
          </span>
          {isReal && <span className="shrink-0 text-dash-meta text-dash-primary">실습</span>}
          {status === 'done' && (
            <CircleCheck size={iconSize.sm} className="shrink-0 text-dash-status-done" />
          )}
        </div>
        <div className="mt-0.5 flex items-baseline justify-between gap-2">
          <span className="min-w-0 truncate text-dash-text-strong">
            <span className="text-dash-step">현재 단계: </span>
            <span className="text-dash-step-strong">{event.screenLabel}</span>
          </span>
          <span className="shrink-0 text-dash-meta text-dash-text-secondary">
            진입 {formatClock(event.enteredAt)}
          </span>
        </div>
      </div>

      {/* 3열: 상태 dot + 텍스트 */}
      <div className="shrink-0">
        <StatusBadge status={status} />
      </div>

      {/* 4열: 큰 경과초 */}
      <div className="shrink-0 text-right">
        <span
          className={`text-dash-elapsed tabular-nums transition-colors duration-200 ${elapsedColor}`}
        >
          {formatElapsed(event.elapsedMs)}
        </span>
      </div>
    </button>
  )
}

export default EventItem
