// 데모 컨트롤 바 (PROMPT 07) — 키오스크 기기 밖, 좌측 최상단.
// dash 계열로 만들어 "시뮬레이터 UI지 기기 일부가 아님"을 명확히 한다.
// 좌측 "시뮬레이터"는 전체 초기화(홈) 버튼(FIX-B). 데모 UI라 hover 허용.
import { RotateCcw } from 'lucide-react'
import { layout } from '../../tokens.js'

function Switch({ label, on, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex items-center gap-2">
      <span className="text-dash-small text-dash-text-primary">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          on ? 'bg-dash-primary' : 'bg-dash-border'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-dash-surface transition-all ${
            on ? 'left-4' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  )
}

// compact(PROMPT 10 모바일): 폭이 좁으니 gap/padding 축소 + 줄바꿈 허용 + 상태 라벨 생략. 데스크톱은 기존 그대로.
function ModeControlBar({ mode, dispatch, onReset, compact = false }) {
  const isReal = !mode.helpOn && !mode.timeLimitOn
  const statusLabel = isReal
    ? '실제 기기 모드'
    : mode.helpOn && mode.timeLimitOn
      ? '연습 모드(도움말·시간제한)'
      : mode.helpOn
        ? '연습 모드(도움말)'
        : '연습 모드(시간제한)'

  return (
    <div
      className={
        compact
          ? 'flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-dash-border bg-dash-surface px-3 py-1.5'
          : 'flex items-center gap-6 border-b border-dash-border bg-dash-surface px-6'
      }
      style={compact ? undefined : { height: layout.controlBarHeight }}
    >
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 rounded-dash-card px-2 py-1 text-dash-small font-semibold text-dash-text-secondary transition-colors hover:bg-dash-bg"
      >
        <RotateCcw size={16} />
        시뮬레이터
      </button>

      <Switch label="도움말" on={mode.helpOn} onToggle={() => dispatch({ type: 'TOGGLE_HELP' })} />
      <Switch
        label="시간제한"
        on={mode.timeLimitOn}
        onToggle={() => dispatch({ type: 'TOGGLE_TIME_LIMIT' })}
      />

      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_REAL_MODE' })}
        className={`rounded-dash-card px-3 py-1 text-dash-small transition-colors ${
          isReal
            ? 'bg-dash-primary text-dash-surface'
            : 'border border-dash-border text-dash-text-primary'
        }`}
      >
        실제 모드
      </button>

      {!compact && (
        <span className="ml-auto text-dash-small text-dash-text-secondary">{statusLabel}</span>
      )}
    </div>
  )
}

export default ModeControlBar
