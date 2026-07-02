// 현금 넣는 곳 (FIX-H) — 라벨 하나 아래 좌(지폐 투입구)/우(동전 레버). 전부 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

const microText = { color: chassisColors.labelText }

function CashInput() {
  const { glossBlack, metalSilver, baseSilverDark } = chassisColors
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <HardwareLabel>현금 넣는 곳</HardwareLabel>
      <div className="flex w-full items-end justify-center gap-4">
        {/* 좌: 1000원 지폐 가로 투입구 */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="text-center text-[9px] leading-tight" style={microText}>
            1000원 지폐 넣는 곳
          </span>
          <div
            className="h-5 w-full rounded-[2px]"
            style={{ backgroundColor: glossBlack, border: `2px solid ${metalSilver}` }}
          />
        </div>

        {/* 우: 동전 세로 레버 + 손잡이 */}
        <div className="flex flex-col items-center gap-1">
          <span className="w-16 text-center text-[9px] leading-tight" style={microText}>
            50원 100원 500원 동전 넣는 곳
          </span>
          <div
            className="relative h-12 w-7 rounded-sm"
            style={{ background: `linear-gradient(90deg, ${baseSilverDark}, ${metalSilver}, ${baseSilverDark})` }}
          >
            {/* 세로 홈 */}
            <div
              className="absolute inset-x-2 top-1.5 bottom-4 rounded-full"
              style={{ backgroundColor: glossBlack }}
            />
            {/* 손잡이 */}
            <div
              className="absolute bottom-1 left-1/2 h-3 w-5 -translate-x-1/2 rounded-sm"
              style={{ backgroundColor: metalSilver, border: '1px solid rgba(0,0,0,0.4)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashInput
