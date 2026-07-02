// 대시보드 패널 wrapper (COMPONENTS.md: 타이틀 + 목록)

import EventList from './EventList.jsx'

function DashboardPanel({ events, selectedId, onSelect }) {
  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">
        시니어 교육 강사용 대시보드
      </h2>
      {/* px-1: 카드 4변 테두리(특히 좌변)가 스크롤 컨테이너에 잘리지 않게 여백 확보 (FIX-C 7) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-1">
        <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default DashboardPanel
