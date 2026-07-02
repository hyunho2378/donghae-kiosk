// 하드웨어 라벨 공통 (검정 알약 + 흰 1px 테두리 + 흰 글씨) — 전 라벨 통일
// large: 주요 부품(현금/증명서/QR)용 약 1.4배 확대 라벨 (FIX-I)
import { chassisColors } from '../../../tokens.js'

function HardwareLabel({ children, large = false }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full leading-none ${
        large ? 'px-4 py-1.5 text-[17px]' : 'px-3 py-1 text-[12px]'
      }`}
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
