// 개인별 기록 목록 wrapper (PROMPT 08). mockRecordsClient에서 요약 목록을 불러와 카드로 렌더.
// PROMPT 09: 실제 API 호출이라 로딩/에러 상태 추가(AIPanel과 동일한 톤 재사용).

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import RecordCard from './RecordCard.jsx'
import { getRecordsList } from '../../lib/mockRecordsClient.js'
import { iconSize } from '../../tokens.js'

function RecordsList({ onSelect }) {
  const [records, setRecords] = useState(null) // null = 로딩중
  const [error, setError] = useState(false)

  function load() {
    setRecords(null)
    setError(false)
    getRecordsList()
      .then(setRecords)
      .catch(() => setError(true))
  }

  useEffect(load, [])

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

  if (records === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-dash-text-secondary">
        <Loader2 className="animate-spin" size={iconSize.lg} />
        <p className="text-dash-note">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {records.map((record) => (
        <RecordCard key={record.identifier} record={record} onClick={() => onSelect(record.identifier)} />
      ))}
    </div>
  )
}

export default RecordsList
