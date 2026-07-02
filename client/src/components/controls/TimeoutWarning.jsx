// 시간제한 경고 오버레이 (PROMPT 07) — 마지막 10초 카운트다운.
// pointer-events-none: 클릭은 통과시켜(어디를 눌러도) App의 전역 활동 감지로 타이머 리셋.
import { AlertCircle } from 'lucide-react'
import { iconSize, modalDim } from '../../tokens.js'

function TimeoutWarning({ seconds }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: modalDim }}
    >
      <div className="flex flex-col items-center gap-4 rounded-kiosk-button bg-kiosk-white px-10 py-8 text-center">
        <AlertCircle size={iconSize.xl} className="text-kiosk-alert-blue" />
        <p className="text-kiosk-title text-kiosk-gray-text">이용시간이 얼마 남지 않았습니다</p>
        <p className="text-[48px] font-bold leading-none text-kiosk-blue-primary">{seconds}</p>
        <p className="text-kiosk-body text-kiosk-gray-text">화면을 터치하면 계속 이용할 수 있습니다</p>
      </div>
    </div>
  )
}

export default TimeoutWarning
