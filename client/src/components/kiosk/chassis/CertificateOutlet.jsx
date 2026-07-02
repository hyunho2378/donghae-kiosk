// 증명서 나오는 곳 (하단 좌측). 인디케이터 + 빨간 LED + 와이드 금속 슬롯.
// paperReady일 때 슬롯에서 종이가 슬라이드 출력되고, 클릭하면 수령.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'
import CertificatePaper from './CertificatePaper.jsx'

function CertificateOutlet({ issuePhase, onPaperReceive }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <HardwareLabel>증명서 나오는 곳</HardwareLabel>

      {/* 인디케이터 스트립 + 광택 사각 + 빨간 LED */}
      <div className="flex w-full items-center gap-2">
        <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: chassisColors.metalSilver }} />
        <div
          className="relative h-8 flex-1 overflow-hidden rounded-md"
          style={{ backgroundColor: chassisColors.glossBlack }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)',
            }}
          />
        </div>
        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: chassisColors.redLed,
            boxShadow: `0 0 6px ${chassisColors.redLed}`,
          }}
        />
      </div>

      {/* 와이드 금속 슬롯 (종이 출구) */}
      <div className="w-full">
        {/* 슬롯 금속바 */}
        <div
          className="relative z-10 w-full rounded-sm p-1.5"
          style={{ background: `linear-gradient(180deg, ${chassisColors.metalSilver}, ${chassisColors.bodyDark})` }}
        >
          <div className="h-2.5 w-full rounded-full" style={{ backgroundColor: chassisColors.glossBlack }} />
        </div>

        {/* 클리핑 영역: 슬롯 바로 아래. 종이가 슬롯 안(translateY -100%)에서 시작해 드러나며 내려온다. */}
        {issuePhase === 'paperReady' && (
          <div className="relative overflow-hidden" style={{ height: 300 }}>
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <CertificatePaper onReceive={onPaperReceive} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificateOutlet
