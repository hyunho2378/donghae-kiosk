// 개인별 기록 화면 (FIX-M) — 우측 영역 전체(대시보드 600 + AI 패널 400 합친 1000px)를 차지하는
// 독립 진입 화면. DashboardPanel의 "개인별 기록 보기" 버튼으로 진입, "실시간 현황으로 돌아가기"로 복귀.
// 목록↔상세 내비게이션은 여기서 관리(RecordsList/RecordDetail 자체는 구조 변경 없음).

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { iconSize } from '../../tokens.js'
import RecordsList from './RecordsList.jsx'
import RecordDetail from './RecordDetail.jsx'

function RecordsView({ onBack }) {
  const [selectedIdentifier, setSelectedIdentifier] = useState(null)

  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex w-fit items-center gap-2 rounded-dash-card border border-dash-border bg-dash-surface px-3 py-1.5 text-dash-label text-dash-text-primary transition-colors hover:bg-dash-bg"
      >
        <ArrowLeft size={iconSize.xs} />
        실시간 현황으로 돌아가기
      </button>

      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">개인별 기록</h2>

      <div className="min-h-0 flex-1 overflow-y-auto px-1.5">
        {selectedIdentifier ? (
          <RecordDetail identifier={selectedIdentifier} onBack={() => setSelectedIdentifier(null)} />
        ) : (
          <RecordsList onSelect={setSelectedIdentifier} />
        )}
      </div>
    </div>
  )
}

export default RecordsView
