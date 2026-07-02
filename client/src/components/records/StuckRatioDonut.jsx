// 단계별 막힘 비율 도넛 (PROMPT 08, 순수 SVG). 중앙에 총 막힘 횟수.
// 색 매핑: 1순위(가장 많이 막힌 단계)=dash-status-stuck, 2순위=dash-primary, 3순위 이하=dash-text-secondary.

import { colors } from '../../tokens.js'

const SIZE = 120
const STROKE = 14
const RADIUS = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * RADIUS

function colorFor(index) {
  if (index === 0) return colors.dash['status-stuck']
  if (index === 1) return colors.dash.primary
  return colors.dash['text-secondary']
}

function StuckRatioDonut({ steps, total }) {
  if (total === 0) {
    return (
      <div className="flex items-center gap-4">
        <svg width={SIZE} height={SIZE}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke={colors.dash.border} strokeWidth={STROKE} />
        </svg>
        <p className="text-dash-step text-dash-text-secondary">막힘 기록 없음</p>
      </div>
    )
  }

  let offset = 0
  const arcs = steps.map((step, i) => {
    const dash = (step.count / total) * CIRC
    const el = (
      <circle
        key={step.screenId}
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={colorFor(i)}
        strokeWidth={STROKE}
        strokeDasharray={`${dash} ${CIRC - dash}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
      />
    )
    offset += dash
    return el
  })

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE}>
          {arcs}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-dash-item-title text-dash-text-primary">{total}</span>
          <span className="text-dash-meta text-dash-text-secondary">총 막힘</span>
        </div>
      </div>
      <ul className="flex min-w-0 flex-1 flex-col gap-1.5">
        {steps.slice(0, 4).map((step, i) => (
          <li key={step.screenId} className="flex items-center gap-2 text-dash-step-strong text-dash-text-strong">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: colorFor(i) }} />
            <span className="truncate">{step.screenLabel}</span>
            <span className="ml-auto shrink-0 text-dash-meta text-dash-text-secondary">{step.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StuckRatioDonut
