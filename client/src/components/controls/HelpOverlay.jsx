// 도움말 말풍선 (PROMPT 07) — 기기 밖 시뮬레이터 오버레이. 화면을 가리지 않게 하단 배치.
// 키오스크 화면 자체는 건드리지 않는다(우리 서비스 차별점: 실물 화면 유지 + 힌트만 얹음).
import { Lightbulb } from 'lucide-react'

function HelpOverlay({ text }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-6">
      <div className="flex max-w-[600px] items-start gap-3 rounded-dash-card border border-help-bubble-border bg-help-bubble-bg px-5 py-3">
        <Lightbulb size={20} className="mt-0.5 shrink-0 text-help-bubble-text" />
        <p className="text-dash-body text-help-bubble-text">{text}</p>
      </div>
    </div>
  )
}

export default HelpOverlay
