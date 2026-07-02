// 방문별 막힘 추이 라인+점 차트 (PROMPT 08, 순수 SVG, 두꺼운 막대 금지).
// 점 색: 첫 방문=dash-status-stuck, 중간=dash-primary, 최근 방문=dash-status-done.

import { colors, fontSize } from '../../tokens.js'

const WIDTH = 200
const HEIGHT = 100
const PAD = 16
const AXIS_FONT_SIZE = fontSize['dash-meta'][0]

function pointColor(index, lastIndex) {
  if (index === 0) return colors.dash['status-stuck']
  if (index === lastIndex) return colors.dash['status-done']
  return colors.dash.primary
}

function VisitTrendLine({ trend }) {
  if (trend.length === 0) return null

  const maxCount = Math.max(1, ...trend.map((t) => t.stuckCount))
  const lastIndex = trend.length - 1
  const stepX = lastIndex > 0 ? (WIDTH - PAD * 2) / lastIndex : 0

  const points = trend.map((t, i) => ({
    ...t,
    x: PAD + stepX * i,
    y: HEIGHT - PAD - (t.stuckCount / maxCount) * (HEIGHT - PAD * 2),
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
      <path d={pathD} fill="none" stroke={colors.dash['text-secondary']} strokeWidth={1.5} />
      {points.map((p, i) => (
        <g key={p.visitNumber}>
          <circle cx={p.x} cy={p.y} r={4} fill={pointColor(i, lastIndex)} />
          <text
            x={p.x}
            y={HEIGHT - 2}
            textAnchor="middle"
            fontSize={AXIS_FONT_SIZE}
            fill={colors.dash['text-secondary']}
          >
            {p.visitNumber}차
          </text>
        </g>
      ))}
    </svg>
  )
}

export default VisitTrendLine
