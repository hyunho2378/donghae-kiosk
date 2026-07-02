// 현재 금액 (FIX-H) — "현재 금액" 라벨 + 검정 표시창 안 빨간 7세그먼트 스타일 숫자 "0". 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function MoneyDisplay() {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <HardwareLabel>현재 금액</HardwareLabel>
      <div
        className="flex h-8 min-w-[64px] items-center justify-end rounded-[3px] px-2"
        style={{
          backgroundColor: chassisColors.glossBlack,
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)',
        }}
      >
        <span
          className="font-mono text-[20px] font-bold tabular-nums leading-none"
          style={{
            color: chassisColors.displayRed,
            textShadow: `0 0 6px ${chassisColors.displayRed}`,
          }}
        >
          0
        </span>
      </div>
    </div>
  )
}

export default MoneyDisplay
