// AI 패널 wrapper — 선택된 이벤트 상태에 따라 5가지 분기 (IA.md AI 패널 영역)
//   1. 선택 없음 → EmptyState
//   2. 진행중(아직 막힘 아님) → 인라인 안내
//   3. 막힘/완료 + analysisStatus idle → REQUEST + mockAiClient 호출, 로딩 렌더
//   4. loading → 로딩 인디케이터
//   5. done → 캐시된 analysis로 AIPrescriptionCard (재조회 없음)

import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { getAnalysis } from '../../lib/mockAiClient.js'
import { iconSize } from '../../tokens.js'
import EmptyState from './EmptyState.jsx'
import AIPrescriptionCard from './AIPrescriptionCard.jsx'

function AIPanel({ selectedEvent, dispatch }) {
  // 이미 분석 요청을 시작한 이벤트 id 집합 (StrictMode 중복 호출/재렌더 방지)
  const requestedRef = useRef(new Set())

  useEffect(() => {
    if (!selectedEvent) return
    const { id, status, analysisStatus, screenId, elapsedMs } = selectedEvent

    const needsAnalysis = status === 'stuck' || status === 'done'
    if (!needsAnalysis || analysisStatus !== 'idle') return
    if (requestedRef.current.has(id)) return

    requestedRef.current.add(id)
    dispatch({ type: 'REQUEST_ANALYSIS', id })

    // 응답은 이벤트 id로 캐시되므로(다른 이벤트를 덮어쓰지 않음), 선택이 바뀌어도
    // 해당 이벤트에만 안전하게 저장된다.
    getAnalysis({ screenId, elapsedSeconds: Math.floor(elapsedMs / 1000) })
      .then((analysis) => dispatch({ type: 'RECEIVE_ANALYSIS', id, analysis }))
      .catch(() => {
        // 목업이라 유효 화면에서는 실패하지 않음. 만약 실패하면 재시도 가능하도록 해제.
        requestedRef.current.delete(id)
      })
  }, [selectedEvent, dispatch])

  function renderContent() {
    if (!selectedEvent) return <EmptyState />

    if (selectedEvent.status === 'progress') {
      return (
        <div className="flex h-full items-center justify-center px-4 text-center">
          <p className="text-dash-note text-dash-text-secondary">
            아직 막힘이 감지되지 않았습니다
          </p>
        </div>
      )
    }

    if (selectedEvent.analysisStatus === 'done' && selectedEvent.analysis) {
      return (
        <AIPrescriptionCard
          analysis={selectedEvent.analysis}
          elapsedMs={selectedEvent.elapsedMs}
        />
      )
    }

    // idle 또는 loading → 로딩 인디케이터
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-dash-text-secondary">
        <Loader2 className="animate-spin" size={iconSize.lg} />
        <p className="text-dash-note">AI 분석 중...</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-dash-bg p-6">
      <h2 className="mb-4 text-dash-panel-title text-dash-text-primary">AI 분석</h2>
      <div className="min-h-0 flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  )
}

export default AIPanel
