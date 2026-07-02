// 시니어 카드 (FIX-C 전면 개편)
// [문자 아바타] [서비스명 + 현재 단계/진입] [상태 뱃지] [큰 경과초]
// - A(실제)=파란 아바타 + "실습" 마커, B~F=회색 아바타
// - 진행중 뱃지 깜빡임 / 완료 연초록 배경+체크 / 막힘 전환 순간 shake 1회
// - 경과초: 8초 미만 검정 → 8초 이상(진행중·막힘) 빨강, 200ms 전환 (완료는 제외)
// - 카드 4변 동일 1px 테두리(FIX 7: 스크롤 컨테이너 좌측 여백으로 좌변 클립 방지)

import { useEffect, useRef, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import { formatClock, formatElapsed } from '../../lib/timer.js'
import { stuckThresholdMs, iconSize } from '../../tokens.js'

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

  const cardTone =
    status === 'stuck'
      ? 'border-dash-status-stuck bg-dash-status-stuck-bg'
      : status === 'done'
        ? 'border-dash-status-done bg-dash-status-done-bg'
        : 'border-dash-border bg-dash-surface hover:bg-dash-bg'
  const selectedTone = selected ? 'outline outline-2 outline-dash-primary' : ''
  const avatarBg = isReal ? 'bg-dash-primary' : 'bg-dash-text-secondary'
  const elapsedColor = elapsedRed ? 'text-dash-status-stuck' : 'text-dash-text-primary'

  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className={`flex w-full items-center gap-4 rounded-dash-card border p-4 text-left transition-colors duration-200 ${cardTone} ${selectedTone} ${shake ? 'card-shake' : ''}`}
    >
      {/* 1열: 문자 아바타 */}
      <div className="flex w-10 shrink-0 flex-col items-center gap-0.5">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full text-dash-item-title text-dash-surface ${avatarBg}`}
        >
          {event.avatar}
        </span>
        {isReal && <span className="text-dash-small text-dash-primary">실습</span>}
      </div>

      {/* 2열: 서비스명 + 현재 단계 + 진입 */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-dash-item-title text-dash-text-primary">
            {event.service}
          </span>
          {status === 'done' && (
            <CircleCheck size={iconSize.sm} className="shrink-0 text-dash-status-done" />
          )}
        </div>
        <div className="truncate text-dash-small text-dash-text-secondary">
          현재 단계: {event.screenLabel} · 진입 {formatClock(event.enteredAt)}
        </div>
      </div>

      {/* 3열: 상태 뱃지 */}
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
