// 지문확인 ★ 유일하게 동작하는 하드웨어 (FIX-H: 하단 중앙 띠로 이동 + 흰/은색 원형 장치 + 빨간 네온 링)
// - active(현재 S5)일 때만 클릭 동작. 클릭 시 0.8초 스캔 라인 애니메이션 후 onScanComplete().
// - 밝은 은색 원형 장치가 검정 몸체 위에서 대비. 둘레에 빨간 네온 링(glow). 동작 로직은 기존 유지.
import { useEffect, useRef, useState } from 'react'
import { Fingerprint } from 'lucide-react'
import { chassisColors } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'
import HardwareLabel from './HardwareLabel.jsx'

function FingerprintScanner({ active = false, onScanComplete, highlight = false }) {
  const [scanning, setScanning] = useState(false)
  const timerRef = useRef(null)

  // S5를 벗어나면(active=false) 진행 중 스캔 취소 → M6이 엉뚱한 화면에 뜨지 않게.
  useEffect(() => {
    if (!active && timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      setScanning(false)
    }
  }, [active])

  function handleClick() {
    if (!active || scanning) return
    setScanning(true)
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setScanning(false)
      onScanComplete?.()
    }, 800)
  }

  const { canopy, metalSilver, baseSilverDark, glossBlack, neonAccent } = chassisColors

  return (
    <div className="flex flex-col items-center gap-2">
      <HardwareLabel>지문확인</HardwareLabel>
      <button
        type="button"
        onClick={handleClick}
        aria-label="지문확인"
        className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ${active ? 'cursor-pointer' : 'cursor-default'} ${highlight ? HELP_RING_CLASS : ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary`}
        style={{
          background: `radial-gradient(circle at 50% 32%, ${canopy}, ${metalSilver} 58%, ${baseSilverDark} 100%)`,
          border: `3px solid ${neonAccent}`,
          boxShadow: `0 0 12px ${neonAccent}, inset 0 0 4px rgba(0,0,0,0.35)`,
        }}
      >
        {/* 원형 홈(리더) */}
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            backgroundColor: glossBlack,
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          <Fingerprint size={38} color={metalSilver} strokeWidth={1.6} />
        </span>

        {/* 스캔 라인 (클릭 시 0.8초) */}
        {scanning && (
          <span
            className="fp-scan-line pointer-events-none absolute left-0 h-[3px] w-full"
            style={{ backgroundColor: neonAccent }}
          />
        )}
      </button>
    </div>
  )
}

export default FingerprintScanner
