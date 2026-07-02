// 시각장애인키보드 (하단 우측 상단). 전부 장식용(클릭 무반응).
// 좌측 숫자부 4행 + 우측 기능부 4행(실물 배치).
import { chassisColors } from '../../../tokens.js'
import HardwareLabel from './HardwareLabel.jsx'

const NUM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
const FN_ROWS = [
  ['시작', '정정'],
  ['자음', '모음', '영문'],
  ['↓', '입력', '↑'],
  ['확인', '취소'],
]

const KEY_STYLE =
  'flex items-center justify-center rounded-[2px] border border-kiosk-gray-border bg-kiosk-white text-[10px] text-kiosk-gray-text'

function AccessibilityKeypad() {
  return (
    <div className="flex flex-col items-center gap-2">
      <HardwareLabel>시각장애인키보드</HardwareLabel>
      <div
        className="flex gap-3 rounded-md p-3"
        style={{ backgroundColor: chassisColors.bodyLight }}
      >
        {/* 숫자부 */}
        <div className="grid grid-cols-3 gap-1.5">
          {NUM_KEYS.map((k) => (
            <span key={k} className={`${KEY_STYLE} h-7 w-7`}>
              {k}
            </span>
          ))}
        </div>

        {/* 기능부 */}
        <div className="flex flex-col gap-1.5">
          {FN_ROWS.map((row, i) => (
            <div key={i} className="flex gap-1.5">
              {row.map((k, j) => (
                <span key={`${i}-${j}`} className={`${KEY_STYLE} h-7 min-w-[34px] px-1`}>
                  {k}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccessibilityKeypad
