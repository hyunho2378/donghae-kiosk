// 하드웨어 라벨 공통 (검정 알약 + 연두 1px 테두리 + 흰 글씨) — 전 라벨 통일
import { chassisColors } from '../../../tokens.js'

function HardwareLabel({ children }) {
  return (
    <span
      className="inline-block whitespace-nowrap rounded-full px-3 py-1 text-[12px] leading-none"
      style={{
        backgroundColor: chassisColors.labelBg,
        color: chassisColors.labelText,
        border: `1px solid ${chassisColors.labelBorder}`,
      }}
    >
      {children}
    </span>
  )
}

export default HardwareLabel
