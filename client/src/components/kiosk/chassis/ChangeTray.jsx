// 거스름돈 나오는 곳 (하단 우측 하단). 움푹 파인 검정 트레이(inset shadow). 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function ChangeTray() {
  return (
    <div className="flex flex-col items-center gap-2">
      <HardwareLabel>거스름돈 나오는 곳</HardwareLabel>
      <div
        className="h-16 w-full rounded-lg"
        style={{
          backgroundColor: chassisColors.glossBlack,
          boxShadow: 'inset 0 8px 14px rgba(0,0,0,0.85), inset 0 -2px 3px rgba(255,255,255,0.06)',
        }}
      />
    </div>
  )
}

export default ChangeTray
