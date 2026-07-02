// 대시보드 패널 wrapper (COMPONENTS.md: 타이틀 + 목록)
// FIX-M: 개인별 기록 진입은 탭이 아니라 헤더의 독립 버튼("개인별 기록 보기")으로 분리.
// 클릭 시 App의 rightView가 records로 전환되며 우측 영역 전체(대시보드+AI 패널)가 RecordsView로 바뀐다.

import { Users } from 'lucide-react'
import EventList from './EventList.jsx'
import { iconSize } from '../../tokens.js'

function DashboardPanel({ events, selectedId, onSelect, onOpenRecords }) {
  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-dash-panel-title text-dash-text-primary">
          시니어 교육 강사용 대시보드
        </h2>
        <button
          type="button"
          onClick={onOpenRecords}
          className="flex shrink-0 items-center gap-1.5 rounded-dash-card border border-dash-primary bg-dash-surface px-3 py-1.5 text-dash-label text-dash-primary transition-colors hover:bg-dash-select"
        >
          <Users size={iconSize.xs} />
          개인별 기록 보기
        </button>
      </div>
      {/* 최대 6행 고정이라 스크롤 없음(overflow-hidden). px-1.5: 카드 좌측 테두리·shake(±4px)가 잘리지 않게 여백 (FIX-D) */}
      <div className="min-h-0 flex-1 overflow-hidden px-1.5">
        <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default DashboardPanel
