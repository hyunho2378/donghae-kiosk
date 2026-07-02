// 상태 뱃지 (진행중/막힘/완료) — PATTERNS.md 막힘 상태 강조 색상 체계

const CONFIG = {
  progress: { label: '진행중', className: 'bg-dash-status-progress text-dash-surface' },
  stuck: { label: '막힘', className: 'bg-dash-status-stuck text-dash-surface' },
  done: { label: '완료', className: 'bg-dash-status-done text-dash-surface' },
}

function StatusBadge({ status }) {
  const cfg = CONFIG[status] ?? CONFIG.progress
  // 진행중은 은은하게 깜빡임(FIX-C). 막힘/완료는 정지.
  const blink = status === 'progress' ? 'badge-blink' : ''
  return (
    <span
      className={`inline-block rounded-dash-card px-2 py-1 text-dash-small transition-colors duration-200 ${cfg.className} ${blink}`}
    >
      {cfg.label}
    </span>
  )
}

export default StatusBadge
