// 대시보드 패널 wrapper (COMPONENTS.md: 타이틀 + 목록)

import EventList from './EventList.jsx'

function DashboardPanel({ events, selectedId, onSelect }) {
  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">실시간 발급 현황</h2>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default DashboardPanel
