// 신용카드 넣는 곳 (장식용). 검정 라운드 하우징 + 은색 가로 슬롯 2개(위 얇게, 아래 두껍게).
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function CardReader() {
  return (
    <div className="flex flex-col items-center gap-1">
      <HardwareLabel>신용카드 넣는 곳</HardwareLabel>
      <div
        className="flex w-full flex-col gap-2 rounded-lg p-3"
        style={{ backgroundColor: chassisColors.glossBlack }}
      >
        <div className="h-1 w-full rounded-full" style={{ backgroundColor: chassisColors.metalSilver }} />
        <div className="h-2.5 w-full rounded-sm" style={{ backgroundColor: chassisColors.metalSilver }} />
      </div>
    </div>
  )
}

export default CardReader
