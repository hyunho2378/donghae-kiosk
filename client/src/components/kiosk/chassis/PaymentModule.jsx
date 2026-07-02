// 결제 모듈 — 음각 패널 안에 동전 투입구 / 반환버튼 / 지폐 투입구 (전부 장식용)
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function PaymentModule() {
  const { panelInset, glossBlack, metalSilver, bodyDark, returnBlue } = chassisColors

  return (
    <div
      className="flex flex-col items-center gap-3 rounded-md p-3"
      style={{
        backgroundColor: panelInset,
        border: '1px solid rgba(0,0,0,0.45)',
        boxShadow: 'inset 0 2px 7px rgba(0,0,0,0.6)',
      }}
    >
      {/* 동전 넣는 곳 */}
      <div className="flex flex-col items-center gap-1">
        <HardwareLabel>동전 넣는 곳</HardwareLabel>
        <div
          className="relative flex h-20 w-9 items-center justify-center rounded-sm"
          style={{ background: `linear-gradient(90deg, ${bodyDark}, ${metalSilver}, ${bodyDark})` }}
        >
          {/* 검정 세로 홈 */}
          <div className="h-14 w-1.5 rounded-full" style={{ backgroundColor: glossBlack }} />
          {/* 사선 슬릿 */}
          <div
            className="absolute h-3 w-5 rounded-[2px]"
            style={{ backgroundColor: glossBlack, transform: 'rotate(22deg)' }}
          />
        </div>
        {/* 레버 손잡이 */}
        <div className="h-1.5 w-5 rounded-full" style={{ backgroundColor: metalSilver }} />
      </div>

      {/* 반환버튼 */}
      <div className="flex flex-col items-center gap-1">
        <HardwareLabel>반환버튼</HardwareLabel>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: glossBlack }}
        >
          <div className="relative h-7 w-7 rounded-full" style={{ backgroundColor: returnBlue }}>
            <div
              className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
            />
          </div>
        </div>
      </div>

      {/* 지폐 넣는 곳 */}
      <div className="flex w-full flex-col items-center gap-1">
        <HardwareLabel>지폐 넣는 곳</HardwareLabel>
        <div
          className="w-full rounded-sm p-1"
          style={{ background: `linear-gradient(180deg, ${metalSilver}, ${bodyDark})` }}
        >
          <div className="h-3 w-full rounded-sm" style={{ backgroundColor: glossBlack }} />
        </div>
      </div>
    </div>
  )
}

export default PaymentModule
