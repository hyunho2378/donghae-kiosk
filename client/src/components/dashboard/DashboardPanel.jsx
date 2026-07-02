// 대시보드 패널 wrapper (COMPONENTS.md: 타이틀 + 탭 + 목록)
// 탭 2개(PROMPT 08): 실시간 현황(기존 EventList, 로직 불변) / 개인별 기록(목록↔상세 자체 내비게이션).
// 탭 상태는 이 컴포넌트가 관리 — App.jsx나 AI 패널(우측 하단) 로직에는 영향 없음.

import { useState } from 'react'
import EventList from './EventList.jsx'
import RecordsTabToggle from '../records/RecordsTabToggle.jsx'
import RecordsList from '../records/RecordsList.jsx'
import RecordDetail from '../records/RecordDetail.jsx'

function DashboardPanel({ events, selectedId, onSelect }) {
  const [tab, setTab] = useState('live')
  const [selectedIdentifier, setSelectedIdentifier] = useState(null)

  function handleTabChange(next) {
    setTab(next)
    setSelectedIdentifier(null) // 탭 전환 시 개인별 기록 상세 화면 초기화
  }

  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">
        시니어 교육 강사용 대시보드
      </h2>
      <RecordsTabToggle active={tab} onChange={handleTabChange} />

      {tab === 'live' ? (
        // 최대 6행 고정이라 스크롤 없음(overflow-hidden). px-1.5: 카드 좌측 테두리·shake(±4px)가 잘리지 않게 여백 (FIX-D)
        <div className="min-h-0 flex-1 overflow-hidden px-1.5">
          <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
        </div>
      ) : (
        // 개인별 기록 탭은 실시간 현황(6행 고정 no-scroll, FIX-D)과 무관 — 스크롤 허용
        <div className="min-h-0 flex-1 overflow-y-auto px-1.5">
          {selectedIdentifier ? (
            <RecordDetail identifier={selectedIdentifier} onBack={() => setSelectedIdentifier(null)} />
          ) : (
            <RecordsList onSelect={setSelectedIdentifier} />
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardPanel
