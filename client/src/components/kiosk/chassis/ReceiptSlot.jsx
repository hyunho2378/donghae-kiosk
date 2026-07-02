// 영수증 나오는 곳 (장식용). 가로 은색 슬롯(금속 그라데이션 바 + 중앙 검정 얇은 홈).
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function ReceiptSlot() {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <HardwareLabel>영수증 나오는 곳</HardwareLabel>
      <div
        className="flex w-full items-center rounded-sm p-1"
        style={{ background: `linear-gradient(180deg, ${chassisColors.metalSilver}, ${chassisColors.bodyDark})` }}
      >
        <div className="h-1 w-full rounded-full" style={{ backgroundColor: chassisColors.glossBlack }} />
      </div>
    </div>
  )
}

export default ReceiptSlot
