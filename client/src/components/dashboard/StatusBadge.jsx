// 상태 표시 (FIX-D) — 알약 채움 뱃지 폐기 → 8px 색 dot + 13px 700 텍스트.
// 진행중=파랑, 완료=초록, 막힘=빨강. 진행중 dot만 은은히 깜빡임.

const CONFIG = {
  progress: { label: '진행중', dot: 'bg-dash-status-progress', text: 'text-dash-status-progress' },
  stuck: { label: '막힘', dot: 'bg-dash-status-stuck', text: 'text-dash-status-stuck' },
  done: { label: '완료', dot: 'bg-dash-status-done', text: 'text-dash-status-done' },
}

function StatusBadge({ status }) {
  const cfg = CONFIG[status] ?? CONFIG.progress
  const blink = status === 'progress' ? 'badge-blink' : ''
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${cfg.dot} ${blink}`} />
      <span className={`text-dash-label ${cfg.text}`}>{cfg.label}</span>
    </span>
  )
}

export default StatusBadge
