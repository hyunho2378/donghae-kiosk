// 증명서 출구 (FIX-H: 하단 띠 좌측). 프린터 라벨 + 빨간 »»» 방향 화살표 + 와이드 슬롯(빨간 네온 링).
// paperReady일 때 슬롯 아래로 종이가 슬라이드 출력되고, 클릭하면 수령 연출로 넘어간다(기존 로직 유지).
import { Printer } from 'lucide-react'
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'
import CertificatePaper from './CertificatePaper.jsx'

function CertificateOutlet({ issuePhase, onPaperClick }) {
  const { neonAccent, glossBlack, bodyGradBottom } = chassisColors
  return (
    <div className="flex w-full flex-col items-center gap-2">
      {/* 라벨(프린터 아이콘) */}
      <div className="flex items-center gap-1.5">
        <Printer size={16} color={chassisColors.labelText} />
        <HardwareLabel>증명서</HardwareLabel>
      </div>

      <div className="flex w-full items-center gap-2">
        {/* 빨간 »»» 출력 방향 화살표 */}
        <span
          className="shrink-0 text-[20px] font-extrabold leading-none"
          style={{ color: neonAccent, textShadow: `0 0 6px ${neonAccent}` }}
        >
          »»»
        </span>

        {/* 와이드 슬롯 (빨간 네온 링) + 종이 출력 클립 */}
        <div className="relative flex-1">
          <div
            className="relative z-10 w-full rounded-md p-2"
            style={{
              backgroundColor: glossBlack,
              border: `2px solid ${neonAccent}`,
              boxShadow: `0 0 9px ${neonAccent}`,
            }}
          >
            {/* 슬롯 입구(어두운 홈) */}
            <div className="h-3 w-full rounded-full" style={{ backgroundColor: bodyGradBottom }} />
          </div>

          {/* 클리핑 영역: 슬롯 바로 아래. 종이가 슬롯 안(translateY -100%)에서 시작해 드러나며 내려온다. */}
          {issuePhase === 'paperReady' && (
            <div className="relative z-20 overflow-hidden" style={{ height: 300 }}>
              <div className="absolute inset-x-0 top-0 flex justify-center">
                <CertificatePaper onReceive={onPaperClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CertificateOutlet
