// 개인별 기록 목록 카드: 식별자 + 서비스명 + 방문 횟수 + 최근 방문일 + 최근 상태 한 줄 요약 (PROMPT 08)
// 시니어 카드(EventItem)와 동일한 흰 배경 + 테두리 톤(FIX-D)을 재사용.
// FIX-L: 서비스가 다양해져 식별자만으로 구분이 안 되므로 서비스명을 추가 노출.

import { ChevronRight } from 'lucide-react'
import { iconSize } from '../../tokens.js'

function RecordCard({ record, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-dash-row border border-dash-border bg-dash-surface px-4 py-3.5 text-left transition-colors hover:bg-dash-bg"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-dash-item-title text-dash-text-primary">
            {record.identifier} · {record.service}
          </span>
          <span className="text-dash-meta text-dash-text-secondary">방문 {record.visitCount}회</span>
        </div>
        <div className="mt-0.5 truncate text-dash-step text-dash-text-strong">
          {record.lastStatusSummary} · 최근 {record.lastVisitDate}
        </div>
      </div>
      <ChevronRight size={iconSize.sm} className="shrink-0 text-dash-text-secondary" />
    </button>
  )
}

export default RecordCard
