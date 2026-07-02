// 종이 수령 연출 오버레이 (FIX-D) — 좌측 키오스크 영역 정중앙에 얹힌다.
// 1) 클릭 즉시 마운트 → 다음 프레임에 중앙으로 이동+1.8배 확대(move, ease-out, 그림자 커짐)
// 2) 중앙 유지(hold) — 관객이 증명서를 보는 시간
// 3) 페이드 아웃(fade) → onDone(기존 완료 플로우: 줌인 복귀 + S1 리셋)
// scale 예외 3호: 카메라 연출과 동일하게 개별 UI scale 금지 규칙의 예외로 DESIGN.md에 명시.
import { useEffect, useRef, useState } from 'react'
import { timing } from '../../../tokens.js'
import CertificateCard from './CertificateCard.jsx'

// targetScale: 중앙 확대 배율. 데스크톱 1.8, 모바일은 화면 폭에 맞춰 축소된 값을 받는다(PROMPT 10).
function PaperReceiveOverlay({ onDone, targetScale = 1.8 }) {
  const [grown, setGrown] = useState(false) // 중앙 이동+확대 트리거
  const [fading, setFading] = useState(false) // 소멸 트리거
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    // 마운트(작게, 아래) → 다음 프레임에 확대 전환 시작
    const raf = requestAnimationFrame(() => setGrown(true))
    const holdEnd = timing.paperReceiveMoveMs + timing.paperHoldMs
    const t1 = setTimeout(() => setFading(true), holdEnd)
    const t2 = setTimeout(() => onDoneRef.current?.(), holdEnd + timing.paperReceiveFadeMs)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
      <div
        style={{
          transform: grown ? `translateY(0) scale(${targetScale})` : 'translateY(90px) scale(0.85)',
          opacity: fading ? 0 : 1,
          boxShadow: grown ? '0 30px 70px rgba(0,0,0,0.5)' : '0 10px 24px rgba(0,0,0,0.3)',
          transition: `transform ${timing.paperReceiveMoveMs}ms ease-out, box-shadow ${timing.paperReceiveMoveMs}ms ease-out, opacity ${timing.paperReceiveFadeMs}ms ease-in`,
        }}
      >
        <CertificateCard />
      </div>
    </div>
  )
}

export default PaperReceiveOverlay
