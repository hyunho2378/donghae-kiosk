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
      {/* 라벨(프린터 아이콘) — FIX-I 확대 */}
      <div className="flex items-center gap-2">
        <Printer size={22} color={chassisColors.labelText} />
        <HardwareLabel large>증명서</HardwareLabel>
      </div>

      <div className="flex w-full items-center gap-2.5">
        {/* 빨간 »»» 출력 방향 화살표 (커진 슬롯에 비례) */}
        <span
          className="shrink-0 text-[26px] font-extrabold leading-none"
          style={{ color: neonAccent, textShadow: `0 0 8px ${neonAccent}` }}
        >
          »»»
        </span>

        {/* 와이드 슬롯 (빨간 네온 링, FIX-I 두께↑) + 종이 출력 클립(마스크·애니메이션 로직 그대로) */}
        <div className="relative flex-1">
          <div
            className="relative z-10 w-full rounded-md p-2.5"
            style={{
              backgroundColor: glossBlack,
              border: `3px solid ${neonAccent}`,
              boxShadow: `0 0 12px ${neonAccent}`,
            }}
          >
            {/* 슬롯 입구(어두운 홈) */}
            <div className="h-4 w-full rounded-full" style={{ backgroundColor: bodyGradBottom }} />
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
