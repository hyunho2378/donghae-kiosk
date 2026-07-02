// 도움말 말풍선 (PROMPT 07 · FIX-G 확대) — 기기 밖 시뮬레이터 오버레이.
// 시니어(핵심 사용자)가 멀리서도 읽게 크게 + 검정 텍스트로 대비 강화. 화면 하단 중앙.
// 키오스크 화면 자체는 건드리지 않는다(우리 서비스 차별점: 실물 화면 유지 + 힌트만 얹음).
import { Lightbulb } from 'lucide-react'

function HelpOverlay({ text }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-6">
      <div className="flex w-full max-w-[680px] items-start gap-3 rounded-dash-card border border-help-bubble-border bg-help-bubble-bg px-6 py-5">
        <Lightbulb size={28} className="mt-0.5 shrink-0 text-help-bubble-text" />
        <p className="text-help-text text-help-bubble-text">{text}</p>
      </div>
    </div>
  )
}

export default HelpOverlay
