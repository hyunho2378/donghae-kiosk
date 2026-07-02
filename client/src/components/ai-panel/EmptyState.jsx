// AI 패널 빈 상태 (PATTERNS.md 빈 상태: 중앙 정렬, lucide 아이콘 + 안내문 1줄)

import { MessageSquareDashed } from 'lucide-react'
import { iconSize } from '../../tokens.js'

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-dash-text-secondary">
      <MessageSquareDashed size={iconSize.xl} />
      <p className="text-dash-note">좌측 목록에서 항목을 선택하면 AI 분석이 표시됩니다</p>
    </div>
  )
}

export default EmptyState
