// QR코드 인식하는 곳 (FIX-H) — 검정 사각 하우징 안 밝은 스캐너 창. 장식용.
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

function QRScanner() {
  const { glossBlack, metalSilver, baseSilverDark, canopy } = chassisColors
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <HardwareLabel>QR코드 인식하는 곳</HardwareLabel>
      <div
        className="flex h-16 w-16 items-center justify-center rounded-md"
        style={{
          backgroundColor: glossBlack,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.7)',
        }}
      >
        {/* 밝은 스캐너 창 */}
        <div
          className="h-9 w-9 rounded-[3px]"
          style={{
            background: `linear-gradient(135deg, ${canopy} 0%, ${metalSilver} 55%, ${baseSilverDark} 100%)`,
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.35)',
          }}
        />
      </div>
    </div>
  )
}

export default QRScanner
