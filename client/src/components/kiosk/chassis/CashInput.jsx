// 현금 넣는 곳 (FIX-H · FIX-I 확대) — 라벨 하나 아래 좌(지폐 투입구)/우(동전 레버). 전부 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

const microText = { color: chassisColors.labelText }

function CashInput() {
  const { glossBlack, metalSilver, baseSilverDark } = chassisColors
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <HardwareLabel large>현금 넣는 곳</HardwareLabel>
      <div className="flex w-full items-end justify-center gap-5">
        {/* 좌: 1000원 지폐 가로 투입구 */}
        <div className="flex flex-1 flex-col items-center gap-1.5">
          <span className="text-center text-[13px] leading-tight" style={microText}>
            1000원 지폐 넣는 곳
          </span>
          <div
            className="h-7 w-full rounded-[3px]"
            style={{ backgroundColor: glossBlack, border: `3px solid ${metalSilver}` }}
          />
        </div>

        {/* 우: 동전 세로 레버 + 손잡이 */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="w-24 text-center text-[13px] leading-tight" style={microText}>
            50원 100원 500원 동전 넣는 곳
          </span>
          <div
            className="relative h-[68px] w-10 rounded-md"
            style={{ background: `linear-gradient(90deg, ${baseSilverDark}, ${metalSilver}, ${baseSilverDark})` }}
          >
            {/* 세로 홈 */}
            <div
              className="absolute inset-x-2.5 top-2 bottom-6 rounded-full"
              style={{ backgroundColor: glossBlack }}
            />
            {/* 손잡이 */}
            <div
              className="absolute bottom-1.5 left-1/2 h-4 w-7 -translate-x-1/2 rounded-sm"
              style={{ backgroundColor: metalSilver, border: '1px solid rgba(0,0,0,0.4)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashInput
