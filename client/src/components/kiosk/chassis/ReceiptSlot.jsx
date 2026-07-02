// 영수증 (FIX-H: 은색 받침대 좌측). "영수증" 라벨 + 작은 가로 출력 홈. 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function ReceiptSlot() {
  const { baseSilver, baseSilverDark, glossBlack } = chassisColors
  return (
    <div className="flex flex-col items-center gap-1">
      <HardwareLabel>영수증</HardwareLabel>
      <div
        className="w-16 rounded-sm p-1"
        style={{ background: `linear-gradient(180deg, ${baseSilver}, ${baseSilverDark})` }}
      >
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: glossBlack }} />
      </div>
    </div>
  )
}

export default ReceiptSlot
