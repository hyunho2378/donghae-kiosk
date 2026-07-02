// 카드 넣는 곳 (FIX-H) — 은색 금속 사각 카드리더 + 세로 삽입 슬롯. 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function CardReader() {
  const { baseSilver, baseSilverDark, glossBlack } = chassisColors
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <HardwareLabel>카드 넣는 곳</HardwareLabel>
      <div
        className="flex h-14 w-full items-center justify-center rounded-md"
        style={{
          background: `linear-gradient(180deg, ${baseSilver}, ${baseSilverDark})`,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
        }}
      >
        {/* 세로 삽입 슬롯 */}
        <div
          className="h-10 w-1.5 rounded-full"
          style={{ backgroundColor: glossBlack, boxShadow: 'inset 0 0 2px rgba(0,0,0,0.9)' }}
        />
      </div>
    </div>
  )
}

export default CardReader
