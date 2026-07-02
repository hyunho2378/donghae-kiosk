// 이어폰 잭 (FIX-H: 은색 받침대 우측). "이어폰" 라벨 + 잭 홀. 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function EarphoneJack() {
  const { glossBlack, metalSilver, bodyGradBottom } = chassisColors
  return (
    <div className="flex flex-col items-center gap-1">
      <HardwareLabel>이어폰</HardwareLabel>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: glossBlack, border: `2px solid ${metalSilver}` }}
      >
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: bodyGradBottom }} />
      </div>
    </div>
  )
}

export default EarphoneJack
