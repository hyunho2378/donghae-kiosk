// 출력되는 졸업증명서 목업 ★ (실물 사진 문서 복제 금지 — 우리 플로우 졸업증명서)
// - 개인정보는 회색 바로 가림(실물 사진이 회색 바로 가린 방식만 차용)
// - 클릭 시 수령 처리(페이드 아웃 후 onReceive)
import { useEffect, useRef, useState } from 'react'
import { chassisColors, timing } from '../../../tokens.js'

// 개인정보 가림 회색 바
function RedactBar({ w }) {
  return (
    <span
      className="inline-block h-3 rounded-[2px] align-middle"
      style={{ width: w, backgroundColor: chassisColors.redactBar }}
    />
  )
}

// 표 한 줄: 항목명 + 회색 바 값
function Row({ label, barWidth }) {
  return (
    <div className="flex items-center gap-3 border-b border-dash-border py-2">
      <span className="w-16 shrink-0 text-[11px] text-kiosk-gray-text">{label}</span>
      <RedactBar w={barWidth} />
    </div>
  )
}

function CertificatePaper({ onReceive }) {
  const [leaving, setLeaving] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function handleClick() {
    if (leaving) return
    setLeaving(true)
    timerRef.current = setTimeout(() => onReceive?.(), 400)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="증명서 수령"
      className={`block w-[300px] cursor-pointer rounded-[2px] bg-kiosk-white px-8 py-6 text-left ${
        leaving ? 'paper-leaving' : 'paper-entering'
      }`}
      style={{
        boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        // 슬라이드 시간은 토큰으로 (FIX-C, 0.8초). 수령 페이드는 0.4초 고정.
        animationDuration: leaving ? '400ms' : `${timing.paperSlideMs}ms`,
      }}
    >
      {/* 타이틀 */}
      <p className="mb-5 text-center text-[15px] font-bold tracking-[0.3em] text-kiosk-gray-text">
        졸업증명서
      </p>

      {/* 표 */}
      <Row label="성명" barWidth="90px" />
      <Row label="생년월일" barWidth="120px" />
      <Row label="학교명" barWidth="110px" />
      <Row label="졸업일자" barWidth="100px" />

      {/* 본문 + 발급기관 + 직인 */}
      <p className="mt-6 text-center text-[11px] text-kiosk-gray-text">
        위와 같이 졸업하였음을 증명합니다.
      </p>
      <p className="mt-4 text-center text-[11px] text-kiosk-gray-text">2026년 7월</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-[13px] font-semibold text-kiosk-gray-text">
          강원특별자치도교육청
        </span>
        {/* 빨간 사각 직인 */}
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[7px] leading-tight"
          style={{ border: `2px solid ${chassisColors.redButton}`, color: chassisColors.redButton }}
        >
          교육감印
        </span>
      </div>
    </button>
  )
}

export default CertificatePaper
