// 방문별 타임라인 (PROMPT 08): 회차 + 날짜 + 막힌 단계 요약.

function VisitTimeline({ visits }) {
  return (
    <div className="rounded-dash-row border border-dash-border bg-dash-surface p-4">
      <p className="mb-3 text-dash-label text-dash-text-secondary">방문 타임라인</p>
      <ul className="flex flex-col gap-3">
        {visits.map((visit) => {
          const stuckSteps = visit.stepLogs.filter((s) => s.stuck)
          return (
            <li key={visit.visitNumber} className="flex items-start gap-3">
              <span className="shrink-0 rounded-full bg-dash-avatar-bg px-2.5 py-1 text-dash-label text-dash-text-strong">
                {visit.visitNumber}차
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-dash-step-strong text-dash-text-primary">{visit.date}</div>
                <div className="mt-0.5 text-dash-step text-dash-text-secondary">
                  {stuckSteps.length === 0
                    ? '막힌 단계 없음'
                    : `막힌 단계: ${stuckSteps.map((s) => s.screenLabel).join(', ')}`}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VisitTimeline
