// 졸업증명서 목업 시각 표현 ★ (실물 사진 문서 복제 금지 — 우리 플로우 졸업증명서)
// 순수 표시용. 슬롯 출력(CertificatePaper)과 수령 확대(PaperReceiveOverlay)가 공유한다.
import { chassisColors } from '../../../tokens.js'

// 개인정보 가림 회색 바 (실물 사진의 회색 가림 방식만 차용)
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

function CertificateCard() {
  return (
    <div className="w-[300px] rounded-[2px] bg-kiosk-white px-8 py-6 text-left">
      <p className="mb-5 text-center text-[15px] font-bold tracking-[0.3em] text-kiosk-gray-text">
        졸업증명서
      </p>

      <Row label="성명" barWidth="90px" />
      <Row label="생년월일" barWidth="120px" />
      <Row label="학교명" barWidth="110px" />
      <Row label="졸업일자" barWidth="100px" />

      <p className="mt-6 text-center text-[11px] text-kiosk-gray-text">
        위와 같이 졸업하였음을 증명합니다.
      </p>
      <p className="mt-4 text-center text-[11px] text-kiosk-gray-text">2026년 7월</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-[13px] font-semibold text-kiosk-gray-text">강원특별자치도교육청</span>
        {/* 빨간 사각 직인 */}
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[7px] leading-tight"
          style={{ border: `2px solid ${chassisColors.redButton}`, color: chassisColors.redButton }}
        >
          교육감印
        </span>
      </div>
    </div>
  )
}

export default CertificateCard
