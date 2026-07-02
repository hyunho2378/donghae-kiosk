// 지문인식기 ★ 유일하게 동작하는 하드웨어
// - active(현재 S5)일 때만 클릭 동작. 클릭 시 0.8초 파란 스캔 라인 애니메이션 후 onScanComplete().
// - 검정 광택 사다리꼴 하우징 + 중앙 은색 볼트/렌치 실루엣(SVG).
import { useEffect, useRef, useState } from 'react'
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

  return (
    <div className="flex flex-col items-center gap-1">
      <HardwareLabel>지문인식기</HardwareLabel>
      <button
        type="button"
        onClick={handleClick}
        aria-label="지문인식기"
        className={`relative h-24 w-full overflow-hidden ${active ? 'cursor-pointer' : 'cursor-default'} ${highlight ? HELP_RING_CLASS : ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary`}
        style={{
          backgroundColor: chassisColors.glossBlack,
          clipPath: 'polygon(0 0, 100% 0, 86% 100%, 14% 100%)',
        }}
      >
        {/* 광택 하이라이트 */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)',
          }}
        />

        {/* 은색 볼트/렌치 실루엣 */}
        <svg
          viewBox="0 0 40 80"
          className="absolute left-1/2 top-1/2 h-16 w-8 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <polygon
            points="10,8 30,8 38,20 30,32 10,32 2,20"
            fill={chassisColors.metalSilver}
          />
          <polygon points="13,32 27,32 23,74 17,74" fill={chassisColors.metalSilver} />
        </svg>

        {/* 스캔 라인 (클릭 시 0.8초) */}
        {scanning && (
          <span
            className="fp-scan-line pointer-events-none absolute left-0 h-[3px] w-full"
            style={{ backgroundColor: chassisColors.returnBlue }}
          />
        )}
      </button>
    </div>
  )
}

export default FingerprintScanner
