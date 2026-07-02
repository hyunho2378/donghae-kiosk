// 대시보드 헤더 탭 2개: 실시간 현황 / 개인별 기록 (PROMPT 08). 선택 상태는 상위(DashboardPanel)가 관리.

const TABS = [
  { key: 'live', label: '실시간 현황' },
  { key: 'records', label: '개인별 기록' },
]

function RecordsTabToggle({ active, onChange }) {
  return (
    <div className="mb-4 inline-flex shrink-0 gap-1 rounded-dash-card border border-dash-border bg-dash-surface p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`rounded-dash-card px-3 py-1.5 text-dash-label transition-colors ${
            active === tab.key
              ? 'bg-dash-primary text-dash-surface'
              : 'text-dash-text-secondary hover:bg-dash-bg'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default RecordsTabToggle
