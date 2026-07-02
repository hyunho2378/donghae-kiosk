// 대시보드 패널 wrapper (COMPONENTS.md: 타이틀 + 목록)

import EventList from './EventList.jsx'

function DashboardPanel({ events, selectedId, onSelect }) {
  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">
        시니어 교육 강사용 대시보드
      </h2>
      {/* 최대 6행 고정이라 스크롤 없음(overflow-hidden). px-1.5: 카드 좌측 테두리·shake(±4px)가 잘리지 않게 여백 (FIX-D) */}
      <div className="min-h-0 flex-1 overflow-hidden px-1.5">
        <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default DashboardPanel
