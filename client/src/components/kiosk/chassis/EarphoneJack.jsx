// 이어폰 잭 (장식용). 어두운 원 + 안쪽 더 어두운 원.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function EarphoneJack() {
  return (
    <div className="flex flex-col items-center gap-1">
      <HardwareLabel>이어폰</HardwareLabel>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: chassisColors.bodyDark }}
      >
        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: chassisColors.glossBlack }} />
      </div>
    </div>
  )
}

export default EarphoneJack
