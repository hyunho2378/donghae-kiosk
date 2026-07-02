// 개인별 기록 상세 화면 (PROMPT 08). 뒤로가기 + 헤더 + 도넛/추이 2분할 + 타임라인 + AI 요약.
// PROMPT 09: getRecordDetail이 실제 API를 호출하므로 로딩/에러 상태 추가(AIPanel과 동일한 톤 재사용).

import { useEffect, useState } from 'react'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { getRecordDetail } from '../../lib/mockRecordsClient.js'
import { aggregateStuckSteps } from '../../lib/weaknessSummary.js'
import { iconSize } from '../../tokens.js'
import StuckRatioDonut from './StuckRatioDonut.jsx'
import VisitTrendLine from './VisitTrendLine.jsx'
import VisitTimeline from './VisitTimeline.jsx'
import AIWeaknessSummary from './AIWeaknessSummary.jsx'

function RecordDetail({ identifier, onBack }) {
  const [record, setRecord] = useState(null)
  const [error, setError] = useState(false)

  function load() {
    setRecord(null)
    setError(false)
    getRecordDetail(identifier)
      .then(setRecord)
      .catch(() => setError(true))
  }

  useEffect(load, [identifier])

  function renderBody() {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <p className="text-dash-note text-dash-text-secondary">기록을 불러오지 못했습니다</p>
          <button
            type="button"
            onClick={load}
            className="rounded-dash-card border border-dash-border px-3 py-1.5 text-dash-label text-dash-text-primary transition-colors hover:bg-dash-bg"
          >
            다시 시도
          </button>
        </div>
      )
    }

    if (!record) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-dash-text-secondary">
          <Loader2 className="animate-spin" size={iconSize.lg} />
          <p className="text-dash-note">불러오는 중...</p>
        </div>
      )
    }

    const stuckSteps = aggregateStuckSteps(record.visits)
    const totalStuck = stuckSteps.reduce((sum, s) => sum + s.count, 0)
    const trend = record.visits.map((v) => ({
      visitNumber: v.visitNumber,
      stuckCount: v.stepLogs.filter((s) => s.stuck).length,
    }))

    return (
      <>
        {/* 상단: 식별자 + 서비스명 + 방문 횟수 + 최초/최근 방문일 */}
        <div className="rounded-dash-row border border-dash-border bg-dash-surface p-4">
          <div className="flex items-center gap-3">
            <span className="text-dash-panel-title text-dash-text-primary">{record.identifier}</span>
            <span className="rounded-full bg-dash-avatar-bg px-2.5 py-1 text-dash-label text-dash-text-strong">
              방문 {record.visits.length}회
            </span>
          </div>
          <div className="mt-1 text-dash-step-strong text-dash-text-strong">{record.service}</div>
          <div className="mt-0.5 text-dash-step text-dash-text-secondary">
            최초 방문 {record.visits[0].date} · 최근 방문 {record.visits[record.visits.length - 1].date}
          </div>
        </div>

        {/* 중단: 좌우 2분할 — 단계별 막힘 비율 도넛 / 방문별 막힘 추이 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-dash-row border border-dash-border bg-dash-surface p-4">
            <p className="mb-2 text-dash-label text-dash-text-secondary">단계별 막힘 비율</p>
            <StuckRatioDonut steps={stuckSteps} total={totalStuck} />
          </div>
          <div className="rounded-dash-row border border-dash-border bg-dash-surface p-4">
            <p className="mb-2 text-dash-label text-dash-text-secondary">방문별 막힘 추이</p>
            <VisitTrendLine trend={trend} />
          </div>
        </div>

        {/* 하단: 방문 타임라인 + AI 추정 반복 약점 요약 */}
        <VisitTimeline visits={record.visits} />
        <AIWeaknessSummary identifier={record.identifier} stuckSteps={stuckSteps} />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1 text-dash-label text-dash-text-secondary transition-colors hover:text-dash-text-primary"
      >
        <ChevronLeft size={iconSize.sm} />
        목록
      </button>
      {renderBody()}
    </div>
  )
}

export default RecordDetail
